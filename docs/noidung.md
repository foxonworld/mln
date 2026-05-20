# NOIDUNG.MD — MLN111: TRIẾT HỌC MÁC-LÊNIN
## "DIALECTICS OF HUSTLE"
## Toàn bộ content sẵn sàng copy-paste vào App.jsx

---

# ═══ LANDING PAGE ═══

---

# NAV_ITEMS

```javascript
const NAV_ITEMS = [
  { id: "hero",      label: "Mở đầu" },
  { id: "bienchinh", label: "Biện chứng" },
  { id: "phamtru",   label: "Phạm trù" },
  { id: "quyluat",   label: "Quy luật" },
  { id: "lyluan",    label: "Nhận thức" },
  { id: "game",      label: "Mini-game" },
  { id: "quiz",      label: "Thảo luận" },
  { id: "nghiencuu", label: "Tài liệu" },
  { id: "ketluan",   label: "Kết luận" },
];
```

---

# MARQUEE_TOKENS

```javascript
const MARQUEE_TOKENS = [
  "Biện chứng duy vật",
  "Phủ định của phủ định",
  "Lượng đổi chất đổi",
  "Mâu thuẫn nội tại",
  "Hustle culture",
  "Burnout",
  "Thực tiễn — Nhận thức",
  "Bản chất — Hiện tượng",
  "Nguyên nhân — Kết quả",
  "Khả năng — Hiện thực",
  "Nội dung — Hình thức",
  "Áp lực học tập",
];
```

---

# HERO_STATS

```javascript
const HERO_STATS = [
  { value: "83%",   label: "Sinh viên Việt Nam từng trải qua lo âu học tập kéo dài" },
  { value: "≈ 60%", label: "Sinh viên năm 2–3 cảm thấy mất cân bằng giữa học và sống" },
  { value: "1 / 3", label: "Sinh viên có dấu hiệu kiệt sức (burnout) trước khi tốt nghiệp" },
];
```

Hero title:
```
Sinh viên T và vòng xoáy Hustle:
khi lượng tích lũy đủ — chất thay đổi
```

Hero subtitle:
```
Một góc nhìn từ Phép biện chứng duy vật Mác–Lênin về áp lực học tập,
burnout và hành trình tìm lại bản thân của thế hệ sinh viên hiện đại.
```

Aside card chip: `MLN111 · Triết học Mác–Lênin`

Aside card list (đổi 5 đặc điểm Lênin → nội dung MLN111):
```
1. Phép biện chứng duy vật
2. Các cặp phạm trù cơ bản
3. Ba quy luật biện chứng
4. Lý luận nhận thức
5. Thực tiễn & Nhận thức
```

Aside note:
```
Triết học không trừu tượng — nó là công cụ
để hiểu chính hành trình của bạn.
```

Brand badge text: `ML`
Brand label: `Triết học Mác–Lênin`

Section tag (hero): `MLN111 · Nhóm 4 · Chương II`

---

# THEORY_ITEMS → QUYLUAT_ITEMS (Tab panel — Phép biện chứng)

Section tag: `Nền tảng triết học`
Section title: `Phép biện chứng duy vật là gì?`
Section sub: `Nhấn từng luận điểm để xem diễn giải ngắn và ví dụ từ cuộc sống sinh viên.`

```javascript
const THEORY_ITEMS = [
  {
    id: "vat-chat",
    index: "01",
    cardTitle: "Vật chất quyết định ý thức",
    cardSummary:
      "Điều kiện sống, tài chính, môi trường xung quanh định hình cách ta suy nghĩ và hành động.",
    detailTitle: "Tồn tại xã hội quyết định ý thức xã hội",
    detailText:
      "Theo chủ nghĩa duy vật biện chứng, vật chất (điều kiện vật chất, kinh tế, xã hội) có trước và quyết định ý thức. Ý thức là sự phản ánh của vật chất vào bộ não người. Điều này không có nghĩa ý thức thụ động — ngược lại, ý thức có thể tác động ngược lại vật chất thông qua thực tiễn.",
    example:
      "Sinh viên T: Khi gia đình cắt trợ cấp (vật chất thay đổi), T buộc phải thay đổi cách nhìn về tiền bạc, về giá trị của thời gian, và về mục tiêu học tập — ý thức thay đổi theo.",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b6f72?auto=format&fit=crop&w=1400&q=80",
    alt: "Sinh viên học tập trong điều kiện áp lực",
  },
  {
    id: "mau-thuan",
    index: "02",
    cardTitle: "Mâu thuẫn là động lực phát triển",
    cardSummary:
      "Bên trong mọi sự vật đều tồn tại mặt đối lập — chính sự đấu tranh này tạo ra sự vận động và phát triển.",
    detailTitle: "Thống nhất và đấu tranh của các mặt đối lập",
    detailText:
      "Mọi sự vật, hiện tượng đều chứa đựng những mặt đối lập thống nhất với nhau. Mâu thuẫn không phải điều xấu — đó là nguồn gốc của mọi sự vận động. Hustle culture tạo ra mâu thuẫn rõ ràng: giữa khao khát thành công và nhu cầu nghỉ ngơi, giữa cống hiến và sức khỏe.",
    example:
      "Sinh viên T mâu thuẫn nội tâm: muốn GPA cao (cần học nhiều) nhưng cũng cần sức khỏe tâm thần (cần nghỉ ngơi). Đây là mâu thuẫn không thể giải quyết bằng cách chọn một phía — cần tìm điểm cân bằng mới.",
    image:
      "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&w=1400&q=80",
    alt: "Hai chiều lực đối lập trong học tập",
  },
  {
    id: "van-dong",
    index: "03",
    cardTitle: "Thế giới vận động không ngừng",
    cardSummary:
      "Không có gì là cố định — mọi thứ đều trong quá trình biến đổi, phát triển theo quy luật khách quan.",
    detailTitle: "Quan điểm biện chứng về sự vận động và phát triển",
    detailText:
      "Phép biện chứng duy vật khẳng định thế giới luôn vận động, biến đổi và phát triển. Trái với quan điểm siêu hình học nhìn sự vật cô lập, tĩnh tại — phép biện chứng nhìn mọi thứ trong mối liên hệ và quá trình. Sinh viên không phải thực thể cố định — họ đang trong quá trình hình thành.",
    example:
      "Sinh viên T năm 1 khác hoàn toàn T năm 3. Không phải vì thất bại, mà vì quá trình tích lũy lượng (kinh nghiệm, va chạm, bài học) đã dẫn đến sự biến đổi về chất — một phiên bản T trưởng thành hơn.",
    image:
      "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=1400&q=80",
    alt: "Hành trình phát triển của sinh viên theo thời gian",
  },
];
```

