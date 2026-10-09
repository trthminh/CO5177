"""Kiểm tra các link trong assets/js/data.js trước khi nộp bài.

- URL tuyệt đối (http/https): gửi request, báo lỗi nếu không trả về 2xx/3xx.
- Đường dẫn trong repo (notebook, report): kiểm tra file có tồn tại.

Chạy từ thư mục gốc repo:  python scripts/check_links.py
"""
import re
import sys
import urllib.error
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DATA = ROOT / "assets" / "js" / "data.js"

URL_RE = re.compile(r"https?://[^\s\"'<>]+")
PATH_RE = re.compile(r"(?:notebook|report)\s*:\s*\"([^\"]+)\"")


def check_url(url):
    req = urllib.request.Request(url, method="GET", headers={"User-Agent": "Mozilla/5.0 link-check"})
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            return resp.status < 400, resp.status
    except urllib.error.HTTPError as e:
        return False, e.code
    except Exception as e:  # mạng lỗi, timeout...
        return False, type(e).__name__


def main():
    text = DATA.read_text(encoding="utf-8")
    # Bỏ comment để không kiểm tra URL ví dụ
    code = re.sub(r"/\*.*?\*/", "", text, flags=re.S)
    code = re.sub(r"^\s*//.*$", "", code, flags=re.M)

    failed = 0
    for url in sorted(set(URL_RE.findall(code))):
        ok, info = check_url(url)
        failed += not ok
        print(f"[{'OK ' if ok else 'ERR'}] {info}  {url}")

    for rel in sorted(set(PATH_RE.findall(code))):
        if rel.startswith("http"):
            continue
        ok = (ROOT / rel).is_file()
        failed += not ok
        print(f"[{'OK ' if ok else 'ERR'}] file  {rel}")

    print(f"\n{failed} link lỗi." if failed else "\nTất cả link đều hợp lệ.")
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
