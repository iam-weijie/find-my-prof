"use client";

import emailjs from "@emailjs/browser";
import { useEffect, useRef } from "react";
import styles from "./page.module.css";

const publicKey = "OcY4_jUcIu4KDpLEI";
const serviceID = "service_u48x7o7";
const templateID = "template_zci1a7u";

export default function Contact() {
  const formRef = useRef();

  useEffect(() => {
    emailjs.init(publicKey);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const submitBtn = formRef.current.querySelector(".submit-btn");
    const emailInput = formRef.current.querySelector("#user_email");
    const nameInput = formRef.current.querySelector("#user_name");
    const messageInput = formRef.current.querySelector("#message");

    submitBtn.innerText = "One moment...";

    const inputFields = {
      name: nameInput.value,
      email: emailInput.value,
      message: messageInput.value,
    };

    emailjs.send(serviceID, templateID, inputFields).then(
      () => {
        submitBtn.innerText = "Sent successfully";
        formRef.current.reset();
      },
      (error) => {
        console.log(error);
        submitBtn.innerText = "Something went wrong";
      }
    );
  };

  return (
    <main className={styles.main}>
      <div>
        <h1>Contact Me</h1>
        <form id="contact-form" ref={formRef} onSubmit={handleSubmit}>
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
            <a href="https://x.com/iam_weijie">
              <i className="bx bxl-twitter"></i>
            </a>
          </li>
        </ul>
      </div>
    </main>
  );
}
