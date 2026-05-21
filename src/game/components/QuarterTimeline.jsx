export default function QuarterTimeline({ quarter = 1 }) {
  const quarters = Array.from({ length: 12 }, (_, index) => index + 1);

  return (
    <section className="psim-quarter-timeline" aria-label="Tiến trình 12 tuần">
      <div className="psim-sidebar-title">TIẾN TRÌNH HỌC KỲ</div>
      <div className="psim-quarter-track">
        {quarters.map((item) => {
          const isPolicy = item === 4 || item === 8;
          const status = item < quarter ? "is-done" : item === quarter ? "is-current" : "is-future";

          return (
            <div
              key={item}
              className={`psim-quarter-node ${status} ${isPolicy ? "is-policy" : ""}`}
              title={isPolicy ? `Tuần ${item}: mở chiến lược sống sót` : `Tuần ${item}`}
            >
              <span>{item}</span>
              {isPolicy && <b>Sống sót</b>}
            </div>
          );
        })}
      </div>
    </section>
  );
}
