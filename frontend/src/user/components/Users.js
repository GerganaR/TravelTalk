import React from "react";
import { Link } from "react-router-dom";
import Avatar from "../../shared/components/UIElements/Avatar";
import Card from "../../shared/components/UIElements/Card";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";

import "./Users.css";
import Rating from "@material-ui/lab/Rating";

const Users = ({ users }) => {
  const rating = (userPlaces) => {
    switch (userPlaces) {
      case 0:
        return <Rating className="rating" readOnly value={0} size="small" />;
      case 1:
        return <Rating className="rating" readOnly value={1} size="small" />;
      case 2:
        return <Rating className="rating" readOnly value={2} size="small" />;
      case 3:
        return <Rating className="rating" readOnly value={3} size="small" />;
      case 4:
        return <Rating className="rating" readOnly value={4} size="small" />;

      default:
        return <Rating className="rating" readOnly value={5} size="small" />;
    }
  };

  return (
    <React.Fragment>
      <Card>
        <h3>Водещи потребители</h3>

        {users && (
          <ul className="users-list">
            {users
              .sort((a, b) => a.places.length - b.places.length)
              .reverse()
              .map((user, i) => (
                <li key={i} className="user-item">
                  <div className="user-item__content">
                    <Link to={`/${user.id}/places`}>
                      <div className="user-item__image">
                        <Avatar
                          image={`http://localhost:5000/${user.image}`}
                          alt={user.name}
                        />
                      </div>
                      <div className="user-item__info">
                        <h2>{user.name}</h2>
                        <h3>{rating(user.places.length)}</h3>
                      </div>
                    </Link>
                    <Link to={`/${user.id}/places`}>
                      <div className="follow-btn">
                        <PermIdentityOutlinedIcon fontSize="small" />
                      </div>
                    </Link>
                  </div>
                </li>
              ))}
          </ul>
        )}
      </Card>
    </React.Fragment>
  );
};

export default Users;
