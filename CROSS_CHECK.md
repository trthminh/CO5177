# Tiêu chí cross-check notebook và report

Tài liệu này dùng khi các thành viên kiểm tra chéo bài của nhau (notebook, report PDF, trang con trên landing page). Các tiêu chí được gom từ:
- thang điểm và quy cách nộp của đề bài (mục 6 và 7);
- các góp ý và câu hỏi đã nêu khi review notebook Text;
- các lỗi quy trình đã gặp trong lúc làm.

Template trong `notebooks/templates/` chỉ là flow ban đầu. Bài làm được phép khác template, miễn là đạt các tiêu chí dưới đây và giải thích được vì sao làm khác.

## Cách tiến hành

1. **Phân công xoay vòng:** Phát kiểm tra Tabular, Long kiểm tra Time series, Minh kiểm tra Text. Mỗi người đọc trọn một bài không phải của mình.
2. **Chạy lại trước khi đọc:** mở notebook từ link Colab trên landing page, chọn Runtime > Run all trên runtime mới. Nếu không chạy được thì các tiêu chí khác chưa có ý nghĩa.
3. **Đọc ba thứ cùng lúc:** notebook, report PDF và trang con trên landing page, rồi đối chiếu số liệu giữa ba nơi.
4. **Ghi kết quả** vào bảng ở cuối file (hoặc trong mô tả PR / issue), mỗi vấn đề một dòng.

Có ba mức độ:

| Mức | Ý nghĩa |
|---|---|
| **Chặn** | Sai kết quả, rò rỉ dữ liệu, notebook không chạy được |
| **Quan trọng** | Thiếu bằng chứng cho một lựa chọn, số liệu không khớp giữa notebook, report và landing page |
| **Nhỏ** | Câu chữ, trình bày, comment |

## A. Chạy được và tái lập được

- [ ] **A1.** Run all trên Colab từ runtime mới không lỗi; không cần upload file, mount Drive hay API key.
- [ ] **A2.** Notebook tự cài thư viện còn thiếu và tự tải dữ liệu từ nguồn gốc; không có đường dẫn của máy cá nhân.
- [ ] **A3.** Có cố định `random_state` / seed; chạy hai lần ra cùng số liệu.
- [ ] **A4.** File lưu trên GitHub còn giữ output; biểu đồ Plotly hiển thị được trên GitHub, Colab và file HTML xuất ra.
- [ ] **A5.** Không còn `TODO`, `✏️`, chữ giữ chỗ, cell nháp hay output lỗi bị bỏ quên.

## B. Quy trình và rò rỉ dữ liệu (quan trọng nhất)

Câu hỏi "gộp train, dev, test để EDA có hợp lý không" không có một câu trả lời chung; nó phụ thuộc vào từng bước:

- [ ] **B1.** Kiểm tra chất lượng (thiếu, trùng, sai định dạng) làm trên toàn bộ dữ liệu là **được**, vì cần tìm lỗi ở mọi tập và tìm trùng lặp giữa các tập.
- [ ] **B2.** Mọi **quyết định có dùng nhãn hoặc thống kê** (chọn đặc trưng, chọn ngưỡng, loại dòng mâu thuẫn, chọn lag) chỉ dựa trên tập train.
  *Cách kiểm:* tìm chỗ nào tính trên toàn bộ dữ liệu rồi dùng kết quả để quyết định.
- [ ] **B3.** Bước xử lý từng dòng độc lập (chuẩn hóa chữ, tách từ, tạo cột từ cột khác trong cùng dòng) được phép chạy trước khi chia tập. Bước học thống kê (imputer, scaler, encoder, vectorizer) phải nằm trong `Pipeline` và chỉ `fit` trên train.
  *Cách kiểm:* tìm `fit` / `fit_transform` nằm ngoài Pipeline.
