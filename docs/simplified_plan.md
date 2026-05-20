# MLN111 — SIMPLIFIED MIGRATION PLAN
## Giữ structure MLN122, chỉ đổi nội dung

---

## TRIẾT LÝ: MINIMUM CHANGES, MAXIMUM REUSE

```
KHÔNG làm:                    LÀM:
❌ Split App.jsx               ✅ Sửa trực tiếp trong App.jsx
❌ Tạo file data riêng        ✅ Đổi các const arrays ngay trong App.jsx
❌ Refactor components         ✅ Giữ nguyên tất cả components
❌ Đổi routing                ✅ Giữ #/ và #/game
❌ Thêm pages mới             ✅ Map 1-1 với sections cũ
```

---

## FILE STRUCTURE — Giữ nguyên 100%

```
src/
├── App.jsx          ← CHỈ ĐỔI NỘI DUNG CÁC CONST ở đầu file
├── styles.css       ← CHỈ ĐỔI :root variables + 1 vài màu
├── main.jsx         ← KHÔNG ĐỤNG
├── game/
│   ├── game.css     ← KHÔNG ĐỤNG
│   └── components/
│       ├── DecisionCard.jsx    ← KHÔNG ĐỤNG
│       ├── EffectOverlay.jsx   ← KHÔNG ĐỤNG
│       ├── EventScene.jsx      ← Đổi SCENE_BY_ENTITY map
│       ├── ImpactPreview.jsx   ← KHÔNG ĐỤNG
│       ├── OutcomePanel.jsx    ← Đổi METRICS array (4 dòng)
│       └── QuarterTimeline.jsx ← Đổi "Quý" → "Tuần" (1 chỗ)
index.html           ← Đổi title (1 dòng)
```

---

## SECTION MAP — 1 to 1

| Section cũ (MLN122) | Section mới (MLN111) | Layout thay đổi |
|---|---|---|
| `hero` — Tập đoàn nhà nước | `hero` — Sinh viên T & Hustle Culture | Không đổi layout |
| `lyluan` — Lý luận Lenin | `bienchinh` — Phép biện chứng duy vật | Không đổi (tab panel) |
| `thuctrang` — EVN/PVN/VNPT | `phamtru` — 4 cặp phạm trù | Không đổi (card + modal) |
| `phantich` — Phân tích 2 chiều | `quyluat` — 3 quy luật biện chứng | Không đổi (2 column) |
| `giaiphap` — 3 giải pháp | `lyluan` — Lý luận nhận thức | Không đổi (accordion) |
| `game` — Game teaser | `game` — Game teaser | Không đổi |
| `quiz` — Tranh luận | `quiz` — Quiz triết học | Không đổi (scenarios) |
| `nghiencuu` — Nghiên cứu | `nghiencuu` — Tài liệu tham khảo | Không đổi |
| `ketluan` — Kết luận | `ketluan` — Kết luận | Không đổi |

---

## NHỮNG GÌ THỰC SỰ CẦN SỬA TRONG `App.jsx`

### Bước 1 — Đổi const data arrays (đầu file, dòng ~79–340)

```
NAV_ITEMS         → đổi labels + IDs
MARQUEE_TOKENS    → đổi từ khóa
HERO_STATS        → đổi 3 số liệu
THEORY_ITEMS      → đổi thành 3 quy luật (content + hình)
GROUP_ITEMS       → đổi thành 4 cặp phạm trù (content + hình)
SOLUTION_ITEMS    → đổi thành 3 bước lý luận nhận thức
SCENARIOS         → đổi 3 tình huống quiz
QUIZ_FEEDBACK     → đổi feedback text
RESEARCH_LINKS    → đổi links
```

### Bước 2 — Đổi game constants (giữa file, dòng ~407–560)

```
GAME_EVENTS       → 6 events sinh viên
BLACK_SWANS       → 3 black swans sinh viên
MACRO_POLICIES    → 3 lifestyle policies
METER_DEFS        → GPA, Mental, Money, Stress
INIT_STATS        → { gpa: 3.0, mental: 80, money: 5000000, stress: 30 }
SAVE_KEY          → 'hustleLoopSave'
```

### Bước 3 — Đổi text cứng trong JSX (dòng ~1265–1795)

```
Brand text        → "MLN111" thay "VN"
Hero title        → Hustle Culture / Sinh viên T
Aside card        → Preview game stats (GPA, Stress...)
Conclusion box    → Phủ định của phủ định metaphor
Game start screen → Đổi narrative text
EndScreen dict    → 8 endings mới
Start button text → "BẮT ĐẦU HỌC KỲ"
```

---

## NHỮNG GÌ SỬA TRONG `styles.css`

Chỉ thay block `:root` (24 dòng đầu):

```css
:root {
  --bg: #0d0d18;
  --bg-warm: #12121f;
  --surface: #1a1a2e;
  --ink: #e2e8f0;
  --ink-soft: #94a3b8;
  --ink-mute: #64748b;
  --border: rgba(255,255,255,0.08);
  --border-strong: rgba(255,255,255,0.15);
  --blue: #6366f1;
  --blue-deep: #1e1b4b;
  --red: #ef4444;
  --red-soft: #1f0a0a;
  --green: #22c55e;
  --amber: #f59e0b;
  --shadow-sm: 0 6px 18px rgba(0,0,0,0.3);
  --shadow-md: 0 14px 35px rgba(0,0,0,0.4);
  --shadow-lg: 0 22px 50px rgba(0,0,0,0.5);
  --radius-lg: 22px;
  --radius-md: 14px;
  --radius-sm: 10px;
  --container: min(1240px, 92vw);
  --ease: cubic-bezier(0.16, 1, 0.3, 1);
}
```

