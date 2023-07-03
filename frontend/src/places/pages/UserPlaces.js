import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../shared/context/auth-context";
import Avatar from "../../shared/components/UIElements/Avatar";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Friends from "../../user/components/Friends";
import PlaceList from "../components/PlaceList";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";
import "./UserPlaces.css";
import axios from "axios";

const UserPlaces = () => {
  const auth = useContext(AuthContext);
  const { isLoading, sendRequest } = useHttpClient();

  const [followers, setFollowers] = useState();
  const [friends, setFriends] = useState("");
  const [loadedPlaces, setLoadedPlaces] = useState();
  const [user, setUser] = useState();
  const [currentUser, setCurrentUser] = useState();
  const [followed, setFollowed] = useState(false);
  const userId = useParams().userId;

  useEffect(() => {
    // fetch current user
    const fetchCurrentUser = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/users/profile/${auth.userId}`
        );
        setCurrentUser(responseData.user);
      } catch (err) {}
    };
    fetchCurrentUser();

    //fetch following
    const fetchFriends = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/users/profile/following/${userId}`
        );
        console.log(responseData);
        console.log("FOLLOWING");
        setFriends(responseData.friends);
      } catch (err) {}
    };

    fetchFriends();

    //fetch followers
    const fetchFollowers = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/users/profile/followers/${userId}`
        );
        console.log(responseData);
        console.log("Followers");
        setFollowers(responseData.friends);
      } catch (err) {}
    };

    fetchFollowers();
  }, [sendRequest, userId, followed]);

  useEffect(() => {
    // fetch user by params
    // fetch user's places
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/places/user/${userId}`
        );
        setLoadedPlaces(responseData.places);
      } catch (err) {}
    };
    fetchPlaces();
    const fetchUser = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/users/profile/${userId}`
        );
        setUser(responseData.user);
      } catch (err) {}
    };
    fetchUser();
  }, [sendRequest, userId]);

  //FOLLOW UNFOLLOW FRIEND
  useEffect(() => {
    setFollowed(currentUser?.following.includes(userId));
    console.log("User " + followed);
  }, [currentUser, userId]);

  const followHandler = async () => {
    try {
      if (!followed) {
        await axios.put(`http://localhost:5000/api/users/${userId}/follow`, {
          userId: currentUser.id,
        });
      } else {
        await axios.put(`http://localhost:5000/api/users/${userId}/unfollow`, {
          userId: currentUser.id,
        });
      }
    } catch (err) {}
    setFollowed(!followed);
  };

  const placeDeletedHandler = (deletedPlaceId) => {
    setLoadedPlaces((prevPlaces) =>
      prevPlaces.filter((place) => place.id !== deletedPlaceId)
    );
  };

  return (
    <React.Fragment>
      <div className="user-places">
        <div className="user-info">
          <Card className="user-card">
            <div className="user-card-img">
              <Avatar image={`http://localhost:5000/${user?.image}`} />
            </div>
            <div className="user-card-info">
              <h2>{user?.name}</h2>
              <span>{user?.email}</span>
            </div>
            <div className="user-card-followers">
              <div className="followers">
                <span>{user?.followers.length}</span>
                <span>Последователи</span>
              </div>
              <div className="followings">
                <span>{user?.following.length}</span>
                <span>Следващи</span>
              </div>
            </div>
            <div className="user-card-button">
              {!isLoading &&
                auth.userId !== user?.id &&
                (!followed ? (
                  <Button onClick={followHandler}>Последвай</Button>
                ) : (
                  <Button onClick={followHandler}>Отследвай</Button>
                ))}
            </div>
          </Card>

          <Card className="followers-friends">
            <h3>Последователи</h3>

            {followers?.length === 0 ? (
              <div className="gray">Този потребител няма последователи.</div>
            ) : (
              followers?.map((friend, i) => (
                <Friends
                  name={friend.name}
                  image={friend.image}
                  id={friend.id}
                  key={i}
                />
              ))
            )}
          </Card>
          <Card className="followers-friends">
            <h3>Следващи</h3>

            {friends.length === 0 ? (
              <div className="gray">Този потребител няма следващи.</div>
            ) : (
              friends?.map((friend, i) => (
                <Friends
                  name={friend.name}
                  image={friend.image}
                  id={friend.id}
                  key={i}
                />
              ))
            )}
          </Card>
        </div>
        <div className="profile-user-places">
          {!loadedPlaces && !isLoading && (
            <div className="place-list center">
              <Card>
                <h2>Няма намерени места. Искате ли да създадете ново?</h2>
                <Button to="/places/new">Сподели място</Button>
              </Card>
            </div>
          )}
          {isLoading && (
            <div className="center">
              <LoadingSpinner />
            </div>
          )}
          {loadedPlaces?.length !== 0 ? (
            <PlaceList
              items={loadedPlaces}
              onDeletePlace={placeDeletedHandler}
            />
          ) : (
            <div className="place-list center">
              <Card>
                <h2>Няма намерени места.</h2>
              </Card>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default UserPlaces;
