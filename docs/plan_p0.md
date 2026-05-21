# Plan P0 — UX/gameplay must-have

## Mục tiêu

Làm game rõ hơn ngay ở vòng chơi đầu tiên: người chơi hiểu mục tiêu, hiểu lựa chọn tác động gì, cảm nhận đúng fantasy sinh viên/kỳ học.

## Phạm vi

P0 chỉ xử lý các điểm ảnh hưởng trực tiếp tới UX quyết định:

1. Start screen thêm hook/promise.
2. Choice card hiển thị chỉ số tăng/giảm.
3. Wording thống nhất theo sinh viên/kỳ học.
4. Đổi “policy” thành “Chiến lược sống sót”.
5. Outcome panel thêm headline hậu quả.

## Không làm trong P0

- Không thêm hệ thống quiz mới.
- Không thêm chapter select đầy đủ.
- Không thêm delayed consequence.
- Không đổi core gameplay loop.
- Không mở rộng số lượng event.

---

## 1. Start screen — thêm hook/promise

### Vấn đề

Start screen hiện giới thiệu luật, nhưng thiếu mục tiêu cảm xúc và promise học tập.

### Thay đổi cần làm

Thêm 3 dòng onboarding ngắn, đặt gần phần intro trước nút bắt đầu:

1. “12 tuần để qua kỳ.”
2. “Mỗi quyết định đều có mặt đối lập.”
3. “Không có lựa chọn hoàn hảo — chỉ có cân bằng động.”

### Tiêu chí đạt

- Người chơi hiểu stakes trong 5 giây.
- Không biến start screen thành bài giảng.
- Text ngắn, dễ scan, nổi bật hơn mô tả phụ.

### Gợi ý UI

- Dùng 3 bullet/card nhỏ.
- Có icon đơn giản: lịch, mâu thuẫn, cân bằng.
- Mỗi dòng tối đa 1 câu.

---

## 2. Choice card — hiện impact preview

### Vấn đề

Người chơi cần biết lựa chọn A/B tăng gì, giảm gì trước khi bấm.

### Thay đổi cần làm

Mỗi choice card hiển thị đủ 4 chỉ số:

- GPA
- Mental
- Money
- Stress

### Format đề xuất

Ví dụ:

**Cày xuyên đêm**

- GPA +0.20
- Mental -10
- Money 0
- Stress +15

**Chia deadline + nghỉ ngắn**

- GPA -0.05
- Mental +8
- Money 0
- Stress -8

### Quy ước hiển thị

- Chỉ số tốt: màu xanh.
- Chỉ số xấu: màu đỏ/cam.
- Chỉ số không đổi: màu trung tính.
- Với Stress: tăng là xấu, giảm là tốt.
- Với GPA/Mental/Money: tăng là tốt, giảm là xấu.

### Tiêu chí đạt

- Người chơi không phải đoán hậu quả.
- Mỗi card vẫn gọn, không quá rối.
- Mobile vẫn đọc được.

---

## 3. Wording — thống nhất fantasy sinh viên/kỳ học

### Vấn đề

Một số chữ còn tạo cảm giác game quản trị/chính sách/doanh nghiệp.

### Thay đổi cần làm

Rà toàn bộ UI text liên quan game. Đổi các nhóm từ lệch tone.

### Bảng thay thế

| Tránh dùng   | Dùng thay thế                              |
| ------------ | ------------------------------------------ |
| quý          | tuần                                       |
| điều hành    | xoay xở / sống sót / quản lý lịch học      |
| tập đoàn     | lớp học / kỳ học / đời sống sinh viên      |
| chính sách   | chiến lược / lựa chọn / kế hoạch sống      |
| vĩ mô        | bối cảnh / áp lực / biến cố                |
| doanh nghiệp | trường học / công việc làm thêm / nhóm học |
| ngân sách    | tiền trọ / tiền sinh hoạt                  |

### Tiêu chí đạt

- Người chơi luôn cảm thấy mình là sinh viên T.
- Không có câu nào làm lệch sang corporate/policy sim.
- CTA game rõ, nên dùng “Chơi HUSTLE LOOP” hoặc “Bắt đầu kỳ học”.

---

## 4. Đổi “policy” thành “Chiến lược sống sót”

### Vấn đề

“Policy” nghe vĩ mô, không đúng tone sinh viên.

### Thay đổi cần làm

Đổi label/màn chọn policy thành một trong các tên:

- “Chiến lược sống sót giữa kỳ”
- “Tái cấu trúc lịch sống”
- “Chọn chiến lược 4 tuần tới”

### Nội dung mô tả đề xuất

“Bạn đã đi qua một chặng. Trước khi kỳ học nặng hơn, hãy chọn cách T điều chỉnh lịch sống để chịu được các tuần tiếp theo.”

### Tiêu chí đạt

- Người chơi hiểu đây là điểm nghỉ chiến lược.
- Tone gần đời sống sinh viên.
- Không còn cảm giác chính sách vĩ mô.

---

## 5. Outcome panel — thêm headline hậu quả

### Vấn đề

Delta stat tốt cho hệ thống, nhưng thiếu cảm xúc.

### Thay đổi cần làm

Mỗi outcome cần có 1 headline ngắn trước phần chỉ số.

### Ví dụ headline

- “Bạn cứu deadline, nhưng cơ thể bắt đầu báo động.”
- “Bạn giữ được tiền trọ, nhưng đánh mất một buổi hồi phục.”
- “Bạn nghỉ đúng lúc, GPA giảm nhẹ nhưng tâm trí ổn hơn.”
- “Bạn nắm lấy cơ hội, nhưng lịch sống bắt đầu quá tải.”

### Tiêu chí đạt

- Người chơi hiểu hậu quả bằng cảm xúc trước, số liệu sau.
- Headline không quá dài.
- Mỗi headline phản ánh đúng trade-off.

---

## Thứ tự triển khai đề xuất

1. Rà wording game.
2. Đổi “policy” thành “Chiến lược sống sót”.
3. Thêm hook start screen.
4. Thêm impact preview trên choice card.
5. Thêm headline outcome.
6. Test 1 run 12 tuần trên desktop.
7. Test 1 run trên mobile width nhỏ.

---

## Acceptance checklist

- [ ] Start screen có 3 dòng hook.
- [ ] Choice card hiển thị đủ GPA/Mental/Money/Stress.
- [ ] Stress tăng được đánh dấu xấu, Stress giảm được đánh dấu tốt.
- [ ] Wording game không còn tone corporate/policy/quý/tập đoàn.
- [ ] “Policy” đổi thành “Chiến lược sống sót” hoặc tên tương đương.
- [ ] Outcome panel có headline hậu quả.
- [ ] Một lượt chơi 12 tuần vẫn hoàn tất bình thường.
- [ ] Mobile không vỡ layout choice card.

## Kết quả mong muốn

Sau P0, game phải rõ hơn, đúng tone hơn, dễ chơi hơn. Người chơi biết mình đang chọn gì, mất gì, được gì, và vì sao trải nghiệm này gắn với MLN111.
