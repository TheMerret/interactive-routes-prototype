import StatusBar from '../components/StatusBar';

export default function TaskResultScreen({ waypoint, isCorrect, isLast, onNext }) {
  return (
    <div style={{ background: '#f5f5f5', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <StatusBar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px 32px' }}>
        {/* Result icon */}
        <div style={{
          width: 80, height: 80, borderRadius: '50%',
          background: isCorrect ? '#b1b1b1' : '#ddd',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 36, marginBottom: 20,
        }}>
          {isCorrect ? '✓' : '✗'}
        </div>

        <h2 style={{ fontFamily: "'Caveat', cursive", fontSize: 46, letterSpacing: 3, margin: '0 0 12px', textAlign: 'center' }}>
          {isCorrect ? 'Верно!' : 'Не совсем…'}
        </h2>

        {/* Correct answer */}
        <div style={{ background: 'white', borderRadius: 20, padding: '14px 20px', width: '100%', marginBottom: 16 }}>
          <div style={{ fontSize: 12, color: '#999', marginBottom: 4, textTransform: 'uppercase', letterSpacing: 1 }}>Правильный ответ</div>
          <div style={{ fontSize: 16, fontWeight: 500 }}>{waypoint.answer}</div>
        </div>

        {/* Fact */}
        <div style={{ background: 'white', borderRadius: 20, padding: '14px 20px', width: '100%', marginBottom: 28 }}>
          <div style={{ fontSize: 12, color: '#999', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 1 }}>Интересный факт</div>
          <p style={{ fontSize: 15, fontWeight: 300, lineHeight: 1.65, margin: 0 }}>{waypoint.fact}</p>
        </div>

        {/* Points */}
        {isCorrect && (
          <div style={{ marginBottom: 24, textAlign: 'center' }}>
            <div style={{ fontSize: 36, fontWeight: 700 }}>+10</div>
            <div style={{ fontSize: 14, color: '#888' }}>очков</div>
          </div>
        )}

        <button
          onClick={onNext}
          style={{
            width: '100%', height: 56, background: '#b1b1b1',
            border: 'none', borderRadius: 20, fontSize: 17,
            fontWeight: 500, cursor: 'pointer',
          }}
        >
          {isLast ? 'Завершить маршрут' : 'Следующая точка →'}
        </button>
      </div>
    </div>
  );
}
