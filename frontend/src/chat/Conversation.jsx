import React, { useState, useEffect } from "react";

import axios from "axios";
import "./Conversation.css";

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);

  const friendId = conversation.members.find(
    (m) => m !== currentUser?.user?._id
  );

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios(
          `http://localhost:5000/api/users/profile/${friendId}`
        );
        setUser(res.data.user);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, friendId, conversation]);
  return (
    <div className="conversation">
      <div className="conversation">
        <img
          className="conversationImg"
          src={`http://localhost:5000/${user?.image}`}
          alt="img-user"
        />
        <span className="conversationName">{user?.name}</span>
      </div>
    </div>
  );
}
