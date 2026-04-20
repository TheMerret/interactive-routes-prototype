import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { routes } from '../data/routes';

const ctrlBtn: React.CSSProperties = {
  width: 44, height: 44, borderRadius: '50%',
  background: '#dedede', border: 'none',
  cursor: 'pointer', fontSize: 16,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
};

export default function NavigationScreen() {
  const { id, wp } = useParams<{ id: string; wp: string }>();
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const route = routes.find(r => r.id === id);
  const wpIndex = parseInt(wp ?? '0', 10);
  const waypoint = route?.waypoints[wpIndex];
  const total = route?.waypoints.length ?? 0;

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (!paused) setSeconds(s => s + 1);
    }, 1000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [paused]);

  if (!route || !waypoint) return null;

  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  return (
    <div style={{ background: '#f5f5f5', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px 0' }}>
        <span style={{ fontSize: 16, fontWeight: 300, opacity: .5, letterSpacing: 1 }}>{fmt(seconds)}</span>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => setPaused(p => !p)} style={ctrlBtn}>{paused ? '▶' : '⏸'}</button>
          <button onClick={() => navigate(`/routes/${id}`)} style={ctrlBtn}>✕</button>
        </div>
      </div>

      {/* Progress */}
      <div style={{ padding: '8px 24px 0', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ flex: 1, height: 4, background: '#ddd', borderRadius: 4, overflow: 'hidden' }}>
          <div style={{ width: `${(wpIndex / total) * 100}%`, height: '100%', background: '#333', borderRadius: 4, transition: 'width .4s' }} />
        </div>
        <span style={{ fontSize: 13, color: '#888', whiteSpace: 'nowrap' }}>{wpIndex}/{total}</span>
      </div>

      {/* Title */}
      <div style={{ padding: '8px 24px 0', textAlign: 'center' }}>
        <h2 style={{ fontFamily: "'GuanoApes', cursive", fontSize: 38, letterSpacing: 2, margin: 0 }}>Куда идти?</h2>
        <p style={{ fontSize: 13, color: '#888', margin: '4px 0 0', fontWeight: 400 }}>{waypoint.location}</p>
      </div>

      {/* Instruction */}
      <p style={{ padding: '12px 28px 0', fontSize: 16, fontWeight: 300, lineHeight: 1.65, margin: 0 }}>
        {waypoint.instruction}
      </p>

      {/* Map placeholder */}
      <div style={{ margin: '16px 16px 0', flex: 1, background: '#d0d0d0', borderRadius: 20, overflow: 'hidden', position: 'relative', minHeight: 200 }}>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, color: 'rgba(0,0,0,.4)' }}>
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <path d="M24 4C15.2 4 8 11.2 8 20c0 11.7 16 28 16 28s16-16.3 16-28c0-8.8-7.2-16-16-16zm0 22a6 6 0 1 1 0-12 6 6 0 0 1 0 12z" fill="rgba(0,0,0,.3)" />
          </svg>
          <span style={{ fontSize: 14 }}>Карта маршрута</span>
        </div>
      </div>

      {/* CTA */}
      <div style={{ padding: '16px 24px 40px' }}>
        <button
          onClick={() => navigate(`/routes/${id}/task/${wpIndex}`)}
          style={{ width: '100%', height: 56, background: '#b1b1b1', border: 'none', borderRadius: 20, fontSize: 17, fontWeight: 500, cursor: 'pointer' }}
        >
          Получить задание
        </button>
      </div>
    </div>
  );
}
