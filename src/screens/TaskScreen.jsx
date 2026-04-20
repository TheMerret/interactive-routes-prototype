import { useState } from 'react';
import StatusBar from '../components/StatusBar';

export default function TaskScreen({ waypoint, waypointIndex, onSubmit, onExit }) {
  const [selected, setSelected] = useState(null);
  const isChoice = waypoint.type === 'choice';

  const handleCheck = () => {
    if (isChoice && selected === null) return;
    const isCorrect = isChoice
      ? waypoint.options[selected] === waypoint.answer || waypoint.answer.startsWith(waypoint.options[selected])
      : true;
    onSubmit({ isCorrect, selected });
  };

  return (
    <div style={{ background: '#f5f5f5', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <StatusBar />

      {/* Top bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 24px 0' }}>
        <span style={{ fontSize: 16, fontWeight: 300, opacity: .5, letterSpacing: 1 }}>—</span>
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={ctrlBtn}>⏸</button>
          <button onClick={onExit} style={ctrlBtn}>✕</button>
        </div>
      </div>

      {/* Title */}
      <div style={{ padding: '8px 24px 0', textAlign: 'center' }}>
        <h2 style={{ fontFamily: "'GuanoApes', cursive", fontSize: 38, letterSpacing: 2, margin: 0 }}>
          Задание {waypointIndex}
        </h2>
      </div>

      {/* Question */}
      <p style={{ padding: '14px 28px 0', fontSize: 16, fontWeight: 300, lineHeight: 1.65, margin: 0 }}>
        {waypoint.question}
      </p>

      {/* Options or open answer */}
      <div style={{ padding: '16px 14px 0', flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
        {isChoice ? (
          waypoint.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              style={{
                height: 58, borderRadius: 16, border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', padding: '0 18px', gap: 14,
                background: selected === i ? '#888' : (i % 2 === 0 ? '#d9d9d9' : '#bababa'),
                transition: 'background .15s',
                textAlign: 'left',
              }}
            >
              <div style={{
                width: 28, height: 28, borderRadius: '50%',
                background: selected === i ? 'white' : 'rgba(255,255,255,.5)',
                flexShrink: 0, transition: 'background .15s',
              }} />
              <span style={{ fontSize: 16 }}>{opt}</span>
            </button>
          ))
        ) : (
          <div style={{ padding: '0 14px', color: '#777', fontSize: 15, fontStyle: 'italic' }}>
            Осмотрись вокруг и найди ответ самостоятельно
          </div>
        )}
      </div>

      {/* Check button */}
      <div style={{ padding: '16px 24px 40px' }}>
        <button
          onClick={handleCheck}
          disabled={isChoice && selected === null}
          style={{
            width: '100%', height: 54,
            background: (isChoice && selected === null) ? '#d0d0d0' : '#a4a4a4',
            border: 'none', borderRadius: 20,
            fontSize: 17, fontWeight: 500, cursor: 'pointer',
            opacity: (isChoice && selected === null) ? .6 : 1,
            transition: 'opacity .2s',
          }}
        >
          Проверить
        </button>
      </div>
    </div>
  );
}

const ctrlBtn = {
  width: 44, height: 44, borderRadius: '50%',
  background: '#dedede', border: 'none',
  cursor: 'pointer', fontSize: 16,
};
