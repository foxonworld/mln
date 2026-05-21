import { useEffect, useMemo, useRef, useState } from "react";
import DecisionCard from "./game/components/DecisionCard";
import EffectOverlay from "./game/components/EffectOverlay";
import EventScene from "./game/components/EventScene";
import ImpactPreview from "./game/components/ImpactPreview";
import OutcomePanel from "./game/components/OutcomePanel";
import QuarterTimeline from "./game/components/QuarterTimeline";
import "./game/game.css";

// ═══════════════════════════════════════════════════════════════════════════
// HỆ THỐNG ÂM THANH (Synth Web Audio API)
// ═══════════════════════════════════════════════════════════════════════════
let audioCtx;
const initAudio = () => {
  if (!window.AudioContext && !window.webkitAudioContext) return;
  if (!audioCtx)
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  if (audioCtx.state === "suspended") audioCtx.resume();
};

const playTone = (freq, type, duration, vol = 0.1) => {
  if (!audioCtx) return;
  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    gain.gain.setValueAtTime(vol, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(
      0.01,
      audioCtx.currentTime + duration,
    );
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (e) { }
};

let bgmNode = null;
export const SFX = {
  hover: () => playTone(300, "sine", 0.05, 0.01),
  click: () => playTone(600, "sine", 0.1, 0.03),
  confirm: () => {
    playTone(300, "square", 0.1, 0.03);
    setTimeout(() => playTone(450, "square", 0.2, 0.03), 100);
  },
  alert: () => {
    playTone(400, "sawtooth", 0.3, 0.05);
    setTimeout(() => playTone(800, "sawtooth", 0.3, 0.05), 300);
    setTimeout(() => playTone(400, "sawtooth", 0.3, 0.05), 600);
  },
  win: () => {
    playTone(440, "sine", 0.1, 0.05);
    setTimeout(() => playTone(554, "sine", 0.1, 0.05), 150);
    setTimeout(() => playTone(659, "sine", 0.4, 0.05), 300);
  },
  lose: () => playTone(150, "sawtooth", 0.8, 0.1),
  law: () => {
    playTone(523, "triangle", 0.2, 0.05);
    setTimeout(() => playTone(659, "triangle", 0.4, 0.05), 150);
  },
  bgm: (play) => {
    if (!audioCtx) return;
    if (play && !bgmNode) {
      try {
        const osc1 = audioCtx.createOscillator();
        const osc2 = audioCtx.createOscillator();
        const lfo = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        const lfoGain = audioCtx.createGain();
        const filter = audioCtx.createBiquadFilter();

        osc1.type = "triangle";
        osc1.frequency.value = 55;
        osc2.type = "sine";
        osc2.frequency.value = 55.5;
        filter.type = "lowpass";
        filter.frequency.value = 150;
        filter.Q.value = 0;
        lfo.type = "sine";
        lfo.frequency.value = 0.08;
        lfo.connect(lfoGain);
        lfoGain.gain.value = 80;
        lfoGain.connect(filter.frequency);
        gain.gain.setValueAtTime(0, audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(0.04, audioCtx.currentTime + 3);

        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(gain);
        gain.connect(audioCtx.destination);
        osc1.start();
        osc2.start();
        lfo.start();
        bgmNode = { osc1, osc2, lfo, gain, filter };
      } catch (e) { }
    } else if (!play && bgmNode) {
      try {
        bgmNode.gain.gain.linearRampToValueAtTime(
          0.001,
          audioCtx.currentTime + 2,
        );
        const n = bgmNode;
        bgmNode = null;
        setTimeout(() => {
          try {
            n.osc1.stop();
            n.osc2.stop();
            n.lfo.stop();
            n.gain.disconnect();
            n.filter.disconnect();
          } catch (e) { }
        }, 2100);
      } catch (e) { }
    }
  },
};

const NAV_ITEMS = [
  { id: "hero", label: "Mở đầu" },
  { id: "bienchinh", label: "Biện chứng" },
  { id: "phamtru", label: "Phạm trù" },
  { id: "quyluat", label: "Quy luật" },
  { id: "lyluan", label: "Nhận thức" },
  { id: "game", label: "Mini-game" },
  { id: "quiz", label: "Thảo luận" },
  { id: "nghiencuu", label: "Tài liệu" },
  { id: "ketluan", label: "Kết luận" },
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
  {
    value: "83%",
    label: "Sinh viên Việt Nam từng trải qua lo âu học tập kéo dài",
  },
  {
    value: "≈ 60%",
    label: "Sinh viên năm 2–3 cảm thấy mất cân bằng giữa học và sống",
  },
  {
    value: "1 / 3",
    label: "Sinh viên có dấu hiệu kiệt sức (burnout) trước khi tốt nghiệp",
  },
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
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1400&q=80",
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
    role: "Cái chung biểu hiện tính phổ biến, cái riêng biểu hiện tính cá biệt và phong phú. Trong học tập: một phương pháp học có thể là chung, nhưng cách áp dụng với từng sinh viên là cái riêng.",
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
    role: "Nguyên nhân có trước và sinh ra kết quả; kết quả có thể trở thành nguyên nhân cho sự phát triển tiếp theo. Trong học tập: thiếu ngủ → mất tập trung → điểm thấp.",
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
    role: "Các sự kiện tất nhiên được tạo thành từ nhiều ngẫu nhiên; hiểu mối quan hệ này giúp phân tích diễn biến thực tế trong học tập.",
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
    role: "Nội dung quyết định hình thức nhưng hình thức có tác động trở lại nội dung trong điều kiện nhất định.",
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
    role: "Bản chất quy định vận động của sự vật; hiện tượng là cách bản chất xuất hiện dưới điều kiện lịch sử cụ thể.",
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
    role: "Không phải mọi khả năng đều thành hiện thực — cần điều kiện, hành động và thời gian để hiện thực hóa.",
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
      'Giới hạn: Trực quan có thể bị đánh lừa bởi hiện tượng. T thấy bạn "thành công" nhưng chưa thấy được bản chất — bạn ấy có thể đang kiệt sức phía sau màn hình.',
  },
  {
    id: "tu-duy",
    title: "Giai đoạn 2: Tư duy trừu tượng",
    explanation:
      'T bắt đầu phân tích, khái quát hóa từ những gì quan sát được. "Tại sao mình cố gắng mà không tiến?" → "Hustle nhiều nhưng không đúng hướng" → "Vấn đề là chiến lược, không phải nỗ lực". Nhận thức vượt khỏi cảm giác, đi vào bản chất.',
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
      {
        key: "a",
        label: "A. Thức xuyên đêm, làm hết tất cả để không thiếu deadline nào",
        result: "mixed",
      },
      {
        key: "b",
        label: "B. Ưu tiên quan trọng nhất, xin gia hạn phần còn lại",
        result: "good",
      },
    ],
  },
  {
    id: "scenario-2",
    title: "Tình huống 2 — Internship lương tốt vs GPA",
    description:
      "Một công ty offer internship lương tốt, nhưng sẽ ảnh hưởng đến GPA học kỳ này. T nên làm gì?",
    options: [
      {
        key: "a",
        label:
          "A. Cân nhắc kỹ: đây là khả năng hay hiện thực? Điều kiện có đủ không?",
        result: "good",
      },
      {
        key: "b",
        label:
          "B. Nhận internship — trải nghiệm thực tế quan trọng hơn điểm số",
        result: "mixed",
      },
    ],
  },
  {
    id: "scenario-3",
    title: "Tình huống 3 — Hustle hay Balance?",
    description:
      "Bạn cùng phòng của T nghỉ ngơi, chơi game. T cảm thấy guilty vì không học. Đâu là suy nghĩ đúng?",
    options: [
      {
        key: "a",
        label: 'A. "Mình phải học — người khác nghỉ là lãng phí"',
        result: "mixed",
      },
      {
        key: "b",
        label:
          'B. "Nghỉ ngơi là một phần của quá trình — mâu thuẫn giữa học và nghỉ cần cân bằng"',
        result: "good",
      },
    ],
  },
];

