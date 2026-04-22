import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { routes } from '../data/routes';

const LEVEL = 8;
const XP_GAINED = 500;
const XP_PROGRESS = 0.6; // 60% to next level

// Stats rows (from Figma: each row is a white rounded pill, wider as they go down)
const STATS = [
  { icon: '↕', value: '5 км', leftOffset: 285 },
  { icon: '⏱', value: '2ч 30 мин', leftOffset: 236 },
  { icon: '📅', value: '30.03.2026', leftOffset: 195 },
  { icon: '🕙', value: '10:00 – 12:30', leftOffset: 156 },
  { icon: '☁', value: '21 °C, облачно', leftOffset: 119 },
];

// Total viewport width in Figma: 441px
// Pill right edge always at ~500px (extends to screen edge)
// Pill left edge at leftOffset

export default function RouteCompleteScreen() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [impressions, setImpressions] = useState('');

  const route = routes.find(r => r.id === id);
  if (!route) return null;

  // Level ring
  const r = 33;
  const circ = 2 * Math.PI * r;
  const dash = circ * XP_PROGRESS;

  return (
    <div style={{ background: '#f5f5f5', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, overflowY: 'auto', padding: '28px 0 0' }}>

        {/* Title */}
        <div style={{ textAlign: 'center', padding: '0 20px', marginBottom: 8 }}>
          <h1 style={{ fontFamily: "'GuanoApes', cursive", fontSize: 35, letterSpacing: 3, margin: 0, lineHeight: 1.06 }}>
            {route.title}
          </h1>
        </div>

        {/* Subtitle */}
        <p style={{ margin: '0 0 16px', fontSize: 17, fontWeight: 400, color: '#000', padding: '0 46px', lineHeight: 1.4 }}>
          Маршрут завершён!<br />Поздравляем с прохождением.
        </p>

        {/* Level ring + stats section */}
        <div style={{ position: 'relative', marginBottom: 20, minHeight: 290 }}>
          {/* Level ring — left side, absolute */}
          <div style={{ position: 'absolute', left: 39, top: 0, width: 84, height: 84 }}>
            <svg width={84} height={84} style={{ transform: 'rotate(-90deg)', position: 'absolute', inset: 0 }}>
              <circle cx={42} cy={42} r={r} fill="none" stroke="#d9d9d9" strokeWidth={5} />
              <circle cx={42} cy={42} r={r} fill="none" stroke="#888" strokeWidth={5}
                strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" />
            </svg>
            {/* Inner circle */}
            <div style={{
              position: 'absolute', left: 9, top: 9, width: 66, height: 66,
              borderRadius: '50%', background: 'white',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ fontSize: 0 }}>
                <span style={{ fontSize: 30, fontWeight: 400 }}>{LEVEL}</span>
                <span style={{ fontSize: 20, fontWeight: 400 }}> lvl</span>
              </span>
            </div>
          </div>

          {/* +XP label */}
          <p style={{ position: 'absolute', left: 37, top: 94, margin: 0, fontSize: 22, fontWeight: 400 }}>
            +{XP_GAINED}XP
          </p>

          {/* Stats pills — right side */}
          <div style={{ marginLeft: '30%', paddingRight: 16, display: 'flex', flexDirection: 'column', gap: 8, paddingTop: 0 }}>
            {STATS.map(({ icon, value }, i) => (
              <div key={i} style={{
                background: 'white', borderRadius: 75,
                height: 52,
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '0 18px',
              }}>
                <span style={{ opacity: 0.5, fontSize: 19 }}>{icon}</span>
                <span style={{ fontSize: 22, fontWeight: 400 }}>{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Награды */}
        <h3 style={{ fontSize: 22, fontWeight: 400, margin: '0 0 10px', padding: '0 34px' }}>Награды</h3>
        <div style={{ display: 'flex', gap: 12, padding: '0 34px', marginBottom: 20 }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{ width: 140, height: 140, background: '#d9d9d9', borderRadius: 20, flexShrink: 0 }} />
          ))}
        </div>

        {/* Фотографии */}
        <h3 style={{ fontSize: 22, fontWeight: 400, margin: '0 0 10px', padding: '0 37px' }}>Фотографии</h3>
        <div style={{ display: 'flex', gap: 12, padding: '0 37px', marginBottom: 20 }}>
          <div style={{ width: 140, height: 140, background: '#d9d9d9', borderRadius: 20 }} />
          <div style={{ width: 140, height: 140, background: '#d9d9d9', borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, color: '#888' }}>
            📎
          </div>
        </div>

        {/* Impressions textarea */}
        <div style={{ padding: '0 37px', marginBottom: 16 }}>
          <textarea
            value={impressions}
            onChange={e => setImpressions(e.target.value)}
            placeholder="Поделитесь своими впечатлениями.."
            style={{
              width: '100%', height: 81, borderRadius: 20, border: 'none',
              background: '#ccc', padding: '14px 20px', fontSize: 14,
              fontWeight: 274, resize: 'none', boxSizing: 'border-box',
              outline: 'none', fontFamily: 'inherit', lineHeight: 1.5,
            }}
          />
        </div>

        {/* Nearby hint */}
        <p style={{ textAlign: 'center', fontSize: 17, fontWeight: 300, margin: '0 0 12px' }}>
          Рядом есть ещё один маршрут
        </p>
      </div>

      {/* Buttons */}
      <div style={{ padding: '8px 35px 36px', display: 'flex', gap: 10 }}>
        <button
          onClick={() => navigate('/routes')}
          style={{ width: 173, height: 57, borderRadius: 30, background: '#909090', border: 'none', fontSize: 17, fontWeight: 500, cursor: 'pointer' }}
        >
          Посмотреть
        </button>
        <button
          onClick={() => navigate('/routes')}
          style={{ width: 173, height: 57, borderRadius: 30, background: 'rgba(174,174,174,0.40)', border: 'none', fontSize: 17, fontWeight: 500, cursor: 'pointer' }}
        >
          Завершить
        </button>
      </div>
    </div>
  );
}
