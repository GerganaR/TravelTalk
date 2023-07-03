import React, { useState, useEffect } from "react";
import { format } from "timeago.js";
import axios from "axios";
import "./Message.css";

export default function Message({ message, own }) {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}
