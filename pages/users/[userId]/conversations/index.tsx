import React, { FC, useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import CircularProgress from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import SendIcon from "@mui/icons-material/Send";

import Conversation from "components/Conversation";
import { ConversationContainer } from "containers/Conversations";
import { SearchConversation } from "components/SearchConversation";
import { Box } from "@mui/system";
import { Close } from "@mui/icons-material";
import { sortBy } from "lodash";

import { useForm } from "react-hook-form";
import MessageComponent, { Message } from "components/Message";

import useFetchMessages from "components/hooks/useFetchMessages";

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
    createdAt: number;
  };
};
const Chatbox = ({
  getValues,
  register,
  onSubmit,
}: {
  getValues: any;
  register: any;
  onSubmit: any;
}) => (
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
        {...register("message")}
        name="message"
        placeholder="Type your message"
        //onChange={(event) => setAirBnbURL(event.target.value)}
        onKeyDown={onSubmit}
        fullWidth
      />

      <IconButton
        className="smm:hidden bg-lookaround-more_light_grey"
        size="small"
        onClick={onSubmit}
        component="span"
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

  const { messages, hasMore, loading, setMessages, setTrigger } =
    useFetchMessages(currentConversation);

  const loadmore = () => {
    hasMore && setTrigger((preValue) => !preValue);
  };

  const { register, getValues, setValue } = useForm({
    defaultValues: {
      message: "",
    },
  });
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

  const handleSendMessage = async (e: React.KeyboardEvent<HTMLElement>) => {
    const { message } = getValues();
    if (e.key != "Enter") {
      return;
    }

    if (message.trim() == "") {
      // empty message
      return;
    }

    let resSendMessage = await axios.post(
      `/api/account/${userId}/conversation/${currentConversation}/messages`,
      {
        text: message,
      }
    );
    if (resSendMessage.status == 201) {
      let newResponseMessage = resSendMessage.data;
      let newMessage: Message = {
        id: newResponseMessage.id,
        text: newResponseMessage.text,
        sentById: newResponseMessage.sender?.id,
        conversationId: currentConversation,
        createdAt: newResponseMessage.createdAt,
        sender: newResponseMessage.sender,
      };
      messages.push(newMessage);
      setMessages([...messages]);
      // update last conservations
      let findCurrentConversation = conversations.filter(
        (item) => item.id == currentConversation
      )[0];
      let lastMessage = {
        id: newResponseMessage.id,
        ts: newResponseMessage.createdAt,
        createdAt: newResponseMessage.createdAt,
        text: newResponseMessage.text,
        sender: newResponseMessage.sender,
      };
      findCurrentConversation.lastMessage = lastMessage;
      setConversations([
        findCurrentConversation,
        ...conversations.filter(
          (item) => item.id != findCurrentConversation.id
        ),
      ]);
      setValue("message", "");
    }
  };
  return (
    <ConversationContainer
      search={<SearchConversation />}
      convervations={conversations.map((item) => (
        <div key={item.id}>
          <Conversation
            name={
              item.participants?.filter((item) => item.id !== userId)[0].name
            }
            lastMessage={item.lastMessage?.text}
            time={item.lastMessage?.createdAt}
            id={item.id}
            setCurrentConversation={setCurrentConversation}
            currentConversation={currentConversation}
          />
        </div>
      ))}
    >
      {currentConversation !== "" ? (
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
          <Box
            sx={{
              p: 1,
              background: "#eee",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h3>
              Conversation between{" "}
              {
                conversations
                  .find((item) => item.id == currentConversation)
                  ?.participants?.filter((item) => item.id != userId)[0]?.name
              }{" "}
              anh You.
            </h3>
            <IconButton
              onClick={() => setCurrentConversation("")}
              color="error"
            >
              <Close />
            </IconButton>
          </Box>
          <MessageComponent
            currentConversation={currentConversation}
            messagesData={messages}
            loadmore={loadmore}
            loading={loading}
          />
          <Chatbox
            register={register}
            getValues={getValues}
            onSubmit={handleSendMessage}
          />
        </div>
      ) : (
        <></>
      )}
    </ConversationContainer>
  );
};

export default Conversations;
