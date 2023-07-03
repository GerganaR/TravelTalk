import React, { useState } from "react";
import { Link } from "react-router-dom";
import Card from "../../shared/components/UIElements/Card";
import Avatar from "../../shared/components/UIElements/Avatar";
import ReadMoreOutlinedIcon from "@mui/icons-material/ReadMoreOutlined";
import SearchIcon from "@mui/icons-material/Search";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";

import "./AllPlaces.css";
const AllPlaces = ({ places }) => {
  const [query, setQuery] = useState("");

  return (
    <div>
      <Card className="search-all-places">
        <div>
          <SearchIcon className="search-icon" />
          <input
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Търси забележителности и вдъхновение..."
          />
        </div>
      </Card>
      <div className="all-places">
        {places
          ?.filter((place) => place.title.toLowerCase33().includes(query))
          ?.map((place, i) => (
            <Card key={i} className="place-card">
              <div className="place-info-wrapper">
                {/* <Link key={i} to={`/${place.creator?.id}/places`}></Link> */}
                <div className="place-card-info">
                  <div className="place-avatar">
                    <Avatar
                      image={`http://localhost:5000/${place.creator?.image}`}
                      alt={place.creator?.name}
                      width={70}
                    />
                  </div>

                  <div className="place-meta">
                    <h2>{place.creator?.name}</h2>
                    <h3>{place.title}</h3>
                  </div>
                </div>
                <div className="place-button">
                  <Link to={`/${place.creator?.id}/places`}>
                    <span>
                      <ReadMoreOutlinedIcon fontSize="medium" />
                    </span>
                  </Link>

                  <Link to={"/messenger"}>
                    <span>
                      <ChatBubbleOutlineOutlinedIcon fontSize="medium" />
                    </span>
                  </Link>
                </div>
              </div>
              <div className="place-image">
                <img
                  src={`http://localhost:5000/${place.image}`}
                  alt={place.name}
                />
              </div>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default AllPlaces;
