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
  return (
    <div>
      {messages.map((item) => (
        <div
          key={item.id}
          style={{ textAlign: item.sender.id === userId ? "left" : "right" }}
        >
          <h4>{item.text}</h4>
        </div>
      ))}
    </div>
  );
};

export default Messages;
