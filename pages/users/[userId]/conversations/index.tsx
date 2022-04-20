import React, { FC, useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import CircularProgress from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import SendIcon from "@mui/icons-material/Send";

import Conversation from "pages/components/Conversation";
import Message from "pages/components/Message";

type User = {
  id: string;
  name: string;
};

type Conversation = {
  id: string;
  participants: User[];
  lastMessage: {
    id: string;
    sender: User;
    text: string;
    ts: number;
  };
};
const Chatbox = () => (
  <Paper
    sx={{
      p: "2px 4px",
      display: "flex",
      alignItems: "center",
      borderRadius: "9999px",
    }}
  >
    <InputBase
      sx={{ ml: 1, flex: 1 }}
      placeholder="Type your message"
      //onChange={(event) => setAirBnbURL(event.target.value)}
      fullWidth
    />

    <IconButton
      className="smm:hidden bg-lookaround-more_light_grey"
      aria-label="search"
      size="small"
      //onClick={handleSubmit}
    >
      <SendIcon />
    </IconButton>
  </Paper>
);

const Conversations = () => {
  const router = useRouter();
  const { userId } = router.query;
  const [currentConversation, setCurrentConversation] = useState<string>("");
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    axios({
      method: "GET",
      url: `/api/account/${userId}/conversations`,
    })
      .then((res) => {
        setConversations(res.data.rows);
        setIsLoading(false);
      })
      .catch(() => {
        console.log("fail api");
      });
  }, [userId]);
  if (isLoading) return <CircularProgress />;
  return (
    <div
      style={{
        display: "flex",
        margin: "20px",
        gap: "20px",
        minHeight: "500px",
        flexWrap: "wrap",
        maxWidth: "1368px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "16px",
          width: "fit-content",
        }}
      >
        {conversations.map((item) => (
          <div key={item.id}>
            <Conversation
              name={item.participants[1].name}
              lastMessage={item.lastMessage?.text}
              time={item.lastMessage?.ts}
              id={item.id}
              setCurrentConversation={setCurrentConversation}
              currentConversation={currentConversation}
            />
          </div>
        ))}
      </div>

      {currentConversation !== "" && (
        <div
          style={{
            border: "1px solid #ccc",
            borderRadius: "16px",
            display: "flex",
            flexGrow: 1,
            padding: "20px",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Message currentConversation={currentConversation} />
          <Chatbox />
        </div>
      )}
    </div>
  );
};

export default Conversations;
