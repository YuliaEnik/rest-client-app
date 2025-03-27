import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h2>this is our new progect</h2>
      </main>
      <footer className={styles.footer}>
        <h2>footer</h2>
      </footer>
    </div>
  );
}
