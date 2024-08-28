import { useState, useEffect, useRef } from "react";
import "../style/App.scss";
import Logo from "../assets/svg/Logo";
import { askChatGPT } from "../Service/authService";

interface Message {
  type: "user" | "chatgpt";
  content: string;
  timestamp: string;
}

const App = () => {
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const chatHistoryRef = useRef<HTMLDivElement>(null); // הפנייה ל-div של ההודעות
  const lastMessageRef = useRef<HTMLDivElement>(null); // הפנייה להודעה האחרונה

  const handleSubmit = async () => {
    setLoading(true);
    const userMessage: Message = {
      type: "user",
      content: userInput,
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    await askChatGPT(userInput, setLoading, setMessages);
    setUserInput("");
  };

  useEffect(() => {
    // גלילה לתחילת ההודעה האחרונה
    if (lastMessageRef.current && chatHistoryRef.current) {
      const chatContainer = chatHistoryRef.current;
      const lastMessageElement = lastMessageRef.current;

      // חישוב מיקום ההודעה האחרונה
      const topPosition = lastMessageElement.offsetTop;
      const containerHeight = chatContainer.clientHeight;

      // גלילה לתחילת ההודעה האחרונה
      chatContainer.scrollTo({
        top: topPosition - (containerHeight / 2),
        behavior: 'smooth',
      });
    }
  }, [messages]); // התגובה תתרחש כל פעם שיתווספו הודעות חדשות

  return (
    <div className="container clearfix">
      <div className="chat">
        <div className="chat-header">
          <Logo />
        </div>
        <div className="chat-history" ref={chatHistoryRef}>
          <ul>
            {messages.map((msg, index) => (
              <div
                className="clearfix"
                key={index}
                ref={index === messages.length - 1 ? lastMessageRef : null} // הגדרת הפנייה להודעה האחרונה
              >
                <div
                  className={`message-data align-${
                    msg.type === "user" ? "right" : "left"
                  }`}
                >
                  <span className="message-data-time">{msg.timestamp}</span>{" "}
                  &nbsp; &nbsp;
                  <span className="message-data-name">
                    {msg.type === "user" ? "Me" : "ChatGPT"}
                  </span>{" "}
                  <i
                    className={`fa fa-circle ${
                      msg.type === "user" ? "me" : "online"
                    }`}
                  ></i>
                </div>
                <div
                  className={`message ${
                    msg.type === "user"
                      ? "other-message float-right"
                      : "my-message float-left"
                  }`}
                >
                  {msg.content}
                  {loading && msg && (
                    <div className="loading-indicator">
                      <i className="fa fa-spinner fa-spin"></i> Loading...
                    </div>
                  )}
                </div>
              </div>
            ))}
          </ul>
        </div>
        <div className="chat-message clearfix">
          <textarea
            name="message-to-send"
            id="message-to-send"
            placeholder="Type your message"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          ></textarea>
          <button onClick={handleSubmit} disabled={loading}>
            {loading ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
