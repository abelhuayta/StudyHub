export default function WeekTimeline() {
  // Genera un arreglo con números del 1 al 17
  const semanas = Array.from({ length: 17 }, (_, i) => i + 1);

  return (
    <nav className="timeline">
      {semanas.map((semana) => (
        <button key={semana} className="week-btn">
          Semana {semana}
        </button>
      ))}
    </nav>
  );
}