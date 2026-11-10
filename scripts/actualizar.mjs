// Descarga tus datos de TikTok desde Windsor.ai y escribe public/data.json
// Uso: WINDSOR_API_KEY=xxxx node scripts/actualizar.mjs
// Sin dependencias (Node 18+).
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const KEY = process.env.WINDSOR_API_KEY;
if (!KEY) {
  console.error("Falta WINDSOR_API_KEY (tu API key de Windsor.ai).");
  process.exit(1);
}

const BASE = "https://connectors.windsor.ai/tiktok_organic";
const CUENTA = process.env.TIKTOK_CUENTA_NOMBRE || "";

async function windsor(fields, preset) {
  const url = new URL(BASE);
  url.searchParams.set("api_key", KEY);
  url.searchParams.set("date_preset", preset);
  url.searchParams.set("fields", fields.join(","));
  const res = await fetch(url, { signal: AbortSignal.timeout(120000) });
  if (!res.ok) throw new Error(`Windsor respondió ${res.status}: ${(await res.text()).slice(0, 300)}`);
  const json = await res.json();
  return Array.isArray(json) ? json : json.data ?? [];
}

const n = (v) => (v === null || v === undefined || v === "" ? 0 : Number(v));

const [cuentaRows, videoRows] = await Promise.all([
  windsor(
    ["date", "unique_video_views", "profile_views", "likes", "comments", "shares",
     "bio_link_clicks", "followers_count", "daily_lost_followers", "total_followers_count",
     "account_name", "username"],
    "last_60d"
  ),
  windsor(
    ["video_id", "video_caption", "video_create_datetime", "video_duration", "video_views_count",
     "video_likes", "video_comments", "video_shares", "video_new_followers", "video_profile_views",
     "video_full_watched_rate", "video_average_time_watched", "video_share_url", "video_thumbnail_url"],
    "last_90d"
  ),
]);

// Solo días completos: TikTok entrega los últimos 1-2 días vacíos o incompletos.
const diario = cuentaRows
  .filter((r) => r.date && r.unique_video_views !== null && r.unique_video_views !== undefined)
  .map((r) => ({
    date: r.date,
    reach: n(r.unique_video_views),
    profile_views: n(r.profile_views),
    likes: n(r.likes),
    comments: n(r.comments),
    shares: n(r.shares),
    bio_clicks: n(r.bio_link_clicks),
    net_followers: n(r.followers_count),
    lost: n(r.daily_lost_followers),
    total_followers: n(r.total_followers_count),
  }))
  .sort((a, b) => a.date.localeCompare(b.date));

// Quita días finales sin datos (reach 0 y seguidores totales 0)
while (diario.length && diario.at(-1).reach === 0 && diario.at(-1).total_followers === 0) diario.pop();
while (diario.length && diario.at(-1).reach === 0) diario.pop();

const videos = videoRows
  .filter((v) => v.video_id)
  .map((v) => ({
    id: v.video_id,
    caption: (v.video_caption || "").replace(/\s+/g, " ").trim(),
    fecha: (v.video_create_datetime || "").slice(0, 10),
    dur: n(v.video_duration),
    views: n(v.video_views_count),
    likes: n(v.video_likes),
    comments: n(v.video_comments),
    shares: n(v.video_shares),
    new_followers: n(v.video_new_followers),
    profile_views: n(v.video_profile_views),
    full_rate: n(v.video_full_watched_rate),
    avg_watch: n(v.video_average_time_watched),
    url: (v.video_share_url || "").split("?")[0],
    thumb: v.video_thumbnail_url || "",
  }))
  .sort((a, b) => b.fecha.localeCompare(a.fecha));

const out = {
  actualizado: new Date().toISOString(),
  demo: false,
  cuenta: CUENTA || cuentaRows.find((r) => r.account_name)?.account_name || "Mi cuenta de TikTok",
  usuario: cuentaRows.find((r) => r.username)?.username || "",
  diario,
  videos,
};

const dir = join(dirname(fileURLToPath(import.meta.url)), "..", "public");
mkdirSync(dir, { recursive: true });
writeFileSync(join(dir, "data.json"), JSON.stringify(out, null, 1));
console.log(`OK: ${diario.length} días y ${videos.length} videos → public/data.json`);
