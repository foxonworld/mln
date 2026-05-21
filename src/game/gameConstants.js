// ═══════════════════════════════════════════════════════════════════════════
// HUSTLE LOOP GAME — Game Constants & Data
// ═══════════════════════════════════════════════════════════════════════════

export const SAVE_KEY = "hustleLoopSave";
export const INIT_STATS = { gpa: 3.0, mental: 80, money: 5000, stress: 30 };

export const INIT_LOGS = [
  "$ khởi-động --hustle-loop --sinh-viên T --học-kỳ 1",
  "› [KHỞI TẠO] Học kỳ mới bắt đầu. GPA mục tiêu: 3.5+",
  "› Tuần 1/12 — T tràn đầy năng lượng. Mọi thứ còn phía trước.",
];

// ═══════════════════════════════════════════════════════════════════════════
// GAME EVENTS
// ═══════════════════════════════════════════════════════════════════════════
export const GAME_EVENTS = [
  {
    id: 1,
    entity: "DEADLINE",
    entityColor: "#818cf8",
    entityBg: "rgba(129,140,248,0.15)",
    title: "5 deadline trong 3 ngày",
    description:
      'Lịch nộp bài chồng chéo như một cơn lũ. Mỗi môn đều "quan trọng". T không biết bắt đầu từ đâu.',
    desc: "3 ngày nữa: báo cáo thực tập, bài tập nhóm, bài kiểm tra giữa kỳ, essay tiếng Anh, và presentation. Ngủ hay học?",
    background: "deadline-night.webp",
    type: "power",
    intensity: "high",
    sceneLabel: "Thư viện đêm khuya",
    options: [
      {
        label: "Thức xuyên đêm — làm hết tất cả bằng mọi giá",
        description: "Ép bản thân tối đa, hoàn thành toàn bộ deadline.",
        rationale: "GPA giữ được nhưng sức khỏe tâm thần chịu cú đánh lớn.",
        previewAnimation: "rising-chart",
        tone: "orange",
        impact: { gpa: 0.3, mental: -25, money: 0, stress: 35 },
        logStr:
          "[DEADLINE] Thức trắng. GPA giữ được nhưng T kiệt sức hoàn toàn.",
      },
      {
        label: "Ưu tiên quan trọng nhất, xin gia hạn phần còn lại",
        description:
          "Liên hệ giảng viên, thương lượng, tập trung vào điều cốt lõi.",
        rationale:
          "GPA thấp hơn chút nhưng mental được bảo vệ — quyết định biện chứng hơn.",
        previewAnimation: "money-flow",
        tone: "green",
        impact: { gpa: 0.1, mental: -8, money: 0, stress: 15 },
        logStr:
          "[DEADLINE] T ưu tiên đúng. GPA giảm nhẹ nhưng mental được giữ.",
      },
    ],
  },
  {
    id: 2,
    entity: "TÀI CHÍNH",
    entityColor: "#f59e0b",
    entityBg: "rgba(245,158,11,0.12)",
    title: "Học phí tăng 30% đột ngột",
    description:
      "Thông báo từ phòng tài vụ. Học phí học kỳ sau tăng đột biến. Gia đình T không đủ bù.",
    desc: "Thiếu 8 triệu để đóng học phí đúng hạn. Quỹ sinh hoạt của T đang cạn dần. Làm gì trong 2 tuần tới?",
    background: "finance-wallet.webp",
    type: "oil",
    intensity: "medium",
    sceneLabel: "Áp lực tài chính",
    options: [
      {
        label: "Vay tiền sinh viên — giải quyết ngay, trả dần sau",
        description: "Vay quỹ hỗ trợ sinh viên hoặc vay người thân.",
        rationale: "Tiền về ngay nhưng nợ và stress dài hạn tăng.",
        previewAnimation: "money-flow",
        tone: "blue",
        impact: { gpa: 0, mental: -5, money: 8000, stress: 15 },
        logStr:
          "[TÀI CHÍNH] Vay được tiền. Học phí ổn nhưng nợ bắt đầu tích lũy.",
      },
      {
        label: "Làm thêm cấp tốc — tự kiếm tiền trong 2 tuần",
        description: "Nhận gấp job freelance hoặc làm thêm tăng ca.",
        rationale: "Tiền kiếm được nhưng GPA học kỳ này bị ảnh hưởng nặng.",
        previewAnimation: "rising-chart",
        tone: "orange",
        impact: { gpa: -0.4, mental: -15, money: 6000, stress: 25 },
        logStr: "[TÀI CHÍNH] Làm thêm cấp tốc. Có tiền nhưng GPA trượt mạnh.",
      },
    ],
  },
  {
    id: 3,
    entity: "CƠ HỘI",
    entityColor: "#34d399",
    entityBg: "rgba(52,211,153,0.12)",
    title: "Internship lương tốt — nhưng phải quyết ngay",
    description:
      "Công ty lớn offer internship part-time, lương ổn. Deadline nộp hồ sơ: ngày mai.",
    desc: "3 tháng internship, 8 triệu/tháng. Nhưng sẽ chiếm 20 tiếng/tuần — học kỳ này sẽ rất căng. Nhận không?",
    background: "internship-office.webp",
    type: "telecom",
    intensity: "low",
    sceneLabel: "Phỏng vấn internship",
    options: [
      {
        label: "Nhận ngay — trải nghiệm thực tế không thể bỏ qua",
        description:
          "Nhận offer, bắt đầu làm, chấp nhận GPA học kỳ này sẽ thấp hơn.",
        rationale:
          "Tiền tốt và kinh nghiệm tốt — nhưng GPA và mental chịu áp lực.",
        previewAnimation: "rising-chart",
        tone: "green",
        impact: { gpa: -0.5, mental: -10, money: 12000, stress: 20 },
        logStr:
          "[CƠ HỘI] Nhận internship. Tiền về nhưng áp lực học kỳ tăng vọt.",
      },
      {
        label: "Từ chối — tập trung học kỳ này, tìm cơ hội khác sau",
        description: "Từ chối offer, giữ nguyên focus cho việc học.",
        rationale:
          "GPA được bảo vệ, mental ổn hơn — nhưng mất cơ hội kiếm tiền và kinh nghiệm.",
        previewAnimation: "money-flow",
        tone: "blue",
        impact: { gpa: 0.2, mental: 5, money: 0, stress: -10 },
        logStr: "[CƠ HỘI] Từ chối internship. Tập trung học, GPA cải thiện.",
      },
    ],
  },
  {
    id: 4,
    entity: "GIA ĐÌNH",
    entityColor: "#a78bfa",
    entityBg: "rgba(167,139,250,0.12)",
    title: "Bố mẹ nói tự lo từ tháng này",
    description:
      "Gia đình gặp khó khăn tài chính. Trợ cấp hàng tháng bị cắt đột ngột không báo trước.",
    desc: "Không còn 3 triệu/tháng từ gia đình nữa. Tiền sinh hoạt T chỉ đủ 1 tháng nữa. Phải xoay xở ngay.",
    background: "family-call-dorm.webp",
    type: "coal",
    intensity: "medium",
    sceneLabel: "Khủng hoảng tài chính",
    options: [
      {
        label: "Tự xoay xở — cắt giảm chi tiêu, tìm việc làm thêm",
        description: "Cắt chi phí, ăn uống tiết kiệm, nhận thêm job nhỏ.",
        rationale: "Tự lập hơn nhưng stress và áp lực tăng mạnh.",
        previewAnimation: "falling-chart",
        tone: "orange",
        impact: { gpa: -0.2, mental: -20, money: 2000, stress: 30 },
        logStr:
          "[GIA ĐÌNH] T tự xoay xở. Độc lập hơn nhưng sức khỏe tâm thần suy giảm.",
      },
      {
        label: "Gọi về nhà xin hỗ trợ thêm 1 lần — chia sẻ khó khăn",
        description: "Solicit thêm từ gia đình, giải thích tình hình thực tế.",
        rationale: "Có tiền nhưng cảm giác tội lỗi và áp lực gia đình tăng.",
        previewAnimation: "money-flow",
        tone: "blue",
        impact: { gpa: 0, mental: -10, money: 4000, stress: 10 },
        logStr:
          "[GIA ĐÌNH] Gọi về xin hỗ trợ. Tiền được giải quyết nhưng T cảm thấy guilt.",
      },
    ],
  },
  {
    id: 5,
    entity: "HỌC VỤ",
    entityColor: "#60a5fa",
    entityBg: "rgba(96,165,250,0.12)",
    title: "Thầy thêm đề tài bắt buộc cuối kỳ",
    description:
      "Giảng viên thông báo thêm 1 project lớn vào tuần 10 — không nằm trong đề cương ban đầu.",
    desc: "Project 30% điểm, nộp sau 3 tuần. T đã lên kế hoạch học kỳ nhưng phần này không có trong tính toán ban đầu.",
    background: "academic-project.webp",
    type: "economic",
    intensity: "medium",
    sceneLabel: "Áp lực học vụ",
    options: [
      {
        label: "Làm nghiêm túc, đầu tư thời gian và chất lượng",
        description:
          "Dành thêm thời gian, nghiên cứu kỹ, làm project chất lượng cao.",
        rationale: "GPA tốt nhưng thời gian các môn khác bị cắt, stress tăng.",
        previewAnimation: "rising-chart",
        tone: "green",
        impact: { gpa: 0.3, mental: -12, money: -500, stress: 25 },
        logStr: "[HỌC VỤ] Project chất lượng. GPA tốt nhưng T kiệt sức sau đó.",
      },
      {
        label: "Làm đủ để qua — ưu tiên các môn khác quan trọng hơn",
        description:
          "Dành thời gian tối thiểu cho project, tập trung năng lượng có hạn vào đúng chỗ.",
        rationale: "GPA project thấp hơn nhưng tổng thể được cân bằng hơn.",
        previewAnimation: "money-flow",
        tone: "blue",
        impact: { gpa: 0.1, mental: -5, money: 0, stress: 10 },
        logStr: "[HỌC VỤ] Làm vừa đủ. Cân bằng ổn hơn, không quá tải.",
      },
    ],
  },
  {
    id: 6,
    entity: "KẾT QUẢ",
    entityColor: "#f87171",
    entityBg: "rgba(248,113,113,0.15)",
    title: "Rớt môn — phải thi lại",
    description:
      "Bảng điểm hiện ra. 1 môn dưới 5.0. T phải thi lại cuối kỳ — thêm áp lực và chi phí.",
    desc: "Môn Triết học cơ sở: 4.2/10. Phải thi lại trong 2 tuần. Phí thi lại 300K. Mental T đang rất thấp.",
    background: "failed-exam.webp",
    type: "aviation",
    intensity: "high",
    sceneLabel: "Phòng thi vấn đáp",
    options: [
      {
        label: "Học lại nghiêm túc — quyết tâm vượt qua lần này",
        description:
          "Đầu tư 2 tuần học lại từ đầu, xem đây là cơ hội thật sự hiểu bài.",
        rationale:
          "Stress ngắn hạn nhưng sau đó mental có thể phục hồi nếu thi đậu.",
        previewAnimation: "money-flow",
        tone: "green",
        impact: { gpa: 0.1, mental: -15, money: -300, stress: 30 },
        logStr: "[KẾT QUẢ] T học lại nghiêm túc. Vượt qua được kỳ thi lại.",
      },
      {
        label: "Chấp nhận điểm F, bảo toàn sức khỏe tâm thần",
        description:
          "Không thi lại lần này, chờ học lại môn đó vào kỳ sau khi mental tốt hơn.",
        rationale: "Mental được bảo vệ ngắn hạn nhưng GPA chịu thiệt hại lớn.",
        previewAnimation: "falling-chart",
        tone: "red",
        impact: { gpa: -0.8, mental: 10, money: 0, stress: -10 },
        logStr:
          "[KẾT QUẢ] T chọn nghỉ ngơi. GPA rớt mạnh nhưng mental phục hồi dần.",
      },
    ],
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// BLACK SWANS (Unexpected Events)
// ═══════════════════════════════════════════════════════════════════════════
export const BLACK_SWANS = [
  {
    title: "Bệnh đột ngột giữa mùa thi",
    description:
      "T sốt cao 39 độ, phải nằm viện 3 ngày đúng tuần ôn thi quan trọng nhất.",
    background: "illness-rain-desk.webp",
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
    description:
      "Mâu thuẫn với bạn cùng phòng leo thang. T phải tìm chỗ ở mới trong 1 tuần.",
    background: "roommate-conflict.webp",
    type: "shipping",
    intensity: "high",
    sceneLabel: "Khủng hoảng chỗ ở",
    emoji: "🏠",
    modeNote:
      "Biến cố chen ngang: môi trường sống ảnh hưởng trực tiếp đến học tập.",
    desc: "Không thể ở cùng phòng nữa. Phải tìm phòng mới gấp, đặt cọc, dọn đồ — tất cả trong khi vẫn phải đi học.",
    impact: { gpa: -0.1, mental: -20, money: -3000, stress: 20 },
    logStr:
      "[⚠ BẤT NGỜ] Conflict roommate. Chi phí và stress leo thang đột ngột.",
  },
  {
    title: "Học bổng bất ngờ được duyệt",
    description:
      "Đơn học bổng T nộp từ tháng trước bất ngờ được chấp thuận. Tin tốt đến đúng lúc.",
    background: "scholarship-morning.webp",
    type: "tech",
    intensity: "low",
    sceneLabel: "Tin tức tốt bất ngờ",
    emoji: "🎉",
    modeNote: "Biến cố tích cực: không phải mọi bất ngờ đều xấu.",
    desc: "Học bổng khuyến học 15 triệu được duyệt. Tiền về trong 2 tuần. T thở phào — áp lực tài chính giảm mạnh.",
    impact: { gpa: 0.1, mental: 20, money: 15000, stress: -20 },
    logStr:
      "[✓ MAY MẮN] Học bổng được duyệt! Tài chính ổn định, T tập trung học hơn.",
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// MACRO POLICIES (Lifestyle Choices - Week 4 & 8)
// ═══════════════════════════════════════════════════════════════════════════
export const MACRO_POLICIES = [
  {
    id: "p_club",
    icon: "🎓",
    title: "Gia nhập CLB học thuật",
    desc: "Tham gia nhóm học tập, networking với anh chị khóa trên. Mỗi khi quyết định có lợi cho GPA, được thêm +0.1 GPA bonus.",
    effect:
      "Hiệu lực dài hạn: quyết định nào cải thiện GPA sẽ được buff thêm +0.1.",
    isBuff: "roic",
    summary: "+0.1 GPA buffer",
  },
  {
    id: "p_detox",
    icon: "🧘",
    title: "Thiền định & Digital Detox",
    desc: "Cam kết 30 phút thiền mỗi ngày, giảm mạng xã hội. Stress giảm 5% mỗi tuần tự động — đổi lại tốn thêm thời gian.",
    effect:
      "Hiệu lực dài hạn: sau mỗi quyết định, stress tự giảm thêm 5% nhưng GPA buff giảm 0.1.",
    isBuff: "cpi",
    summary: "stress -5/tuần",
  },
  {
    id: "p_parttime",
    icon: "💼",
    title: "Nhận việc part-time ổn định",
    desc: "Nhận job part-time cố định 20 tiếng/tuần. Tiền vào ổn định ngay — nhưng thời gian học bị cắt mạnh từ đây.",
    effect: "Hiệu lực tức thời: money +8000K, stress +20, GPA -0.3.",
    isBuff: "bud",
    summary: "+8M, stress +20, GPA -0.3",
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// METER DEFINITIONS
// ═══════════════════════════════════════════════════════════════════════════
export const METER_DEFS = [
  {
    key: "gpa",
    label: "GPA",
    icon: "📚",
    limit: "Tối thiểu: 1.0",
    markerPos: 10,
    hint: "Điểm trung bình học kỳ. Rớt xuống dưới 1.0 là cảnh báo học vụ.",
    getWidth: (v) => Math.min(Math.max((v / 4) * 100, 2), 100),
    getColor: (v) => (v <= 1.5 ? "#ef4444" : v <= 2.5 ? "#f59e0b" : "#22c55e"),
    format: (v) => v.toFixed(1),
    danger: (v) => v <= 1.5,
  },
  {
    key: "mental",
    label: "Sức khỏe tâm thần",
    icon: "🧠",
    limit: "Tối thiểu: 20%",
    markerPos: 20,
    hint: "Sức khỏe tâm thần và cảm xúc. Xuống thấp dẫn đến burnout.",
    getWidth: (v) => Math.min(Math.max(v, 2), 100),
    getColor: (v) => (v <= 30 ? "#ef4444" : v <= 50 ? "#f59e0b" : "#22c55e"),
    format: (v) => v.toFixed(0) + "%",
    danger: (v) => v <= 30,
  },
  {
    key: "money",
    label: "Tài chính",
    icon: "💸",
    limit: "Tối thiểu: 0",
    markerPos: 5,
    hint: "Tiền tiết kiệm (nghìn đồng). Hết tiền là phải bỏ học.",
    getWidth: (v) => Math.min(Math.max((v / 10000) * 100, 2), 100),
    getColor: (v) => (v <= 500 ? "#ef4444" : v <= 2000 ? "#f59e0b" : "#22c55e"),
    format: (v) => (v >= 1000 ? (v / 1000).toFixed(1) + "M" : v + "K"),
    danger: (v) => v <= 500,
  },
  {
    key: "stress",
    label: "Stress",
    icon: "⚡",
    limit: "Tối đa: 100%",
    markerPos: 80,
    hint: "Mức độ căng thẳng tích lũy. Đạt 100% là burnout toàn diện.",
    getWidth: (v) => Math.min(Math.max(v, 2), 100),
    getColor: (v) => (v >= 80 ? "#ef4444" : v >= 60 ? "#f59e0b" : "#22c55e"),
    format: (v) => v.toFixed(0) + "%",
    danger: (v) => v >= 80,
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// GAME ENDINGS
// ═══════════════════════════════════════════════════════════════════════════
export const ENDINGS = {
  won_perfect: {
    i: "🌅",
    c: "#22c55e",
    t: "Phủ định của Phủ định",
    d: "T đã vượt qua mâu thuẫn và tìm thấy cân bằng thực sự. Không phải T cũ trở về — đây là T mới, ở tầm cao hơn. Đúng như quy luật phủ định của phủ định.",
  },
  won_hustle: {
    i: "⚡",
    c: "#f59e0b",
    t: "Thống nhất trong Mâu thuẫn",
    d: "GPA cao nhưng mental thấp — mâu thuẫn chưa được giải quyết triệt để. T thành công theo nghĩa hẹp nhưng còn nguyên vẹn mâu thuẫn cần giải quyết phía trước.",
  },
  won_chill: {
    i: "🌿",
    c: "#06b6d4",
    t: "Lượng đổi Chất đổi",
    d: "T tích lũy từ từ, đủ lượng rồi mới chuyển hóa chất. Không đỉnh cao nhưng bền vững — đây cũng là một con đường hợp quy luật biện chứng.",
  },
  won_survive: {
    i: "🎖️",
    c: "#8b5cf6",
    t: "Hiện thực hóa Khả năng",
    d: "Từ khả năng trở thành hiện thực — T đã làm được. Không hoàn hảo, nhưng biến tiềm năng thành kết quả thực tế: đó là thắng lợi.",
  },
  gameover_stress: {
    i: "💥",
    t: "Mâu thuẫn không được Giải",
    d: "Stress tích lũy vượt quá ngưỡng chịu đựng. Mâu thuẫn giữa cống hiến và sức khỏe không được giải quyết biện chứng — kết quả là đứt gãy. Burnout toàn diện.",
  },
  gameover_mental: {
    i: "🪞",
    t: "Hiện tượng che khuất Bản chất",
    d: "Ngoài thì vẫn đang học, nhưng bên trong đã sụp đổ. Hiện tượng (vẻ ngoài ổn) che khuất bản chất (tình trạng thực). Khi bản chất không còn chịu đựng được nữa — hiện tượng cũng vỡ theo.",
  },
  gameover_gpa: {
    i: "📉",
    t: "Lượng không dẫn đến Chất",
    d: "Học nhiều (lượng) nhưng không dẫn đến hiệu quả thực sự (chất). Phương pháp sai, hướng sai — tích lũy không tạo ra chuyển hóa. T cần nhìn lại toàn bộ cách tiếp cận.",
  },
  gameover_money: {
    i: "🏛️",
    t: "Vật chất quyết định Ý thức",
    d: "Điều kiện vật chất (tài chính) chạm đáy — không thể tiếp tục. Đây là minh chứng rõ ràng nhất của nguyên lý duy vật: tồn tại xã hội quyết định ý thức xã hội. Không có điều kiện vật chất, không có điều kiện học tập.",
  },
};
