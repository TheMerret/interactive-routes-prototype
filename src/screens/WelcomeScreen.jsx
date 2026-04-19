import StatusBar from '../components/StatusBar';

export default function WelcomeScreen({ onContinue }) {
  return (
    <div style={{ background: '#f5f5f5', height: '100%', position: 'relative', display: 'flex', flexDirection: 'column' }}>
      <StatusBar />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '0 0 40px' }}>
        <div style={{ padding: '200px 47px 0' }}>
          <h1 style={{
            fontFamily: "'Caveat', cursive",
            fontSize: 58, fontWeight: 700,
            letterSpacing: 3, lineHeight: 1.1,
            margin: 0,
          }}>
            Маршруты<br />города
          </h1>
        </div>

        <div style={{ padding: '0 71px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <button onClick={onContinue} style={btnStyle('#aaa')}>Войти</button>
          <button onClick={onContinue} style={btnStyle('#d9d9d9')}>Зарегистрироваться</button>
          <button
            onClick={onContinue}
            style={{ background: 'none', border: 'none', fontSize: 20, fontWeight: 300, cursor: 'pointer', marginTop: 8 }}
          >
            Продолжить без регистрации
          </button>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)', width: 134, height: 5, background: '#000', borderRadius: 5 }} />
    </div>
  );
}

const btnStyle = (bg) => ({
  width: '100%', height: 57,
  background: bg, border: 'none',
  borderRadius: 20, fontSize: 22,
  cursor: 'pointer',
});
