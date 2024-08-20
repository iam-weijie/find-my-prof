import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <ul>
        <li>
          <a href="/">
            <img
              id="logo"
              src="Martlet-glasses.png"
              alt="Find My Prof"
              style={{ width: "50px", height: "auto" }}
            />
          </a>
        </li>
        <li>
          <a href="/">
            <i className="bx bxs-home"></i>
            <p>Home</p>
          </a>
        </li>
        <li>
          <a href="/search">
            <i className="bx bxs-file-find"></i>
            <p>Search</p>
          </a>
        </li>
        <li>
          <a href="/contact">
            <i className="bx bxs-envelope"></i>
            <p>Contact</p>
          </a>
        </li>
        <li>
          <a href="https://www.ratemyprofessors.com/">
            <i className="bx bxs-chat"></i>
            <p>RMP</p>
          </a>
        </li>
      </ul>
    </main>
  );
}
