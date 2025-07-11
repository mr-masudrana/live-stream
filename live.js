import { channels } from "./data";

export default function handler(req, res) {
  const base = "https://statiics.ncare.live/c3VydmVyX8RpbEU9Mi8xNy8yMFDDEHGcfRgzQ6NTAgdEoaeFzbF92YWxIZTO0U0ezN1IzMyfvcEdsEfeDeKiNkVN3PTOmdFsaWRtaW51aiPhnPTI2";

  const now = new Date();
  const time = `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()} ${now.toLocaleTimeString('en-US')} PM`;
  const raw = `server_time=${time}&hash_value=qJ3x4+lgLQEqZytYbLuw/A==&validminutes=40`;
  const token = encodeURIComponent(Buffer.from(raw).toString("base64"));

  const result = channels.map(ch => ({
    id: ch.id,
    name: ch.name,
    group: ch.group,
    logo: ch.logo,
    url: `${base}/${ch.raw_url}/tracks-v1a1/mono.m3u8?wmsAuthSign=${token}`
  }));

  res.status(200).json(result);
}
