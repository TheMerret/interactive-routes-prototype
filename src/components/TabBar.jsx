const tabs = [
  {
    id: 'routes',
    label: 'Маршруты',
    icon: (active) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M3 12L12 3L21 12V20H15V15H9V20H3V12Z"
          stroke={active ? '#000' : '#999'} strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'favorites',
    label: 'Избранное',
    icon: (active) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 21s-9-5.5-9-12a6 6 0 0 1 9-5.2A6 6 0 0 1 21 9c0 6.5-9 12-9 12z"
          stroke={active ? '#000' : '#999'} strokeWidth="1.5"
          fill={active ? '#000' : 'none'}/>
      </svg>
    ),
  },
  {
    id: 'profile',
    label: 'Профиль',
    icon: (active) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="8" r="4" stroke={active ? '#000' : '#999'} strokeWidth="1.5"/>
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"
          stroke={active ? '#000' : '#999'} strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
];

export default function TabBar({ active = 'routes', onChange }) {
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0,
      height: 83, background: 'white',
      borderTop: '1px solid rgba(0,0,0,0.08)',
      display: 'flex', alignItems: 'flex-start', paddingTop: 10,
      flexShrink: 0,
    }}>
      {tabs.map(tab => {
        const isActive = tab.id === active;
        return (
          <button
            key={tab.id}
            onClick={() => onChange?.(tab.id)}
            style={{
              flex: 1, display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: 3,
              fontSize: 10, fontWeight: 500,
              color: isActive ? '#000' : '#999',
              background: 'none', border: 'none', cursor: 'pointer',
              padding: 0,
            }}
          >
            {tab.icon(isActive)}
            {tab.label}
          </button>
        );
      })}
      <div style={{
        position: 'absolute', bottom: 8, left: '50%',
        transform: 'translateX(-50%)',
        width: 134, height: 5, background: '#000', borderRadius: 5,
      }} />
    </div>
  );
}
