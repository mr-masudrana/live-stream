import { channels } from "./data";

export default function handler(req, res) {
  const base = "https://statiics.ncare.live/c3VydmVyX8RpbEU9Mi8xNy8yMFDDEHGcfRgzQ6NTAgdEoaeFzbF92YWxIZTO0U0ezN1IzMyfvcEdsEfeDeKiNkVN3PTOmdFsaWRtaW51aiPhnPTI2";
  const playlist = ["#EXTM3U"];

  for (const ch of channels) {
    const token = generateToken();
    const full_url = `${base}/${ch.raw_url}/tracks-v1a1/mono.m3u8?wmsAuthSign=${token}`;
    playlist.push(`#EXTINF:-1 tvg-id="${ch.tvg_id}" group-title="${ch.group}",${ch.name}`);
    playlist.push(full_url);
  }

  res.setHeader("Content-Type", "audio/x-mpegurl");
  res.status(200).send(playlist.join("\n"));
}

function generateToken() {
  const now = new Date();
  const timestamp = `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()} ${now.toLocaleTimeString('en-US')} PM`;
  const raw = `server_time=${timestamp}&hash_value=i6KxNF...==&validminutes=40`;
  return encodeURIComponent(Buffer.from(raw).toString("base64"));
}
