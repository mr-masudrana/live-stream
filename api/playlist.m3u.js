export default function handler(req, res) {
  const token = generateToken();
  const m3u8Url = `https://statiics.ncare.live/.../mono.m3u8?wmsAuthSign=${token}`;

  const content = `#EXTM3U
#EXTINF:-1 tvg-id="AsianStream" group-title="Live",Asian Live Channel
${m3u8Url}`;

  res.setHeader("Content-Type", "audio/x-mpegurl");
  res.status(200).send(content);
}

function generateToken() {
  const now = new Date();
  const timestamp = `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()} ${now.toLocaleTimeString('en-US')} PM`;
  const raw = `server_time=${timestamp}&hash_value=i6KxNF...==&validminutes=40`;
  const base64 = Buffer.from(raw).toString('base64');
  return encodeURIComponent(base64);
}
