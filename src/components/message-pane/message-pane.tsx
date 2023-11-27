import React from "react";
import { useMessagePaneStore } from "../../stores/message-pane-store";
import MessageItem from "./message-item";
import './message-pane.scss';
import TextField from "./text-field";

const MessagePane: React.FC = () => {
  const messages = useMessagePaneStore((state) => state.messages);
  return (
    <div className="message-pane">
      <div className="messages">
        {messages.map((message, idx) => (
          <MessageItem key={idx} message={message} />
        ))}
      </div>

      <TextField />
    </div>
  );
};

export default MessagePane;