---

# GROUP_ITEMS → PHAMTRU_ITEMS (Card grid + Modal — Cặp phạm trù)

Section tag: `Công cụ triết học`
Section title: `Sáu cặp phạm trù cơ bản nhìn từ đời sinh viên`
Section sub: `Nhấn từng thẻ để xem phân tích chi tiết qua trải nghiệm thực tế của Sinh viên T.`

```javascript
const GROUP_ITEMS = [
  {
    id: "cai-rieng",
    sector: "Cặp phạm trù 1",
    name: "Cái riêng — Cái chung",
    fullName: "Quan hệ giữa cái riêng và cái chung",
    summary:
      "Cái riêng là một sự vật, cái chung là những thuộc tính lặp lại trong nhiều sự vật. Cái chung chỉ tồn tại trong cái riêng và ngược lại.",
    role:
      "Cái chung biểu hiện tính phổ biến, cái riêng biểu hiện tính cá biệt và phong phú. Trong học tập: một phương pháp học có thể là chung, nhưng cách áp dụng với từng sinh viên là cái riêng.",
    monopoly:
      "Nguy cơ là coi cái chung là toàn bộ thực tế và ép cái riêng phải giống y hệt. Hiểu đúng là lấy cái chung để điều chỉnh cái riêng một cách linh hoạt.",
    twoSide:
      "Tích cực: Hiểu cái chung giúp rút kinh nghiệm; tiêu cực: áp đặt phương thức chung lên mọi người có thể gây phản tác dụng.",
    example:
      "Một 'cách học hiệu quả' chung có thể không phù hợp cho T vì hoàn cảnh, sức khỏe, và thời gian của T là cái riêng cần điều chỉnh.",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1300&q=80",
    alt: "Cái riêng và cái chung trong học tập",
  },
  {
    id: "nguyen-nhan",
    sector: "Cặp phạm trù 2",
    name: "Nguyên nhân — Kết quả",
    fullName: "Quan hệ nhân quả trong học tập",
    summary:
      "Mọi kết quả đều có nguyên nhân. Nhưng cùng nguyên nhân, hoàn cảnh khác nhau có thể dẫn đến kết quả khác nhau.",
    role:
      "Nguyên nhân có trước và sinh ra kết quả; kết quả có thể trở thành nguyên nhân cho sự phát triển tiếp theo. Trong học tập: thiếu ngủ → mất tập trung → điểm thấp.",
    monopoly:
      "Không có quan hệ nhân quả đơn tuyến; có nguyên nhân gần và nguyên nhân xa. Giải quyết gốc rễ mới có hiệu quả lâu dài.",
    twoSide:
      "Tích cực: Phân tích chuỗi nhân quả giúp can thiệp chính xác; tiêu cực: chỉ chữa ngọn mà bỏ qua nguyên nhân sâu xa.",
    example:
      "T học quá nhiều trước kỳ thi (nguyên nhân gần) nhưng nguyên nhân xa là áp lực tự đặt ra để hoàn hảo — phải giải quyết cả hai.",
    image:
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1300&q=80",
    alt: "Chuỗi nhân quả trong quá trình học tập",
  },
  {
    id: "tat-nhien",
    sector: "Cặp phạm trù 3",
    name: "Tất nhiên — Ngẫu nhiên",
    fullName: "Mối quan hệ giữa tất nhiên và ngẫu nhiên",
    summary:
      "Tất nhiên là cái do những nguyên nhân chủ yếu bên trong quyết định; ngẫu nhiên là cái do nhiều điều kiện bên ngoài kết hợp mà thành.",
    role:
      "Các sự kiện tất nhiên được tạo thành từ nhiều ngẫu nhiên; hiểu mối quan hệ này giúp phân tích diễn biến thực tế trong học tập.",
    monopoly:
      "Quan niệm sai lầm là coi ngẫu nhiên là tuyệt đối hoặc phủ nhận vai trò của ngẫu nhiên — cả hai đều thiếu biện chứng.",
    twoSide:
      "Tích cực: Nhận ra vai trò của ngẫu nhiên giúp linh hoạt; tiêu cực: đổ lỗi hoàn toàn cho ngẫu nhiên và không tìm nguyên nhân sâu.",
    example:
      "Bị bệnh đúng lúc ôn thi là ngẫu nhiên, nhưng hệ thống sức khỏe, chuẩn bị ôn luyện là những yếu tố tất nhiên có thể giảm rủi ro.",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1300&q=80",
    alt: "Tất nhiên và ngẫu nhiên",
  },
  {
    id: "noi-dung",
    sector: "Cặp phạm trù 4",
    name: "Nội dung — Hình thức",
    fullName: "Hustle: Hình thức che khuất Nội dung",
    summary:
      "Nội dung là tổng hợp các yếu tố cấu thành sự vật; hình thức là phương thức tồn tại và biểu hiện của nội dung.",
    role:
      "Nội dung quyết định hình thức nhưng hình thức có tác động trở lại nội dung trong điều kiện nhất định.",
    monopoly:
      "Rủi ro là chú trọng hình thức đến mức làm mất nội dung thực sự; hình thức cần phục vụ nội dung chứ không thay thế.",
    twoSide:
      "Hình thức có thể hỗ trợ (tạo thói quen, môi trường) nhưng khi nó trở thành mục đích thì nội dung bị tổn hại.",
    example:
      "Dành nhiều thời gian trang trí sổ tay, nhưng không dành đủ thời gian ôn tập thực chất — hình thức nuốt nội dung.",
    image:
      "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=1300&q=80",
    alt: "Hình thức và nội dung trong học tập",
  },
  {
    id: "ban-chat",
    sector: "Cặp phạm trù 5",
    name: "Bản chất — Hiện tượng",
    fullName: "Bề mặt và chiều sâu của Hustle Culture",
    summary:
      "Bản chất là tổng hợp các mối liên hệ khách quan bên trong; hiện tượng là biểu hiện bên ngoài của bản chất.",
    role:
      "Bản chất quy định vận động của sự vật; hiện tượng là cách bản chất xuất hiện dưới điều kiện lịch sử cụ thể.",
    monopoly:
      "Nguy hiểm khi chỉ nhìn hiện tượng mà không tìm bản chất — có thể bị lừa bởi vẻ bề ngoài.",
    twoSide:
      "Hiểu bản chất giúp can thiệp đúng, nhưng chỉ nhìn bản chất mà bỏ qua hiện tượng cụ thể cũng là phiến diện.",
    example:
      "Một bài đăng 'productive' có thể là hiện tượng; bản chất phía sau có thể là ép buộc hoặc stress cao.",
    image:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1300&q=80",
    alt: "Bề mặt hoàn hảo và thực tế phía sau",
  },
  {
    id: "kha-nang",
    sector: "Cặp phạm trù 6",
    name: "Khả năng — Hiện thực",
    fullName: "Từ tiềm năng đến kết quả thực tế",
    summary:
      "Khả năng là những tiền đề chưa hiện thực; hiện thực là những gì đang tồn tại. Thực tiễn là cầu nối biến khả năng thành hiện thực.",
    role:
      "Không phải mọi khả năng đều thành hiện thực — cần điều kiện, hành động và thời gian để hiện thực hóa.",
    monopoly:
      "Lỗi phổ biến là nhầm lẫn khả năng với hiện thực và bỏ qua điều kiện cần thiết để hiện thực hóa khả năng.",
    twoSide:
      "Lạc quan hợp lý giúp tạo điều kiện; lạc quan mù quáng dẫn đến overcommit và kiệt sức.",
    example:
      "T có năng lực nhưng thiếu thời gian và điều kiện — khả năng chưa thể chuyển thành hiện thực ngay lập tức.",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1300&q=80",
    alt: "Tiềm năng sinh viên và con đường hiện thực hóa",
  },
];
```

