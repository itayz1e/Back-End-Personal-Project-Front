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
  const [error, setError] = useState<string | null>(null);
  const chatHistoryRef = useRef<HTMLDivElement>(null);
  const lastMessageRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async () => {

    const dbConnected = localStorage.getItem('dbConnected');
    
    if (dbConnected !== 'true') {
      setError("Please connect to the database before sending messages.");
      return;
    }

    setLoading(true);
    setError(null); // Clear previous error message

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
    if (lastMessageRef.current && chatHistoryRef.current) {
      const chatContainer = chatHistoryRef.current;
      const lastMessageElement = lastMessageRef.current;

      const topPosition = lastMessageElement.offsetTop;
      const containerHeight = chatContainer.clientHeight;

      chatContainer.scrollTo({
        top: topPosition - (containerHeight / 2),
        behavior: 'smooth',
      });
    }
  }, [messages]);

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
                ref={index === messages.length - 1 ? lastMessageRef : null}
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
            {error && <h3 className="error">{error}</h3>}
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
