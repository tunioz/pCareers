import Link from 'next/link';

export default function NotFound() {
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
      <div style={{ fontSize: '8rem', fontWeight: 700, color: '#1EBCC5', lineHeight: 1, marginBottom: '1rem' }}>
        404
      </div>
      <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#3a3a3a', marginBottom: '1rem' }}>
        Page not found
      </h1>
      <p style={{ fontSize: '1.125rem', color: '#6b7280', marginBottom: '2rem', maxWidth: '28rem' }}>
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        style={{
          backgroundColor: '#1EBCC5',
          color: 'white',
          padding: '0.75rem 2rem',
          borderRadius: '9999px',
          textDecoration: 'none',
          fontWeight: 600,
          fontSize: '1rem',
          transition: 'background-color 150ms ease',
        }}
      >
        Back to Home
      </Link>
    </div>
  );
}