Thêm vào `body`:
```css
body { background: var(--bg); }
```

---

## NHỮNG GÌ SỬA TRONG `EventScene.jsx`

Chỉ đổi object `SCENE_BY_ENTITY`:

```javascript
const SCENE_BY_ENTITY = {
  "DEADLINE":  { background: "library.webp",  type: "telecom",  label: "Thư viện đêm khuya",  accent: "#818cf8" },
  "TÀI CHÍNH": { background: "cafe.webp",     type: "economic", label: "Cà phê làm việc",      accent: "#f59e0b" },
  "CƠ HỘI":   { background: "job.webp",      type: "aviation", label: "Phỏng vấn internship", accent: "#34d399" },
  "GIA ĐÌNH": { background: "dorm.webp",     type: "coal",     label: "Ký túc xá",            accent: "#a78bfa" },
  "HỌC VỤ":   { background: "exam.webp",     type: "power",    label: "Phòng thi",            accent: "#60a5fa" },
  "KẾT QUẢ":  { background: "exam.webp",     type: "economic", label: "Bảng điểm học kỳ",     accent: "#f87171" },
};
```

---

## PHÂN CÔNG 4 NGƯỜI

### 👤 Person 1 — CONTENT WRITER
**Không cần biết code — làm trong file `noidung.md`**

- [ ] Hero: title, subtitle, 3 stats, aside card text
- [ ] Tab panel Phép biện chứng: 3 mục (title + text + example)
- [ ] Cards Cặp phạm trù: 4 pairs (card text + modal detail)
- [ ] 2-column Quy luật: pros/cons cho mỗi quy luật
- [ ] Accordion Lý luận nhận thức: 3 bước
- [ ] Quiz: 3 scenarios + 2 options mỗi scenario + feedback
- [ ] Kết luận: paragraph kết
- [ ] Game: 6 events (title + 2 options + impact numbers)
- [ ] Game: 3 black swans + 3 policies + 8 endings text

**→ Bàn giao cho Person 2 và 3**

---

### 👤 Person 2 — WEB/UI
**File chính: `src/App.jsx` (phần landing) + `src/styles.css`**

- [ ] Thay `:root` CSS variables → dark theme
- [ ] Đổi `NAV_ITEMS`, `MARQUEE_TOKENS`, `HERO_STATS`
- [ ] Đổi `THEORY_ITEMS` → 3 quy luật biện chứng
- [ ] Đổi `GROUP_ITEMS` → 4 cặp phạm trù
- [ ] Đổi `SOLUTION_ITEMS` → Lý luận nhận thức
- [ ] Đổi `SCENARIOS` + `QUIZ_FEEDBACK`
- [ ] Đổi `RESEARCH_LINKS`
- [ ] Đổi brand, hero title, aside card, conclusion trong JSX
- [ ] Đổi `index.html` title

**Input**: Nhận text từ Person 1

---

### 👤 Person 3 — GAME
**File chính: `src/App.jsx` (phần game) + `EventScene.jsx` + `OutcomePanel.jsx`**

- [ ] Đổi `GAME_EVENTS` (6 events sinh viên)
- [ ] Đổi `BLACK_SWANS` (3 events)
- [ ] Đổi `MACRO_POLICIES` (3 policies)
- [ ] Đổi `METER_DEFS` (4 stat defs)
- [ ] Đổi `INIT_STATS` + `SAVE_KEY`
- [ ] Đổi `calculateLeadershipStyle()` → endings logic
- [ ] Đổi `EndScreen` endings dict
- [ ] Đổi game start screen text + start button
- [ ] Đổi `METRICS` trong `OutcomePanel.jsx`
- [ ] Đổi `SCENE_BY_ENTITY` trong `EventScene.jsx`
- [ ] Đổi "Quý" → "Tuần" trong `QuarterTimeline.jsx`
- [ ] Upload ảnh webp mới vào `public/assets/events/`

**Input**: Nhận game events/endings text từ Person 1

---

### 👤 Person 4 — LEAD / MERGE / THUYẾT TRÌNH

- [ ] Merge code từ Person 2 và Person 3
- [ ] `npm run dev` — test toàn bộ flow
- [ ] Test game từ đầu đến ending
- [ ] Check responsive
- [ ] Fix lỗi nhỏ nếu có
- [ ] `npm run build` verify
- [ ] Chuẩn bị script thuyết trình

---

## MERGE STRATEGY (Không conflict)

Person 2 và 3 làm cùng `App.jsx` nhưng khác dòng:

```
Person 2: dòng 79–340 (landing data) + dòng 1265–1795 (landing JSX)
Person 3: dòng 355–1264 (game data + game JSX)
```

Cách merge: Lấy code Person 2 làm base → copy-paste phần game của Person 3 vào.

---

## TIMELINE

```
Ngày 1 sáng:  Person 1 viết xong noidung.md
Ngày 1 chiều: Person 2 + 3 nhận, bắt đầu code
Ngày 2 sáng:  Person 2 + 3 hoàn thiện
Ngày 2 chiều: Person 4 merge + review
Ngày 3:       Polish + demo
```

---

## VERIFY CHECKLIST

- [ ] `npm run dev` không lỗi
- [ ] Dark theme hoạt động
- [ ] Content MLN111 hiển thị đúng
- [ ] Modal phạm trù mở được
- [ ] Quiz chọn được đáp án
- [ ] Vào game được qua link
- [ ] Game: stats thay đổi sau mỗi turn
- [ ] Game: có thể reach ending
- [ ] Responsive OK trên mobile
- [ ] `npm run build` thành công
