import { Option } from "effect";
import React from "react";
import { useGlobalStore } from "../../stores/global-store";
import MessageItem from "./message-item";
import './message-pane.scss';
import TextField from "./text-field";



const MessagesContainer: React.FC = () => {
  const messages = useGlobalStore((state) => Option.match(state.currentConversation, {
    onNone: () => [],
    onSome: (conversation) => conversation.messages,
  }));
  return (
    <div className="messages">
      {messages.map((message, idx) => (
        <MessageItem key={idx} message={message} />
      ))}
    </div>
  );
}

const MessagePane: React.FC = () => {
  return (
    <div className="message-pane">
      <MessagesContainer />
      <TextField />
    </div>
  );
};

export default MessagePane;
