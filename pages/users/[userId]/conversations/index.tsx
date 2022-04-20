import React, { FC, useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import CircularProgress from "@mui/material/Button";
import Button from "@mui/material/Button";

import Conversation from "pages/components/Conversation";

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

const Conversations = () => {
  const router = useRouter();
  const { userId } = router.query;
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
              lastMessage={item.lastMessage.text}
              time={item.lastMessage.ts}
            />
          </div>
        ))}
      </div>

      <div style={{ border: "1px solid #ccc", borderRadius: "16px", display: "flex", flexGrow: 1, padding: "20px" }}>
        hello
      </div>
    </div>
  );
};

export default Conversations;
