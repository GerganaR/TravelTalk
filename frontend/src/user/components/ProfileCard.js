import React from "react";
import Card from "../../shared/components/UIElements/Card";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

import Avatar from "../../shared/components/UIElements/Avatar";
import Button from "../../shared/components/FormElements/Button";
import Friends from "../components/Friends";

import "./ProfileCard.css";

const ProfileCard = ({ currentUser, friends }) => {
  return (
    <div className="profile-wrapper">
      <Card className="profile-card">
        <div className="profile-card-img">
          <Avatar image={`http://localhost:5000/${currentUser?.image}`} />
        </div>
        <div className="profile-card-info">
          <h2>{currentUser?.name}</h2>
          <span>{currentUser?.email}</span>
        </div>
        <div className="profile-card-followers">
          <div className="followers">
            <span>{currentUser?.followers.length}</span>
            <span>Последователи</span>
          </div>
          <div className="followings">
            <span>{currentUser?.following.length}</span>
            <span>Следващи</span>
          </div>
        </div>
        <div className="profile-card-button">
          <Button to={`/${currentUser?.id}/places`}>ВИЖ ВСИЧКИ МЕСТА</Button>
        </div>
      </Card>
      <Card className="friends-wrapper">
        <h3>Близки приятели</h3>
        <div className="friends-friend">
          {friends.length === 0 ? (
            <span className="gray">
              Последвайте потребител, за да го добавите в близки приятели.
            </span>
          ) : (
            friends.map((friend, i) => (
              <Friends
                name={friend.name}
                image={friend.image}
                id={friend.id}
                key={i}
              />
            ))
          )}
          {/* {friends ? (
            friends?.map((friend, i) => (
              <Friends
                name={friend.name}
                image={friend.image}
                id={friend.id}
                key={i}
              />
            ))
          ) : (
            <div>Добавете приятели</div>
          )} */}
        </div>
      </Card>
    </div>
  );
};

export default ProfileCard;
