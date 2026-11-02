import assert from "node:assert/strict";

const base = process.env.PREVIEW_CHECK_ORIGIN ?? "http://localhost:3461";
const mode = process.env.PREVIEW_CHECK_MODE ?? "production";

async function request(pathname, { method = "GET", headers = {} } = {}) {
  const response = await fetch(new URL(pathname, base), {
    method,
    redirect: "manual",
    headers,
  });
  const text = await response.text();
  return {
    status: response.status,
    robots: response.headers.get("x-robots-tag"),
    www: response.headers.get("www-authenticate"),
    text,
  };
}

const favicon = await request("/loghi/favicon.png");
const home = await request("/it");
const action = await request("/it/lavora-con-noi", {
  method: "POST",
  headers: { "Next-Action": "0000000000000000000000000000000000000000" },
});
const image = await request("/_next/image?url=%2Floghi%2Ffavicon.png&w=64&q=75");
const robots = await request("/robots.txt");
const sitemap = await request("/sitemap.xml");

if (mode === "production") {
  assert.equal(favicon.status, 200, "production favicon");
  assert.equal(favicon.robots, null);
  assert.equal(home.status, 200, "production home");
  assert.equal(home.robots, null);
  assert.equal(home.text.includes("https://casinoshow.ch"), true);
  assert.equal(home.text.includes("noindex"), false);
  assert.notEqual(action.status, 401);
  assert.equal(robots.status, 404, "production has no robots.txt");
  assert.equal(sitemap.status, 200);
  assert.equal(sitemap.text.includes("https://casinoshow.ch/"), true);
  assert.equal(sitemap.text.includes("preview.casinoshow.ch"), false);
  console.log("preview-http-production-ok", {
    favicon: favicon.status,
    home: home.status,
    action: action.status,
    image: image.status,
    robots: robots.status,
    sitemap: sitemap.status,
  });
} else {
  for (const [name, result] of [
    ["favicon", favicon],
    ["home", home],
    ["robots", robots],
    ["sitemap", sitemap],
  ]) {
    assert.equal(result.status, 200, name);
    assert.equal(result.robots, "noindex, nofollow", name);
    assert.equal(result.www, null, name);
  }

  assert.equal(home.text.includes("https://casinoshow.ch"), true);
  assert.equal(home.text.includes("noindex, nofollow"), true);
  assert.equal(home.text.includes("Authentication required"), false);

  const staticMatch = home.text.match(/\/_next\/static\/[^"'\s]+/);
  assert.ok(staticMatch, "home references a static chunk");
  const chunk = await request(staticMatch[0]);
  assert.equal(chunk.status, 200, "static chunk");
  assert.equal(chunk.robots, "noindex, nofollow");

  const hero = await request("/home-page/hero/foto-1.png");
  assert.equal(hero.status, 200, "hero");
  assert.ok(hero.text.length > 1000, "hero bytes");
  assert.equal(hero.robots, "noindex, nofollow");

  assert.equal(image.status, 200, "image optimizer");
  assert.equal(image.robots, "noindex, nofollow");

  assert.equal(robots.text.includes("Disallow: /"), true);
  assert.equal(robots.text.includes("Sitemap:"), false);
  assert.equal(sitemap.text.includes("<url>"), false);
  assert.equal(sitemap.text.includes("preview.casinoshow.ch"), false);

  assert.notEqual(action.status, 401, "server action is public");
  assert.equal(action.robots, "noindex, nofollow");

  const quote = await request("/it/preventivo");
  assert.equal(quote.status, 200);
  assert.equal(quote.text.includes("non vengono trasmessi"), true);
  assert.equal(quote.robots, "noindex, nofollow");

  console.log("preview-http-preview-ok", {
    home: home.status,
    favicon: favicon.status,
    chunk: staticMatch[0],
    action: action.status,
    image: image.status,
  });
}
