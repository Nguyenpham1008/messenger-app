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
import { ConversationContainer } from "containers/Conversations";
import { SearchConversation } from "pages/components/SearchConversation";
import { Box } from "@mui/system";
import { Close } from "@mui/icons-material";

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
  <div style={{ padding: 20, position: "absolute", bottom: 5, width: "100%" }}>
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
        autoFocus
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
  </div>
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
    <ConversationContainer
      search={<SearchConversation />}
      convervations={conversations.map((item) => (
        <div key={item.id}>
          <Conversation
            name={
              item.participants.filter((item) => item.id !== userId)[0].name
            }
            lastMessage={item.lastMessage?.text}
            time={item.lastMessage?.ts}
            id={item.id}
            setCurrentConversation={setCurrentConversation}
            currentConversation={currentConversation}
          />
        </div>
      ))}
    >
      {currentConversation !== "" ? (
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
          <Box sx={{ p: 1, background: "#eee",display:'flex',justifyContent:'space-between',alignItems:'center' }}>
            <h3>
              Conversation between You and {conversations.find(item => item.id == currentConversation)?.participants.filter((item) => item.id != userId)[0]?.name}.
            </h3>
            <IconButton onClick={()=>setCurrentConversation("")} color="error">
              <Close/>
            </IconButton>
          </Box>
          <Message currentConversation={currentConversation} />
          <Chatbox />
        </div>
      ) : (
        <></>
      )}
    </ConversationContainer>
  );
};

export default Conversations;