- [ ] **B4.** Loại trùng lặp hoặc nhãn mâu thuẫn trước khi chia tập thì phải nêu lý do. Nếu dùng cách chia có sẵn của tác giả thì không được dùng nhãn dev hay test để sửa train.
- [ ] **B5.** Có kiểm tra một mẫu nằm ở nhiều tập không, và đo ảnh hưởng của phần trùng đó lên điểm test.
- [ ] **B6.** Mô hình và tham số được chọn bằng validation hoặc kiểm định chéo trên train, **không phải bằng test**. Test chỉ dùng một lần ở bước đánh giá cuối.
  *Cách kiểm:* tìm mọi chỗ dùng `X_test` / `y_test`.
- [ ] **B7.** Không có cột chỉ biết **sau** thời điểm dự đoán (ví dụ trạng thái đặt phòng, phòng được gán lúc check-in).
  *Cách kiểm:* với từng cột, hỏi "lúc cần dự đoán thì đã có giá trị này chưa?".
- [ ] **B8.** Nếu tập validation nhỏ (hoặc lớp hiếm chỉ có vài chục mẫu) thì không kết luận từ chênh lệch dưới khoảng 1 điểm; nên dùng kiểm định chéo.

## C. Chuỗi bằng chứng: mỗi lựa chọn đều có lý do

- [ ] **C1.** Mỗi bước xử lý hoặc mô hình chỉ ra được nó dựa trên phát hiện EDA nào, hay thí nghiệm nào.
- [ ] **C2.** Mỗi vấn đề dữ liệu có **quyết định rõ ràng**: xử lý, bỏ qua, hay chỉ ghi nhận bằng một cột cờ. "Bỏ qua" nghĩa là gì phải được nói ra (không sửa dữ liệu? không thêm đặc trưng?).
- [ ] **C3.** Các phương án hợp lý được so sánh bằng số, không chỉ chọn một cách rồi chạy (ví dụ: cách xử lý giá trị thiếu, outlier, cách biểu diễn văn bản, lag).
- [ ] **C4.** Lời hứa trong notebook được thực hiện: viết "sẽ thử ở bước mô hình" thì phải có thí nghiệm đó.
- [ ] **C5.** Quy tắc, danh sách từ khóa hay ngưỡng do nhóm tự đặt thì phải **ghi rõ là tự đặt** và kiểm tra lại trên dữ liệu. Có thể lấy từ dữ liệu thì nên lấy từ dữ liệu.
- [ ] **C6.** Ví dụ minh họa dùng **dữ liệu thật**. Câu hay mẫu tự viết chỉ dùng ở phần dự đoán dữ liệu mới, và phải ghi rõ là tự viết.
- [ ] **C7.** Thông tin bên ngoài (độ chính xác của công cụ, kết quả của bài báo) có nguồn, và ghi rõ là số do nguồn đó tự báo cáo nếu nhóm không chạy lại.
- [ ] **C8.** Có để ý các "dấu vết của cách thu thập" có thể làm mô hình học sai (ví dụ văn bản bị cắt đúng 300 ký tự, ID tăng dần theo thời gian). Những dấu vết này không được dùng làm đặc trưng.

## D. EDA và biểu đồ

- [ ] **D1.** Mỗi mục EDA bắt đầu bằng một câu hỏi; tiêu đề hình nêu **kết luận**, không chỉ nêu tên biểu đồ.
- [ ] **D2.** Sau mỗi hình có nhận xét kèm số liệu cụ thể, và có "Quyết định" nếu phát hiện đó ảnh hưởng đến bước sau.
- [ ] **D3.** Có ít nhất một hình trả lời câu hỏi bằng phép so sánh định lượng (trước / sau xử lý, mô hình A / B, mẫu đúng / sai). Đây là điều kiện để lấy điểm sáng tạo (mục 7.1 của đề).
- [ ] **D4.** Trục và cách cắt dữ liệu có lý do: chỉ cắt ở phân vị 99% khi đuôi thật sự dài; ghi rõ đơn vị đo.
- [ ] **D5.** Bảng thống kê đủ thông tin: có mode khi cần. Mode lệch bất thường so với trung vị có thể là dấu vết của cách thu thập.
- [ ] **D6.** Không có bảng hay cell chỉ in lại đúng nội dung markdown đã có.

