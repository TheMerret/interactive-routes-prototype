import StatusBar from '../components/StatusBar';

export default function RouteDetailScreen({ route, onBack, onStart }) {
  return (
    <div style={{ background: '#f5f5f5', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <StatusBar />

      <div style={{ overflowY: 'auto', flex: 1, paddingBottom: 32 }}>
        {/* Nav row */}
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '8px 24px' }}>
          <button onClick={onBack} style={circleBtn}>‹</button>
          <h2 style={{ fontFamily: "'GuanoApes', cursive", fontSize: 36, letterSpacing: 2, margin: 0, textAlign: 'center', maxWidth: 260, lineHeight: 1.1 }}>
            {route.title}
          </h2>
          <button style={{ ...circleBtn, position: 'absolute', right: 24 }}>
            <svg width="18" height="20" viewBox="0 0 18 20" fill="none">
              <path d="M9 13V2M9 2L5 6M9 2l4 4M1 15v4h16v-4" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, padding: '8px 24px' }}>
          {[
            [route.points, 'точек'],
            [route.duration.replace(' часа','ч').replace(',5','½'), ''],
            [route.distance, ''],
          ].map(([val, label], i) => (
            <div key={i} style={{
              width: 76, height: 76, borderRadius: '50%',
              background: 'rgba(233,233,233,0.9)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              fontSize: 14, textAlign: 'center', lineHeight: 1.3,
            }}>
              <span style={{ fontSize: 20, fontWeight: 600 }}>{val}</span>
              {label && <span style={{ color: '#555', fontSize: 12 }}>{label}</span>}
            </div>
          ))}
        </div>

        {/* Hero image */}
        <div style={{ position: 'relative', height: 280, overflow: 'hidden' }}>
          <img src={route.image} alt={route.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </div>

        {/* CTA row */}
        <div style={{ padding: '16px 22px 0', display: 'flex', alignItems: 'center', gap: 12 }}>
          <button
            onClick={onStart}
            style={{
              flex: 1, height: 56, background: '#b1b1b1', border: 'none', borderRadius: 20, cursor: 'pointer',
              fontFamily: "'GuanoApes', cursive", fontSize: 34, letterSpacing: 4,
            }}
          >
            В путь!
          </button>
          <button style={{ width: 50, height: 50, borderRadius: '50%', background: 'white', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="22" height="20" viewBox="0 0 22 20" fill="none">
              <path d="M11 19s-9-5.5-9-12a6 6 0 0 1 9-5.2A6 6 0 0 1 20 7c0 6.5-9 12-9 12z" stroke="#333" strokeWidth="1.5"/>
            </svg>
          </button>
        </div>

        {/* Description */}
        <p style={{ padding: '16px 28px 0', fontSize: 16, fontWeight: 300, lineHeight: 1.65, margin: 0 }}>
          {route.description}
        </p>

        {/* Tags */}
        <div style={{ padding: '14px 28px', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {route.tags.map(t => (
            <span key={t} style={{ background: '#e7e7e7', borderRadius: 30, padding: '4px 12px', fontSize: 14 }}>{t}</span>
          ))}
        </div>

        {/* Route endpoints */}
        <div style={{ margin: '0 22px', background: '#e9e9e9', borderRadius: 20, padding: 18 }}>
          <div style={{ fontSize: 13, color: '#777', marginBottom: 8 }}>Маршрут</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 15 }}>
            <span>🚇 {route.start}</span>
            <span style={{ color: '#aaa' }}>—</span>
            <span>📍 {route.end}</span>
          </div>
        </div>

        {/* Map link */}
        <div style={{
          margin: '14px 22px 0',
          height: 72, background: '#d9d9d9', borderRadius: 20,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 22px', cursor: 'pointer',
        }}>
          <span style={{ fontSize: 19, fontWeight: 500 }}>Смотреть точки на карте</span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M4 4h12v12M4 16L16 4" stroke="#333" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
      </div>
    </div>
  );
}

const circleBtn = {
  width: 46, height: 46, borderRadius: '50%',
  background: 'rgba(255,255,255,0.85)', border: 'none',
  cursor: 'pointer', fontSize: 22, fontWeight: 300,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  flexShrink: 0, position: 'absolute', left: 24,
};
