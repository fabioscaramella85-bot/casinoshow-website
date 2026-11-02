import assert from "node:assert/strict";

const base = process.env.PREVIEW_CHECK_ORIGIN ?? "http://localhost:3461";
const mode = process.env.PREVIEW_CHECK_MODE ?? "production";
const user = process.env.CASINO_SHOW_PREVIEW_USER ?? "";
const password = process.env.CASINO_SHOW_PREVIEW_PASSWORD ?? "";

function authHeader() {
  return `Basic ${Buffer.from(`${user}:${password}`, "utf8").toString("base64")}`;
}

async function request(pathname, { method = "GET", authorized = false, headers = {} } = {}) {
  const response = await fetch(new URL(pathname, base), {
    method,
    redirect: "manual",
    headers: {
      ...headers,
      ...(authorized ? { Authorization: authHeader() } : {}),
    },
  });
  const text = await response.text();
  return {
    status: response.status,
    robots: response.headers.get("x-robots-tag"),
    cache: response.headers.get("cache-control"),
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
    ["action", action],
    ["image", image],
    ["robots", robots],
    ["sitemap", sitemap],
  ]) {
    assert.equal(result.status, 401, name);
    assert.equal(result.robots, "noindex, nofollow", name);
    assert.equal(result.text.includes(password), false, name);
  }
  assert.equal(home.www?.includes("Basic"), true);

  const open = await request("/it", { authorized: true });
  assert.equal(open.status, 200);
  assert.equal(open.robots, "noindex, nofollow");
  assert.equal(open.cache?.includes("private"), true);
  assert.equal(open.text.includes("https://casinoshow.ch"), true);
  assert.equal(open.text.includes("noindex, nofollow"), true);
  assert.equal(open.text.includes(password), false);

  const staticMatch = open.text.match(/\/_next\/static\/[^"'\s]+/);
  assert.ok(staticMatch, "authorized home references a static chunk");
  const chunk = await request(staticMatch[0]);
  assert.equal(chunk.status, 401, "static chunk");

  const openFavicon = await request("/loghi/favicon.png", { authorized: true });
  assert.equal(openFavicon.status, 200, "authorized favicon");
  assert.equal(openFavicon.robots, "noindex, nofollow");

  const openChunk = await request(staticMatch[0], { authorized: true });
  assert.equal(openChunk.status, 200, "authorized chunk");

  assert.equal(open.text.includes("/_next/image"), false, "preview does not use the image optimizer");
  assert.equal(open.text.includes("/home-page/hero/"), true);
  const hero = await request("/home-page/hero/foto-1.png");
  assert.equal(hero.status, 401, "anonymous hero");
  assert.equal(hero.text, "Authentication required.");
  const openHero = await request("/home-page/hero/foto-1.png", { authorized: true });
  assert.equal(openHero.status, 200, "authorized hero");
  assert.ok(openHero.text.length > 1000, "hero bytes");

  const optimizer = await request("/_next/image?url=%2Floghi%2Ffavicon.png&w=64&q=75");
  assert.equal(optimizer.status, 401, "anonymous optimizer");
  assert.equal(optimizer.text, "Authentication required.");

  const openRobots = await request("/robots.txt", { authorized: true });
  assert.equal(openRobots.status, 200);
  assert.equal(openRobots.text.includes("Disallow: /"), true);
  assert.equal(openRobots.text.includes("Sitemap:"), false);

  const openSitemap = await request("/sitemap.xml", { authorized: true });
  assert.equal(openSitemap.status, 200);
  assert.equal(openSitemap.text.includes("<url>"), false);
  assert.equal(openSitemap.text.includes("preview.casinoshow.ch"), false);

  const openAction = await request("/it/lavora-con-noi", {
    method: "POST",
    authorized: true,
    headers: { "Next-Action": "0000000000000000000000000000000000000000" },
  });
  assert.notEqual(openAction.status, 401, "authorized action is not anonymous");
  assert.equal(openAction.text.includes(password), false);

  const quote = await request("/it/preventivo", { authorized: true });
  assert.equal(quote.status, 200);
  assert.equal(quote.text.includes("non vengono trasmessi"), true);
  assert.equal(quote.robots, "noindex, nofollow");

  console.log("preview-http-preview-ok", {
    anonymous: 401,
    chunk: staticMatch[0],
    authorizedHome: open.status,
    authorizedAction: openAction.status,
    image: openHero.status,
  });
}