## E. Mô hình và đánh giá

- [ ] **E1.** Có mốc cơ sở (đoán lớp đông nhất, naive, seasonal naive), và mọi mô hình được so với mốc này.
- [ ] **E2.** Thước đo phù hợp với dữ liệu: lệch lớp thì dùng F1-macro hoặc PR-AUC; MAPE không ổn định khi giá trị thật gần 0; accuracy chỉ để tham khảo.
- [ ] **E3.** Xử lý lệch lớp chỉ áp dụng trên train (SMOTE nằm trong Pipeline); ngưỡng quyết định chọn bằng validation hoặc kiểm định chéo.
- [ ] **E4.** Có kết quả từng lớp, confusion matrix **và ví dụ bị đoán sai kèm nguyên nhân**.
- [ ] **E5.** Điểm validation và test được đặt cạnh nhau để xem có overfit vào validation không.
- [ ] **E6.** Feature importance hoặc trọng số được đối chiếu với EDA; những chỗ không khớp được nêu ra.
- [ ] **E7.** Phần dự đoán dữ liệu mới đi qua **đúng** pipeline của dữ liệu huấn luyện (cùng một hàm tiền xử lý).

## F. Trình bày

- [ ] **F1.** Không có nội dung thừa: hướng dẫn cách chạy, mô tả hiển nhiên, câu mở đầu không mang thông tin.
- [ ] **F2.** Comment giải thích **vì sao**, không nhắc lại code đang làm gì.
- [ ] **F3.** Code đơn giản, dễ giải thích; ưu tiên hàm phổ biến (ví dụ `df.isna().sum()`); không thêm tham số không cần thiết.
- [ ] **F4.** Câu văn tự nhiên, ngắn; thuật ngữ được giải thích ở lần xuất hiện đầu (NFC, log-odds, kiểm định chéo, ...).
- [ ] **F5.** Ngôn ngữ thống nhất theo quyết định của nhóm (report tiếng Việt; notebook theo ngôn ngữ nhóm đã chốt).

## G. Notebook, report và landing page khớp nhau

- [ ] **G1.** Mọi số trong report và landing page trùng với output của lần chạy notebook cuối: số mẫu, tỷ lệ, metric. Đề cho điểm khi "kết luận khớp bảng metric trong report".
- [ ] **G2.** Tên mô hình, tham số cuối và cách chia dữ liệu được mô tả giống nhau ở cả ba nơi.
- [ ] **G3.** Report có nguồn, giấy phép dữ liệu và trích dẫn bài báo, thư viện chính.
- [ ] **G4.** Landing page có đủ: bài toán, dữ liệu, link notebook (GitHub và Colab), link report, link video; mọi link mở được (`python scripts/check_links.py`).
- [ ] **G5.** Report biên dịch được từ `latex/`; file PDF trong `reports/` là bản mới nhất.

## H. Tiêu chí riêng cho từng loại dữ liệu

### Text
- [ ] Văn bản được chuẩn hóa Unicode (NFC) trước khi đếm.
- [ ] Ghi rõ đơn vị (tiếng hay từ); nếu dùng công cụ tách từ thì nêu độ chính xác và các trường hợp sai trên dữ liệu thật.
- [ ] Bước làm sạch không xóa mất tín hiệu của nhãn (emoji, chữ lặp, review rỗng); nếu có xóa thì đo xem mất bao nhiêu.
- [ ] Có tìm nội dung trùng và nội dung bị gán nhãn mâu thuẫn, kể cả trùng giữa các tập.
- [ ] `min_df`, `ngram_range` có căn cứ từ EDA; vectorizer nằm trong Pipeline.
- [ ] Có phân tích văn bản không dấu, viết tắt, teencode và quyết định cách xử lý.

