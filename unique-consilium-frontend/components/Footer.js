import Link from 'next/link';
import styles from '../styles/Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <h3>Unique Consilium</h3>
            <p>Professional advisory services for your unique needs.</p>
          </div>
          
          <div className={styles.footerSection}>
            <h4>Quick Links</h4>
            <ul>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/services">Services</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/privacy">Privacy Policy</Link></li>
            </ul>
          </div>
          
          <div className={styles.footerSection}>
            <h4>Contact Info</h4>
            <p>Email: info@uniqueconsilium.com</p>
            <p>Phone: +1 (555) 123-4567</p>
          </div>
        </div>
        
        <div className={styles.footerBottom}>
          <p>&copy; 2024 Unique Consilium. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}