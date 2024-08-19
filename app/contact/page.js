import styles from "./page.module.css";

export default function Contact() {
  return (
    <main className={styles.main}>
      <div>
        <h1>Contact Me</h1>
        <form id="contact-form">
          <label htmlFor="user_name">Name</label>
          <input
            type="text"
            id="user_name"
            name="user_name"
            placeholder="Your name..."
            required
          />

          <label htmlFor="user_email">Email</label>
          <input
            type="email"
            id="user_email"
            name="user_email"
            placeholder="example@gmail.com"
            required
          />
          <label htmlFor="message">Message</label>
          <textarea
            type="message"
            id="message"
            placeholder="Your message..."
            required
          ></textarea>
          <button type="submit" className="submit-btn">
            Send
          </button>
        </form>

        <ul>
          <li>
            <a href="https://www.linkedin.com/in/weijiew/">
              <i className="bx bxl-linkedin"></i>
            </a>
          </li>
          <li>
            <a href="https://github.com/iam-weijie">
              <i className="bx bxl-github"></i>
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/iam._.weijie/">
              <i className="bx bxl-instagram"></i>
            </a>
          </li>
        </ul>
      </div>
    </main>
  );
}