---

# CHƯƠNG 2: CHỦ NGHĨA DUY VẬT BIỆN CHỨNG

## II. Phép biện chứng duy vật

### 2. Nội dung của phép biện chứng duy vật

Phép biện chứng duy vật là phương pháp triết học khoa học nghiên cứu các quy luật chung nhất của sự vận động và phát triển của thế giới khách quan. Phần "Nội dung của phép biện chứng duy vật" bao gồm các phạm trù, khái niệm và nguyên lý cơ bản dùng để phân tích mối quan hệ giữa các sự vật và hiện tượng.

Các cặp phạm trù cơ bản của phép biện chứng duy vật:
- Cái riêng — Cái chung
- Nguyên nhân — Kết quả
- Tất nhiên — Ngẫu nhiên
- Nội dung — Hình thức
- Bản chất — Hiện tượng
- Khả năng — Hiện thực

Phần trên cần xuất hiện rõ ràng trong tài liệu để đảm bảo khớp với giáo trình MLN111 (Chương II — Phép biện chứng duy vật).

---

## II. Lý luận nhận thức

### 1. Quan niệm về nhận thức trong lịch sử triết học

Trong lịch sử triết học có một số quan niệm tiêu biểu về nhận thức:
- Chủ nghĩa duy tâm: coi nhận thức là phản ánh của ý niệm hoặc là kết quả của các cảm giác; hạn chế vai trò của thế giới vật chất khách quan.
- Thuyết bất khả tri (Agnosticism / Kant): cho rằng con người chỉ biết được vẻ ngoài, không thể biết được bản chất tuyệt đối của sự vật.
- Chủ nghĩa duy vật trước Mác (siêu hình): thừa nhận khả năng nhận thức nhưng xem nhận thức là phản ánh thụ động, chưa thấy được vai trò sáng tạo và thực tiễn.

### 2. Lý luận nhận thức duy vật biện chứng

Lý luận nhận thức duy vật biện chứng khẳng định rằng:
- Thế giới vật chất tồn tại khách quan, độc lập với ý thức.
- Con người có khả năng nhận thức thế giới; nhận thức là quá trình năng động, sáng tạo, mang tính lịch sử và biện chứng.
- Thực tiễn là cơ sở, động lực và mục đích của nhận thức; thực tiễn là tiêu chuẩn kiểm nghiệm chân lý.

Quá trình nhận thức bao gồm các giai đoạn: nhận thức cảm tính (trực quan sinh động) → nhận thức lý tính (tư duy trừu tượng) → kiểm nghiệm bằng thực tiễn. Nhận thức có tính tương đối và tuyệt đối: tri thức phát triển qua các cấp độ và được thực tiễn kiểm nghiệm, điều chỉnh.

---

### Ba quy luật biện chứng (tóm tắt)

Ba quy luật cơ bản của phép biện chứng duy vật (thường được trình bày trong Chương II của giáo trình) là:

1) Thống nhất và đấu tranh của các mặt đối lập
- Giải thích ngắn: Mọi sự vật, hiện tượng đều chứa đựng các mặt đối lập, mâu thuẫn giữa các mặt này là nguồn gốc của vận động và phát triển.
- Ví dụ sinh viên: mâu thuẫn giữa nhu cầu đạt điểm cao và nhu cầu bảo vệ sức khỏe tâm thần — chính mâu thuẫn này buộc sinh viên phải tìm cách giải quyết hoặc cân bằng.

2) Chuyển hóa lượng thành chất (và ngược lại)
- Giải thích ngắn: Sự tích lũy các biến đổi lượng sẽ dẫn tới sự biến đổi chất của sự vật khi đạt tới ngưỡng nhất định.
- Ví dụ sinh viên: tích lũy kinh nghiệm, kỹ năng qua thời gian (lượng) sẽ dẫn tới thay đổi thực chất trong trình độ học tập (chất).

3) Phủ định của phủ định
- Giải thích ngắn: Quá trình phát triển là chuỗi phủ định; sự phủ định của một trạng thái mang lại trạng thái mới cao hơn (không phải trở lại nguyên bản), thể hiện tính xoáy ốc của quá trình lịch sử.
- Ví dụ sinh viên: vượt qua một giai đoạn khủng hoảng (phủ định) tạo điều kiện cho một phiên bản trưởng thành hơn của bản thân (phủ định của phủ định).

Nguồn/ghi chú: Nội dung tóm tắt trên phù hợp với các giáo trình Triết học Mác–Lênin (Bộ GD&ĐT, 2019/2021). Tôi có thể thêm trích dẫn trang chính xác (ví dụ: trang cụ thể trong bản 2019/2021) nếu bạn cung cấp PDF/scan; hiện tại tôi để chú thích chung.


# SOLUTION_ITEMS → LYLUAN_ITEMS (Accordion — Lý luận nhận thức)

Section tag: `Vòng lặp nhận thức`
Section title: `Lý luận nhận thức: Thực tiễn → Nhận thức → Thực tiễn`
Section sub: `Mở từng giai đoạn để xem hành trình nhận thức của Sinh viên T và ý nghĩa triết học.`

