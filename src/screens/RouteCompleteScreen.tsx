import { useNavigate, useParams } from 'react-router-dom';
import { routes } from '../data/routes';
import { useGame } from '../context/GameContext';

export default function RouteCompleteScreen() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { score } = useGame();

  const route = routes.find(r => r.id === id);
  if (!route) return null;

  return (
    <div style={{ background: '#f5f5f5', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px 32px', textAlign: 'center' }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>🏆</div>

        <h2 style={{ fontFamily: "'GuanoApes', cursive", fontSize: 46, letterSpacing: 3, margin: '0 0 12px', lineHeight: 1.1 }}>
          Маршрут<br />пройден!
        </h2>

        <p style={{ fontSize: 17, fontWeight: 300, color: '#555', lineHeight: 1.6, margin: '0 0 32px' }}>
          Вы исследовали {route.title}.<br />Отличная прогулка!
        </p>

        {/* Stats */}
        <div style={{ display: 'flex', gap: 14, marginBottom: 36 }}>
          {[
            [route.distance, 'пройдено'],
            [route.duration, 'время'],
            [`${score * 10}`, 'очков'],
          ].map(([val, label], i) => (
            <div key={i} style={{ background: 'white', borderRadius: 20, padding: '14px 18px', textAlign: 'center' }}>
              <div style={{ fontSize: 24, fontWeight: 700 }}>{val}</div>
              <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>{label}</div>
            </div>
          ))}
        </div>

        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <button style={{ height: 56, borderRadius: 20, background: '#b1b1b1', border: 'none', fontSize: 17, fontWeight: 500, cursor: 'pointer' }}>
            Поделиться маршрутом
          </button>
          <button
            onClick={() => navigate('/routes')}
            style={{ height: 56, borderRadius: 20, background: '#d9d9d9', border: 'none', fontSize: 17, fontWeight: 500, cursor: 'pointer' }}
          >
            Ещё маршруты
          </button>
        </div>
      </div>
    </div>
  );
}