const QUIZ_FEEDBACK = {
  good: "Phép biện chứng ủng hộ lựa chọn này: nhìn nhận mâu thuẫn, tìm điểm cân bằng thay vì cực đoan một phía. Đây là tư duy biện chứng trong thực tiễn.",
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
      'Phân tích văn hóa "cống hiến không ngừng" và tác động đến sức khỏe tâm thần của thế hệ trẻ.',
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

function useRoute() {
  const getRoute = () =>
    typeof window !== "undefined" && window.location.hash === "#/game"
      ? "game"
      : "home";
  const [route, setRoute] = useState(getRoute);
  useEffect(() => {
    const onHash = () => setRoute(getRoute());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  return route;
}

// ═══════════════════════════════════════════════════════════════════════════
// GAME CONSTANTS
// ═══════════════════════════════════════════════════════════════════════════
const BLACK_SWAN_SPAWN_RATE = 0.2;
const POLICY_CLUB_GPA_BUFF = 0.1;
const POLICY_DETOX_STRESS_REDUCTION = 5;
const POLICY_DETOX_GPA_PENALTY = 0.1;
const POLICY_PARTTIME_MONEY_BOOST = 8000;
const POLICY_PARTTIME_STRESS_PENALTY = 20;
const POLICY_PARTTIME_GPA_PENALTY = 0.3;
const SAVE_KEY = "hustleLoopSave";
const DEFAULT_STATS = { gpa: 3.0, mental: 80, money: 5000, stress: 30 };
const DEFAULT_LOGS = [
  "$ khởi-động --hustle-loop --sinh-viên T --học-kỳ 1",
  "› [KHỞI TẠO] Học kỳ mới bắt đầu. GPA mục tiêu: 3.5+",
  "› Tuần 1/12 — T tràn đầy năng lượng. Mọi thứ còn phía trước.",
];

const normalizeStats = (stats = {}) => ({
  gpa: Number.isFinite(stats.gpa) ? stats.gpa : DEFAULT_STATS.gpa,
  mental: Number.isFinite(stats.mental) ? stats.mental : DEFAULT_STATS.mental,
  money: Number.isFinite(stats.money) ? stats.money : DEFAULT_STATS.money,
  stress: Number.isFinite(stats.stress) ? stats.stress : DEFAULT_STATS.stress,
});

// Shuffle array utility
const shuffleArray = (array) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

// Local storage utilities
const loadGame = (
  setGameState,
  setQuarter,
  setStats,
  setHistory,
  setLogs,
  setEventIndex,
  setActivePolicies,
) => {
  try {
    const saved = localStorage.getItem(SAVE_KEY);
    if (saved) {
      const data = JSON.parse(saved);
      setGameState(data.gameState || "start");
      setQuarter(data.quarter || 1);
      setStats(normalizeStats(data.stats));
      setHistory(
        Array.isArray(data.history)
          ? data.history.map((entry) => normalizeStats(entry))
          : [DEFAULT_STATS],
      );
      setLogs(data.logs || DEFAULT_LOGS);
      setEventIndex(data.eventIndex || 0);
      setActivePolicies(data.activePolicies || []);
    }
  } catch (e) {}
};

const saveGame = (
  gameState,
  quarter,
  stats,
  history,
  logs,
  eventIndex,
  activePolicies,
) => {
  const data = {
    gameState,
    quarter,
    stats,
    history,
    logs,
    eventIndex,
    activePolicies,
  };
  localStorage.setItem(SAVE_KEY, JSON.stringify(data));
};

// ═══════════════════════════════════════════════════════════════════════════
// DỮ LIỆU SỰ KIỆN CHÍNH
// ═══════════════════════════════════════════════════════════════════════════
const GAME_EVENTS = [
  {
    id: 1,
    entity: "DEADLINE",
    entityColor: "#818cf8",
    entityBg: "rgba(129,140,248,0.15)",
    title: "5 deadline trong 3 ngày",
    description:
      'Lịch nộp bài chồng chéo như một cơn lũ. Mỗi môn đều "quan trọng". T không biết bắt đầu từ đâu.',
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
    background: "oil.webp",
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
    background: "telecom.webp",
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
    background: "God.webp",
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
    background: "Gar.webp",
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
    background: "God.webp",
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
const BLACK_SWANS = [
  {
    title: "Bệnh đột ngột giữa mùa thi",
    description:
      "T sốt cao 39 độ, phải nằm viện 3 ngày đúng tuần ôn thi quan trọng nhất.",
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
    description:
      "Mâu thuẫn với bạn cùng phòng leo thang. T phải tìm chỗ ở mới trong 1 tuần.",
    background: "shipping.webp",
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
    background: "telecom.webp",
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

const MACRO_POLICIES = [
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
// HELPERS & METER DEFS
// ═══════════════════════════════════════════════════════════════════════════
const METER_DEFS = [
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

function getFeedbackTone(impact = {}) {
  const risk =
    (impact.gpa < -0.2 ? 2 : impact.gpa < 0 ? 1 : 0) +
    (impact.mental < -15 ? 2 : impact.mental < 0 ? 1 : 0) +
    (impact.money < -500 ? 2 : impact.money < 0 ? 1 : 0) +
    (impact.stress > 25 ? 2 : impact.stress > 0 ? 1 : 0);
  const relief =
    (impact.gpa > 0 ? 1 : 0) +
    (impact.mental > 0 ? 1 : 0) +
    (impact.money > 0 ? 1 : 0) +
    (impact.stress < 0 ? 1 : 0);

  return risk > relief ? "bad" : "good";
}

function calculateLeadershipStyle(stats, history) {
  if (stats.mental >= 70 && stats.gpa >= 3.0 && stats.stress <= 60)
    return {
      label: "NGƯỜI HỌC BIỆN CHỨNG",
      style: "dialectics",
      desc: "Bạn hiểu mâu thuẫn và giải quyết nó bằng tư duy biện chứng — không cực đoan, không bỏ cuộc. T phiên bản của bạn đã tìm được cân bằng thực sự.",
    };
  if (stats.gpa >= 3.5 && stats.mental <= 40)
    return {
      label: "HUSTLER MẤT CÂN BẰNG",
      style: "hustle",
      desc: "GPA cao nhưng trả giá bằng sức khỏe tâm thần. Mâu thuẫn giữa hiệu suất và sức khỏe vẫn chưa được giải — cần vòng phủ định tiếp theo để tìm cân bằng cao hơn.",
    };
  if (stats.stress <= 40 && stats.mental >= 80)
    return {
      label: "NGƯỜI CÂN BẰNG",
      style: "balanced",
      desc: "T của bạn không đỉnh nhưng bền vững. Lượng tích lũy đủ, chất dần chuyển hóa — đây là hành trình dài hạn.",
    };
  return {
    label: "NGƯỜI VƯỢT KHÓ",
    style: "survivor",
    desc: "Vượt qua 12 tuần với đủ loại mâu thuẫn. Không hoàn hảo nhưng đứng vững — đó là thực tiễn kiểm nghiệm bản thân thật sự.",
  };
}

function CompactStatPill({ def, value }) {
  const safeValue = Number.isFinite(value) ? value : 0;
  const danger = def.danger(safeValue);
  const color = def.getColor(safeValue);
  const progressWidth = def.getWidth(safeValue);

  return (
    <div
      className={`psim-stat-pill ${danger ? "is-danger" : ""}`}
      title={`${def.hint}`}
    >
      <div className="psim-stat-pill-main">
        <span className="psim-stat-pill-icon">{def.icon}</span>
        <div className="psim-stat-pill-info">
          <span className="psim-stat-pill-label">{def.label}</span>
          <span
            className="psim-stat-pill-threshold"
            style={{ color: danger ? "#fca5a5" : "#94a3b8" }}
          >
            {def.limit}
          </span>
        </div>
        <span
          className="psim-stat-pill-value"
          style={{ color: danger ? "#ef4444" : color }}
        >
          {def.format(safeValue)}
        </span>
      </div>
      <div className="psim-stat-pill-bar-bg">
        <div
          className="psim-stat-pill-bar-fill"
          style={{ width: `${progressWidth}%`, backgroundColor: color }}
        />
        <div
          className="psim-stat-pill-marker"
          style={{ left: `${def.markerPos}%` }}
        />
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT — PolicySimGame
// ═══════════════════════════════════════════════════════════════════════════
function PolicySimGame() {
  const [gameState, setGameState] = useState("start");
  const [quarter, setQuarter] = useState(1);
  const [stats, setStats] = useState(DEFAULT_STATS);
  const [history, setHistory] = useState([DEFAULT_STATS]);
  const [logs, setLogs] = useState(DEFAULT_LOGS);
  const [eventIndex, setEventIndex] = useState(0);
  const [activePolicies, setActivePolicies] = useState([]);

  const [shuffledEvents, setShuffledEvents] = useState(
    shuffleArray(GAME_EVENTS),
  );

  useEffect(() => {
    loadGame(
      setGameState,
      setQuarter,
      setStats,
      setHistory,
      setLogs,
      setEventIndex,
      setActivePolicies,
    );
  }, []);

  const [currentBlackSwan, setCurrentBlackSwan] = useState(null);
  const [transitioning, setTransitioning] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [lastOutcome, setLastOutcome] = useState(null);
  const [executingLabel, setExecutingLabel] = useState("");
  const consoleRef = useRef(null);
  const outcomeTimerRef = useRef(null);

  useEffect(() => {
    if (consoleRef.current)
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
  }, [logs]);

  useEffect(
    () => () => {
      if (outcomeTimerRef.current) window.clearTimeout(outcomeTimerRef.current);
    },
    [],
  );

  const showOutcome = (payload) => {
    if (outcomeTimerRef.current) window.clearTimeout(outcomeTimerRef.current);
    setLastOutcome({ id: Date.now(), ...payload });
    outcomeTimerRef.current = window.setTimeout(
      () => setLastOutcome(null),
      3400,
    );
  };

  const resetGame = () => {
    SFX.bgm(false);
    setGameState("start");
    setQuarter(1);
    setStats(DEFAULT_STATS);
    setHistory([DEFAULT_STATS]);
    setLogs(DEFAULT_LOGS);
    setEventIndex(0);
    setActivePolicies([]);
    setShuffledEvents(shuffleArray(GAME_EVENTS));
    setCurrentBlackSwan(null);
    setTransitioning(false);
    setFeedback(null);
    setLastOutcome(null);
    localStorage.removeItem(SAVE_KEY);
  };

  const commitTurn = (newStats, logStrings, stayPhase = false) => {
    let fStats = normalizeStats(newStats);
    if (!stayPhase && activePolicies.includes("p_detox")) {
      fStats.stress = Math.max(
        0,
        parseFloat((fStats.stress - POLICY_DETOX_STRESS_REDUCTION).toFixed(2)),
      );
      fStats.gpa = parseFloat(
        (fStats.gpa - POLICY_DETOX_GPA_PENALTY).toFixed(2),
      );
      logStrings = [
        ...logStrings,
        "[HIỆU LỰC ĐẠO LUẬT] Thiền định giảm stress 5%, nhưng GPA hao 0.1.",
      ];
    }

    setStats(fStats);
    setHistory((p) => [...p, fStats]);
    setLogs((p) => [...p, ...logStrings]);

    setTimeout(
      () =>
        saveGame(
          gameState,
          quarter,
          fStats,
          history,
          logs,
          eventIndex,
          activePolicies,
        ),
      0,
    );

    // Check End
    let nextSt = "playing";
    let sLog = null;
    if (fStats.stress >= 100) {
      nextSt = "gameover_stress";
      sLog =
        "[SỰ CỐ NGHIÊM TRỌNG] Stress tích lũy vượt quá ngưỡng. Burnout toàn diện.";
      SFX.lose();
    } else if (fStats.mental <= 20) {
      nextSt = "gameover_mental";
      sLog =
        "[SỰ CỐ NGHIÊM TRỌNG] Sức khỏe tâm thần sụp đổ. Phải tạm dừng học.";
      SFX.lose();
    } else if (fStats.gpa <= 1.0) {
      nextSt = "gameover_gpa";
      sLog = "[SỰ CỐ NGHIÊM TRỌNG] GPA rớt xuống mức cảnh báo học vụ.";
      SFX.lose();
    } else if (fStats.money <= 0) {
      nextSt = "gameover_money";
      sLog =
        "[SỰ CỐ NGHIÊM TRỌNG] Tiền sinh hoạt cạn kiệt. Phải rời trường tạm thời.";
      SFX.lose();
    } else if (quarter >= 12) {
      if (fStats.mental >= 70 && fStats.gpa >= 3.0 && fStats.stress <= 60)
        nextSt = "won_perfect";
      else if (fStats.gpa >= 3.5 && fStats.mental <= 40) nextSt = "won_hustle";
      else if (fStats.stress <= 40 && fStats.mental >= 80) nextSt = "won_chill";
      else nextSt = "won_survive";
      sLog = "[HỆ THỐNG] ✓ Hoàn tất 12 tuần học kỳ. Đánh giá thành tích.";
      SFX.win();
    }

    if (sLog) setLogs((p) => [...p, sLog]);

    if (nextSt !== "playing") {
      SFX.bgm(false);
      setGameState(nextSt);
      setTransitioning(false);
      return;
    }
    if (stayPhase) {
      setGameState("playing");
      setTransitioning(false);
      return;
    }

    setTimeout(() => {
      const nQ = quarter + 1;
      setQuarter(nQ);
      setEventIndex((p) => p + 1);

      if (nQ === 4 || nQ === 8) {
        setGameState("policy");
        setLogs((p) => [
          ...p,
          `› [ĐIỂM NGUYNG DỪNG PHẢN SỰ] Thời điểm lựa chọn thay đổi lối sống lâu dài.`,
        ]);
      } else {
        if (Math.random() < BLACK_SWAN_SPAWN_RATE && nQ < 12) {
          const swan =
            BLACK_SWANS[Math.floor(Math.random() * BLACK_SWANS.length)];
          setCurrentBlackSwan(swan);
          setGameState("blackswan");
          setLogs((p) => [
            ...p,
            `› [⚠️ CẢNH BÁO TỐI KHẨN CẤP] Biến cố bất ngờ xuất hiện, cần xử lý trước khi tiếp tục tuần hiện tại.`,
          ]);
          SFX.alert();
        } else {
          setGameState("playing");
          const ev = shuffledEvents[(eventIndex + 1) % shuffledEvents.length];
          setLogs((p) => [...p, `› TUẦN ${nQ}/12 — ${ev.title}`]);
        }
      }
      setTransitioning(false);
    }, 800);
  };

  const handleChoice = (opt) => {
    if (transitioning) return;
    SFX.confirm();
    setTransitioning(true);
    setExecutingLabel(`Đang thực thi: ${opt.label}...`);
    setFeedback({
      id: `${Date.now()}-${opt.label}`,
      tone: getFeedbackTone(opt.impact),
    });
    window.setTimeout(() => setFeedback(null), 900);
    let imp = { ...opt.impact };
    if (activePolicies.includes("p_club") && imp.gpa > 0)
      imp.gpa += POLICY_CLUB_GPA_BUFF;

    const ns = {
      gpa: parseFloat((stats.gpa + imp.gpa).toFixed(2)),
      mental: parseFloat((stats.mental + imp.mental).toFixed(1)),
      money: parseFloat((stats.money + imp.money).toFixed(1)),
      stress: parseFloat((stats.stress + imp.stress).toFixed(2)),
    };
    showOutcome({
      kind: "Báo cáo sau quyết định",
      title: opt.label,
      tone: getFeedbackTone(opt.impact),
      before: stats,
      after: ns,
    });
    const dLog = `   GPA ${stats.gpa}→${ns.gpa}  |  Mental ${stats.mental}→${ns.mental}%  |  Money ${stats.money}→${ns.money}  |  Stress ${stats.stress}→${ns.stress}`;
    window.setTimeout(() => {
      setExecutingLabel("");
      commitTurn(ns, [opt.logStr, dLog]);
    }, 1200);
  };

  const handlePolicy = (pol) => {
    SFX.law();
    setActivePolicies((p) => [...p, pol.id]);
    setExecutingLabel(`Áp dụng: ${pol.title}...`);
    window.setTimeout(() => {
      setExecutingLabel("");
      setGameState("playing");
      setLogs((p) => [...p, `[LỐI SỐNG] Áp dụng: ${pol.title}`]);
      if (pol.id === "p_parttime") {
        const ns = {
          ...stats,
          money: stats.money + POLICY_PARTTIME_MONEY_BOOST,
          stress: stats.stress + POLICY_PARTTIME_STRESS_PENALTY,
          gpa: stats.gpa - POLICY_PARTTIME_GPA_PENALTY,
        };
        showOutcome({
          kind: "Hiệu lực lối sống",
          title: pol.title,
          tone: getFeedbackTone({
            gpa: -0.3,
            mental: 0,
            money: 8000,
            stress: 20,
          }),
          before: stats,
          after: ns,
        });
        commitTurn(
          ns,
          [
            "[THỰC THI] Tiền về ổn định +8M. Stress tăng và GPA hao do bận rộn.",
          ],
          true,
        );
      }
    }, 1200);
  };

  const handleBlackSwanAck = () => {
    if (transitioning || !currentBlackSwan) return;
    SFX.confirm();
    setTransitioning(true);
    const sw = currentBlackSwan;
    setExecutingLabel(`Phản ứng biến cố: ${sw.title}...`);
    const swanTone = getFeedbackTone(sw.impact);
    setFeedback({ id: `${Date.now()}-${sw.title}`, tone: swanTone });
    window.setTimeout(() => setFeedback(null), 900);
    const ns = {
      cpi: parseFloat((stats.cpi + sw.impact.cpi).toFixed(2)),
      cov: parseFloat((stats.cov + sw.impact.cov).toFixed(1)),
      roic: parseFloat((stats.roic + sw.impact.roic).toFixed(2)),
      bud: parseFloat((stats.bud + sw.impact.bud).toFixed(1)),
    };
    showOutcome({
      kind: swanTone === "good" ? "Cơ hội từ biến cố" : "Thiệt hại từ biến cố",
      title: sw.title,
      tone: swanTone,
      before: stats,
      after: ns,
    });
    window.setTimeout(() => {
      setExecutingLabel("");
      setCurrentBlackSwan(null);
      commitTurn(ns, [sw.logStr], true);
    }, 1200);
  };

  // Màn hình Game Over / Win Premium
  const EndScreen = () => {
    const isWin = gameState.startsWith("won");
    const dict = {
      won_perfect: {
        i: "👑",
        c: "#22c55e",
        t: "Phủ định của Phủ định",
        d: "T đã vượt qua mâu thuẫn và tìm thấy cân bằng thực sự. Không phải T cũ trở về — đây là T mới, ở tầm cao hơn.",
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
    };
    const loss = {
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
    const c = isWin ? dict[gameState] : { ...loss[gameState], c: "#ef4444" };
    const style = isWin
      ? calculateLeadershipStyle(history[history.length - 1], history)
      : null;

    return (
      <div
        style={{
          animation: "fadeSlide 0.8s cubic-bezier(0.16,1,0.3,1)",
          padding: "10px",
        }}
      >
        <div style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
          <div
            style={{
              display: "inline-block",
              padding: "8px 20px",
              borderRadius: "999px",
              background: `${c.c}15`,
              color: c.c,
              fontWeight: 900,
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              fontSize: "0.8rem",
            }}
          >
            {isWin ? "HỌC KỲ HOÀN TẤT" : "PHẢI TẠM NGHỈ HỌC"}
          </div>
          {style && (
            <div
              style={{
                display: "inline-block",
                padding: "8px 20px",
                borderRadius: "999px",
                background: "rgba(255,255,255,0.1)",
                color: "white",
                fontWeight: 900,
                fontSize: "0.8rem",
                letterSpacing: "0.05em",
              }}
            >
              💎 {style.label}
            </div>
          )}
        </div>

        <div
          style={{
            display: "flex",
            gap: "20px",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <span
            style={{
              fontSize: "5rem",
              filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.5))",
            }}
          >
            {c.i}
          </span>
          <h1
            style={{
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              color: "white",
              margin: 0,
              lineHeight: 1.1,
              fontFamily: "Manrope",
              fontWeight: 900,
            }}
          >
            {c.t}
          </h1>
        </div>
        <p
          style={{
            color: "#94a3b8",
            fontSize: "1.1rem",
            lineHeight: 1.7,
            maxWidth: "600px",
            fontFamily: "Source Serif 4, serif",
            marginBottom: "24px",
          }}
        >
          {style ? style.desc : c.d}
        </p>

        <div
          style={{
            display: "flex",
            gap: "24px",
            marginTop: "32px",
            padding: "24px",
            background: "rgba(255,255,255,0.03)",
            borderRadius: "16px",
            border: "1px solid rgba(255,255,255,0.08)",
            flexWrap: "wrap",
          }}
        >
          {[
            {
              l: "GPA",
              v: history[history.length - 1].gpa.toFixed(1),
              c: "#22c55e",
            },
            {
              l: "Sức khỏe tâm thần",
              v: history[history.length - 1].mental.toFixed(0) + "%",
              c: "#06b6d4",
            },
            {
              l: "Tiền (triệu)",
              v: (history[history.length - 1].money / 1000).toFixed(1),
              c: "#f59e0b",
            },
            {
              l: "Stress",
              v: history[history.length - 1].stress.toFixed(0) + "%",
              c: "#ef4444",
            },
          ].map((s) => (
            <div key={s.l} style={{ flex: 1, minWidth: "120px" }}>
              <div
                style={{
                  fontSize: "0.75rem",
                  color: "#64748b",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  marginBottom: "8px",
                  letterSpacing: "0.05em",
                }}
              >
                {s.l}
              </div>
              <div style={{ fontSize: "1.5rem", fontWeight: 900, color: s.c }}>
                {s.v}
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={() => {
            initAudio();
            SFX.click();
            resetGame();
          }}
          style={{
            marginTop: "40px",
            padding: "18px 40px",
            borderRadius: "16px",
            border: "none",
            background: "linear-gradient(145deg, #c3282d, #8b0e12)",
            color: "white",
            fontWeight: 800,
            fontSize: "1rem",
            letterSpacing: "0.05em",
            cursor: "pointer",
            boxShadow: "0 10px 30px rgba(195,40,45,0.4)",
            transition: "transform 0.2s",
          }}
          onMouseOver={(e) => {
            SFX.hover();
            e.currentTarget.style.transform = "translateY(-4px)";
          }}
          onMouseOut={(e) =>
            (e.currentTarget.style.transform = "translateY(0)")
          }
        >
          🔄 THỬ LẠI TỪ TUẦN 1
        </button>
      </div>
    );
  };

  // UI Framework
  const pgStyle = {
    minHeight: "100dvh",
    background: "linear-gradient(135deg, #020617 0%, #0f172a 100%)",
    display: "flex",
    flexDirection: "column",
    color: "white",
    fontFamily: "Manrope, sans-serif",
  };
  const navStyle = {
    padding: "20px 48px",
    borderBottom: "1px solid rgba(255,255,255,0.05)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backdropFilter: "blur(10px)",
  };

  if (gameState === "start") {
    return (
      <div
        style={{
          ...pgStyle,
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
          padding: "40px 20px",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-20%",
            right: "-10%",
            width: "600px",
            height: "600px",
            background:
              "radial-gradient(circle, rgba(195,40,45,0.15) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div
          style={{
            zIndex: 10,
            background: "rgba(15,23,42,0.6)",
            backdropFilter: "blur(20px)",
            padding: "clamp(32px, 5vw, 64px)",
            borderRadius: "32px",
            border: "1px solid rgba(255,255,255,0.08)",
            maxWidth: "850px",
            textAlign: "center",
            boxShadow: "0 40px 100px rgba(0,0,0,0.5)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "inline-block",
              padding: "6px 16px",
              borderRadius: "999px",
              background: "rgba(30,127,212,0.15)",
              color: "#3b82f6",
              fontWeight: 900,
              marginBottom: "20px",
              letterSpacing: "0.1em",
              fontSize: "0.8rem",
            }}
          >
            NHÓM 7 MLN111
          </div>

          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 900,
              margin: "0 0 20px",
              lineHeight: 1.1,
              background: "linear-gradient(to right, #ffffff, #94a3b8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            HUSTLE LOOP
          </h1>

          <p
            style={{
              fontSize: "1.1rem",
              color: "#94a3b8",
              marginBottom: "32px",
              lineHeight: 1.7,
              fontFamily: "Source Serif 4, serif",
              maxWidth: "90%",
            }}
          >
            Bạn là Sinh viên T — năm 2 đại học. Phải cân bằng GPA, sức khỏe tâm
            thần, tài chính và stress qua 12 tuần học kỳ. Mỗi quyết định phản
            ánh một khái niệm triết học.
          </p>

          <div
            style={{
              display: "flex",
              gap: "12px",
              marginBottom: "32px",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            {[
              {
                i: "📚",
                l: "GPA",
                d: "Điểm học kỳ",
                w: "Thua nếu ≤ 1.0",
                c: "#22c55e",
              },
              {
                i: "🧠",
                l: "MENTAL",
                d: "Sức khỏe",
                w: "Thua nếu ≤ 20%",
                c: "#06b6d4",
              },
              {
                i: "💸",
                l: "TÀI CHÍNH",
                d: "Tiền tiết kiệm",
                w: "Thua nếu ≤ 0",
                c: "#f59e0b",
              },
              {
                i: "⚡",
                l: "STRESS",
                d: "Áp lực tích lũy",
                w: "Thua nếu ≥ 100%",
                c: "#ef4444",
              },
            ].map((k) => (
              <div
                key={k.l}
                style={{
                  flex: 1,
                  minWidth: 0,
                  background: "rgba(255,255,255,0.03)",
                  padding: "12px 8px",
                  borderRadius: "16px",
                  border: "1px solid rgba(255,255,255,0.05)",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "6px",
                  transition: "transform 0.2s",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "translateY(-4px)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "translateY(0)")
                }
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    justifyContent: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <span style={{ fontSize: "1.5rem" }}>{k.i}</span>
                  <span
                    style={{
                      fontSize: "0.8rem",
                      fontWeight: 800,
                      color: k.c,
                      letterSpacing: "0.02em",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {k.l}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: "0.75rem",
                    color: "#94a3b8",
                    lineHeight: 1.3,
                    whiteSpace: "nowrap",
                  }}
                >
                  {k.d}
                </div>
                <div
                  style={{
                    fontSize: "0.7rem",
                    color: "#ef4444",
                    fontWeight: 700,
                    opacity: 0.8,
                    whiteSpace: "nowrap",
                  }}
                >
                  {k.w}
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              background: "rgba(30,127,212,0.05)",
              border: "1px solid rgba(30,127,212,0.2)",
              borderRadius: "16px",
              padding: "20px 24px",
              textAlign: "left",
              marginBottom: "40px",
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            <h3
              style={{
                margin: "0 0 12px 0",
                color: "#60a5fa",
                fontSize: "0.95rem",
                fontWeight: 800,
                letterSpacing: "0.05em",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span>📖</span> HƯỚNG DẪN CƠ BẢN
            </h3>
            <ul
              style={{
                margin: 0,
                paddingLeft: "24px",
                color: "#cbd5e1",
                fontSize: "0.95rem",
                lineHeight: 1.6,
                fontFamily: "Source Serif 4, serif",
              }}
            >
              <li style={{ marginBottom: "8px" }}>
                Mỗi Tuần bạn sẽ đối mặt với 1 sự kiện, hoặc 1 biến cố{" "}
                <b>bất ngờ</b> căng thẳng.
              </li>
              <li style={{ marginBottom: "8px" }}>
                Quyết định đưa ra luôn phải đánh đổi: ví dụ bảo vệ <b>Mental</b>{" "}
                thường lấy đi <b>GPA</b>.
              </li>
              <li style={{ marginBottom: "8px" }}>
                Ở <b>Tuần 4</b> và <b>Tuần 8</b>, bạn được chọn 1{" "}
                <b>thay đổi lối sống</b> để hỗ trợ học kỳ.
              </li>
              <li>
                Mục tiêu: Vượt qua <b>12 tuần</b> mà không để chỉ số nào chạm
                ngưỡng nguy hiểm. Tùy theo các chỉ số khi kết thúc, bạn sẽ đạt
                được các danh hiệu khác nhau.
              </li>
            </ul>
          </div>

          <button
            onClick={() => {
              initAudio();
              SFX.click();
              SFX.bgm(true);
              setGameState("playing");
            }}
            style={{
              padding: "20px 48px",
              background: "linear-gradient(135deg, #c3282d, #8b0e12)",
              color: "white",
              border: "none",
              borderRadius: "16px",
              fontSize: "1.1rem",
              fontWeight: 900,
              letterSpacing: "0.1em",
              cursor: "pointer",
              boxShadow: "0 20px 50px rgba(195,40,45,0.4)",
              transition: "all 0.3s",
            }}
            onMouseOver={(e) => {
              SFX.hover();
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow =
                "0 30px 60px rgba(195,40,45,0.6)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow =
                "0 20px 50px rgba(195,40,45,0.4)";
            }}
          >
            BẮT ĐẦU
          </button>
        </div>
      </div>
    );
  }

  const currentEvent = shuffledEvents[eventIndex % shuffledEvents.length];
  const ce = currentEvent;
  const sceneEvent =
    gameState === "blackswan" && currentBlackSwan ? currentBlackSwan : ce;

  return (
    <div className="psim-cinema-root">
      <EffectOverlay feedback={feedback} />
      <OutcomePanel outcome={lastOutcome} />

      {/* ── Fullscreen Background Scene ── */}
      <EventScene
        event={sceneEvent}
        quarter={quarter}
        transitioning={transitioning}
      />

      {/* ── Top HUD Bar ── */}
      <header className="psim-hud-bar">
        <a
          href="#/"
          className="psim-hud-back"
          onClick={() => SFX.bgm(false)}
          onMouseOver={() => SFX.hover()}
        >
          ← VỀ TRANG CHỦ
        </a>

        <div className="psim-hud-timeline">
          {Array.from({ length: 12 }, (_, i) => i + 1).map((q) => {
            const isPolicy = q === 4 || q === 8;
            const cls =
              q < quarter ? "done" : q === quarter ? "current" : "future";
            return (
              <span
                key={q}
                className={`psim-hud-dot ${cls} ${isPolicy ? "policy" : ""}`}
                title={isPolicy ? `Tuần ${q}: Thay đổi lối sống` : `Tuần ${q}`}
              >
                {isPolicy ? "📋" : q}
              </span>
            );
          })}
        </div>

        <div className="psim-hud-stats">
          {METER_DEFS.map((def) => (
            <CompactStatPill key={def.key} def={def} value={stats[def.key]} />
          ))}
          {activePolicies.length > 0 && (
            <div className="psim-hud-laws">
              {activePolicies.map((id) => {
                const pol = MACRO_POLICIES.find((p) => p.id === id);
                return pol ? (
                  <div key={id} className="psim-law-tag" title={pol.effect}>
                    <span className="psim-law-tag-icon">{pol.icon}</span>
                    <div className="psim-law-tag-content">
                      <span className="psim-law-tag-label">{pol.title}</span>
                      <span className="psim-law-tag-summary">
                        {pol.summary}
                      </span>
                    </div>
                  </div>
                ) : null;
              })}
            </div>
          )}
        </div>
      </header>

      {/* ── Implementation Status Message ── */}
      {executingLabel && (
        <div className="psim-status-msg">
          <span>{executingLabel}</span>
        </div>
      )}

      {/* ── Content Layer (overlaid on scene) ── */}
      <div
        className={`psim-cinema-content ${transitioning ? "is-frozen" : ""}`}
      >
        {/* PLAYING */}
        {gameState === "playing" && (
          <div className="psim-cinema-playing" aria-live="polite">
            <div className="psim-cinema-event-info">
              <div className="psim-cinema-badges">
                <span
                  className="psim-event-chip"
                  style={{
                    background: ce.entityBg,
                    border: `1px solid ${ce.entityColor}40`,
                    color: ce.entityColor,
                  }}
                >
                  {ce.entity}
                </span>
                <span className="psim-quarter-chip">TUẦN {quarter} / 12</span>
              </div>
              <h1 className="psim-cinema-title">{ce.title}</h1>
              <p className="psim-cinema-desc">{ce.desc || ce.description}</p>
            </div>
            <div className="psim-cinema-decisions">
              {ce.options.map((opt, i) => (
                <DecisionCard
                  key={`${ce.id}-${i}`}
                  option={opt}
                  index={i}
                  disabled={transitioning}
                  onHover={() => SFX.hover()}
                  onSelect={() => handleChoice(opt)}
                />
              ))}
            </div>
          </div>
        )}

        {/* BLACK SWAN */}
        {gameState === "blackswan" && currentBlackSwan && (
          <div className="psim-cinema-playing" aria-live="assertive">
            <div className="psim-cinema-event-info">
              <div className="psim-cinema-badges">
                <span className="psim-crisis-label">⚠ SỰ KIỆN BẤT NGỜ </span>
              </div>
              <h1 className="psim-cinema-title">
                {currentBlackSwan.title} {currentBlackSwan.emoji}
              </h1>
              <p className="psim-cinema-desc">
                {currentBlackSwan.desc || currentBlackSwan.description}
              </p>
              <ImpactPreview
                impact={currentBlackSwan.impact}
                showZero={false}
              />
            </div>
            <div className="psim-cinema-decisions psim-cinema-decisions--single">
              <button
                className="psim-crisis-button"
                type="button"
                disabled={transitioning}
                onClick={handleBlackSwanAck}
                onMouseOver={() => SFX.hover()}
              >
                {getFeedbackTone(currentBlackSwan.impact) === "good"
                  ? "✓ TIẾP NHẬN CƠ HỘI"
                  : "⚡ KÍCH HOẠT QUY TRÌNH CHỐNG CHỊU"}
              </button>
            </div>
          </div>
        )}

        {/* POLICY */}
        {gameState === "policy" && (
          <div className="psim-cinema-policy">
            <div className="psim-policy-label">
              📋 THAY ĐỔI LỐI SỐNG · TUẦN {quarter}
            </div>
            <h1 className="psim-cinema-title">Lựa chọn Lối sống Lâu dài</h1>
            <p className="psim-cinema-desc" style={{ marginBottom: "24px" }}>
              Chọn 1 thay đổi lối sống. Hiệu lực kéo dài đến hết học kỳ.
            </p>
            <div className="psim-policy-grid">
              {MACRO_POLICIES.filter((p) => !activePolicies.includes(p.id)).map(
                (p) => (
                  <button
                    key={p.id}
                    className="psim-policy-card"
                    type="button"
                    onClick={() => handlePolicy(p)}
                    onMouseOver={() => SFX.hover()}
                  >
                    <div className="psim-policy-card-head">
                      <span>{p.icon}</span>
                      <strong>{p.title}</strong>
                    </div>
                    <p>{p.desc}</p>
                    <small>{p.effect}</small>
                  </button>
                ),
              )}
            </div>
          </div>
        )}

        {/* END SCREEN */}
        {(gameState.startsWith("gameover") || gameState.startsWith("won")) && (
          <div className="psim-cinema-endscreen">
            <EndScreen />
          </div>
        )}
      </div>
    </div>
  );
}
function App() {
  const route = useRoute();
  const [activeTheoryId, setActiveTheoryId] = useState(THEORY_ITEMS[0].id);
  const [modalGroupId, setModalGroupId] = useState(null);
  const [openAccordions, setOpenAccordions] = useState([SOLUTION_ITEMS[0].id]);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState(NAV_ITEMS[0].id);

  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) return savedTheme;
      return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
    }
    return "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const activeTheory = useMemo(
    () =>
      THEORY_ITEMS.find((item) => item.id === activeTheoryId) ||
      THEORY_ITEMS[0],
    [activeTheoryId],
  );

  const modalGroup = useMemo(
    () => GROUP_ITEMS.find((item) => item.id === modalGroupId) || null,
    [modalGroupId],
  );

  const quizStats = useMemo(() => {
    const answers = Object.values(quizAnswers);
    const good = answers.filter((item) => item.result === "good").length;
    const mixed = answers.filter((item) => item.result === "mixed").length;
    return { good, mixed, answered: answers.length };
  }, [quizAnswers]);

  useEffect(() => {
    if (route !== "home") {
      return undefined;
    }

    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const percent = total > 0 ? (window.scrollY / total) * 100 : 0;
      const nextProgress = Math.min(Math.max(percent, 0), 100);
      setScrollProgress((prev) =>
        Math.abs(prev - nextProgress) > 0.2 ? nextProgress : prev,
      );

      const offset = window.scrollY + 180;
      let current = NAV_ITEMS[0].id;

      NAV_ITEMS.forEach((item) => {
        const section = document.getElementById(item.id);
        if (section && offset >= section.offsetTop) {
          current = item.id;
        }
      });

      setActiveSection((prev) => (prev === current ? prev : current));
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [route]);

  useEffect(() => {
    if (route !== "home") {
      return undefined;
    }

    const revealElements = document.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    revealElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [route]);

  useEffect(() => {
    if (!modalGroupId) {
      return undefined;
    }

    const onEsc = (event) => {
      if (event.key === "Escape") {
        setModalGroupId(null);
      }
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onEsc);

    return () => {
      document.removeEventListener("keydown", onEsc);
      document.body.style.overflow = prevOverflow;
    };
  }, [modalGroupId]);

  const toggleAccordion = (id) => {
    setOpenAccordions((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const chooseOption = (scenarioId, optionKey, result) => {
    setQuizAnswers((prev) => ({
      ...prev,
      [scenarioId]: { optionKey, result },
    }));
  };

  if (route === "game") {
    return <PolicySimGame />;
  }

  return (
    <>
      <div className="progress-wrap" aria-hidden="true">
        <div className="progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <header className="site-nav">
        <div className="nav-inner">
          <div className="brand">
            <span className="brand-badge">
              <div className="brand-badge-ico">☭</div>
            </span>
            <span>Triết học Mác–Lênin</span>
          </div>
          <nav className="nav-links">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`nav-link ${activeSection === item.id ? "active" : ""}`}
              >
                {item.label}
              </a>
            ))}
            <button
              onClick={toggleTheme}
              className="nav-link"
              style={{ background: "transparent", border: "1px solid var(--border)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: "6px 12px" }}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M440-760v-160h80v160h-80Zm266 110-55-55 112-115 56 57-113 113Zm54 210v-80h160v80H760ZM440-40v-160h80v160h-80ZM254-652 140-763l57-56 113 113-56 54Zm508 512L651-255l54-54 114 110-57 59ZM40-440v-80h160v80H40Zm157 300-56-57 112-112 29 27 29 28-114 114Zm113-170q-70-70-70-170t70-170q70-70 170-70t170 70q70 70 70 170t-70 170q-70 70-170 70t-170-70Zm283-57q47-47 47-113t-47-113q-47-47-113-47t-113 47q-47 47-47 113t47 113q47 47 113 47t113-47ZM480-480Z" /></svg> : <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="black"><path d="M484-80q-84 0-157.5-32t-128-86.5Q144-253 112-326.5T80-484q0-146 93-257.5T410-880q-18 99 11 193.5T521-521q71 71 165.5 100T880-410q-26 144-138 237T484-80Zm0-80q88 0 163-44t118-121q-86-8-163-43.5T464-465q-61-61-97-138t-43-163q-77 43-120.5 118.5T160-484q0 135 94.5 229.5T484-160Zm-20-305Z" /></svg>}
            </button>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero" id="hero">
          <div className="hero-grid">
            <div className="hero-copy" data-reveal="">
              <p className="kicker">MLN111 · Nhóm 7 · Chương II</p>
              <h1 className="hero-title">
                Sinh viên T và vòng xoáy Hustle:
                <span className="hero-title-alt"> khi lượng tích lũy đủ</span>
                <span className="hero-divider"> </span>
                <span className="hero-title-alt strike"> — chất thay đổi</span>
              </h1>
              <p className="hero-lede">
                Một góc nhìn từ Phép biện chứng duy vật Mác–Lênin về áp lực học
                tập, burnout và hành trình tìm lại bản thân của thế hệ sinh viên
                hiện đại.
              </p>
              <div className="hero-actions">
                <a href="#bienchinh" className="btn-primary">
                  Bắt đầu chuyên đề
                </a>
                <a href="#/game" className="btn-ghost">
                  GAME GÔ
                </a>
              </div>

              <ul className="hero-stats" aria-label="Số liệu khái quát">
                {HERO_STATS.map((item) => (
                  <li key={item.label}>
                    <p className="hs-value">{item.value}</p>
                    <p className="hs-label">{item.label}</p>
                  </li>
                ))}
              </ul>
            </div>

            <aside className="hero-aside" data-reveal="" aria-hidden="true">
              <div className="aside-card">
                <span className="aside-chip">MLN111 · Triết học Mác–Lênin</span>
                <ol className="aside-list">
                  <li>Phép biện chứng duy vật</li>
                  <li>Các cặp phạm trù cơ bản</li>
                  <li>Ba quy luật biện chứng</li>
                  <li>Lý luận nhận thức</li>
                  <li>Thực tiễn &amp; Nhận thức</li>
                </ol>
                <p className="aside-note">
                  Triết học không trừu tượng — nó là công cụ để hiểu chính hành
                  trình của bạn.
                </p>
              </div>
            </aside>
          </div>
        </section>

        <div className="marquee" aria-hidden="true">
          <div className="marquee-track">
            {[...MARQUEE_TOKENS, ...MARQUEE_TOKENS].map((token, idx) => (
              <span key={`${token}-${idx}`} className="marquee-item">
                <span className="marquee-dot" /> {token}
              </span>
            ))}
          </div>
        </div>

        <section id="bienchinh">
          <div className="container">
            <div className="section-head" data-reveal="">
              <p className="section-tag">Nền tảng triết học</p>
              <h2 className="section-title">Phép biện chứng duy vật là gì?</h2>
              <p className="section-sub">
                Nhấn từng luận điểm để xem diễn giải ngắn và ví dụ từ cuộc sống
                sinh viên.
              </p>
            </div>

            <div className="theory-grid">
              <div className="theory-cards" data-reveal="">
                {THEORY_ITEMS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={`theory-card ${activeTheoryId === item.id ? "active" : ""}`}
                    onClick={() => setActiveTheoryId(item.id)}
                  >
                    <div className="theory-icon">{item.index}</div>
                    <h3>{item.cardTitle}</h3>
                    <p>{item.cardSummary}</p>
                  </button>
                ))}
              </div>

              <article className="theory-panel" data-reveal="">
                <img src={activeTheory.image} alt={activeTheory.alt} />
                <div className="theory-content">
                  <h4>{activeTheory.detailTitle}</h4>
                  <p>{activeTheory.detailText}</p>
                  <p className="callout">{activeTheory.example}</p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="reality" id="phamtru">
          <div className="container">
            <div className="section-head" data-reveal="">
              <p className="section-tag">Công cụ triết học</p>
              <h2 className="section-title">
                Sáu cặp phạm trù cơ bản nhìn từ đời sinh viên
              </h2>
              <p className="section-sub">
                Nhấn từng thẻ để xem phân tích chi tiết qua trải nghiệm thực tế
                của Sinh viên T.
              </p>
            </div>

            <div className="reality-grid">
              {GROUP_ITEMS.map((item) => (
                <article
                  key={item.id}
                  className="group-card"
                  role="button"
                  tabIndex={0}
                  data-reveal=""
                  onClick={() => setModalGroupId(item.id)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setModalGroupId(item.id);
                    }
                  }}
                >
                  <div className="group-thumb">
                    <span className="pill">{item.sector}</span>
                    <img src={item.image} alt={item.alt} />
                  </div>
                  <div className="group-body">
                    <h3>{item.name}</h3>
                    <p className="group-full">{item.fullName}</p>
                    <p>{item.summary}</p>
                    <span className="group-more">Xem chi tiết →</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="quyluat">
          <div className="container">
            <div className="section-head" data-reveal="">
              <p className="section-tag">Ba quy luật biện chứng</p>
              <h2 className="section-title">
                Ba quy luật cơ bản của phép biện chứng duy vật
              </h2>
              <p className="section-sub">
                Một góc nhìn đối chiếu giữa lý thuyết và thực tiễn đời sống sinh
                viên.
              </p>
            </div>

            {/* Ghi đè CSS grid cũ để tự động chia thành 3 cột đều nhau */}
            <div
              className="analysis-wrap"
              style={{
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "30px",
              }}
            >
              <article
                className="analysis-col"
                data-reveal=""
                style={{ background: "rgba(255,255,255,0.03)" }}
              >
                <div className="analysis-image">
                  <img
                    src="/assets/events/vi-du-ve-mat-doi-lap-cua-mau-thuan_1.webp"
                    alt="Quy luật mâu thuẫn"
                  />
                </div>
                <div className="analysis-content">
                  <h3 style={{ fontSize: "1.2rem", lineHeight: "1.4" }}>
                    1. Thống nhất & Đấu tranh của các mặt đối lập
                  </h3>
                  <ul>
                    <li>
                      <span className="dot plus">›</span>
                      <span>
                        <b>Lý thuyết:</b> Mọi sự vật đều chứa mặt đối lập; mâu
                        thuẫn là động lực phát triển.
                      </span>
                    </li>
                    <li>
                      <span className="dot plus">›</span>
                      <span>
                        <b>Thực tiễn:</b> Mâu thuẫn giữa việc cày điểm (hustle)
                        và nhu cầu nghỉ ngơi (balance) buộc sinh viên phải tìm
                        ra cách quản lý bản thân hiệu quả hơn.
                      </span>
                    </li>
                  </ul>
                </div>
              </article>

              <article
                className="analysis-col"
                data-reveal=""
                style={{ background: "rgba(255,255,255,0.03)" }}
              >
                <div className="analysis-image">
                  <img
                    src="https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=800&q=80"
                    alt="Lượng đổi chất đổi"
                  />
                </div>
                <div className="analysis-content">
                  <h3 style={{ fontSize: "1.2rem", lineHeight: "1.4" }}>
                    2. Chuyển hóa Lượng thành Chất
                  </h3>
                  <ul>
                    <li>
                      <span className="dot plus">›</span>
                      <span>
                        <b>Lý thuyết:</b> Tích lũy đủ về lượng sẽ dẫn đến sự
                        nhảy vọt về chất khi đạt điểm nút.
                      </span>
                    </li>
                    <li>
                      <span className="dot plus">›</span>
                      <span>
                        <b>Thực tiễn:</b> Học nhồi nhét 1 đêm không thể giỏi
                        ngay. Tích lũy từng bài học nhỏ mỗi ngày (Lượng) mới tạo
                        ra tư duy nhạy bén thực sự (Chất).
                      </span>
                    </li>
                  </ul>
                </div>
              </article>

              <article
                className="analysis-col"
                data-reveal=""
                style={{ background: "rgba(255,255,255,0.03)" }}
              >
                <div className="analysis-image">
                  <img
                    src="/assets/events/phu-dinh.webp"
                    alt="Phủ định của phủ định"
                  />
                </div>
                <div className="analysis-content">
                  <h3 style={{ fontSize: "1.2rem", lineHeight: "1.4" }}>
                    3. Phủ định của Phủ định
                  </h3>
                  <ul>
                    <li>
                      <span className="dot plus">›</span>
                      <span>
                        <b>Lý thuyết:</b> Sự phát triển mang tính xoáy ốc; cái
                        mới ra đời từ cái cũ nhưng ở trình độ cao hơn.
                      </span>
                    </li>
                    <li>
                      <span className="dot plus">›</span>
                      <span>
                        <b>Thực tiễn:</b> Trải qua burnout (phủ định) → Thay đổi
                        lối sống → Trở thành một phiên bản trưởng thành hơn chứ
                        không quay lại làm sinh viên năm nhất ngây thơ.
                      </span>
                    </li>
                  </ul>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section id="lyluan">
          <div className="container">
            <div className="section-head" data-reveal="">
              <p className="section-tag">Vòng lặp nhận thức</p>
              <h2 className="section-title">
                Lý luận nhận thức: Thực tiễn → Nhận thức → Thực tiễn
              </h2>
              <p className="section-sub">
                Mở từng giai đoạn để xem hành trình nhận thức của Sinh viên T và
                ý nghĩa triết học.
              </p>
            </div>

            <div className="solution-layout">
              <figure className="solution-image" data-reveal="">
                <img
                  src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1400&q=80"
                  alt="Bối cảnh hoạch định chính sách và cải cách thể chế kinh tế"
                />
                <figcaption className="solution-note">
                  Cải cách hiệu quả không chỉ là bán vốn, mà là thiết kế lại cơ
                  chế giám sát, động lực và trách nhiệm giải trình.
                </figcaption>
              </figure>

              <div className="accordion" data-reveal="">
                {SOLUTION_ITEMS.map((item) => {
                  const isOpen = openAccordions.includes(item.id);
                  return (
                    <article
                      key={item.id}
                      className={`acc-item ${isOpen ? "open" : ""}`}
                    >
                      <button
                        className="acc-head"
                        type="button"
                        onClick={() => toggleAccordion(item.id)}
                      >
                        <h4>{item.title}</h4>
                        <span className="acc-icon">+</span>
                      </button>
                      {isOpen && (
                        <div className="acc-body">
                          {item.explanation}
                          <br />
                          <span className="benefit">{item.benefit}</span>
                          <br />
                          {item.implication}
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="game-teaser" id="game">
          <div className="container">
            <div className="teaser-card" data-reveal="">
              <div className="teaser-left">
                <p className="section-tag light">Trải nghiệm tương tác</p>
                <h2 className="teaser-title">
                  Bước vào ghế điều hành — và thử cân bằng ba mục tiêu trong 12
                  quý.
                </h2>
                <p className="teaser-sub">
                  Một mini-game mô phỏng đang được phát triển: bạn đóng vai
                  người hoạch định chính sách của một tập đoàn nhà nước, điều
                  chỉnh giá, đầu tư, trợ cấp trước các cú sốc vĩ mô.
                </p>
                <div className="teaser-actions">
                  <a href="#/game" className="btn-primary">
                    Vào trang chờ mini-game
                  </a>
                  <span className="teaser-chip">
                    Engine đang phát triển · nhóm kỹ thuật
                  </span>
                </div>
              </div>
              <div className="teaser-visual" aria-hidden="true">
                <div className="tv-grid">
                  <div className="tv-tile">
                    <p className="tv-label">GPA</p>
                    <p className="tv-value">3.2</p>
                    <div className="tv-bar">
                      <span style={{ width: "80%" }} />
                    </div>
                  </div>
                  <div className="tv-tile tv-dark">
                    <p className="tv-label">Mental</p>
                    <p className="tv-value">65%</p>
                    <div className="tv-bar">
                      <span style={{ width: "65%" }} />
                    </div>
                  </div>
                  <div className="tv-tile">
                    <p className="tv-label">Money</p>
                    <p className="tv-value">3.5M</p>
                    <div className="tv-bar">
                      <span style={{ width: "55%" }} />
                    </div>
                  </div>
                  <div className="tv-tile tv-accent">
                    <p className="tv-label">Stress</p>
                    <p className="tv-value">45%</p>
                    <div className="tv-bar">
                      <span style={{ width: "45%" }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="quiz">
          <div className="container">
            <div className="section-head" data-reveal="">
              <p className="section-tag">Thảo luận lớp học</p>
              <h2 className="section-title">Bạn sẽ chọn như T?</h2>
              <p className="section-sub">
                Mỗi lựa chọn đều có đánh đổi. Bấm để xem phân tích triết học và
                thảo luận cùng nhau.
              </p>
            </div>

            <div className="quiz-wrap">
              {SCENARIOS.map((scenario) => {
                const answer = quizAnswers[scenario.id];

                return (
                  <article className="scenario" key={scenario.id}>
                    <h4>{scenario.title}</h4>
                    <p>{scenario.description}</p>
                    <div className="choice-row">
                      {scenario.options.map((option) => (
                        <button
                          key={option.key}
                          className={`choice ${answer?.optionKey === option.key ? "selected" : ""}`}
                          type="button"
                          onClick={() =>
                            chooseOption(scenario.id, option.key, option.result)
                          }
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                    <div
                      className={`scenario-result ${answer ? "show" : ""} ${answer?.result === "good" ? "good" : ""
                        }`}
                    >
                      {answer ? QUIZ_FEEDBACK[answer.result] : ""}
                    </div>
                  </article>
                );
              })}

              <div className="stats">
                <div className="stat">
                  <p className="stat-value">{quizStats.good}</p>
                  <p className="stat-label">Lựa chọn cân bằng</p>
                </div>
                <div className="stat">
                  <p className="stat-value">{quizStats.mixed}</p>
                  <p className="stat-label">Lựa chọn cần đánh đổi</p>
                </div>
                <div className="stat">
                  <p className="stat-value">{quizStats.answered}</p>
                  <p className="stat-label">Tình huống đã trả lời</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="research" id="nghiencuu">
          <div className="container">
            <div className="section-head" data-reveal="">
              <p className="section-tag">Đọc thêm · Tài liệu tham khảo</p>
              <h2 className="section-title">
                Nguồn tra cứu cho phần trình bày và phản biện
              </h2>
              <p className="section-sub">
                Các liên kết dẫn tới tài liệu gốc, văn bản chính sách và dữ liệu
                vận hành của tập đoàn. Nhớ kiểm tra ngày cập nhật khi trích dẫn
                trong bài viết.
              </p>
            </div>

            <div className="research-grid" data-reveal="">
              {RESEARCH_LINKS.map((item) => (
                <a
                  key={item.title}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="research-card"
                >
                  <div className="research-top">
                    <span className="research-chip">{item.label}</span>
                    <span className="research-arrow">↗</span>
                  </div>
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                  <span className="research-source">{item.source}</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="conclusion" id="ketluan">
          <div className="container">
            <div className="conclusion-box" data-reveal="">
              <div className="conclusion-media">
                <img
                  src="https://img4.thuthuatphanmem.vn/uploads/2020/01/10/hinh-anh-cay-tre-xanh-nhin-tu-phia-duoi_053455576.jpg"
                  alt="Hình tượng tre Việt Nam, biểu trưng cho cân bằng giữa gốc rễ và độ linh hoạt"
                />
              </div>
              <div className="conclusion-text">
                <p className="section-tag">Kết luận</p>
                <h3>
                  Như phủ định của phủ định:{" "}
                  <span className="highlight">T không quay về điểm cũ</span> —{" "}
                  <span className="highlight">đó là T mới, ở tầm cao hơn.</span>
                </h3>
                <p>
                  Hustle culture không sai về bản chất — mâu thuẫn giữa cống
                  hiến và nghỉ ngơi là động lực phát triển. Vấn đề là khi mâu
                  thuẫn không được giải quyết biện chứng, nó dẫn đến đứt gãy.
                </p>
                <p>
                  Phép biện chứng duy vật cho ta công cụ: nhìn nhận mâu thuẫn,
                  hiểu quy luật lượng–chất, và biết rằng mọi phủ định đều mở ra
                  khả năng mới — cao hơn, sâu hơn, trưởng thành hơn.
                </p>
                <p className="conclusion-meta">
                  Nhóm 7 · MLN111 · Chương II — Phép biện chứng duy vật
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        Bản trình bày tương tác cho thảo luận lớp học · Sinh viên T và Phép biện
        chứng duy vật · Nhóm 7 MLN111.
      </footer>

      <div
        className={`modal ${modalGroup ? "open" : ""}`}
        aria-hidden={modalGroup ? "false" : "true"}
        role="dialog"
        aria-modal="true"
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            setModalGroupId(null);
          }
        }}
      >
        {modalGroup && (
          <article className="modal-card">
            <button
              className="modal-close"
              type="button"
              aria-label="Đóng"
              onClick={() => setModalGroupId(null)}
            >
              ×
            </button>
            <div className="modal-header">
              <img src={modalGroup.image} alt={modalGroup.alt} />
              <div className="modal-header-text">
                <span className="pill">{modalGroup.sector}</span>
                <h4 className="modal-title">{`${modalGroup.name} — ${modalGroup.fullName}`}</h4>
              </div>
            </div>
            <div className="modal-body">
              <div>
                <h5>Vai trò chính</h5>
                <p>{modalGroup.role}</p>
              </div>
              <div>
                <h5>Sai lầm thường gặp</h5>
                <p>{modalGroup.monopoly}</p>
              </div>
              <div>
                <h5>Tính hai mặt</h5>
                <p>{modalGroup.twoSide}</p>
              </div>
              <div>
                <h5>Tình huống điển hình</h5>
                <p>{modalGroup.example}</p>
              </div>
            </div>
          </article>
        )}
      </div>
    </>
  );
}

export default App;