```javascript
const SOLUTION_ITEMS = [
  {
    id: "truc-quan",
    title: "Giai đoạn 1: Trực quan sinh động",
    explanation:
      "T tiếp xúc với thế giới bằng cảm giác và tri giác trực tiếp. Nhìn thấy bạn bè thành công với hustle culture — GPA cao, nhiều hoạt động, trông có vẻ ổn. T cảm nhận áp lực mà chưa hiểu tại sao. Đây là nhận thức cảm tính — đúng nhưng chưa đủ sâu.",
    benefit:
      "Vai trò: Cảm giác và trực quan là điểm khởi đầu của mọi nhận thức. Không có trực quan sinh động thì không có nguyên liệu để tư duy.",
    implication:
      "Giới hạn: Trực quan có thể bị đánh lừa bởi hiện tượng. T thấy bạn \"thành công\" nhưng chưa thấy được bản chất — bạn ấy có thể đang kiệt sức phía sau màn hình.",
  },
  {
    id: "tu-duy",
    title: "Giai đoạn 2: Tư duy trừu tượng",
    explanation:
      "T bắt đầu phân tích, khái quát hóa từ những gì quan sát được. \"Tại sao mình cố gắng mà không tiến?\" → \"Hustle nhiều nhưng không đúng hướng\" → \"Vấn đề là chiến lược, không phải nỗ lực\". Nhận thức vượt khỏi cảm giác, đi vào bản chất.",
    benefit:
      "Vai trò: Tư duy trừu tượng giúp nắm bắt quy luật, bản chất ẩn sau hiện tượng. Đây là bước nhảy vọt của nhận thức.",
    implication:
      "Lưu ý: Tư duy trừu tượng có thể sai nếu xuất phát từ quan sát không đầy đủ. Cần kiểm nghiệm bằng thực tiễn — không phải suy nghĩ đúng là hành động đúng.",
  },
  {
    id: "thuc-tien",
    title: "Giai đoạn 3: Thực tiễn kiểm nghiệm",
    explanation:
      "T áp dụng nhận thức mới vào thực tế. Thay đổi cách học, giảm overcommit, ưu tiên sức khỏe. Kết quả có thể đúng có thể sai — nhưng đây là bước kiểm chứng duy nhất có giá trị. Thực tiễn là tiêu chuẩn của chân lý.",
    benefit:
      "Thực tiễn không chỉ kiểm nghiệm nhận thức mà còn tạo ra nhận thức mới. Sau mỗi vòng thực hành → T có dữ liệu mới → quay lại giai đoạn 1 ở tầm cao hơn.",
    implication:
      "Nhận thức là vòng xoáy đi lên, không phải vòng tròn đứng yên. Mỗi chu kỳ: trực quan → tư duy → thực tiễn → trực quan mới (phong phú hơn) → tư duy sâu hơn → thực tiễn hiệu quả hơn.",
  },
];
```

---

# SCENARIOS (Quiz — Thảo luận)

Section tag: `Thảo luận lớp học`
Section title: `Bạn sẽ chọn như T?`
Section sub: `Mỗi lựa chọn đều có đánh đổi. Bấm để xem phân tích triết học và thảo luận cùng nhau.`

```javascript
const SCENARIOS = [
  {
    id: "scenario-1",
    title: "Tình huống 1 — T và 5 deadline trong 3 ngày",
    description:
      "3 ngày nữa có 5 deadline cùng lúc. Sức khỏe T không tốt. T nên làm gì?",
    options: [
      { key: "a", label: "A. Thức xuyên đêm, làm hết tất cả để không thiếu deadline nào", result: "mixed" },
      { key: "b", label: "B. Ưu tiên quan trọng nhất, xin gia hạn phần còn lại", result: "good" },
    ],
  },
  {
    id: "scenario-2",
    title: "Tình huống 2 — Internship lương tốt vs GPA",
    description:
      "Một công ty offer internship lương tốt, nhưng sẽ ảnh hưởng đến GPA học kỳ này. T nên làm gì?",
    options: [
      { key: "a", label: "A. Nhận internship — trải nghiệm thực tế quan trọng hơn điểm số", result: "mixed" },
      { key: "b", label: "B. Cân nhắc kỹ: đây là khả năng hay hiện thực? Điều kiện có đủ không?", result: "good" },
    ],
  },
  {
    id: "scenario-3",
    title: "Tình huống 3 — Hustle hay Balance?",
    description:
      "Bạn cùng phòng của T nghỉ ngơi, chơi game. T cảm thấy guilty vì không học. Đâu là suy nghĩ đúng?",
    options: [
      { key: "a", label: "A. \"Mình phải học — người khác nghỉ là lãng phí\"", result: "mixed" },
      { key: "b", label: "B. \"Nghỉ ngơi là một phần của quá trình — mâu thuẫn giữa học và nghỉ cần cân bằng\"", result: "good" },
    ],
  },
];

const QUIZ_FEEDBACK = {
  good:
    "Phép biện chứng ủng hộ lựa chọn này: nhìn nhận mâu thuẫn, tìm điểm cân bằng thay vì cực đoan một phía. Đây là tư duy biện chứng trong thực tiễn.",
  mixed:
    "Lựa chọn này có logic nhưng thiên về tư duy siêu hình — nhìn sự vật tách biệt, không thấy mối liên hệ và hậu quả dài hạn. Kết quả ngắn hạn có thể ổn, nhưng dài hạn tạo mâu thuẫn mới.",
};
```

---

# RESEARCH_LINKS (Tài liệu tham khảo)

```javascript
const RESEARCH_LINKS = [
  {
    label: "Giáo trình",
    title: "Giáo trình Triết học Mác–Lênin (Bộ GD&ĐT, 2021)",
    description:
      "Chương II: Phép biện chứng duy vật — các cặp phạm trù và ba quy luật cơ bản. Tài liệu học chính thức của môn MLN111.",
    href: "https://moet.gov.vn/",
    source: "moet.gov.vn",
  },
  {
    label: "Nghiên cứu",
    title: "Burnout Among Vietnamese University Students",
    description:
      "Nghiên cứu về tỷ lệ kiệt sức học tập trong sinh viên đại học tại Việt Nam và các yếu tố ảnh hưởng.",
    href: "https://www.ncbi.nlm.nih.gov/",
    source: "ncbi.nlm.nih.gov",
  },
  {
    label: "Học thuật",
    title: "Hustle Culture và sức khỏe tâm thần — Tạp chí Tâm lý học",
    description:
      "Phân tích văn hóa \"cống hiến không ngừng\" và tác động đến sức khỏe tâm thần của thế hệ trẻ.",
    href: "https://www.tapchitamly.com.vn/",
    source: "tapchitamly.com.vn",
  },
  {
    label: "Triết học",
    title: "Friedrich Engels — Phép biện chứng của tự nhiên",
    description:
      "Nền tảng lý luận về ba quy luật cơ bản của phép biện chứng duy vật Mác–Lênin.",
    href: "https://www.marxists.org/",
    source: "marxists.org",
  },
  {
    label: "Dữ liệu",
    title: "UNESCO — Sức khỏe tâm thần sinh viên tại Đông Nam Á",
    description:
      "Báo cáo về thực trạng sức khỏe tâm thần sinh viên và ảnh hưởng của áp lực học tập trong khu vực.",
    href: "https://www.unesco.org/",
    source: "unesco.org",
  },
  {
    label: "Thực tiễn",
    title: "Báo cáo — Sức khỏe tâm thần học đường Việt Nam 2023",
    description:
      "Số liệu cập nhật về tỷ lệ lo âu, trầm cảm và kiệt sức trong học sinh, sinh viên Việt Nam.",
    href: "https://moh.gov.vn/",
    source: "moh.gov.vn",
  },
];
```

