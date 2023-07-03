import React, { useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import Conversation from "./Conversation";
import Message from "./Message";
import { AuthContext } from "../shared/context/auth-context";
import { io } from "socket.io-client";
import "./Messenger.css";
import LoadingSpinner from "../shared/components/UIElements/LoadingSpinner";
import Card from "../shared/components/UIElements/Card";
import ChatFriends from "./ChatFriends";

export default function Messenger() {
  const [friends, setFriends] = useState();
  const [conversations, setConversations] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const [currentChat, setCurrentChat] = useState();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState();
  const [senderImage, setSenderImage] = useState();

  const user = useContext(AuthContext);
  const socket = useRef();

  // socket
  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user.userId);
    socket.current.on("getUsers", (users) => {});
  }, [user]);

  // getCurrentUser
  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const responseData = await axios(
          `http://localhost:5000/api/users/profile/following/${user.userId}`
        );
        setFriends(responseData.data.friends);
      } catch (err) {}
    };
    fetchFriends();

    const getUser = async () => {
      try {
        const res = await axios(
          `http://localhost:5000/api/users/profile/${user.userId}`
        );
        setCurrentUser(res.data);
      } catch (err) {}
    };
    getUser();
  }, [user.userId]);

  // getConversations
  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/conversations/" + user.userId
        );
        setConversations(res.data);
      } catch (err) {}
    };
    getConversations();
  }, [user.userId, friends, conversations]);

  //getMessages
  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/messages/" + currentChat?._id
        );

        setMessages(res.data);
      } catch (err) {}
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user.userId,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== user.userId
    );

    socket.current.emit("sendMessage", {
      senderId: user.userId,
      receiverId: receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post(
        "http://localhost:5000/api/messages",
        message
      );
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {}
  };

  return (
    <div className="messenger">
      <Card className="chatMenu">
        <div className="chatMenuWrapper">
          <h2>Разговори</h2>
          {!conversations && <LoadingSpinner></LoadingSpinner>}
          {currentUser &&
            conversations?.map((c, i) => (
              <div onClick={() => setCurrentChat(c)}>
                <Conversation
                  key={i}
                  conversation={c}
                  currentUser={currentUser}
                />
              </div>
            ))}
        </div>
      </Card>
      <Card className="chatBox">
        <div className="chatBoxWrapper">
          {currentChat ? (
            <>
              <div className="chatBoxTop">
                {messages.map((m, i) => (
                  <div>
                    <Message
                      key={i}
                      message={m}
                      own={m.sender === user.userId}
                    />
                  </div>
                ))}
              </div>
              <div className="chatBoxBottom">
                <textarea
                  className="chatMessageInput"
                  placeholder="Напишете ново съобщение..."
                  onChange={(e) => setNewMessage(e.target.value)}
                  value={newMessage}
                ></textarea>
                <button className="chatSubmitButton" onClick={handleSubmit}>
                  Изпрати
                </button>
              </div>
            </>
          ) : (
            <span className="noConversationText">
              Отворете разговор, за да започнете чат
            </span>
          )}
        </div>
      </Card>
      <Card className="chatOnline">
        <div className="chatOnlineWrapper">
          <h2>Приятели</h2>
          {!friends && <LoadingSpinner></LoadingSpinner>}
          {currentUser &&
            friends?.map((friend, i) => (
              <ChatFriends
                key={i}
                currentUser={currentUser?.user.id}
                friend={friend}
                setCurrentChat={setCurrentChat}
              />
            ))}
        </div>
      </Card>
    </div>
  );
}
