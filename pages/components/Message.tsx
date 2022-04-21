import React, { FC, useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import CircularProgress from "@mui/material/Button";

import Conversation from "pages/components/Conversation";
import Message from "pages/components/Message";

type User = {
  id: string;
  name: string;
};

type Message = {
  id: string;
  text: string;
  sender: User;
  createdAt: number;
};

const Messages: FC<{
  currentConversation: string;
}> = ({ currentConversation }) => {
  const router = useRouter();
  console.log(currentConversation)
  const { userId } = router.query;
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    axios({
      method: "GET",
      url: `/api/account/${userId}/conversation/${currentConversation}/messages`,
    })
      .then((res) => {
        setMessages(res.data.rows);
        setIsLoading(false);
      })
      .catch(() => {
        console.log("fail api");
      });
  }, [userId, currentConversation]);
  if (isLoading) return <CircularProgress />;
  console.log(messages,'mess')
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        padding:20
      }}
    >
      {messages.map((item) => (
        <div
          key={item.id}
          style={{
            textAlign: item.sender.id === userId ? "left" : "right",
            border: "1px solid #ccc",
            borderRadius: "16px",
            padding: "0px 10px",
            minWidth: "300px",
            alignSelf: item.sender.id === userId ? "flex-start" : "flex-end",
          }}
        >
          <h4>{item.text}</h4>
        </div>
      ))}
    </div>
  );
};

export default Messages;
