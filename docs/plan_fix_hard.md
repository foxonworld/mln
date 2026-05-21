# Balance Plan — MLN111 Hustle Loop Difficulty Fix

## Goal

Patch balance để game chuyển từ “punishment spiral” sang “khó nhưng cứu được”. Không redesign. Không thêm system lớn. Chỉ tune delta, threshold, spawn, pacing, recovery.

---

## 1. Current Balance Analysis

### Stress economy

Current stress curve quá dốc.

- Start stress: `30`.
- Fail stress: `>= 100`.
- Heavy choices hiện có `+25` đến `+35`.
- Safe choices vẫn thường `+10` đến `+15`.
- Detox chỉ `-5` mỗi turn.

Kết quả: người chơi chỉ có khoảng 70 stress buffer. Một all-nighter `+35` ăn 50% buffer. Nếu thêm family `+30` hoặc retake `+30`, run gần như chết trước khi có thời gian học hệ thống.

### Mental economy

Mental bị drain nhanh hơn recover.

- Start mental: `80`.
- Fail mental: `<= 20`.
- Common loss: `-8` đến `-25`.
- Common recovery: `+5` đến `+10`.
- Strong recovery chủ yếu nằm trong scholarship black swan, tức là random.

Kết quả: mental không phải tài nguyên có thể quản lý, mà là thanh máu tụt dần.

### Money pressure

Money pressure hợp lý về theme nhưng bị cộng phạt kép.

- Finance event thường tăng money nhưng stress/mental phạt lớn.
- Part-time policy cho tiền tốt nhưng stress `+20`, GPA `-0.3`.
- Roommate black swan `-3000` quá nặng nếu đi cùng tuition/family.

Money nên là pressure thứ cấp, không nên tạo death spiral cùng stress mỗi lần người chơi cố giải quyết.

### GPA pressure

GPA hiện tương đối ổn nhưng một số lựa chọn sacrifice quá đắt.

- Accept F: `GPA -0.8` để đổi `mental +10`, `stress -10`.
- Internship accept: `GPA -0.5`, stress `+20`.
- Rush work: `GPA -0.4`, stress `+25`.

GPA sacrifice đang không đủ hấp dẫn vì giá quá cao so với recovery.

### Snowball systems

Snowball chính:

1. Stress high → danger state.
2. Next event vẫn cộng stress lớn.
3. Black swan có thể chen ngang.
4. Mental cùng tụt.
5. Player buộc chọn safe nhưng safe vẫn tăng stress.
6. Burnout/gameover.

Đây là spiral không có brake.

### Punishment frequency

Punishment dày:

- Mỗi week đều event.
- Week 4/8 policy có thể vẫn phạt.
- Black swan 20% mỗi transition đủ tạo 1–2 crisis/run.
- Black swan xấu không có choice, chỉ acknowledge.

### Event pacing

Full event pool shuffle ngay từ đầu. Early game có thể gặp high intensity event trước khi player hiểu.

### Recovery pacing

Recovery windows quá ít:

- Reject internship.
- Accept F.
- Detox.
- Scholarship random.

Chưa đủ để player cảm thấy có comeback plan.

## Biggest balance problems

1. Stress delta quá cao so với threshold.
2. Safe choices không thật sự safe.
3. Recovery thấp hơn damage trung bình.
4. Black swan xấu quá nặng, thiếu agency.
5. Good ending threshold quá sạch so với economy.
6. Early game có thể roll doomed sequence.

## Why the game feels unfair

- Người chơi chọn “đúng” vẫn bị phạt stress đáng kể.
- Random event có thể phá run không báo trước.
- Deltas lớn khiến 1–2 lỗi nhỏ thành death spiral.
- Recovery nằm sau random hoặc lựa chọn quá đắt.
- Reflection bị biến thành interruption trong lúc player panic survival.

## Why players lose agency

Agency giảm khi:

- Không có safe option rõ.
- Không có emergency recovery.
- Black swan không cho chọn phản ứng.
- Critical state vẫn bị spawn crisis.
- Good ending gần như chỉ đạt nếu may mắn.

## Difficulty spikes

