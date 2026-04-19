import StatusBar from '../components/StatusBar';
import TabBar from '../components/TabBar';

function RouteCard({ route, onSelect }) {
  return (
    <div
      onClick={() => onSelect(route)}
      style={{
        background: 'white', borderRadius: 32,
        overflow: 'hidden', cursor: 'pointer',
        transition: 'opacity .15s',
        marginBottom: 16,
      }}
      onMouseDown={e => e.currentTarget.style.opacity = '.85'}
      onMouseUp={e => e.currentTarget.style.opacity = '1'}
      onTouchStart={e => e.currentTarget.style.opacity = '.85'}
      onTouchEnd={e => e.currentTarget.style.opacity = '1'}
    >
      <div style={{ padding: '16px 20px 10px' }}>
        <h3 style={{ fontSize: 20, fontWeight: 600, margin: '0 0 4px' }}>{route.title}</h3>
        <p style={{ fontSize: 15, fontWeight: 300, margin: '0 0 8px', textTransform: 'lowercase', lineHeight: 1.4 }}>
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
      <div style={{ position: 'relative', height: 260 }}>
        <img src={route.image} alt={route.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        <button
          onClick={e => e.stopPropagation()}
          style={{
            position: 'absolute', top: 16, right: 16,
            width: 44, height: 44, borderRadius: '50%',
            background: 'rgba(255,255,255,0.9)', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <svg width="22" height="20" viewBox="0 0 22 20" fill="none">
            <path d="M11 19s-9-5.5-9-12a6 6 0 0 1 9-5.2A6 6 0 0 1 20 7c0 6.5-9 12-9 12z" stroke="#333" strokeWidth="1.5"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default function RoutesListScreen({ routes, onSelectRoute }) {
  return (
    <div style={{ background: '#f5f5f5', height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <StatusBar />

      <div style={{ overflowY: 'auto', flex: 1, paddingBottom: 83 }}>
        {/* Header */}
        <div style={{ padding: '8px 24px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <h2 style={{ fontFamily: "'Caveat', cursive", fontSize: 40, letterSpacing: 2, margin: 0 }}>Маршруты</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 15, paddingBottom: 4 }}>
            <svg width="14" height="18" viewBox="0 0 14 18" fill="none">
              <path d="M7 0C3.69 0 1 2.69 1 6c0 4.5 6 12 6 12s6-7.5 6-12c0-3.31-2.69-6-6-6zm0 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" fill="#333"/>
            </svg>
            Москва / СПб
          </div>
        </div>

        {/* Search */}
        <div style={{ padding: '10px 24px 0', display: 'flex', gap: 8 }}>
          <div style={{ flex: 1, height: 42, background: 'white', borderRadius: 30, display: 'flex', alignItems: 'center', padding: '0 14px', gap: 8 }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" opacity=".5">
              <circle cx="7" cy="7" r="5.5" stroke="#000" strokeWidth="1.5"/>
              <path d="M12 12l4 4" stroke="#000" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span style={{ fontSize: 14, color: 'rgba(0,0,0,.5)' }}>Поиск по названию…</span>
          </div>
          <div style={{ width: 50, height: 42, background: 'white', borderRadius: 30, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
              <path d="M1 1h18M4 7h12M7 13h6" stroke="#333" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
        </div>

        {/* Filter chip */}
        <div style={{ padding: '10px 24px 0' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#b1b1b1', borderRadius: 30, padding: '7px 14px', fontSize: 15, fontWeight: 500 }}>
            Ближайшие ко мне
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1l1.5 3L12 4.5l-2.5 2.5.5 3L7 8.5 4 10l.5-3L2 4.5 5.5 4 7 1z" fill="#333"/>
            </svg>
          </div>
        </div>

        {/* Route cards */}
        <div style={{ padding: '14px 24px 0' }}>
          {routes.map(route => (
            <RouteCard key={route.id} route={route} onSelect={onSelectRoute} />
          ))}
        </div>
      </div>

      <TabBar active="routes" />
    </div>
  );
}
