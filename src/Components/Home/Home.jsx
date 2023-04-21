import React, { useEffect, useState } from "react";
import "../../ComponentCss/Home.css";
import Img1 from "../../Images/box1-img.png";
import Img2 from "../../Images/box2-img.png";
import Img3 from "../../Images/box3-img.png";

export default function Home(props) {
  return (
    <div className="Home">
      <h2>Home</h2>
      <hr className="partitionHr" />
      <div className="cards">
        {[
          { title: "Total Registration", count: 100, image: Img1 },
          { title: "Total Verified User", count: 100, image: Img2 },
          { title: "Total Pending Verification", count: 100, image: Img3 },
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