| Phase      | Spike                           | Cause                             |
| ---------- | ------------------------------- | --------------------------------- |
| Week 1–3   | Có thể vào stress 60–80 rất sớm | Deadline/family/retake high delta |
| Week 4–6   | Policy không đủ cứu             | Detox yếu, part-time phạt         |
| Week 7–9   | Accumulated stress + black swan | No critical protection            |
| Week 10–12 | Ending good quá khó             | Threshold mental/stress quá chặt  |

## Recovery failures

- Soft recovery chưa đủ thường xuyên.
- Medium recovery không đủ mạnh.
- Emergency recovery gần như không tồn tại.
- Sacrifice option chưa đáng chọn.

---

## 2. Target Experience

### Core target

Game phải giữ fantasy: sinh viên T sống qua 12 tuần trong mâu thuẫn GPA, mental, money, stress. Nhưng player phải tin rằng mỗi run có thể cứu nếu biết đổi chiến lược.

### Emotional curve

| Phase      | Desired emotion                                           |
| ---------- | --------------------------------------------------------- |
| Week 1–3   | “Mình hiểu luật chơi, có áp lực nhưng còn kiểm soát.”     |
| Week 4–6   | “Mình phải chọn nhịp sống, trade-off bắt đầu thật.”       |
| Week 7–9   | “Run căng rồi, nhưng nếu hy sinh đúng có thể ổn.”         |
| Week 10–12 | “Mình đang trả giá cho chiến lược trước đó; vẫn còn cửa.” |
| Ending     | “Kết quả phản ánh cách mình chơi.”                        |

### Difficulty curve

- Early: low-medium pressure.
- Mid: medium-high pressure.
- Late: high pressure but fair.
- Randomness: drama, không execution.

### Recovery rhythm

Mỗi 2–3 tuần cần có ít nhất 1 recovery vector:

- Stress relief.
- Mental relief.
- Money stabilization.
- GPA catch-up hoặc controlled GPA loss.

### Reflection rhythm

Reflection chỉ hiệu quả khi player còn đủ agency để học.

- Week 4 reflection: giải thích stress accumulation.
- Week 8 reflection: giúp đọc mâu thuẫn chính hiện tại.
- Ending reflection: debrief strategy, không phán xét random loss.

Nếu balance quá phạt, reflection thành noise. Sau patch, reflection phải cảm giác như coaching.

---

## 3. Stress System Plan

## Recommended stress ranges

| Situation          | Suggested stress delta |
| ------------------ | ---------------------- |
| Small safe choice  | `-5` to `+5`           |
| Normal safe choice | `+4` to `+8`           |
| Normal trade-off   | `+8` to `+14`          |
| Risky high reward  | `+14` to `+22`         |
| Severe black swan  | `+12` to `+18`         |
| Emergency recovery | `-15` to `-25`         |

## Heavy event ranges

Heavy events should not exceed:

- Stress: `+22` normal cap.
- Mental loss: `-18` cap.
- GPA loss: `-0.5` cap for deliberate sacrifice, not random.
- Money loss: `-2500` cap for random crisis.

Only allow `+25` stress if paired with very high reward and not early game.

## Safe option ranges

Safe choice definition:

- Stress: max `+8`, ideally `0` to `+6`.
- Mental: max `-5`, ideally neutral or positive.
- Reward: modest.
- Purpose: stabilize, not optimize.

If an event has no option in this range, it is not a fair choice.

## Recovery ranges

| Recovery type      | Stress         | Mental         | Cost                       |
| ------------------ | -------------- | -------------- | -------------------------- |
| Soft recovery      | `-5` to `-10`  | `+3` to `+8`   | low reward/no GPA gain     |
| Medium recovery    | `-10` to `-18` | `+8` to `+15`  | GPA/money/opportunity cost |
| Emergency recovery | `-18` to `-25` | `+12` to `+20` | meaningful GPA/money cost  |

## Warning thresholds

| Stat   | Current warning feel | Suggested warning |
| ------ | -------------------- | ----------------- |
| Stress | danger at `>=80`     | danger at `>=85`  |
| Mental | danger at `<=30`     | danger at `<=25`  |
| GPA    | danger at `<=1.5`    | keep              |
| Money  | danger at `<=500`    | keep              |

