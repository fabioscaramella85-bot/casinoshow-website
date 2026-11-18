import assert from "node:assert/strict";
import http from "node:http";

const port = Number(process.env.ALIAS_CHECK_PORT ?? 3483);

function request(path, host) {
  return new Promise((resolve, reject) => {
    const req = http.request(
      {
        hostname: "127.0.0.1",
        port,
        path,
        method: "GET",
        headers: { host },
      },
      (response) => {
        const chunks = [];
        response.on("data", (chunk) => chunks.push(chunk));
        response.on("end", () => {
          resolve({
            status: response.statusCode,
            robots: response.headers["x-robots-tag"] ?? null,
            text: Buffer.concat(chunks).toString("utf8"),
          });
        });
      },
    );
    req.on("error", reject);
    req.end();
  });
}

const official = await request("/it", "casinoshow.ch");
const www = await request("/it", "www.casinoshow.ch");
const alias = await request("/it", "casinoshow-website.vercel.app");
const deployment = await request("/robots.txt", "casinoshow-website-qridvd01h-tlc19.vercel.app");
const local = await request("/it", `127.0.0.1:${port}`);

assert.equal(official.status, 200, "official home");
assert.equal(official.robots, null, "official host stays indexable");
assert.match(official.text, /rel="canonical" href="https:\/\/casinoshow\.ch\/it"/);
assert.equal(official.text.includes("noindex"), false);

assert.equal(www.status, 200, "www home");
assert.equal(www.robots, null, "www host stays indexable");
assert.match(www.text, /rel="canonical" href="https:\/\/casinoshow\.ch\/it"/);

assert.equal(alias.status, 200, "alias home");
assert.equal(alias.robots, "noindex, nofollow", "vercel alias");
assert.match(alias.text, /rel="canonical" href="https:\/\/casinoshow\.ch\/it"/);
assert.match(alias.text, /hrefLang="de"|hreflang="de"/i);
assert.equal(/googletagmanager|google-analytics|gtag\(/.test(alias.text), false);

assert.equal(deployment.status, 200, "deployment robots");
assert.equal(deployment.robots, "noindex, nofollow", "deployment host");
assert.match(deployment.text, /Allow: \//);
assert.match(deployment.text, /Sitemap: https:\/\/casinoshow\.ch\/sitemap\.xml/);
assert.equal(/Disallow:\s*\//.test(deployment.text), false);

assert.equal(local.status, 200, "local home");
assert.equal(local.robots, null, "local host is not a deployment alias");

const sitemap = await request("/sitemap.xml", "casinoshow-website.vercel.app");
assert.equal(sitemap.status, 200);
assert.equal(sitemap.robots, "noindex, nofollow");
assert.equal([...sitemap.text.matchAll(/<loc>/g)].length, 56);

console.log("verify:alias-http ok", {
  official: official.robots,
  www: www.robots,
  alias: alias.robots,
  deployment: deployment.robots,
});