### Tabular
Yêu cầu bắt buộc của đề: ít nhất 2.000 mẫu, ít nhất 10 cột, có giá trị thiếu, có cột categorical (encoding) và cột numerical (scaling).
- [ ] Từng cột được hỏi: có sẵn tại thời điểm dự đoán không?
- [ ] Giá trị thiếu có ngẫu nhiên không; nếu "thiếu" mang ý nghĩa (ví dụ không đặt qua công ty) thì giữ thành một nhóm riêng.
- [ ] Có so sánh vài cách xử lý thiếu và outlier. Quy tắc IQR không phù hợp với cột đếm có Q1 bằng Q3.
- [ ] Dòng trùng là lỗi nhập liệu hay bản ghi thật (ví dụ đặt phòng theo nhóm)? Loại bỏ làm phân bố nhãn thay đổi bao nhiêu?
- [ ] Chia ngẫu nhiên hay theo thời gian? Dữ liệu trải theo thời gian mà chia ngẫu nhiên có thể cho kết quả quá lạc quan.
- [ ] Encoding và scaling nằm trong Pipeline; ngưỡng quyết định không được chọn trên test.

### Time series
- [ ] Tần suất đều; mốc thời gian trùng được gộp có lý do.
- [ ] Nội suy giờ bị thiếu: nội suy tuyến tính dùng giá trị **tương lai**, nên test chỉ được chấm trên những giờ có giá trị thật, không chấm trên giá trị nội suy.
- [ ] Chia theo thời gian, không xáo trộn; kiểm định chéo dùng `TimeSeriesSplit`.
- [ ] Lag và rolling chỉ dùng quá khứ (`shift(1)` trước `rolling`); biến thời tiết dùng giá trị của giờ trước; ngày lễ là thông tin biết trước nên được dùng.
- [ ] Phân rã chuỗi và ACF dùng để chọn lag nên làm trên phần train.
- [ ] Ghi rõ dự báo trước bao xa (1 giờ hay nhiều giờ); có so với naive và seasonal naive.
- [ ] Giai đoạn test có khác thường so với train không (xu hướng, sự kiện đặc biệt)?

## Ghi chú đợt review ngày 07/11/2026

Những điểm đã biết, nên soi kỹ khi cross-check:

- **Time series:** notebook đầy đủ (có mô hình) và report tiếng Việt đang ở nhánh `time-series`, chưa merge vào main; nhánh này xung đột với main ở `assets/js/data.js`, 4 file HTML và `latex/standalone/timeseries-report.tex`. Cần check bản trên nhánh đó, đặc biệt B2, phần nội suy ở mục H, và ngôn ngữ notebook (đang là tiếng Anh).
- **Tabular:** chia ngẫu nhiên trong khi dữ liệu trải từ 2015 đến 2017; nghi vấn cột `country` có thể được cập nhật lúc check-in; chương LaTeX và `reports/tabular-report.pdf` vẫn bằng tiếng Anh.
- **Text:** chưa chạy thử trên Colab sau lần cập nhật cuối; ở tác vụ 2, tham số được chọn theo kiểm định chéo dù điểm trên dev giảm (mục 7.5), người check nên xem lý do có thuyết phục không.
- **Chung:** cả ba bài chưa có video; chưa có report tổng hợp `DataInsight-report.pdf` để nộp LMS; link GitHub của Phát và Long trong phần thành viên đang để trống.

## Bảng ghi kết quả

| Bài | Người check | Mã tiêu chí | Vị trí (mục / cell / trang) | Mô tả vấn đề | Mức độ | Đề xuất sửa | Trạng thái |
|---|---|---|---|---|---|---|---|
| | | | | | | | |
