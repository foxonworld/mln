# Plan P1 — UX/gameplay learning flow

## Mục tiêu

Làm MLN111 nhập trực tiếp vào flow chơi: mỗi event không chỉ là lựa chọn chỉ số, mà có “mâu thuẫn chính”, có cấu trúc học theo tuần, có intro story để người chơi nhập vai sinh viên T.

## Phạm vi

P1 xử lý các điểm tăng coherence và educational mapping:

1. Thêm “Mâu thuẫn chính” tag cho mỗi event.
2. Thêm semester map: tuần ↔ chủ đề đời sống ↔ chủ đề MLN111.
3. Thêm intro story 20–30 giây.
4. Làm rõ flow học → chơi → phản tư ở mức nhẹ.

## Điều kiện trước khi làm

Nên hoàn tất P0 trước:

- Choice card đã rõ tác động chỉ số.
- Wording đã thống nhất sinh viên/kỳ học.
- “Policy” đã đổi thành “Chiến lược sống sót”.
- Outcome panel đã có headline hậu quả.

## Không làm trong P1

- Không thêm quiz phản tư nhiều mốc.
- Không thêm concept card unlock.
- Không thêm delayed consequence.
- Không thêm hệ thống achievement/endings gallery.

---

## 1. Thêm “Mâu thuẫn chính” tag cho mỗi event

### Vấn đề

Hiện người chơi thấy tình huống đời sống, nhưng chưa luôn thấy khái niệm MLN111 nằm ở đâu.

### Thay đổi cần làm

Mỗi event cần có 1 tag ngắn: “Mâu thuẫn chính: X vs Y”.

### Danh sách tag đề xuất

| Event                   | Mâu thuẫn chính                              |
| ----------------------- | -------------------------------------------- |
| Deadline                | Thành tích vs sức khỏe                       |
| Tài chính               | Tiền bạc vs thời gian                        |
| Internship/cơ hội       | Cơ hội vs năng lực chịu đựng                 |
| Gia đình                | Trách nhiệm cá nhân vs kỳ vọng xã hội        |
| Học vụ                  | Kết quả trước mắt vs phát triển lâu dài      |
| Rớt môn/kết quả xấu     | Thất bại tạm thời vs tái cấu trúc chiến lược |
| Bệnh đột xuất           | Điều kiện khách quan vs kế hoạch chủ quan    |
| Xung đột bạn cùng phòng | Cá nhân vs môi trường sống                   |
| Học bổng/cơ hội bất ngờ | Lợi ích trước mắt vs áp lực dài hạn          |

### Vị trí UI đề xuất

Đặt tag gần tiêu đề event:

“Mâu thuẫn chính: Thành tích vs sức khỏe”

### Tiêu chí đạt

- Tag ngắn, dễ hiểu.
- Không dùng thuật ngữ quá hàn lâm.
- Người chơi đọc được trước khi chọn.

---

## 2. Semester map — tuần ↔ đời sống ↔ MLN111

### Vấn đề

Game tuyến tính 12 tuần, nhưng người chơi chưa biết tuần nào đang học/ứng dụng nội dung MLN111 nào.

### Thay đổi cần làm

Thêm một “semester map” nhẹ, có thể hiện ở:

- Start screen.
- Màn hướng dẫn.
- Timeline tooltip.
- Hoặc một modal “Lộ trình kỳ học”.

### Map đề xuất

| Tuần | Chủ đề đời sống      | Chủ đề MLN111       |
| ---- | -------------------- | ------------------- |
| 1–3  | Deadline + sinh hoạt | Mâu thuẫn           |
| 4    | Chiến lược sống sót  | Lượng–chất          |
| 5–7  | Tiền + quan hệ       | Phủ định biện chứng |
| 8    | Điều chỉnh giữa kỳ   | Thực tiễn–nhận thức |
| 9–12 | Crisis + ending      | Cân bằng động       |

### Cách hiển thị đề xuất

