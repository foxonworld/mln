// METER DEFINITIONS FOR HUSTLE LOOP
export const METER_DEFS = [
  {
    key: "gpa",
    label: "GPA",
    icon: "📚",
    limit: "Tối thiểu: 1.0",
    markerPos: 10,
    hint: "Điểm trung bình học kỳ. Rớt xuống dưới 1.0 là cảnh báo học vụ.",
    getWidth: (v) => Math.min(Math.max((v / 4) * 100, 2), 100),
    getColor: (v) => v <= 1.5 ? "#ef4444" : v <= 2.5 ? "#f59e0b" : "#22c55e",
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
    getColor: (v) => v <= 30 ? "#ef4444" : v <= 50 ? "#f59e0b" : "#22c55e",
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
    getColor: (v) => v <= 500 ? "#ef4444" : v <= 2000 ? "#f59e0b" : "#22c55e",
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
    getColor: (v) => v >= 80 ? "#ef4444" : v >= 60 ? "#f59e0b" : "#22c55e",
    format: (v) => v.toFixed(0) + "%",
    danger: (v) => v >= 80,
  },
];

export function getFeedbackTone(impact = {}) {
  const risk =
    (impact.gpa < 1.5 ? 2 : impact.gpa < 2.5 ? 1 : 0) +
    (impact.mental < 30 ? 2 : impact.mental < 50 ? 1 : 0) +
    (impact.money < 500 ? 2 : impact.money < 2000 ? 1 : 0) +
    (impact.stress >= 80 ? 2 : impact.stress >= 60 ? 1 : 0);
  const relief =
    (impact.gpa > 0 ? 1 : 0) +
    (impact.mental > 0 ? 1 : 0) +
    (impact.money > 0 ? 1 : 0) +
    (impact.stress < 0 ? 1 : 0);

  return risk > relief ? "bad" : "good";
}
