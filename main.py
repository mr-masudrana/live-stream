import os
from urllib.parse import quote
from datetime import datetime
import base64

def generate_token():
    now = datetime.utcnow().strftime("%-m/%-d/%Y %I:%M:%S %p")
    token_string = f"server_time={now}&hash_value=i6KxNF...==&validminutes=40"
    return quote(base64.b64encode(token_string.encode()).decode())

def generate_playlist():
    os.makedirs("data", exist_ok=True)  # ✅ ফোল্ডার বানাবে যদি না থাকে
    token = generate_token()
    m3u8_url = f"https://statiics.ncare.live/.../tracks-v1a1/mono.m3u8?wmsAuthSign={token}"
    with open("data/live_playlist.m3u", "w") as f:
        f.write("#EXTM3U\n")
        f.write("#EXTINF:-1 tvg-id=\"AsianStream\" group-title=\"Live\",Asian Live Channel\n")
        f.write(m3u8_url + "\n")

if __name__ == "__main__":
    generate_playlist()