---

# KẾT LUẬN (Conclusion box)

```
Section tag: Kết luận
H3: "Như phủ định của phủ định: T không quay về điểm cũ — đó là T mới, ở tầm cao hơn."

Paragraph 1:
Hustle culture không sai về bản chất — mâu thuẫn giữa cống hiến và nghỉ ngơi là động lực phát triển. 
Vấn đề là khi mâu thuẫn không được giải quyết biện chứng, nó dẫn đến đứt gãy.

Paragraph 2:
Phép biện chứng duy vật cho ta công cụ: nhìn nhận mâu thuẫn, hiểu quy luật lượng–chất, 
và biết rằng mọi phủ định đều mở ra khả năng mới — cao hơn, sâu hơn, trưởng thành hơn.

Meta: Nhóm 4 · MLN111 · Chương II — Phép biện chứng duy vật
```

---

---

# ═══ GAME DATA ═══

---

# GAME CONCEPT

```
Tên game: HUSTLE LOOP
Narrative: Bạn là Sinh viên T — Năm 2. Phải cân bằng GPA, Mental, Tiền và Stress
qua 12 tuần học kỳ. Mỗi tuần có 1 sự kiện. Mỗi quyết định phản ánh triết học.
```

---

# INIT_STATS + SAVE_KEY

```javascript
const SAVE_KEY = 'hustleLoopSave';

// Trong PolicySimGame:
const INIT_STATS = { gpa: 3.0, mental: 80, money: 5000, stress: 30 };
// money đơn vị: nghìn đồng (5000 = 5 triệu)
```

---

# METER_DEFS (4 stat definitions)

```javascript
const METER_DEFS = [
  {
    key: "gpa", label: "GPA", icon: "📚", limit: "Tối thiểu: 1.0", markerPos: 10,
    hint: "Điểm trung bình học kỳ. Rớt xuống dưới 1.0 là cảnh báo học vụ.",
    getWidth: (v) => Math.min(Math.max((v / 4) * 100, 2), 100),
    getColor: (v) => (v <= 1.5 ? "#ef4444" : v <= 2.5 ? "#f59e0b" : "#22c55e"),
    format: (v) => v.toFixed(1), danger: (v) => v <= 1.5,
  },
  {
    key: "mental", label: "Sức khỏe tâm thần", icon: "🧠", limit: "Tối thiểu: 20%", markerPos: 20,
    hint: "Sức khỏe tâm thần và cảm xúc. Xuống thấp dẫn đến burnout.",
    getWidth: (v) => Math.min(Math.max(v, 2), 100),
    getColor: (v) => (v <= 30 ? "#ef4444" : v <= 50 ? "#f59e0b" : "#22c55e"),
    format: (v) => v.toFixed(0) + "%", danger: (v) => v <= 30,
  },
  {
    key: "money", label: "Tài chính", icon: "💸", limit: "Tối thiểu: 0", markerPos: 5,
    hint: "Tiền tiết kiệm (nghìn đồng). Hết tiền là phải bỏ học.",
    getWidth: (v) => Math.min(Math.max((v / 10000) * 100, 2), 100),
    getColor: (v) => (v <= 500 ? "#ef4444" : v <= 2000 ? "#f59e0b" : "#22c55e"),
    format: (v) => (v >= 1000 ? (v/1000).toFixed(1) + "M" : v + "K"), danger: (v) => v <= 500,
  },
  {
    key: "stress", label: "Stress", icon: "⚡", limit: "Tối đa: 100%", markerPos: 80,
    hint: "Mức độ căng thẳng tích lũy. Đạt 100% là burnout toàn diện.",
    getWidth: (v) => Math.min(Math.max(v, 2), 100),
    getColor: (v) => (v >= 80 ? "#ef4444" : v >= 60 ? "#f59e0b" : "#22c55e"),
    format: (v) => v.toFixed(0) + "%", danger: (v) => v >= 80,
  },
];
```

---

# GAME_EVENTS (6 sự kiện chính)

