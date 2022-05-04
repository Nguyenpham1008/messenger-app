import React, { FC, useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import CircularProgress from "@mui/material/Button";

import Message from "components/Message";

type User = {
  id: string;
  name: string;
};

export type Message = {
  id: string;
  text: string;
  sender: User;
  createdAt: number;
  sentById: string;
  conversationId: string;
};

const MessageComponent: FC<{
  currentConversation: string;
  messagesData: Message[];
  loadmore: any;
  loading: boolean;
}> = ({ currentConversation, messagesData, loadmore, loading }) => {
  const router = useRouter();
  const messagesEndRef = useRef<null | HTMLElement>(null);

  const listInnerRef: any = useRef();

  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop } = listInnerRef.current;
      if (scrollTop === 0) {
        loadmore();
      }
    }
  };

  const { userId } = router.query;
  const [messages, setMessages] = useState<Message[]>(messagesData);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    setMessages([...messagesData]);
  }, [messagesData]);
  // if (isLoading) return <CircularProgress />;
  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  return (
    <div
      onScroll={onScroll}
      ref={listInnerRef}
      style={{
        width: "100%",
        display: "flex",
        maxHeight: "80vh",
        flexDirection: "column",
        gap: "10px",
        padding: 20,
        overflowY: "scroll",
        marginBottom: 10,
      }}
    >
      {loading && <div style={{ textAlign: "center" }}> Loading... </div>}
      {messages.map((item, index) => (
        <div
          key={item.id}
          style={{
            textAlign: item.sender.id === userId ? "right" : "left",
            border: "1px solid #ccc",
            borderRadius: "16px",
            padding: "0px 10px",
            minWidth: "300px",
            alignSelf: item.sender.id === userId ? "flex-end" : "flex-start",
          }}
        >
          <h4>{item.text}</h4>
        </div>
      ))}
      <div ref={messagesEndRef as React.RefObject<HTMLDivElement>}></div>
    </div>
  );
};

export default MessageComponent;
