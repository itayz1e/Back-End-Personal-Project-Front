import { useState } from "react";

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

  const handleSubmit = async () => {
    const userMessage: Message = {
      type: "user",
      content: userInput,
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    await askChatGPT(userInput, setLoading, setMessages);
    setUserInput("");
  };

  return (
    <div className="container clearfix">
      <div className="chat">
        <div className="chat-header">
          <Logo />
        </div>
        <div className="chat-history">
          <ul>
            {messages.map((msg, index) => (
              <div className="clearfix" key={index}>
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