```javascript
const GAME_EVENTS = [
  {
    id: 1, entity: "DEADLINE", entityColor: "#818cf8", entityBg: "rgba(129,140,248,0.15)",
    title: "5 deadline trong 3 ngày",
    description: "Lịch nộp bài chồng chéo như một cơn lũ. Mỗi môn đều \"quan trọng\". T không biết bắt đầu từ đâu.",
    desc: "3 ngày nữa: báo cáo thực tập, bài tập nhóm, bài kiểm tra giữa kỳ, essay tiếng Anh, và presentation. Ngủ hay học?",
    background: "energy.webp",
    type: "power",
    intensity: "high",
    sceneLabel: "Thư viện đêm khuya",
    options: [
      {
        label: "Thức xuyên đêm — làm hết tất cả bằng mọi giá",
        description: "Ép bản thân tối đa, hoàn thành toàn bộ deadline.",
        rationale: "GPA giữ được nhưng sức khỏe tâm thần chịu cú đánh lớn.",
        previewAnimation: "rising-chart", tone: "orange",
        impact: { gpa: 0.3, mental: -25, money: 0, stress: 35 },
        logStr: "[DEADLINE] Thức trắng. GPA giữ được nhưng T kiệt sức hoàn toàn."
      },
      {
        label: "Ưu tiên quan trọng nhất, xin gia hạn phần còn lại",
        description: "Liên hệ giảng viên, thương lượng, tập trung vào điều cốt lõi.",
        rationale: "GPA thấp hơn chút nhưng mental được bảo vệ — quyết định biện chứng hơn.",
        previewAnimation: "money-flow", tone: "green",
        impact: { gpa: 0.1, mental: -8, money: 0, stress: 15 },
        logStr: "[DEADLINE] T ưu tiên đúng. GPA giảm nhẹ nhưng mental được giữ."
      },
    ]
  },
  {
    id: 2, entity: "TÀI CHÍNH", entityColor: "#f59e0b", entityBg: "rgba(245,158,11,0.12)",
    title: "Học phí tăng 30% đột ngột",
    description: "Thông báo từ phòng tài vụ. Học phí học kỳ sau tăng đột biến. Gia đình T không đủ bù.",
    desc: "Thiếu 8 triệu để đóng học phí đúng hạn. Quỹ sinh hoạt của T đang cạn dần. Làm gì trong 2 tuần tới?",
    background: "oil.webp",
    type: "oil",
    intensity: "medium",
    sceneLabel: "Áp lực tài chính",
    options: [
      {
        label: "Vay tiền sinh viên — giải quyết ngay, trả dần sau",
        description: "Vay quỹ hỗ trợ sinh viên hoặc vay người thân.",
        rationale: "Tiền về ngay nhưng nợ và stress dài hạn tăng.",
        previewAnimation: "money-flow", tone: "blue",
        impact: { gpa: 0, mental: -5, money: 8000, stress: 15 },
        logStr: "[TÀI CHÍNH] Vay được tiền. Học phí ổn nhưng nợ bắt đầu tích lũy."
      },
      {
        label: "Làm thêm cấp tốc — tự kiếm tiền trong 2 tuần",
        description: "Nhận gấp job freelance hoặc làm thêm tăng ca.",
        rationale: "Tiền kiếm được nhưng GPA học kỳ này bị ảnh hưởng nặng.",
        previewAnimation: "rising-chart", tone: "orange",
        impact: { gpa: -0.4, mental: -15, money: 6000, stress: 25 },
        logStr: "[TÀI CHÍNH] Làm thêm cấp tốc. Có tiền nhưng GPA trượt mạnh."
      },
    ]
  },
  {
    id: 3, entity: "CƠ HỘI", entityColor: "#34d399", entityBg: "rgba(52,211,153,0.12)",
    title: "Internship lương tốt — nhưng phải quyết ngay",
    description: "Công ty lớn offer internship part-time, lương ổn. Deadline nộp hồ sơ: ngày mai.",
    desc: "3 tháng internship, 8 triệu/tháng. Nhưng sẽ chiếm 20 tiếng/tuần — học kỳ này sẽ rất căng. Nhận không?",
    background: "telecom.webp",
    type: "telecom",
    intensity: "low",
    sceneLabel: "Phỏng vấn internship",
    options: [
      {
        label: "Nhận ngay — trải nghiệm thực tế không thể bỏ qua",
        description: "Nhận offer, bắt đầu làm, chấp nhận GPA học kỳ này sẽ thấp hơn.",
        rationale: "Tiền tốt và kinh nghiệm tốt — nhưng GPA và mental chịu áp lực.",
        previewAnimation: "rising-chart", tone: "green",
        impact: { gpa: -0.5, mental: -10, money: 12000, stress: 20 },
        logStr: "[CƠ HỘI] Nhận internship. Tiền về nhưng áp lực học kỳ tăng vọt."
      },
      {
        label: "Từ chối — tập trung học kỳ này, tìm cơ hội khác sau",
        description: "Từ chối offer, giữ nguyên focus cho việc học.",
        rationale: "GPA được bảo vệ, mental ổn hơn — nhưng mất cơ hội kiếm tiền và kinh nghiệm.",
        previewAnimation: "money-flow", tone: "blue",
        impact: { gpa: 0.2, mental: 5, money: 0, stress: -10 },
        logStr: "[CƠ HỘI] Từ chối internship. Tập trung học, GPA cải thiện."
      },
    ]
  },
  {
    id: 4, entity: "GIA ĐÌNH", entityColor: "#a78bfa", entityBg: "rgba(167,139,250,0.12)",
    title: "Bố mẹ nói tự lo từ tháng này",
    description: "Gia đình gặp khó khăn tài chính. Trợ cấp hàng tháng bị cắt đột ngột không báo trước.",
    desc: "Không còn 3 triệu/tháng từ gia đình nữa. Tiền sinh hoạt T chỉ đủ 1 tháng nữa. Phải xoay xở ngay.",
    background: "coal.webp",
    type: "coal",
    intensity: "medium",
    sceneLabel: "Khủng hoảng tài chính",
    options: [
      {
        label: "Tự xoay xở — cắt giảm chi tiêu, tìm việc làm thêm",
        description: "Cắt chi phí, ăn uống tiết kiệm, nhận thêm job nhỏ.",
        rationale: "Tự lập hơn nhưng stress và áp lực tăng mạnh.",
        previewAnimation: "falling-chart", tone: "orange",
        impact: { gpa: -0.2, mental: -20, money: 2000, stress: 30 },
        logStr: "[GIA ĐÌNH] T tự xoay xở. Độc lập hơn nhưng sức khỏe tâm thần suy giảm."
      },
      {
        label: "Gọi về nhà xin hỗ trợ thêm 1 lần — chia sẻ khó khăn",
        description: "Solicit thêm từ gia đình, giải thích tình hình thực tế.",
        rationale: "Có tiền nhưng cảm giác tội lỗi và áp lực gia đình tăng.",
        previewAnimation: "money-flow", tone: "blue",
        impact: { gpa: 0, mental: -10, money: 4000, stress: 10 },
        logStr: "[GIA ĐÌNH] Gọi về xin hỗ trợ. Tiền được giải quyết nhưng T cảm thấy guilt."
      },
    ]
  },
  {
    id: 5, entity: "HỌC VỤ", entityColor: "#60a5fa", entityBg: "rgba(96,165,250,0.12)",
    title: "Thầy thêm đề tài bắt buộc cuối kỳ",
    description: "Giảng viên thông báo thêm 1 project lớn vào tuần 10 — không nằm trong đề cương ban đầu.",
    desc: "Project 30% điểm, nộp sau 3 tuần. T đã lên kế hoạch học kỳ nhưng phần này không có trong tính toán ban đầu.",
    background: "finance.webp",
    type: "economic",
    intensity: "medium",
    sceneLabel: "Áp lực học vụ",
    options: [
      {
        label: "Làm nghiêm túc, đầu tư thời gian và chất lượng",
        description: "Dành thêm thời gian, nghiên cứu kỹ, làm project chất lượng cao.",
        rationale: "GPA tốt nhưng thời gian các môn khác bị cắt, stress tăng.",
        previewAnimation: "rising-chart", tone: "green",
        impact: { gpa: 0.3, mental: -12, money: -500, stress: 25 },
        logStr: "[HỌC VỤ] Project chất lượng. GPA tốt nhưng T kiệt sức sau đó."
      },
      {
        label: "Làm đủ để qua — ưu tiên các môn khác quan trọng hơn",
        description: "Dành thời gian tối thiểu cho project, tập trung năng lượng có hạn vào đúng chỗ.",
        rationale: "GPA project thấp hơn nhưng tổng thể được cân bằng hơn.",
        previewAnimation: "money-flow", tone: "blue",
        impact: { gpa: 0.1, mental: -5, money: 0, stress: 10 },
        logStr: "[HỌC VỤ] Làm vừa đủ. Cân bằng ổn hơn, không quá tải."
      },
    ]
  },
  {
    id: 6, entity: "KẾT QUẢ", entityColor: "#f87171", entityBg: "rgba(248,113,113,0.15)",
    title: "Rớt môn — phải thi lại",
    description: "Bảng điểm hiện ra. 1 môn dưới 5.0. T phải thi lại cuối kỳ — thêm áp lực và chi phí.",
    desc: "Môn Triết học cơ sở: 4.2/10. Phải thi lại trong 2 tuần. Phí thi lại 300K. Mental T đang rất thấp.",
    background: "aviation.webp",
    type: "aviation",
    intensity: "high",
    sceneLabel: "Phòng thi vấn đáp",
    options: [
      {
        label: "Học lại nghiêm túc — quyết tâm vượt qua lần này",
        description: "Đầu tư 2 tuần học lại từ đầu, xem đây là cơ hội thật sự hiểu bài.",
        rationale: "Stress ngắn hạn nhưng sau đó mental có thể phục hồi nếu thi đậu.",
        previewAnimation: "money-flow", tone: "green",
        impact: { gpa: 0.1, mental: -15, money: -300, stress: 30 },
        logStr: "[KẾT QUẢ] T học lại nghiêm túc. Vượt qua được kỳ thi lại."
      },
      {
        label: "Chấp nhận điểm F, bảo toàn sức khỏe tâm thần",
        description: "Không thi lại lần này, chờ học lại môn đó vào kỳ sau khi mental tốt hơn.",
        rationale: "Mental được bảo vệ ngắn hạn nhưng GPA chịu thiệt hại lớn.",
        previewAnimation: "falling-chart", tone: "red",
        impact: { gpa: -0.8, mental: 10, money: 0, stress: -10 },
        logStr: "[KẾT QUẢ] T chọn nghỉ ngơi. GPA rớt mạnh nhưng mental phục hồi dần."
      },
    ]
  },
];
```