## Fail thresholds

| Stat   | Current fail | Suggested fail                             |
| ------ | ------------ | ------------------------------------------ |
| Stress | `>=100`      | `>=110` or one-time grace at first `>=100` |
| Mental | `<=20`       | `<=15`                                     |
| GPA    | `<=1.0`      | `<=0.8`                                    |
| Money  | `<=0`        | keep `<=0`                                 |

Preferred minimal patch: keep stress fail at `100`, but add “no black swan if stress >=75” and lower deltas. If one extra logic change acceptable, add one-time burnout grace.

---

## 4. Event Rebalance Plan

| Event Type     | Current Problem                            | Why It Feels Bad                              | Suggested Direction                                       |
| -------------- | ------------------------------------------ | --------------------------------------------- | --------------------------------------------------------- |
| Deadline       | All-nighter `+35`; safe `+15`              | first event can doom run                      | risky `+24`, safe `+8`                                    |
| Finance        | every money fix adds stress                | solving one problem creates another crisis    | loan safe low stress; work risky viable                   |
| Internship     | accept is trap; reject is only mild relief | high reward not worth death spiral            | accept lower GPA/stress penalty; reject stronger recovery |
| Family         | both choices punish emotionally            | asking help feels bad, self-manage too lethal | ask help = stabilize; self-manage medium risk             |
| Academic       | project adds late spike                    | late game can die after good play             | cap stress `+16`, safe project `+5`                       |
| Burnout/Retake | recovery option costs too much GPA         | strategic sacrifice not attractive            | accept F = stronger stress/mental recovery, less GPA loss |
| Black swan     | high random punishment, no choice          | random doom                                   | lower severity, block critical state, lower spawn         |

## Which events need nerf

| Event                | Current                                   | Suggested                                 |
| -------------------- | ----------------------------------------- | ----------------------------------------- |
| Deadline all-nighter | stress `+35`, mental `-25`                | stress `+24`, mental `-18`                |
| Family self-manage   | stress `+30`, mental `-20`                | stress `+18`, mental `-12`                |
| Retake study         | stress `+30`, mental `-15`                | stress `+18`, mental `-8`                 |
| Project serious      | stress `+25`, mental `-12`                | stress `+16`, mental `-8`                 |
| Rush part-time       | stress `+25`, mental `-15`                | stress `+18`, mental `-10`                |
| Illness swan         | stress `+25`, mental `-25`                | stress `+15`, mental `-15`                |
| Roommate swan        | stress `+20`, mental `-20`, money `-3000` | stress `+12`, mental `-12`, money `-2200` |

## Which choices need buff

| Choice              | Current                                | Suggested                              |
| ------------------- | -------------------------------------- | -------------------------------------- |
| Deadline prioritize | stress `+15`, mental `-8`              | stress `+8`, mental `-4`               |
| Tuition loan        | stress `+15`, mental `-5`              | stress `+8`, mental `-2`               |
| Internship reject   | stress `-10`, mental `+5`              | stress `-15`, mental `+8`              |
| Family ask help     | stress `+10`, mental `-10`             | stress `+4`, mental `-4`               |
| Project enough      | stress `+10`, mental `-5`              | stress `+5`, mental `-2`               |
| Accept F/rest       | GPA `-0.8`, stress `-10`, mental `+10` | GPA `-0.5`, stress `-18`, mental `+15` |

## Which punishments should be removed

- Remove heavy guilt from asking family help. Support should be safe/stabilizing.
- Remove `+15` stress from safe deadline choice.
- Remove extreme GPA `-0.8` from intentional mental recovery.
- Remove early negative black swan before player has policy access.

## Which rewards should be increased

- Recovery reward for rejecting overcommit.
- Mental reward for choosing rest.
- Stress relief from detox.
- Financial stability from loan/support should reduce pressure, not add major pressure.

---

## 5. Recovery Design Plan

### Philosophy

Recovery is not “free win”. Recovery is a strategic tempo choice:

- Give up optimization.
- Accept slower progress.
- Stabilize system.
- Avoid death spiral.

Good educational alignment: this reinforces dialectical balance. Player learns that not choosing maximum GPA/money can be rational.

## Soft recovery

