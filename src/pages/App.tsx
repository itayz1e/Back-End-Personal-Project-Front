import { useState } from "react";
import "../style/App.scss";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  const users = [
    { id: 1, name: "Vincent Porter", status: "online" },
    { id: 2, name: "Aiden Chavez", status: "offline" },
    { id: 3, name: "Mike Thomas", status: "online" },
    { id: 4, name: "Erica Hughes", status: "online" },
    { id: 5, name: "Ginger Johnston", status: "online" },
    { id: 6, name: "Tracy Carpenter", status: "offline" },
    { id: 7, name: "Christian Kelly", status: "offline" },
    { id: 8, name: "Monica Ward", status: "online" },
    { id: 9, name: "Dean Henry", status: "offline" },
    { id: 10, name: "Peyton Mckinney", status: "online" },
  ];

  return (
    <>
      <a href="/login">Sign in</a>
      <br />
      <a href="/register">Register</a>
      <br />
      <a href="/">Main</a>

      <div className="container clearfix">
        <div className="people-list" id="people-list">
          <div className="search">
            <input
              type="text"
              placeholder="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <i className="fa fa-search"></i>
          </div>
          <ul className="list">
            {users
              .filter((user) =>
                user.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((user) => (
                <li key={user.id} className="clearfix">
                  <img
                    src={`https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_0${user.id}.jpg`}
                    alt="avatar"
                  />
                  <div className="about">
                    <div className="name">{user.name}</div>
                    <div className="status">
                      <i
                        className={`fa fa-circle ${
                          user.status === "online" ? "online" : "offline"
                        }`}
                      ></i>{" "}
                      {user.status === "online"
                        ? "online"
                        : `offline since Oct 28`}
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </div>

        <div className="chat">
          <div className="chat-header">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="70"
              height="70"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#000"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                d="M21 15.5c0 1.1-.9 2-2 2h-4l-3 3-3-3H5c-1.1 0-2-.9-2-2V6c0-2.2 1.8-4 4-4h12c2.2 0 4 1.8 4 4v9.5z"
                fill="#e0e0e0"
                stroke="#000"
              ></path>
              <text
                x="50%"
                y="50%"
                dominant-baseline="middle"
                text-anchor="middle"
                font-size="10"
                font-family="Arial, sans-serif"
                fill="#000"
              >
                AI
              </text>
            </svg>
          </div>

          <div className="chat-history">
            <ul>
              <div className="clearfix">
                <div className="message-data align-right">
                  <span className="message-data-time">10:10 AM, Today</span>{" "}
                  &nbsp; &nbsp;
                  <span className="message-data-name">Me</span>{" "}
                  <i className="fa fa-circle me"></i>
                </div>
                <div className="message other-message float-left">
                  Actually everything was fine. I'm very excited to show this to
                  our team.
                </div>
              </div>

              <div className="clearfix">
                <div className="message-data align-left">
                  <span className="message-data-name">ChatGPT</span>{" "}
                  <i className="fa fa-circle online"></i>
                  <span className="message-data-time">
                    10:11 AM, Today
                  </span>{" "}
                  &nbsp; &nbsp;
                </div>
                <div className="message my-message float-right">
                  Actually everything was fine. I'm very excited to show this to
                  our team.
                </div>
              </div>
              <div className="clearfix">
                <div className="message-data align-right">
                  <span className="message-data-time">10:10 AM, Today</span>{" "}
                  &nbsp; &nbsp;
                  <span className="message-data-name">Me</span>{" "}
                  <i className="fa fa-circle me"></i>
                </div>
                <div className="message other-message float-left">
                  Actually everything was fine. I'm very excited to show this to
                  our team.
                </div>
              </div>

              <div className="clearfix">
                <div className="message-data align-left">
                  <span className="message-data-name">ChatGPT</span>{" "}
                  <i className="fa fa-circle online"></i>
                  <span className="message-data-time">
                    10:11 AM, Today
                  </span>{" "}
                  &nbsp; &nbsp;
                </div>
                <div className="message my-message float-right">
                  Actually everything was fine. I'm very excited to show this to
                  our team.
                </div>
              </div>
              <div className="clearfix">
                <div className="message-data align-right">
                  <span className="message-data-time">10:10 AM, Today</span>{" "}
                  &nbsp; &nbsp;
                  <span className="message-data-name">Me</span>{" "}
                  <i className="fa fa-circle me"></i>
                </div>
                <div className="message other-message float-left">
                  Actually everything was fine. I'm very excited to show this to
                  our team.
                </div>
              </div>

              <div className="clearfix">
                <div className="message-data align-left">
                  <span className="message-data-name">ChatGPT</span>{" "}
                  <i className="fa fa-circle online"></i>
                  <span className="message-data-time">
                    10:11 AM, Today
                  </span>{" "}
                  &nbsp; &nbsp;
                </div>
                <div className="message my-message float-right">
                  Actually everything was fine. I'm very excited to show this to
                  our team.
                </div>
              </div>
              <div className="clearfix">
                <div className="message-data align-right">
                  <span className="message-data-time">10:10 AM, Today</span>{" "}
                  &nbsp; &nbsp;
                  <span className="message-data-name">Me</span>{" "}
                  <i className="fa fa-circle me"></i>
                </div>
                <div className="message other-message float-left">
                  Actually everything was fine. I'm very excited to show this to
                  our team.
                </div>
              </div>

              <div className="clearfix">
                <div className="message-data align-left">
                  <span className="message-data-name">ChatGPT</span>{" "}
                  <i className="fa fa-circle online"></i>
                  <span className="message-data-time">
                    10:11 AM, Today
                  </span>{" "}
                  &nbsp; &nbsp;
                </div>
                <div className="message my-message float-right">
                  Actually everything was fine. I'm very excited to show this to
                  our team.
                </div>
              </div>
              <div className="clearfix">
                <div className="message-data align-right">
                  <span className="message-data-time">10:10 AM, Today</span>{" "}
                  &nbsp; &nbsp;
                  <span className="message-data-name">Me</span>{" "}
                  <i className="fa fa-circle me"></i>
                </div>
                <div className="message other-message float-left">
                  Actually everything was fine. I'm very excited to show this to
                  our team.
                </div>
              </div>

              <div className="clearfix">
                <div className="message-data align-left">
                  <span className="message-data-name">ChatGPT</span>{" "}
                  <i className="fa fa-circle online"></i>
                  <span className="message-data-time">
                    10:11 AM, Today
                  </span>{" "}
                  &nbsp; &nbsp;
                </div>
                <div className="message my-message float-right">
                  Actually everything was fine. I'm very excited to show this to
                  our team.
                </div>
              </div>
            </ul>
          </div>

          <div className="chat-message clearfix">
            <textarea
              name="message-to-send"
              id="message-to-send"
              placeholder="Type your message"
              // rows="3"
            ></textarea>
            <i className="fa fa-file-o"></i> &nbsp;&nbsp;&nbsp;
            <i className="fa fa-file-image-o"></i>
            <button>Send</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
