import type { APIRoute } from "astro";
import { ENGINES } from "../data/engines";
import { FRAMEWORKS } from "../data/frameworks";
import { SCHEDULERS } from "../data/schedulers";
import { FEATURES } from "../data/features";
import { DEPLOYMENTS } from "../data/deployments";
import { COMPETITORS } from "../data/competitors";

const SITE = "https://z4j.com";

interface Entry {
  path: string;
  priority: number;
  changefreq: "daily" | "weekly" | "monthly" | "yearly";
}

function buildEntries(): Entry[] {
  const entries: Entry[] = [];

  entries.push({ path: "/", priority: 1.0, changefreq: "daily" });

  const highValue = [
    "/features",
    "/engines",
    "/frameworks",
    "/schedulers",
    "/install",
    "/install/tls",
    "/pricing",
    "/compare",
    "/security",
  ];
  for (const path of highValue) {
    entries.push({ path, priority: 0.9, changefreq: "weekly" });
  }

  for (const f of FEATURES) entries.push({ path: `/features/${f.slug}`, priority: 0.8, changefreq: "weekly" });
  for (const e of ENGINES) entries.push({ path: `/engines/${e.slug}`, priority: 0.8, changefreq: "weekly" });
  for (const p of FRAMEWORKS) entries.push({ path: `/frameworks/${p.slug}`, priority: 0.8, changefreq: "weekly" });
  for (const s of SCHEDULERS) entries.push({ path: `/schedulers/${s.slug}`, priority: 0.8, changefreq: "weekly" });
  for (const d of DEPLOYMENTS) entries.push({ path: `/install/${d.slug}`, priority: 0.8, changefreq: "weekly" });
  for (const c of COMPETITORS) entries.push({ path: `/compare/${c.slug}`, priority: 0.7, changefreq: "weekly" });

  const company = ["/about", "/community", "/contact", "/roadmap", "/changelog", "/sitemap"];
  for (const path of company) {
    entries.push({ path, priority: 0.5, changefreq: "monthly" });
  }

  const legal = ["/license", "/privacy", "/terms"];
  for (const path of legal) {
    entries.push({ path, priority: 0.3, changefreq: "yearly" });
  }

  return entries;
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export const GET: APIRoute = () => {
  const lastmod = new Date().toISOString().split("T")[0];
  const entries = buildEntries();

  const urls = entries
    .map(
      (e) =>
        `  <url>\n    <loc>${escapeXml(SITE + e.path)}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority.toFixed(1)}</priority>\n  </url>`,
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

  return new Response(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
