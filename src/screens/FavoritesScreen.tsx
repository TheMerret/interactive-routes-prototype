import { useNavigate } from 'react-router-dom';
import TabBar from '../components/TabBar';
import { routes } from '../data/routes';
import { useGame } from '../context/GameContext';
import { Route } from '../types';

function FavoriteCard({ route }: { route: Route }) {
  const navigate = useNavigate();
  const { toggleFavorite } = useGame();

  return (
    <div
      onClick={() => navigate(`/routes/${route.id}`)}
      style={{ background: 'white', borderRadius: 32, overflow: 'hidden', cursor: 'pointer', marginBottom: 16, transition: 'opacity .15s' }}
      onMouseDown={e => (e.currentTarget.style.opacity = '.85')}
      onMouseUp={e => (e.currentTarget.style.opacity = '1')}
      onTouchStart={e => (e.currentTarget.style.opacity = '.85')}
      onTouchEnd={e => (e.currentTarget.style.opacity = '1')}
    >
      {/* Text section */}
      <div style={{ padding: '16px 20px 10px' }}>
        <h3 style={{ fontSize: 20, fontWeight: 600, margin: '0 0 4px' }}>{route.title}</h3>
        <p style={{ fontSize: 15, fontWeight: 300, margin: '0 0 8px', lineHeight: 1.4, color: '#555' }}>
          {route.description.slice(0, 90)}…
        </p>
        <div style={{ display: 'flex', gap: 14, fontSize: 13, fontWeight: 300, marginBottom: 8 }}>
          <span>{route.points} точек</span>
          <span>{route.duration}</span>
          <span>{route.distance}</span>
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {route.tags.map(t => (
            <span key={t} style={{ background: '#e7e7e7', borderRadius: 30, padding: '3px 10px', fontSize: 13 }}>{t}</span>
          ))}
        </div>
      </div>

      {/* Image section */}
      <div style={{ position: 'relative', height: 260 }}>
        <img src={route.image} alt={route.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        <button
          onClick={e => { e.stopPropagation(); toggleFavorite(route.id); }}
          style={{ position: 'absolute', top: 16, right: 16, width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,0.9)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <svg width="22" height="20" viewBox="0 0 22 20" fill="none">
            <path d="M11 19s-9-5.5-9-12a6 6 0 0 1 9-5.2A6 6 0 0 1 20 7c0 6.5-9 12-9 12z" stroke="#333" strokeWidth="1.5" fill="#333" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default function FavoritesScreen() {
  const { favorites } = useGame();
  const favRoutes = routes.filter(r => favorites.has(r.id));

  return (
    <div style={{ background: '#f5f5f5', height: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div style={{ overflowY: 'auto', flex: 1, paddingBottom: 83 }}>
        {/* Header */}
        <div style={{ padding: '16px 24px 0' }}>
          <h2 style={{ fontFamily: "'GuanoApes', cursive", fontSize: 40, letterSpacing: 2, margin: 0 }}>Избранное</h2>
        </div>

        {/* Search */}
        <div style={{ padding: '10px 24px 0' }}>
          <div style={{ height: 42, background: 'white', borderRadius: 30, display: 'flex', alignItems: 'center', padding: '0 14px', gap: 8 }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" opacity=".5">
              <circle cx="7" cy="7" r="5.5" stroke="#000" strokeWidth="1.5" />
              <path d="M12 12l4 4" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span style={{ fontSize: 14, color: 'rgba(0,0,0,.5)' }}>Поиск по названию…</span>
          </div>
        </div>

        {/* Cards or empty state */}
        <div style={{ padding: '14px 24px 0' }}>
          {favRoutes.length > 0 ? (
            favRoutes.map(r => <FavoriteCard key={r.id} route={r} />)
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 80, gap: 16 }}>
              <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#e9e9e9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="36" height="32" viewBox="0 0 22 20" fill="none">
                  <path d="M11 19s-9-5.5-9-12a6 6 0 0 1 9-5.2A6 6 0 0 1 20 7c0 6.5-9 12-9 12z" stroke="#bbb" strokeWidth="1.5" />
                </svg>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 6 }}>Пока пусто</div>
                <div style={{ fontSize: 14, color: '#888', lineHeight: 1.5 }}>
                  Нажмите ♥ на любом маршруте,<br />чтобы добавить его сюда
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <TabBar />
    </div>
  );
}