Small relief embedded in safe choices.

Examples:

| Scenario          | Cost                   | Recovery                     |
| ----------------- | ---------------------- | ---------------------------- |
| Ask for extension | lower GPA gain         | stress only `+6` to `+8`     |
| Reject internship | lose money opportunity | stress `-15`, mental `+8`    |
| Ask family help   | pride/guilt minor      | money gain, stress only `+4` |

Purpose: prevent slow bleed.

## Medium recovery

Meaningful recovery with visible sacrifice.

Examples:

| Scenario            | Cost                 | Recovery                   |
| ------------------- | -------------------- | -------------------------- |
| Do project “enough” | lower GPA gain       | stress `+5`, mental `-2`   |
| Accept F/rest       | GPA `-0.5`           | stress `-18`, mental `+15` |
| Detox policy        | GPA `-0.05` per turn | stress `-8` per turn       |

Purpose: stabilize after bad phase.

## Emergency recovery

Use rarely. It should feel like “I can still save this run, but I must sacrifice.”

Examples:

| Scenario                   | Cost                   | Recovery                                   |
| -------------------------- | ---------------------- | ------------------------------------------ |
| Skip non-critical deadline | GPA `-0.15` to `-0.25` | stress `-18`, mental `+10`                 |
| Defer retake               | GPA `-0.5`             | stress `-18`, mental `+15`                 |
| Scholarship                | random positive        | stress `-25`, mental `+18`, money `+12000` |

Minimal implementation: no new event needed; convert existing “accept F/rest” into emergency recovery.

---

## 6. Black Swan Plan

## Spawn philosophy

Black swan should create drama and adaptation, not execute player.

Rules:

- Surprise should change priority.
- It should not invalidate 8 weeks of good choices.
- It should not spawn when player is already near death.
- Positive black swan should be a real relief event, not rare flavor only.

## Early-game rules

- No negative black swan before week 4.
- Optional: allow positive scholarship early with low chance.
- Rationale: early game is tutorial/onboarding; random crisis before policy creates learned helplessness.

## Critical-state protection

Block negative black swan if any condition:

- Stress `>=75`.
- Mental `<=35`.
- GPA `<=1.5`.
- Money `<=1000`.

If black swan must trigger in critical state, prefer positive scholarship or skip.

## Max negative events/run

- Target: `1` negative black swan per run.
- Hard cap: `2` negative black swans per run.
- Positive black swan can still appear once.

Minimal implementation can avoid persistent counter by lowering spawn rate and blocking critical state. Counter optional.

## Positive vs negative balance

Current pool: 2 negative, 1 positive. Keep ratio but reduce negative severity and buff positive relief.

Suggested:

| Black Swan  | Current                                                | Suggested                                              |
| ----------- | ------------------------------------------------------ | ------------------------------------------------------ |
| Illness     | GPA `-0.3`, mental `-25`, money `-2000`, stress `+25`  | GPA `-0.2`, mental `-15`, money `-1500`, stress `+15`  |
| Roommate    | GPA `-0.1`, mental `-20`, money `-3000`, stress `+20`  | GPA `-0.05`, mental `-12`, money `-2200`, stress `+12` |
| Scholarship | GPA `+0.1`, mental `+20`, money `+15000`, stress `-20` | GPA `+0.1`, mental `+18`, money `+12000`, stress `-25` |

## Spawn rate

| Current | Suggested        |
| ------- | ---------------- |
| `0.2`   | `0.12` to `0.15` |

Preferred: `0.12` for first balance patch.

---

## 7. Difficulty Curve Plan

## Week 1–3

### Intended feeling

Learning systems. Mild pressure. No doomed run.

### Pressure level

Low-medium.

### Recovery availability

At least one safe option should keep stress gain below `+8`.

### Risk level

No negative black swan. Heavy event stress cap `+18` if possible.

### Reflection role

Player observes cause-effect. Do not overload.

## Week 4–6

### Intended feeling

First strategic commitment. Player sees consequences of early choices.

### Pressure level

Medium.

### Recovery availability

Policy week should matter.

- Detox strong enough: `-8` stress.
- Part-time not suicide: stress `+14`, GPA `-0.25`.
- Club remains GPA buffer.

