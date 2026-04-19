export default function StatusBar({ light = false }) {
  const color = light ? 'white' : 'black';
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '14px 24px 0',
      height: 50,
      position: 'relative',
      flexShrink: 0,
    }}>
      <span style={{ fontSize: 17, fontWeight: 600, color, fontVariant: 'tabular-nums' }}>9:41</span>
      <div style={{
        position: 'absolute', left: '50%', top: 10,
        transform: 'translateX(-50%)',
        width: 120, height: 34,
        background: '#000', borderRadius: 20,
      }} />
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        <svg width="19" height="13" viewBox="0 0 19 13" fill="none">
          <rect x="0" y="8" width="3" height="5" rx="1" fill={color}/>
          <rect x="4" y="5" width="3" height="8" rx="1" fill={color}/>
          <rect x="8" y="2" width="3" height="11" rx="1" fill={color}/>
          <rect x="12" y="0" width="3" height="13" rx="1" fill={color}/>
        </svg>
        <svg width="17" height="13" viewBox="0 0 17 13" fill="none">
          <path d="M8.5 3a8.48 8.48 0 0 1 5.978 2.47L16 3.95A10.97 10.97 0 0 0 8.5 1 10.97 10.97 0 0 0 1 3.95l1.522 1.52A8.48 8.48 0 0 1 8.5 3z" fill={color}/>
          <path d="M8.5 6a5.49 5.49 0 0 1 3.866 1.59L14 6.057A7.98 7.98 0 0 0 8.5 4 7.98 7.98 0 0 0 3 6.057L4.634 7.59A5.49 5.49 0 0 1 8.5 6z" fill={color}/>
          <circle cx="8.5" cy="11" r="2" fill={color}/>
        </svg>
        <svg width="28" height="13" viewBox="0 0 28 13" fill="none">
          <rect x="0.5" y="0.5" width="23" height="12" rx="3.5" stroke={color}/>
          <rect x="2" y="2" width="18" height="9" rx="2" fill={color}/>
          <path d="M25 4.5v4a2 2 0 0 0 0-4z" fill={color}/>
        </svg>
      </div>
    </div>
  );
}
