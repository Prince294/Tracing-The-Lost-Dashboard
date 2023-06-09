import React, { useEffect, useState } from "react";
import "../../ComponentCss/Home.css";
import Img1 from "../../Images/box1-img.png";
import Img2 from "../../Images/box2-img.png";
import Img3 from "../../Images/box3-img.png";
import http from "../Services/utility";
import { apisPath } from "../Utils/path";

export default function Home() {
  const [totalRegistered, setTotalRegistered] = useState(0);
  const [totalVerifiedUser, setTotalVerifiedUser] = useState(0);
  const [totalPendingVerification, setTotalPendingVerification] = useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await http
      .post(apisPath?.admin?.dashboardData, {
        session: localStorage.getItem("session"),
      })
      .then((res) => {
        setData(res?.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="Home">
      <h2>Home</h2>
      <hr className="partitionHr" />
      <div className="cards">
        {[
          {
            title: "Total Registration",
            count: data?.total_registration,
            image: Img1,
          },
          {
            title: "Total Verified User",
            count: data?.total_verified_user,
            image: Img2,
          },
          {
            title: "Total Pending Verification",
            count: data?.total_pending_verification,
            image: Img3,
          },
        ].map((card, index) => {
          return (
            <HomeCards
              key={index}
              title={card?.title}
              count={card?.count}
              image={card?.image}
            />
          );
        })}
      </div>
    </div>
  );
}

const HomeCards = (props) => {
  return (
    <div className="card">
      <div className="cardContent">
        <span>{props?.title}</span>
        <span className="card__count">{props?.count}</span>
      </div>
      <div className="image">
        <img src={props?.image} alt="Card Logo" />
      </div>
    </div>
  );
};
