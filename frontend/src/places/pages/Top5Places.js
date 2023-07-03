import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook";
import Card from "../../shared/components/UIElements/Card";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import "../components/AllPlaces.css";

const Top5Places = () => {
  const [places, setPlaces] = useState();
  const { sendRequest } = useHttpClient();

  useEffect(() => {
    //fetch Places (Feed)
    const fetchPlaces = async () => {
      try {
        const res = await sendRequest(`http://localhost:5000/api/places/`);

        setPlaces(res.places.reverse().slice(0, 5));
        console.log(res.places);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPlaces();
  }, [sendRequest]);
  return (
    <>
      <Card className="top-five-title">
        <h2>Последно рекомендирани места от потребителите</h2>
      </Card>
      <div className="top-five">
        {places &&
          places.map((place, i) => (
            <Card key={i} className="place-card-top-five">
              <div className="place-info-wrapper">
                <div className="place-info-wrapper-top-five">
                  <div className="place-meta-top-five">
                    <h3>{place.title}</h3>
                  </div>
                </div>

                <div className="place-button-top-five">
                  <Link to={`/${place.creator?.id}/places`}>
                    <span>
                      <VerifiedOutlinedIcon fontSize="medium" />
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
    </>
  );
};

export default Top5Places;
