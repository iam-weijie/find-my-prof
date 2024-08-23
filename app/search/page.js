"use client";

import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import styles from "./page.module.css";

export default function Search() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hey! I'm the Find Your Prof support assistant. How can I help you today?",
    },
  ]);
  const [message, setMessage] = useState("");

  const sendMessage = async () => {
    setMessage("");
    setMessages((messages) => [
      ...messages,
      { role: "user", content: message },
      { role: "assistant", content: "" },
    ]);

    const response = fetch("/api/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([...messages, { role: "user", content: message }]),
    }).then(async (res) => {
      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      let result = "";
      return reader.read().then(function processText({ done, value }) {
        if (done) {
          return result;
        }
        const text = decoder.decode(value || new Uint8Array(), {
          stream: true,
        });
        setMessages((messages) => {
          let lastMessage = messages[messages.length - 1];
          let otherMessages = messages.slice(0, messages.length - 1);
          return [
            ...otherMessages,
            { ...lastMessage, content: lastMessage.content + text },
          ];
        });
        return reader.read().then(processText);
      });
    });
  };
  return (
    <main className={styles.main}>
      <Box
        width="100vw"
        height="100vh"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        bgcolor="black"
      >
        <ul
          style={{
            listStyle: "none",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            width: "105vw",
            paddingRight: "10px",
            paddingTop: "12px",
          }}
        >
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
            <a>
              <i
                className="bx bxs-home "
                style={{ color: "black !important" }}
              ></i>
            </a>
          </li>
          <li>
            <a>
              <i
                className="bx bxs-file-find"
                style={{ color: "black !important" }}
              ></i>
            </a>
          </li>
          <li>
            <a>
              <i
                className="bx bxs-envelope"
                style={{ color: "black !important" }}
              ></i>
            </a>
          </li>
          <li>
            <a href="https://www.ratemyprofessors.com/">
              <i className="bx bxs-chat"></i>
              <p>RMP</p>
            </a>
          </li>
        </ul>

        <Stack
          direction={"column"}
          width={{ xs: "90vw", sm: "600px" }}
          height={{ xs: "75vh", sm: "700px" }}
          spacing={3}
          paddingBottom={2}
        >
          <Stack
            direction={"column"}
            spacing={2}
            flexGrow={1}
            overflow="auto"
            maxHeight="100%"
          >
            {messages.map((message, index) => (
              <Box
                key={index}
                display="flex"
                justifyContent={
                  message.role === "assistant" ? "flex-start" : "flex-end"
                }
              >
                <Box
                  bgcolor={message.role === "assistant" ? "black" : "#1f1f1f"}
                  color={message.role === "assistant" ? "#707070" : "#fafafa"}
                  borderRadius={1}
                  p={1.2}
                >
                  {message.content}
                </Box>
              </Box>
            ))}
          </Stack>
          <Stack direction={"row"} spacing={2}>
            <TextField
              label="Message"
              fullWidth
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              inputProps={{ style: { color: "#fafafa" } }}
              color="grey"
            />
            <Button
              variant="text"
              onClick={sendMessage}
              sx={{ color: "grey", fontSize: "1.2rem" }}
            >
              →
            </Button>
          </Stack>
        </Stack>
        <Typography variant="caption" color="grey" fontStyle="italic">
          This AI assistant is NOT a certified academic advisor.
        </Typography>
      </Box>
    </main>
  );
}
