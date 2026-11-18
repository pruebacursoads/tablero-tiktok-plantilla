// Descarga tus datos de TikTok desde Windsor.ai y escribe public/data.json
// Uso: WINDSOR_API_KEY=xxxx node scripts/actualizar.mjs
// Opcional: TZ_OFFSET=-5 (horas respecto a UTC de tu país; Perú, Colombia y Ecuador = -5)
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
const TZ_OFFSET = Number(process.env.TZ_OFFSET ?? -5);

async function windsor(fields, preset) {
  const url = new URL(BASE);
  url.searchParams.set("api_key", KEY);
  url.searchParams.set("date_preset", preset);
  url.searchParams.set("fields", fields.join(","));
  const res = await fetch(url, { signal: AbortSignal.timeout(180000) });
  if (!res.ok) throw new Error(`Windsor respondió ${res.status}: ${(await res.text()).slice(0, 300)}`);
  const json = await res.json();
  return Array.isArray(json) ? json : json.data ?? [];
}
// Datos opcionales: si fallan, el tablero sigue funcionando sin esa sección.
async function opcional(nombre, fields, preset) {
  try {
    return await windsor(fields, preset);
  } catch (e) {
    console.warn(`Aviso: no se pudo traer "${nombre}": ${e.message}`);
    return [];
  }
}

const n = (v) => (v === null || v === undefined || v === "" ? 0 : Number(v));

const CAMPOS_DIARIO = ["date", "unique_video_views", "profile_views", "likes", "comments", "shares",
  "bio_link_clicks", "followers_count", "daily_lost_followers", "total_followers_count", "account_name", "username"];

// Historial: intenta 90 días y, si Windsor no lo permite, baja a 60.
let cuentaRows;
try { cuentaRows = await windsor(CAMPOS_DIARIO, "last_90d"); }
catch { cuentaRows = await windsor(CAMPOS_DIARIO, "last_60d"); }

const [videoRows, tiposRows, fuentesRows, actividadRows, generoRows, edadRows, paisRows, ciudadRows] = await Promise.all([
  windsor(
    ["video_id", "video_caption", "video_create_datetime", "video_duration", "video_views_count",
     "video_likes", "video_comments", "video_shares", "video_favorites", "video_reach", "video_new_followers",
     "video_profile_views", "video_full_watched_rate", "video_average_time_watched", "video_share_url",
     "video_thumbnail_url"], "last_90d"),
  opcional("tipo de audiencia por video", ["video_id", "video_audience_types_type", "video_audience_types_percentage"], "last_90d"),
  opcional("fuentes de tráfico por video", ["video_id", "video_impression_sources_impression_source", "video_impression_sources_percentage"], "last_90d"),
  opcional("horas de actividad", ["audience_activity_hour", "audience_activity_count"], "last_7d"),
  opcional("género", ["audience_genders_gender", "audience_genders_percentage"], "last_7d"),
  opcional("edades", ["audience_ages_age", "audience_ages_percentage"], "last_7d"),
  opcional("países", ["audience_countries_country", "audience_countries_percentage"], "last_7d"),
  opcional("ciudades", ["audience_cities_city_name", "audience_cities_percentage"], "last_7d"),
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
while (diario.length && diario.at(-1).reach === 0) diario.pop();

// Agrupa filas "video + categoría" en { id: { categoría: valor } }
const porVideo = (rows, kKey, vKey) => {
  const m = {};
  for (const r of rows) {
    if (!r.video_id || r[kKey] == null) continue;
    (m[r.video_id] ||= {})[r[kKey]] = n(r[vKey]);
  }
  return m;
};
const tipos = porVideo(tiposRows, "video_audience_types_type", "video_audience_types_percentage");
const fuentes = porVideo(fuentesRows, "video_impression_sources_impression_source", "video_impression_sources_percentage");

const videos = videoRows
  .filter((v) => v.video_id)
  .map((v) => {
    const t = tipos[v.video_id] || {};
    return {
      id: v.video_id,
      caption: (v.video_caption || "").replace(/\s+/g, " ").trim(),
      creado: v.video_create_datetime || "", // hora UTC
      fecha: (v.video_create_datetime || "").slice(0, 10),
      dur: n(v.video_duration),
      views: n(v.video_views_count),
      reach: n(v.video_reach),
      likes: n(v.video_likes),
      comments: n(v.video_comments),
      shares: n(v.video_shares),
      favorites: n(v.video_favorites),
      new_followers: n(v.video_new_followers),
      profile_views: n(v.video_profile_views),
      full_rate: n(v.video_full_watched_rate),
      avg_watch: n(v.video_average_time_watched),
      seg: "FOLLOWER_PERCENT" in t ? t.FOLLOWER_PERCENT : null,
      no_seg: "NON_FOLLOWER_PERCENT" in t ? t.NON_FOLLOWER_PERCENT : null,
      fuentes: fuentes[v.video_id] || null,
      url: (v.video_share_url || "").split("?")[0],
      thumb: v.video_thumbnail_url || "",
    };
  })
  .sort((a, b) => b.creado.localeCompare(a.creado));

const lista = (rows, k, v) =>
  rows.filter((r) => r[k] != null && r[k] !== "").map((r) => ({ k: String(r[k]), p: n(r[v]) })).sort((a, b) => b.p - a.p);

const actividad = actividadRows
  .filter((r) => r.audience_activity_hour !== null && r.audience_activity_hour !== undefined)
  .map((r) => ({ h: Number(r.audience_activity_hour), n: n(r.audience_activity_count) }))
  .sort((a, b) => a.h - b.h);

const out = {
  actualizado: new Date().toISOString(),
  demo: false,
  cuenta: CUENTA || cuentaRows.find((r) => r.account_name)?.account_name || "Mi cuenta de TikTok",
  usuario: cuentaRows.find((r) => r.username)?.username || "",
  tz_offset: TZ_OFFSET,
  diario,
  videos,
  actividad, // seguidores conectados por hora (hora UTC)
  audiencia: {
    generos: lista(generoRows, "audience_genders_gender", "audience_genders_percentage"),
    edades: lista(edadRows, "audience_ages_age", "audience_ages_percentage"),
    paises: lista(paisRows, "audience_countries_country", "audience_countries_percentage"),
    ciudades: lista(ciudadRows, "audience_cities_city_name", "audience_cities_percentage"),
  },
};

const dir = join(dirname(fileURLToPath(import.meta.url)), "..", "public");
mkdirSync(dir, { recursive: true });
writeFileSync(join(dir, "data.json"), JSON.stringify(out, null, 1));
console.log(`OK: ${diario.length} días, ${videos.length} videos, ${actividad.length} horas, ${out.audiencia.paises.length} países → public/data.json`);
