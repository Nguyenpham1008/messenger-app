import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Message } from "components/Message";

export default function useFetchMessages(currentConversation: string) {
  const router = useRouter();
  const { userId } = router.query;
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [prevCursor, setPreCursor] = useState<string>("");
  const [trigger, setTrigger] = useState<boolean>(false);

  useEffect(() => {
    setMessages([]);
    setPreCursor("");
  }, [currentConversation]);

  const params = prevCursor !== "" ? { cursor: prevCursor } : {};

  useEffect(() => {
    setLoading(true);
    axios({
      method: "GET",
      url: `/api/account/${userId}/conversation/${currentConversation}/messages?pageSize=15`,
      params: params,
    })
      .then((res) => {
        setMessages((prevMessages) => {
          return [...res.data.rows.reverse(), ...prevMessages];
        });
        setPreCursor(res.data.cursor_prev);
        setHasMore(!!res.data.cursor_prev || false);
        setLoading(false);
      })
      .catch((e) => {
        console.log("failed to fetch messages");
      });
  }, [trigger, currentConversation]);

  return { loading, messages, hasMore, setMessages, setTrigger };
}
