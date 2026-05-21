// replace.js
const fs = require('fs');

let app = fs.readFileSync('src/App.jsx', 'utf8');

// Replace NAV_ITEMS to RESEARCH_LINKS
const constantsRegex = /const NAV_ITEMS = \[[\s\S]*?const RESEARCH_LINKS = \[[\s\S]*?\];\n/g;
const newConstants = `const NAV_ITEMS = [
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

const HERO_STATS = [
  { value: "83%",   label: "Sinh viên Việt Nam từng trải qua lo âu học tập kéo dài" },
  { value: "≈ 60%", label: "Sinh viên năm 2–3 cảm thấy mất cân bằng giữa học và sống" },
  { value: "1 / 3", label: "Sinh viên có dấu hiệu kiệt sức (burnout) trước khi tốt nghiệp" },
];

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

const SOLUTION_ITEMS = [
  {
    id: "truc-quan",
    title: "Giai đoạn 1: Trực quan sinh động",
    explanation:
      "T tiếp xúc với thế giới bằng cảm giác và tri giác trực tiếp. Nhìn thấy bạn bè thành công với hustle culture — GPA cao, nhiều hoạt động, trông có vẻ ổn. T cảm nhận áp lực mà chưa hiểu tại sao. Đây là nhận thức cảm tính — đúng nhưng chưa đủ sâu.",
    benefit:
      "Vai trò: Cảm giác và trực quan là điểm khởi đầu của mọi nhận thức. Không có trực quan sinh động thì không có nguyên liệu để tư duy.",
    implication:
      "Giới hạn: Trực quan có thể bị đánh lừa bởi hiện tượng. T thấy bạn 'thành công' nhưng chưa thấy được bản chất — bạn ấy có thể đang kiệt sức phía sau màn hình.",
  },
  {
    id: "tu-duy",
    title: "Giai đoạn 2: Tư duy trừu tượng",
    explanation:
      "T bắt đầu phân tích, khái quát hóa từ những gì quan sát được. 'Tại sao mình cố gắng mà không tiến?' → 'Hustle nhiều nhưng không đúng hướng' → 'Vấn đề là chiến lược, không phải nỗ lực'. Nhận thức vượt khỏi cảm giác, đi vào bản chất.",
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
      { key: "a", label: "A. 'Mình phải học — người khác nghỉ là lãng phí'", result: "mixed" },
      { key: "b", label: "B. 'Nghỉ ngơi là một phần của quá trình — mâu thuẫn giữa học và nghỉ cần cân bằng'", result: "good" },
    ],
  },
];

const QUIZ_FEEDBACK = {
  good:
    "Phép biện chứng ủng hộ lựa chọn này: nhìn nhận mâu thuẫn, tìm điểm cân bằng thay vì cực đoan một phía. Đây là tư duy biện chứng trong thực tiễn.",
  mixed:
    "Lựa chọn này có logic nhưng thiên về tư duy siêu hình — nhìn sự vật tách biệt, không thấy mối liên hệ và hậu quả dài hạn. Kết quả ngắn hạn có thể ổn, nhưng dài hạn tạo mâu thuẫn mới.",
};

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
      "Phân tích văn hóa 'cống hiến không ngừng' và tác động đến sức khỏe tâm thần của thế hệ trẻ.",
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
`;
app = app.replace(constantsRegex, newConstants);

fs.writeFileSync('src/App.jsx', app, 'utf8');
console.log('Replaced constants successfully.');
