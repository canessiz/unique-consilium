import Link from 'next/link';
import { useState } from 'react';
import styles from '../styles/Header.module.css';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/">
            <h1>Unique Consilium</h1>
          </Link>
        </div>
        
        <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
          <Link href="/" className={styles.navLink}>Home</Link>
          <Link href="/about" className={styles.navLink}>About</Link>
          <Link href="/services" className={styles.navLink}>Services</Link>
          <Link href="/contact" className={styles.navLink}>Contact</Link>
          <Link href="/auth/login" className={styles.navLink}>Login</Link>
          <Link href="/auth/register" className={`${styles.navLink} ${styles.registerBtn}`}>Register</Link>
        </nav>

        <button 
          className={styles.menuToggle}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}