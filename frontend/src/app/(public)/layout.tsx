import { Header } from '@/components/public/Header';
import { Footer } from '@/components/public/Footer';
import { CookieBanner } from '@/components/public/CookieBanner';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Header />
      <main id="main-content">{children}</main>
      <Footer />
      <CookieBanner />
    </>
  );
}
