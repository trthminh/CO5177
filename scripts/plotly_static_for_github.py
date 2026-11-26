"""Cho hình Plotly của một notebook đã chạy hiện được trên GitHub.

GitHub không chạy JavaScript và luôn ưu tiên phần text/html của một kết quả, nên hình Plotly
hiện thành ô trống dù kết quả có kèm ảnh PNG. Script này bỏ phần text/html của mọi hình Plotly
(và kết quả chỉ chứa thư viện plotly.js), giữ lại dữ liệu Plotly và ảnh PNG:
- GitHub và Colab (khi chưa chạy lại) hiện ảnh PNG;
- VS Code và JupyterLab vẫn vẽ hình tương tác từ dữ liệu Plotly.

Hình chỉ có ảnh PNG nếu notebook được chạy với gói kaleido (xem phần thiết lập của notebook).
Chạy SAU khi đã xuất HTML, vì file HTML cần phần text/html để hình tương tác:
    python scripts/plotly_static_for_github.py notebooks/text.ipynb
"""
import json
import sys

PLOTLY_MIME = "application/vnd.plotly.v1+json"


def is_plotly_library(output):
    """Kết quả chỉ chứa thư viện plotly.js, do renderer "notebook" chèn trước hình đầu tiên."""
    data = output.get("data", {})
    return list(data) == ["text/html"] and "window.PlotlyConfig" in "".join(data["text/html"])


def main(path):
    with open(path, encoding="utf-8") as f:
        notebook = json.load(f)
    changed = 0
    for cell in notebook["cells"]:
        outputs = cell.get("outputs", [])
        kept = [o for o in outputs if not is_plotly_library(o)]
        changed += len(outputs) - len(kept)
        for output in kept:
            data = output.get("data", {})
            if PLOTLY_MIME in data and "image/png" in data and "text/html" in data:
                del data["text/html"]
                changed += 1
        if outputs:
            cell["outputs"] = kept
    with open(path, "w", encoding="utf-8") as f:
        json.dump(notebook, f, ensure_ascii=False, indent=1)
        f.write("\n")
    print(f"{path}: đã sửa {changed} kết quả")


if __name__ == "__main__":
    for notebook_path in sys.argv[1:]:
        main(notebook_path)
