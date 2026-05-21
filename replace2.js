// replace2.js
const fs = require("fs");

let app = fs.readFileSync("src/App.jsx", "utf8");

const regex2 =
  /const BLACK_SWAN_SPAWN_RATE = [\s\S]*?const SAVE_KEY = "policySimSave";/;
const newConstants2 = `const BLACK_SWAN_SPAWN_RATE = 0.2;
const SAVE_KEY = "hustleLoopSave";`;
app = app.replace(regex2, newConstants2);

const regex3 =
  /const GAME_EVENTS = \[[\s\S]*?\];\n\n\/\/ ═══════════════════════════════════════════════════════════════════════════\n\/\/ BLACK SWANS & POLICIES/g;
const newEvents = `const GAME_EVENTS = [
  {
    id: 1, entity: "DEADLINE", entityColor: "#818cf8", entityBg: "rgba(129,140,248,0.15)",
    title: "5 deadline trong 3 ngày",
    description: "Lịch nộp bài chồng chéo như một cơn lũ. Mỗi môn đều 'quan trọng'. T không biết bắt đầu từ đâu.",
    desc: "3 ngày nữa: báo cáo thực tập, bài tập nhóm, bài kiểm tra giữa kỳ, essay tiếng Anh, và presentation. Ngủ hay học?",
    background: "Black.webp",
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
        description: "Xin hỗ trợ thêm từ gia đình, giải thích tình hình thực tế.",
        rationale: "Có tiền nhưng cảm giác tội lỗi và áp lực gia đình tăng.",
        previewAnimation: "money-flow", tone: "blue",
        impact: { gpa: 0, mental: -10, money: 4000, stress: 10 },
        logStr: "[GIA ĐÌNH] Gọi về xin hỗ trợ. Tiền được giải quyết nhưng T cảm thấy áp lực."
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

// ═══════════════════════════════════════════════════════════════════════════
// BLACK SWANS & POLICIES`;
app = app.replace(regex3, newEvents);

fs.writeFileSync("src/App.jsx", app, "utf8");
console.log("Replaced game events successfully.");
