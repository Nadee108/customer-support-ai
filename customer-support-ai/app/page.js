'use client';

import { Box, Stack, TextField, Button, Typography } from "@mui/material";
import { useState } from "react";

export default function Home() {
  const [history, setHistory] = useState([]);
  const [message, setMessage] = useState("");

  const firstMessage = "Hi there! I'm the Headstarter virtual assistant. How can I help?";

  const sendMessage = async () => {
    if (message.trim() === "") return;

    const newHistory = [...history, { role: "user", parts: [{ text: message }] }];
    setHistory(newHistory);
    setMessage("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newHistory),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch response");
      }

      const data = await response.json();

      setHistory((prevHistory) => [
        ...prevHistory,
        { role: "model", parts: [{ text: data.text }] },
      ]);
    } catch (error) {
      console.error("Error fetching chat response:", error);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{
        backgroundColor: '#1a2a6c', // Solid dark blue background
      }}
    >
      <Stack
        direction="column"
        justifyContent="flex-end"
        width="50%"
        height="80%"
        maxHeight="80%"
        borderRadius={5}
        p={2}
        spacing={3}
      >
        <Stack direction="column" spacing={2} overflow="auto" mb={2}>
          <Box
            display="flex"
<<<<<<< HEAD
            justifyContent="flex-start"
          >
            <Box
              sx={{
                bgcolor: 'secondary.main', // Matches the API response box color
                color: 'white', // White text color
                borderRadius: 10,
                p: 2,
                maxWidth: '70%',
                position: 'relative',
              }}
            >
              <Typography>
                {firstMessage}
              </Typography>
            </Box>
=======
            justifyContent="flex-end"
            sx={{
              bgcolor: 'secondary.main', // Matches the API response box color
              borderRadius: 10,
              p: 2,
            }}
          >
            <Typography color="white"> {/* Matching text color with API response */}
              {firstMessage}
            </Typography>
>>>>>>> 41a47476c4a60588938200c7dfd09690e1f2a49c
          </Box>
          {history.map((textObject, index) => (
            <Box
              key={index}
              display="flex"
              justifyContent={textObject.role === 'user' ? 'flex-end' : 'flex-start'}
            >
              <Box
                sx={{
                  bgcolor: textObject.role === 'user' ? 'lightgreen' : 'secondary.main',
<<<<<<< HEAD
                  color: 'white',
                  borderRadius: 10,
                  p: 2,
                  maxWidth: '70%',
                  position: 'relative',
=======
                  color: 'white', // Matching text color with API response
                  borderRadius: 10,
                  p: 2,
>>>>>>> 41a47476c4a60588938200c7dfd09690e1f2a49c
                }}
              >
                {textObject.parts[0].text}
              </Box>
            </Box>
          ))}
        </Stack>
        <Stack direction="row" spacing={2} width="100%">
          <TextField
            label="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress} // Handles pressing Enter to send
            fullWidth
            InputProps={{
              style: { color: 'white' }, // White text color
            }}
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)', // Semi-transparent background for better visibility
              borderRadius: 1,
            }}
          />
          <Button variant="contained" onClick={sendMessage} sx={{ bgcolor: 'lightgreen', color: 'black' }}>
            Send
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