### Risk level

Black swan allowed after week 4, but not if critical.

### Reflection role

Week 4 reflection explains accumulated stress. This should feel useful, not ironic.

## Week 7–9

### Intended feeling

Peak management. Trade-offs matter.

### Pressure level

Medium-high.

### Recovery availability

Medium recovery choices must exist:

- reject opportunity.
- do enough.
- ask help.
- accept controlled GPA sacrifice.

### Risk level

Black swan can create drama, but severity capped.

### Reflection role

Week 8 reflection helps identify current main contradiction.

## Week 10–12

### Intended feeling

Payoff/crisis. Strategy resolves.

### Pressure level

High but fair.

### Recovery availability

One emergency recovery route should remain viable.

### Risk level

Late events can pressure, not instantly kill from stable state.

### Reflection role

Ending reflection connects strategy to result.

---

## 8. Win/Fail Condition Plan

## More realistic thresholds

Current perfect/good style is too tight for current economy. Suggested:

| Ending           | Current                                   | Suggested                                 |
| ---------------- | ----------------------------------------- | ----------------------------------------- |
| Balanced/perfect | mental `>=70`, GPA `>=3.0`, stress `<=60` | mental `>=60`, GPA `>=2.8`, stress `<=70` |
| Hustle           | GPA `>=3.5`, mental `<=40`                | GPA `>=3.3`, mental `<=50`                |
| Chill            | stress `<=40`, mental `>=80`              | stress `<=50`, mental `>=70`, GPA `>=2.3` |
| Survive          | fallback win                              | keep, frame positively                    |

## Better neutral outcomes

Neutral ending should not feel like “bad ending disguised as win”. It should say:

- You survived with scars.
- You learned what your main contradiction was.
- Replay can target a cleaner balance.

Suggested neutral messaging:

- “Qua kỳ bằng điều chỉnh liên tục, chưa hoàn hảo nhưng có agency.”
- “Không phải thất bại; đây là dữ liệu thực tiễn cho vòng nhận thức tiếp theo.”

## Fair fail conditions

Fail should happen when player repeatedly ignores warnings, not because one random combo hits.

Suggested fail thresholds:

| Fail   | Current | Suggested                         |
| ------ | ------- | --------------------------------- |
| Stress | `>=100` | `>=110` or grace at first `>=100` |
| Mental | `<=20`  | `<=15`                            |
| GPA    | `<=1.0` | `<=0.8`                           |
| Money  | `<=0`   | keep                              |

## Burnout grace ideas

Minimal option:

- First time stress reaches `>=100`, set stress to `95`, mental `-5`, log burnout warning.
- Second time stress reaches `>=100`, gameover.

If too much code, skip grace and rely on delta nerf + black swan protection.

---

## 9. Minimal Implementation Strategy

Project is currently monolithic. Best patch = small constant/data edits.

## Constants cần đổi

| Constant                         | Current | Suggested     |
| -------------------------------- | ------- | ------------- |
| `BLACK_SWAN_SPAWN_RATE`          | `0.2`   | `0.12`        |
| `POLICY_DETOX_STRESS_REDUCTION`  | `5`     | `8`           |
| `POLICY_DETOX_GPA_PENALTY`       | `0.1`   | `0.05`        |
| `POLICY_PARTTIME_STRESS_PENALTY` | `20`    | `14`          |
| `POLICY_PARTTIME_GPA_PENALTY`    | `0.3`   | `0.25`        |
| `DEFAULT_STATS.stress`           | `30`    | `25` optional |

## Event delta cần tune

Tune only impact objects. No UI rewrite.

