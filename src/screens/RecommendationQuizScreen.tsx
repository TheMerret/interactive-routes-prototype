import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const QUESTIONS = [
  {
    text: 'Сколько времени вы готовы посвятить прогулке?',
    options: ['30–60 минут', '1–2 часа', '2–4 часа', 'Весь день'],
  },
  {
    text: 'Какой темп прогулки вам ближе?',
    options: ['Спокойный, с остановками', 'Умеренный', 'Активный', 'Без разницы'],
  },
  {
    text: 'Что вас интересует больше всего?',
    options: ['История и архитектура', 'Природа и парки', 'Еда и кофейни', 'Искусство и граффити'],
  },
  {
    text: 'С кем вы идёте на прогулку?',
    options: ['Один', 'С партнёром', 'С друзьями', 'С детьми'],
  },
  {
    text: 'Вопрос для начального теста перед карточками?',
    options: ['Ответ на вопрос 1', 'Ответ на вопрос 2', 'Ответ на вопрос 3', 'Ответ на вопрос 4'],
  },
];

export default function RecommendationQuizScreen() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);

  const total = QUESTIONS.length;
  const q = QUESTIONS[current];

  const confirm = () => {
    if (selected === null) return;
    if (current + 1 < total) {
      setCurrent(c => c + 1);
      setSelected(null);
    } else {
      navigate('/recommendations');
    }
  };

  // SVG progress ring
  const r = 25;
  const circ = 2 * Math.PI * r;
  const dash = circ * ((current + 1) / total);

  return (
    <div style={{ background: '#f5f5f5', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px 0' }}>
        {/* Back button */}
        <div
          onClick={() => current > 0 ? (setCurrent(c => c - 1), setSelected(null)) : navigate('/city')}
          style={{
            width: 50, height: 50, borderRadius: '50%',
            background: 'rgba(255,255,255,0.84)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', fontSize: 22, userSelect: 'none',
          }}
        >
          ‹
        </div>

        {/* Title */}
        <h2 style={{ fontFamily: "'GuanoApes', cursive", fontSize: 60, letterSpacing: 3, margin: 0, lineHeight: 1 }}>
          Тест
        </h2>

        {/* Progress ring */}
        <div style={{ width: 67, height: 67, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width={67} height={67} style={{ position: 'absolute', inset: 0, transform: 'rotate(-90deg)' }}>
            <circle cx={33.5} cy={33.5} r={r} fill="none" stroke="rgba(0,0,0,0.12)" strokeWidth={4} />
            <circle cx={33.5} cy={33.5} r={r} fill="none" stroke="#888" strokeWidth={4}
              strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" />
          </svg>
          <span style={{ fontSize: 14, fontWeight: 400, position: 'relative', color: 'white', textShadow: '0 0 4px rgba(0,0,0,0.3)' }}>
            {current + 1}/{total}
          </span>
        </div>
      </div>

      {/* Question card */}
      <div style={{
        margin: '24px 44px 0',
        background: 'rgba(255,255,255,0.84)',
        borderRadius: 24,
        padding: '22px 20px',
        minHeight: 90,
        display: 'flex', alignItems: 'center',
      }}>
        <p style={{ margin: 0, fontSize: 20, fontWeight: 400, lineHeight: 1.4, color: '#000' }}>{q.text}</p>
      </div>

      {/* Options — grouped white list */}
      <div style={{ margin: '14px 44px 0' }}>
        {q.options.map((opt, i) => {
          const isFirst = i === 0;
          const isLast = i === q.options.length - 1;
          const radius = 24;
          return (
            <div
              key={i}
              onClick={() => setSelected(i)}
              style={{
                height: 58,
                background: selected === i ? 'rgba(200,200,200,0.9)' : 'rgba(255,255,255,0.84)',
                borderTop: i > 0 ? '1px solid rgba(0,0,0,0.06)' : 'none',
                borderRadius: isFirst
                  ? `${radius}px ${radius}px 0 0`
                  : isLast
                    ? `0 0 ${radius}px ${radius}px`
                    : 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer',
                fontSize: 20, fontWeight: 274, color: 'rgba(0,0,0,0.8)',
                transition: 'background .15s',
                userSelect: 'none',
              }}
            >
              {opt}
            </div>
          );
        })}
      </div>

      {/* Confirm button */}
      <div style={{ padding: '24px 44px 0', display: 'flex', justifyContent: 'center' }}>
        <button
          onClick={confirm}
          disabled={selected === null}
          style={{
            width: 243, height: 57, borderRadius: 30,
            background: selected === null ? '#c8c8c8' : '#a4a4a4',
            border: 'none', fontSize: 17, fontWeight: 500,
            cursor: selected === null ? 'default' : 'pointer',
            transition: 'background .2s',
          }}
        >
          Подтвердить
        </button>
      </div>

      {/* Skip */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingBottom: 40 }}>
        <button
          onClick={() => navigate('/recommendations')}
          style={{ background: 'none', border: 'none', fontSize: 17, cursor: 'pointer', color: '#000' }}
        >
          Пропустить
        </button>
      </div>
    </div>
  );
}
