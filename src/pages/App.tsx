import "../style/App.scss";
import Logo from "../assets/svg/Logo";

const App = () => {
  return (
    <div className="container clearfix">
      <div className="chat">
        <div className="chat-header">
          <Logo />
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
              <div className="message other-message float-right">
                How many users do I have?
              </div>
            </div>
            <div className="clearfix">
              <div className="message-data align-left">
                <span className="message-data-name">ChatGPT</span>{" "}
                <i className="fa fa-circle online"></i>
                <span className="message-data-time">10:11 AM, Today</span>{" "}
                &nbsp; &nbsp;
              </div>
              <div className="message my-message float-left">[ 21 ]</div>
            </div>
            <div className="clearfix">
              <div className="message-data align-right">
                <span className="message-data-time">10:10 AM, Today</span>{" "}
                &nbsp; &nbsp;
                <span className="message-data-name">Me</span>{" "}
                <i className="fa fa-circle me"></i>
              </div>
              <div className="message other-message float-right">
                How many users do I have?
              </div>
            </div>
            <div className="clearfix">
              <div className="message-data align-left">
                <span className="message-data-name">ChatGPT</span>{" "}
                <i className="fa fa-circle online"></i>
                <span className="message-data-time">10:11 AM, Today</span>{" "}
                &nbsp; &nbsp;
              </div>
              <div className="message my-message float-left">[ 21 ]</div>
            </div>
            <div className="clearfix">
              <div className="message-data align-right">
                <span className="message-data-time">10:10 AM, Today</span>{" "}
                &nbsp; &nbsp;
                <span className="message-data-name">Me</span>{" "}
                <i className="fa fa-circle me"></i>
              </div>
              <div className="message other-message float-right">
                How many users do I have?
              </div>
            </div>
            <div className="clearfix">
              <div className="message-data align-left">
                <span className="message-data-name">ChatGPT</span>{" "}
                <i className="fa fa-circle online"></i>
                <span className="message-data-time">10:11 AM, Today</span>{" "}
                &nbsp; &nbsp;
              </div>
              <div className="message my-message float-left">[ 21 ]</div>
            </div>
            <div className="clearfix">
              <div className="message-data align-right">
                <span className="message-data-time">10:10 AM, Today</span>{" "}
                &nbsp; &nbsp;
                <span className="message-data-name">Me</span>{" "}
                <i className="fa fa-circle me"></i>
              </div>
              <div className="message other-message float-right">
                How many users do I have?
              </div>
            </div>
            <div className="clearfix">
              <div className="message-data align-left">
                <span className="message-data-name">ChatGPT</span>{" "}
                <i className="fa fa-circle online"></i>
                <span className="message-data-time">10:11 AM, Today</span>{" "}
                &nbsp; &nbsp;
              </div>
              <div className="message my-message float-left">[ 21 ]</div>
            </div>
          </ul>
        </div>
        <div className="chat-message clearfix">
          <textarea
            name="message-to-send"
            id="message-to-send"
            placeholder="Type your message"
          ></textarea>
          <i className="fa fa-file-o"></i> &nbsp;&nbsp;&nbsp;
          <i className="fa fa-file-image-o"></i>
          <button>Send</button>
        </div>
      </div>
    </div>
  );
};

export default App;
