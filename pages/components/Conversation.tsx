import React, { FC } from "react";
import Link from "next/link";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

const Conversation: FC<{ name: string; lastMessage: string; time: number }> = ({ name, lastMessage, time }) => {
  return (
    <Button variant="outlined" sx={{ marginTop: "10px", borderRadius: "10px", textTransform: "none", color: "black" }}>
      <div style={{ display: "flex", alignItems: "center", paddingRight: "50px", minWidth: "300px" }}>
        <Avatar sx={{ marginRight: "10px" }} />
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <h5 style={{ margin: "5px" }}>{name}</h5>
          <h6 style={{ margin: "5px" }}>{lastMessage}</h6>
        </div>
      </div>
    </Button>
  );
};

export default Conversation;
