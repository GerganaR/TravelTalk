import React, { useState, useEffect, useContext } from "react";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";

import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import AllPlaces from "../../places/components/AllPlaces";
import ProfileCard from "../components/ProfileCard";
import Users from "../components/Users";
import "./Profile.css";

const User = () => {
  const auth = useContext(AuthContext);
  const { sendRequest } = useHttpClient();
  const [currentUser, setCurrentUser] = useState();
  const [friends, setFriends] = useState();
  const [places, setPlaces] = useState();
  const [users, setUsers] = useState();

  useEffect(() => {
    //fetch Places (Feed)
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/places/`
        );

        setPlaces(responseData.places.reverse());
      } catch (err) {}
    };
    fetchPlaces();

    // fetch Users
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/users"
        );

        setUsers(responseData.users);
      } catch (err) {}
    };
    fetchUsers();
  }, [sendRequest]);
  useEffect(() => {
    //fetch currentUser
    const fetchCurrentUser = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/users/profile/${auth.userId}`
        );
        setCurrentUser(responseData.user);
      } catch (err) {}
    };

    fetchCurrentUser();
    // fetch Friends
    const fetchFriends = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/users/profile/following/${auth.userId}`
        );
        setFriends(responseData.friends);
        console.log(responseData.friends);
      } catch (err) {}
    };

    fetchFriends();
  }, [sendRequest, auth.userId]);

  return (
    <>
      {!currentUser && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      <div className="profile">
        {currentUser && (
          <>
            {" "}
            {currentUser && friends && (
              <ProfileCard currentUser={currentUser} friends={friends} />
            )}
            <div className="post">
              {places && <AllPlaces places={places} />}
            </div>
            <div className="friends">{users && <Users users={users} />}</div>
          </>
        )}
      </div>
    </>
  );
};

export default User;