| Event             | Suggested impact                                       |
| ----------------- | ------------------------------------------------------ |
| Deadline risky    | `{ gpa: 0.25, mental: -18, money: 0, stress: 24 }`     |
| Deadline safe     | `{ gpa: 0.08, mental: -4, money: 0, stress: 8 }`       |
| Loan              | `{ gpa: 0, mental: -2, money: 8000, stress: 8 }`       |
| Rush work         | `{ gpa: -0.3, mental: -10, money: 6000, stress: 18 }`  |
| Internship accept | `{ gpa: -0.35, mental: -8, money: 12000, stress: 14 }` |
| Internship reject | `{ gpa: 0.15, mental: 8, money: 0, stress: -15 }`      |
| Family self       | `{ gpa: -0.15, mental: -12, money: 2500, stress: 18 }` |
| Family help       | `{ gpa: 0, mental: -4, money: 3500, stress: 4 }`       |
| Project serious   | `{ gpa: 0.25, mental: -8, money: -300, stress: 16 }`   |
| Project enough    | `{ gpa: 0.08, mental: -2, money: 0, stress: 5 }`       |
| Retake study      | `{ gpa: 0.12, mental: -8, money: -300, stress: 18 }`   |
| Accept F/rest     | `{ gpa: -0.5, mental: 15, money: 0, stress: -18 }`     |

## Threshold cần tune

Minimal patch:

| Threshold          | Current | Suggested |
| ------------------ | ------- | --------- |
| Good ending mental | `70`    | `60`      |
| Good ending GPA    | `3.0`   | `2.8`     |
| Good ending stress | `60`    | `70`      |
| Chill mental       | `80`    | `70`      |
| Chill stress       | `40`    | `50`      |
| Hustle GPA         | `3.5`   | `3.3`     |
| Hustle mental      | `40`    | `50`      |

Optional fail threshold patch:

| Fail   | Current | Suggested |
| ------ | ------- | --------- |
| Stress | `100`   | `110`     |
| Mental | `20`    | `15`      |
| GPA    | `1.0`   | `0.8`     |

## Spawn logic cần tune

Minimal logic change:

- Black swan only if `nQ >= 4`.
- Do not spawn if player critical.

Critical definition:

- `stress >= 75`.
- `mental <= 35`.
- `money <= 1000`.
- `gpa <= 1.5`.

Pseudo behavior:

- If critical: skip black swan and continue normal event.
- If not critical and week >=4: roll at `0.12`.

## Những gì KHÔNG nên động vào

- No component rewrite.
- No new stat.
- No new resource.
- No complex event scheduler.
- No achievement system.
- No new UI modal.
- No content expansion before balance patch proves fair.
- No architecture split until after patch.

---

## 10. Implementation Priority

## MUST FIX NOW

1. Reduce stress deltas on heavy event choices.
2. Make safe choices actually safe.
3. Buff recovery choices.
4. Lower black swan spawn from `0.2` to `0.12`.
5. Nerf negative black swan damage.
6. Block black swan in early game and critical states.
7. Relax good ending thresholds.

Rationale: highest fairness gain, smallest diff.

## SHOULD FIX

1. Buff detox to `-8` stress, GPA cost `-0.05`.
2. Nerf part-time policy stress penalty to `+14`.
3. Adjust danger display thresholds.
4. Improve ending/debrief copy so neutral ending feels meaningful.
5. Add logs explaining recovery choices as valid strategy.

## OPTIONAL POLISH

1. Burnout grace once/run.
2. Max negative black swan count per run.
3. Phase-based event weighting.
4. Add one small recovery event.
5. Show “safe / risky / recovery” tags on choices.

Do optional only after must-fix playtest.

---

## 11. Final Target Experience

After patch, player should feel:

- Week 1–3: “Tough but readable.”
- Week 4–6: “My strategy matters.”
- Week 7–9: “I can still stabilize if I sacrifice.”
- Week 10–12: “My previous choices are catching up, but not unfairly.”
- Ending: “This result came from my trade-offs.”

Gameplay changes:

- Stress no longer jumps from manageable to dead in one turn.
- Safe choices become real tempo tools.
- Risky choices remain attractive but not traps.
- Black swans add drama, not random execution.
- Good ending becomes achievable for balanced play.
- Neutral ending becomes educational, not shameful.

Educational improvement:

- Reflection becomes coaching, not interruption.
- Player can connect MLN111 concepts to decisions.
- “Mâu thuẫn”, “lượng–chất”, “cân bằng động” become felt through gameplay.
- Failure teaches strategy, not resentment.

Final target sentence:

> Hustle Loop should feel like a hard semester where every system pulls against another, but a player who reads the contradictions, sacrifices at the right time, and uses recovery windows can survive — and understand why.
