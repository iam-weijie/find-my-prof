import Button from "@mui/material/Button";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <ul>
        <li>
          <a href="/">
            <Image
              id="logo"
              src="/RedBird.png"
              alt="Find My Prof"
              width={50}
              height={50}
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
      <div>
        <h1>Welcome McGillians!</h1>
        <p>This is where you find the right professor for your courses.</p>
        <Link href="/search">
          <Button
            variant="contained"
            style={{
              backgroundImage: "linear-gradient(30deg, #ff4000, #fd9815)",
            }}
          >
            Start Looking
          </Button>
        </Link>
      </div>
    </main>
  );
}
