'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Inter, system-ui, sans-serif',
      backgroundColor: '#f8f9fa',
      padding: '2rem',
      textAlign: 'center',
    }}>
      <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="15" y1="9" x2="9" y2="15" />
          <line x1="9" y1="9" x2="15" y2="15" />
        </svg>
      </div>
      <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#3a3a3a', marginBottom: '0.5rem' }}>
        Something went wrong
      </h1>
      <p style={{ fontSize: '1rem', color: '#6b7280', marginBottom: '2rem', maxWidth: '28rem' }}>
        {error.message || 'An unexpected error occurred. Please try again.'}
      </p>
      <button
        onClick={reset}
        style={{
          backgroundColor: '#1EBCC5',
          color: 'white',
          padding: '0.75rem 2rem',
          borderRadius: '9999px',
          border: 'none',
          cursor: 'pointer',
          fontWeight: 600,
          fontSize: '1rem',
        }}
      >
        Try again
      </button>
    </div>
  );
}