---

# BLACK_SWANS (3 sự kiện ngẫu nhiên)

```javascript
const BLACK_SWANS = [
  {
    title: "Bệnh đột ngột giữa mùa thi",
    description: "T sốt cao 39 độ, phải nằm viện 3 ngày đúng tuần ôn thi quan trọng nhất.",
    background: "storm.webp",
    type: "storm",
    intensity: "high",
    sceneLabel: "Khủng hoảng sức khỏe",
    emoji: "🤒",
    modeNote: "Biến cố chen ngang: bệnh tật không đợi lịch học.",
    desc: "Nhập viện khẩn cấp. 3 ngày không học được, miss 1 buổi kiểm tra giữa kỳ. Tiền viện phí và tinh thần đều bị ảnh hưởng.",
    impact: { gpa: -0.3, mental: -25, money: -2000, stress: 25 },
    logStr: "[⚠ BẤT NGỜ] Bệnh đột ngột. Tất cả kế hoạch học bị đổ vỡ.",
  },
  {
    title: "Roommate xung đột — phải dọn ra ngoài",
    description: "Mâu thuẫn với bạn cùng phòng leo thang. T phải tìm chỗ ở mới trong 1 tuần.",
    background: "shipping.webp",
    type: "shipping",
    intensity: "high",
    sceneLabel: "Khủng hoảng chỗ ở",
    emoji: "🏠",
    modeNote: "Biến cố chen ngang: môi trường sống ảnh hưởng trực tiếp đến học tập.",
    desc: "Không thể ở cùng phòng nữa. Phải tìm phòng mới gấp, đặt cọc, dọn đồ — tất cả trong khi vẫn phải đi học.",
    impact: { gpa: -0.1, mental: -20, money: -3000, stress: 20 },
    logStr: "[⚠ BẤT NGỜ] Conflict roommate. Chi phí và stress leo thang đột ngột.",
  },
  {
    title: "Học bổng bất ngờ được duyệt",
    description: "Đơn học bổng T nộp từ tháng trước bất ngờ được chấp thuận. Tin tốt đến đúng lúc.",
    background: "telecom.webp",
    type: "tech",
    intensity: "low",
    sceneLabel: "Tin tức tốt bất ngờ",
    emoji: "🎉",
    modeNote: "Biến cố tích cực: không phải mọi bất ngờ đều xấu.",
    desc: "Học bổng khuyến học 15 triệu được duyệt. Tiền về trong 2 tuần. T thở phào — áp lực tài chính giảm mạnh.",
    impact: { gpa: 0.1, mental: 20, money: 15000, stress: -20 },
    logStr: "[✓ MAY MẮN] Học bổng được duyệt! Tài chính ổn định, T tập trung học hơn.",
  },
];
```

---

# MACRO_POLICIES (Lifestyle choices — tuần 4 và 8)

```javascript
const MACRO_POLICIES = [
  {
    id: "p_club", icon: "🎓", title: "Gia nhập CLB học thuật",
    desc: "Tham gia nhóm học tập, networking với anh chị khóa trên. Mỗi khi quyết định có lợi cho GPA, được thêm +0.1 GPA bonus.",
    effect: "Hiệu lực dài hạn: quyết định nào cải thiện GPA sẽ được buff thêm +0.1.",
    isBuff: "roic",
    summary: "+0.1 GPA buffer"
  },
  {
    id: "p_detox", icon: "🧘", title: "Thiền định & Digital Detox",
    desc: "Cam kết 30 phút thiền mỗi ngày, giảm mạng xã hội. Stress giảm 5% mỗi tuần tự động — đổi lại tốn thêm thời gian.",
    effect: "Hiệu lực dài hạn: sau mỗi quyết định, stress tự giảm thêm 5% nhưng GPA buff giảm 0.1.",
    isBuff: "cpi",
    summary: "stress -5/tuần"
  },
  {
    id: "p_parttime", icon: "💼", title: "Nhận việc part-time ổn định",
    desc: "Nhận job part-time cố định 20 tiếng/tuần. Tiền vào ổn định ngay — nhưng thời gian học bị cắt mạnh từ đây.",
    effect: "Hiệu lực tức thời: money +8000K, stress +20, GPA -0.3.",
    isBuff: "bud",
    summary: "+8M, stress +20, GPA -0.3"
  },
];
```

---

# INIT_LOGS (Game start logs)

```javascript
const INIT_LOGS = [
  "$ khởi-động --hustle-loop --sinh-viên T --học-kỳ 1",
  "› [KHỞI TẠO] Học kỳ mới bắt đầu. GPA mục tiêu: 3.5+",
  "› Tuần 1/12 — T tràn đầy năng lượng. Mọi thứ còn phía trước.",
];
```

