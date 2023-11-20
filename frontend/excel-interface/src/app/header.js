import styles from "./page.module.css";

export default function Header() {
  return (
    <>
      <div className={styles.title_bar}>
        <h1>Excellent Interface</h1>
        <button className={styles.connect_button}>Connected to: URL</button>
      </div>
    </>
  );
}
