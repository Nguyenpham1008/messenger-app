import React, { FC, useEffect, useState } from "react";
import Link from "next/link";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { displayTimeForChat } from "utils";

const Conversation: FC<{
  name: string;
  lastMessage: string;
  time: number;
  id: string;
  setCurrentConversation: any;
  currentConversation: string;
}> = ({
  name,
  lastMessage,
  time,
  id,
  setCurrentConversation,
  currentConversation,
}) => {
  return (
    <Button
      variant="outlined"
      sx={{
        marginTop: "10px",
        borderRadius: "5px",
        textTransform: "none",
        color: "black",
        background: id === currentConversation ? "cornsilk" : null,
      }}
      onClick={() => setCurrentConversation(id)}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          // paddingRight: "50px",
          minWidth: "300px",
        }}
      >
        <Avatar sx={{ marginRight: "10px" }} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            width: '100%'
          }}
        >
          <h5 style={{ margin: "5px" }}>{name}</h5>
          <h6 style={{ margin: "5px",width:'100%' }}>
            <div style={{display:'flex', justifyContent:'space-between'}}>
              <div><i>{lastMessage || "No message"}</i></div>
              <div>{displayTimeForChat(time)}</div>
            </div>
            </h6>
        </div>
      </div>
    </Button>
  );
};

export default Conversation;
