import React from "react";
import { useMessagePaneStore } from "../../stores/message-pane-store";
import './message-pane.scss';
import MessageView from "./message-view";
import TextField from "./text-field";

const MessagePane: React.FC = () => {
  const messages = useMessagePaneStore((state) => state.messages);
  return (
    <>
      {messages.map((message) => (
        <MessageView message={message} />
      ))}
      <TextField />
    </>
  );
};

export default MessagePane;
