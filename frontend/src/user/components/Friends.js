import React from "react";
import { Link } from "react-router-dom";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import "./Friends.css";

const Friends = (props) => {
  return (
    <div className="friend-info">
      <div className="friend">
        <img
          className="friend-img"
          src={`http://localhost:5000/${props?.image}`}
          alt="friend"
        />
        <p>{props?.name}</p>
      </div>
      <div className="friend-more">
        <Link to={`/${props.id}/places`}>
          <MoreHorizOutlinedIcon />
        </Link>
      </div>
    </div>
  );
};

export default Friends;
