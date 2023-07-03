import React from "react";
import axios from "axios";
import "./ChatFriends.css";

export default function ChatFriends({ currentUser, friend, setCurrentChat }) {
  const handleClick = async (userId) => {
    try {
      const responseData = await axios(
        `http://localhost:5000/api/conversations/find/${currentUser}/${userId}`
      );
      console.log(responseData.data);

      if (responseData.data === null) {
        const res = await axios.post(
          `http://localhost:5000/api/conversations/`,
          {
            senderId: currentUser,
            receiverId: userId,
          }
        );
        console.log(res.data);
        setCurrentChat(res.data);
      } else {
        setCurrentChat(responseData.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="rightbarFriend" onClick={() => handleClick(friend?.id)}>
      <div className="rightbarProfileImgContainer">
        <img
          className="rightbarProfileImg"
          src={`http://localhost:5000/${friend?.image}`}
          alt="friend-name"
        />
      </div>
      <span className="rightbarUsername">{friend?.name}</span>
    </div>
  );
}