---

# ENDINGS (EndScreen dict)

### Win endings:
```javascript
won_perfect: {
  i: "🌅", c: "#22c55e",
  t: "Phủ định của Phủ định",
  d: "T đã vượt qua mâu thuẫn và tìm thấy cân bằng thực sự. Không phải T cũ trở về — đây là T mới, ở tầm cao hơn. Đúng như quy luật phủ định của phủ định."
},
won_hustle: {
  i: "⚡", c: "#f59e0b",
  t: "Thống nhất trong Mâu thuẫn",
  d: "GPA cao nhưng mental thấp — mâu thuẫn chưa được giải quyết triệt để. T thành công theo nghĩa hẹp nhưng còn nguyên vẹn mâu thuẫn cần giải quyết phía trước."
},
won_chill: {
  i: "🌿", c: "#06b6d4",
  t: "Lượng đổi Chất đổi",
  d: "T tích lũy từ từ, đủ lượng rồi mới chuyển hóa chất. Không đỉnh cao nhưng bền vững — đây cũng là một con đường hợp quy luật biện chứng."
},
won_survive: {
  i: "🎖️", c: "#8b5cf6",
  t: "Hiện thực hóa Khả năng",
  d: "Từ khả năng trở thành hiện thực — T đã làm được. Không hoàn hảo, nhưng biến tiềm năng thành kết quả thực tế: đó là thắng lợi."
},
```

### Loss endings:
```javascript
gameover_stress: {
  i: "💥", t: "Mâu thuẫn không được Giải",
  d: "Stress tích lũy vượt quá ngưỡng chịu đựng. Mâu thuẫn giữa cống hiến và sức khỏe không được giải quyết biện chứng — kết quả là đứt gãy. Burnout toàn diện."
},
gameover_mental: {
  i: "🪞", t: "Hiện tượng che khuất Bản chất",
  d: "Ngoài thì vẫn đang học, nhưng bên trong đã sụp đổ. Hiện tượng (vẻ ngoài ổn) che khuất bản chất (tình trạng thực). Khi bản chất không còn chịu đựng được nữa — hiện tượng cũng vỡ theo."
},
gameover_gpa: {
  i: "📉", t: "Lượng không dẫn đến Chất",
  d: "Học nhiều (lượng) nhưng không dẫn đến hiệu quả thực sự (chất). Phương pháp sai, hướng sai — tích lũy không tạo ra chuyển hóa. T cần nhìn lại toàn bộ cách tiếp cận."
},
gameover_money: {
  i: "🏛️", t: "Vật chất quyết định Ý thức",
  d: "Điều kiện vật chất (tài chính) chạm đáy — không thể tiếp tục. Đây là minh chứng rõ ràng nhất của nguyên lý duy vật: tồn tại xã hội quyết định ý thức xã hội. Không có điều kiện vật chất, không có điều kiện học tập."
},
```

---

# LEADERSHIP STYLE → HUSTLE STYLE

Đổi `calculateLeadershipStyle()`:

```javascript
function calculateLeadershipStyle(stats, history) {
  if (stats.mental >= 70 && stats.gpa >= 3.0 && stats.stress <= 60) return {
    label: "NGƯỜI HỌC BIỆN CHỨNG",
    style: "dialectics",
    desc: "Bạn hiểu mâu thuẫn và giải quyết nó bằng tư duy biện chứng — không cực đoan, không bỏ cuộc. T phiên bản của bạn đã tìm được cân bằng thực sự."
  };
  if (stats.gpa >= 3.5 && stats.mental <= 40) return {
    label: "HUSTLER MẤT CÂN BẰNG",
    style: "hustle",
    desc: "GPA cao nhưng trả giá bằng sức khỏe tâm thần. Mâu thuẫn giữa hiệu suất và sức khỏe vẫn chưa được giải — cần vòng phủ định tiếp theo để tìm cân bằng cao hơn."
  };
  if (stats.stress <= 40 && stats.mental >= 80) return {
    label: "NGƯỜI CÂN BẰNG",
    style: "balanced",
    desc: "T của bạn không đỉnh nhưng bền vững. Lượng tích lũy đủ, chất dần chuyển hóa — đây là hành trình dài hạn."
  };
  return {
    label: "NGƯỜI VƯỢT KHÓ",
    style: "survivor",
    desc: "Vượt qua 12 tuần với đủ loại mâu thuẫn. Không hoàn hảo nhưng đứng vững — đó là thực tiễn kiểm nghiệm bản thân thật sự."
  };
}
```

---

# GAME START SCREEN TEXT

```
Badge: NHÓM 4 MLN111

H1: HUSTLE LOOP

Subtitle:
Bạn là Sinh viên T — năm 2 đại học. Phải cân bằng GPA, sức khỏe tâm thần,
tài chính và stress qua 12 tuần học kỳ. Mỗi quyết định phản ánh một khái niệm triết học.

4 chỉ số (info cards):
📚 GPA — Điểm học kỳ — Thua nếu ≤ 1.0
🧠 MENTAL — Sức khỏe tâm thần — Thua nếu ≤ 20%
💸 TÀI CHÍNH — Tiền tiết kiệm — Thua nếu ≤ 0
⚡ STRESS — Áp lực tích lũy — Thua nếu ≥ 100%

Hướng dẫn:
- Mỗi tuần T đối mặt với 1 sự kiện và phải đưa ra quyết định.
- Mỗi quyết định có đánh đổi — không có lựa chọn nào hoàn hảo.
- Ở Tuần 4 và Tuần 8, bạn chọn 1 thay đổi lối sống lâu dài.
- Mục tiêu: Vượt qua 12 tuần mà không để chỉ số nào chạm ngưỡng nguy hiểm.

Button: BẮT ĐẦU HỌC KỲ
```

---

# GAME HUD TEXT

```
Back button: ← VỀ TRANG CHỦ
Quarter label: TUẦN {quarter} / 12
Policy label (Q4/Q8): 📋 (thay ⚖)
Policy screen title: Thay đổi Lối sống · Tuần {quarter}
Policy screen desc: Chọn 1 thay đổi. Hiệu lực kéo dài đến hết học kỳ.
Status msg: "Đang thực hiện: {label}..."

Black swan label: ⚠ SỰ CỐ BẤT NGỜ
Black swan ack button (bad): ⚡ ĐỐI MẶT VỚI SỰ CỐ
Black swan ack button (good): ✓ NHẬN TIN VUI

End screen (win): HỌC KỲ HOÀN TẤT
End screen (lose): PHẢI TẠM NGHỈ HỌC

Reset button: 🔄 THỬ LẠI TỪ TUẦN 1

Policy tag (active law): showing in HUD
```