#### Option A — compact map

5 dòng nhỏ ở start screen hoặc how-to-play.

#### Option B — timeline tooltip

Khi hover/click tuần hiện:

- “Tuần 4: Lượng–chất — stress tích lũy có thể đổi thành burnout.”

#### Option C — between-phase banner

Ở mốc tuần 4/8:

- “Bạn bước sang giai đoạn mới: Điều chỉnh giữa kỳ — Thực tiễn–nhận thức.”

### Tiêu chí đạt

- Người chơi thấy game có cấu trúc học.
- Không biến map thành chapter select phức tạp.
- Map không chặn flow chơi.

---

## 3. Intro story 20–30 giây

### Vấn đề

Sinh viên T có premise tốt nhưng chưa đủ “moment nhập vai”.

### Thay đổi cần làm

Thêm intro story ngắn trước khi vào tuần 1, hoặc nằm trong start screen mở rộng.

### Script đề xuất

“Tuần 1. T mở laptop lúc 1:37 sáng. Deadline nhóm chưa xong. Tiền trọ còn 5 ngày. Bạn cùng lớp rủ đi làm thêm. Trong đầu T chỉ có một câu: cố thêm chút nữa chắc ổn.”

Sau đó hiện dòng chốt:

“Không. Mọi thứ vận động bằng mâu thuẫn.”

### Gợi ý pacing

- Text xuất hiện theo 2–3 nhịp.
- Có nút “Bỏ qua”.
- Không quá 30 giây.
- Sau lần đầu có thể không hiện lại, hoặc có toggle xem lại.

### Tiêu chí đạt

- Người chơi hiểu áp lực của T trước khi chọn.
- Intro không dài.
- Tone đời sống, không giảng bài.

---

## 4. Flow học → chơi → phản tư nhẹ

### Vấn đề

Landing/học liệu và game còn tách nhau. P1 cần nối nhẹ mà chưa làm quiz lớn.

### Thay đổi cần làm

Tạo micro-copy ở các điểm chuyển:

#### Trước game

“Bạn đã đọc về mâu thuẫn. Giờ thử sống trong một mâu thuẫn cụ thể: kỳ học của T.”

#### Trong game

“Mâu thuẫn chính tuần này: Thành tích vs sức khỏe.”

#### Sau outcome

“Bạn vừa ưu tiên một mặt của mâu thuẫn. Mặt còn lại không biến mất.”

#### Sau ending

“Run này cho thấy cách bạn xử lý mâu thuẫn xuyên suốt kỳ học.”

### Tiêu chí đạt

- Người chơi thấy học và chơi liên quan.
- Không cần thêm màn lớn.
- Không làm chậm loop.

---

## Thứ tự triển khai đề xuất

1. Xác định tag “Mâu thuẫn chính” cho toàn bộ event.
2. Thêm tag vào UI event.
3. Tạo semester map nội dung 5 giai đoạn.
4. Chọn vị trí map: start/how-to/timeline.
5. Thêm intro story.
6. Thêm micro-copy học → chơi → phản tư.
7. Chơi thử 1 run, kiểm tra nhịp đọc.

---

## Acceptance checklist

- [ ] Mỗi event chính có tag “Mâu thuẫn chính”.
- [ ] Black swan/biến cố cũng có tag phù hợp.
- [ ] Có semester map 5 giai đoạn.
- [ ] Semester map không làm flow rối.
- [ ] Có intro story cho sinh viên T.
- [ ] Intro có thể skip.
- [ ] Micro-copy MLN111 xuất hiện đúng lúc, không dài.
- [ ] Người chơi hiểu tuần hiện tại liên quan chủ đề MLN111 nào.

## Kết quả mong muốn

Sau P1, game không chỉ là quản lý GPA/Mental/Money/Stress. Người chơi thấy rõ: mỗi lựa chọn là một mâu thuẫn đời sống, và MLN111 là cách đọc hành trình đó.
