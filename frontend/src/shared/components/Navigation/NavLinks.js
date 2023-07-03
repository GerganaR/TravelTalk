import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AddLocationAltOutlinedIcon from "@mui/icons-material/AddLocationAltOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import LoginIcon from "@mui/icons-material/Login";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import Avatar from "../UIElements/Avatar";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import { AuthContext } from "../../context/auth-context";
import { useHttpClient } from "../../hooks/http-hook";
import "./NavLinks.css";

const NavLinks = (props) => {
  const auth = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/users/profile/${auth.userId}`
        );
        setCurrentUser(responseData.user);
      } catch (err) {}
    };
    fetchCurrentUser();
  }, [auth.userId]);

  return (
    <ul className="nav-links">
      <div className="nav-links-flex">
        {/* <NavLink to="/" exact>
          ALL USERS
        </NavLink> */}
        {auth.isLoggedIn && (
          <li>
            <NavLink to="/profile">
              <PermIdentityOutlinedIcon />
            </NavLink>
          </li>
        )}
        {auth.isLoggedIn && (
          <li>
            <NavLink to={`/${auth.userId}/places`}>
              <LocationOnOutlinedIcon />
            </NavLink>
          </li>
        )}
        {auth.isLoggedIn && (
          <li>
            <NavLink to={`/explore`}>
              <ExploreOutlinedIcon />
            </NavLink>
          </li>
        )}

        {auth.isLoggedIn && (
          <li>
            {/* <NavLink to="/places" exact>
            All PLACES
          </NavLink> */}
            <NavLink to="/messenger" exact>
              <ChatBubbleOutlineIcon />
            </NavLink>
          </li>
        )}

        {auth.isLoggedIn && (
          <li>
            <NavLink to="/places/new">
              <AddOutlinedIcon />
            </NavLink>
          </li>
        )}
      </div>
      <div className="nav-links-flex">
        {!auth.isLoggedIn && (
          <li>
            <NavLink to={`/explore`}>
              <ExploreOutlinedIcon />
            </NavLink>
          </li>
        )}
        {/* Not authenticated */}
        {!auth.isLoggedIn && (
          <li>
            <NavLink to={`/bestplaces`}>
              <StarBorderOutlinedIcon />
            </NavLink>
          </li>
        )}
        {!auth.isLoggedIn && (
          <li>
            <NavLink to="/auth">
              <LoginIcon />
            </NavLink>
          </li>
        )}

        {auth.isLoggedIn && (
          <li>
            <div>
              <Avatar
                width={45}
                image={`http://localhost:5000/${currentUser?.image}`}
              />
            </div>
          </li>
        )}
        {auth.isLoggedIn && <div>{currentUser?.name}</div>}

        {auth.isLoggedIn && (
          <li>
            <button onClick={auth.logout}>
              <LogoutIcon />
            </button>
          </li>
        )}
      </div>
    </ul>
  );
};

export default NavLinks;
