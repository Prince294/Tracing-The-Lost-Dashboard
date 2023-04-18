import React, { useEffect, useState } from "react";
import "../ComponentCss/Home.css";

const HomeMenuListItems = (props) => {
  return (
    <li>
      <div className={`line ${props.index === 0 ? "after" : ""}`}></div>
      <div className="homeListContent">
        <h4>{props.name}</h4>
        <div className="no_of_msgs">{props.no_of_msgs}</div>
      </div>
    </li>
  );
};

const TableTr = (props) => {
  return <th>{props.name}</th>;
};

export default function Home(props) {
  const mapTableItemType = ["", "pending", "solved", "rejected"];

  var totalPendingTableRows = 0;
  var totalSolvedTableRows = 0;
  var totalRejectedTableRows = 0;

  for (let i = 0; i < data.length; i++) {
    if (data[i].type.toLowerCase() === "pending") {
      totalPendingTableRows++;
    } else if (data[i].type.toLowerCase() === "solved") {
      totalSolvedTableRows++;
    } else {
      totalRejectedTableRows++;
    }
  }

  return (
    <>
      <h2>
        Tracing The Lost Admin Panel<sub>request for last 30days</sub>
      </h2>
      <hr className="partitionHr" />
      <div className="homeMenu">
        <ul>
          {[
            { no_of_msgs: data.length, name: "Request" },
            { no_of_msgs: totalPendingTableRows, name: "Pending" },
            { no_of_msgs: totalSolvedTableRows, name: "Solved" },
            { no_of_msgs: totalRejectedTableRows, name: "Rejected" },
          ].map((item, index) => {
            return (
              <HomeMenuListItems
                key={item.name}
                index={index}
                no_of_msgs={item.no_of_msgs}
                name={item.name}
              />
            );
          })}
        </ul>
      </div>
      <hr className="partitionHr" />
      <table className="homeTable">
        <thead>
          {props.toggleHomeTableHeaders === 0 ||
          props.toggleHomeTableHeaders === 1 ? (
            <tr>
              {console.log(props.toggleHomeTableHeaders)}

              {[
                "Id",
                "Username",
                "Email",
                "Mobile",
                "Name",
                "DOB",
                "Gender",
                "KYC Status",
                "User ID Proof",
                "",
              ].map((item) => {
                return <TableTr key={item} name={item} />;
              })}
            </tr>
          ) : (
            <tr>
              {[
                "Id",
                "Username",
                "Email",
                "Mobile",
                "Name",
                "DOB",
                "Gender",
                "KYC Status",
                "User ID Proof",
              ].map((item) => {
                return <TableTr key={item} name={item} />;
              })}
            </tr>
          )}
        </thead>
        <tbody>
          {props.toggleHomeTableHeaders === 0
            ? data.map((item, key) => {
                return (
                  <tr key={key}>
                    <td style={{ minWidth: "5vw" }}>{item.id}</td>
                    <td style={{ minWidth: "10vw" }}>{item.username}</td>
                    <td style={{ minWidth: "12vw" }}>{item.email}</td>
                    <td style={{ minWidth: "5vw" }}>{item.mobile}</td>
                    <td style={{ minWidth: "7vw" }}>{item.dob}</td>
                    <td style={{ minWidth: "10vw" }}>{item.name}</td>
                    <td style={{ minWidth: "5vw" }}>{item.gender}</td>
                    <td style={{ minWidth: "6vw" }}>{item.kyc_status}</td>
                    <td style={{ minWidth: "6vw" }}>
                      {item.verified_user_id_proof}
                    </td>
                    {item?.verified_user_status === "pending" ? (
                      <td style={{ minWidth: "6vw" }}>
                        <button>Verify</button>
                      </td>
                    ) : (
                      <td></td>
                    )}
                  </tr>
                );
              })
            : props.toggleHomeTableHeaders !== 0
            ? data.map((item, key) => {
                if (
                  item.type.toLowerCase() ===
                  mapTableItemType[
                    parseInt(props.toggleHomeTableHeaders)
                  ].toLowerCase()
                ) {
                  return (
                    <tr key={key}>
                      <td style={{ minWidth: "5vw" }}>{item.id}</td>
                      <td style={{ minWidth: "10vw" }}>{item.username}</td>
                      <td style={{ minWidth: "12vw" }}>{item.email}</td>
                      <td style={{ minWidth: "5vw" }}>{item.mobile}</td>
                      <td style={{ minWidth: "7vw" }}>{item.dob}</td>
                      <td style={{ minWidth: "10vw" }}>{item.name}</td>
                      <td style={{ minWidth: "5vw" }}>{item.gender}</td>
                      <td style={{ minWidth: "6vw" }}>{item.kyc_status}</td>
                      <td style={{ minWidth: "6vw" }}>
                        {item.verified_user_id_proof}
                      </td>
                      {item?.verified_user_status === "pending" ? (
                        <td style={{ minWidth: "6vw" }}>
                          <button>Verify</button>
                        </td>
                      ) : (
                        <td></td>
                      )}
                    </tr>
                  );
                }
              })
            : ""}
        </tbody>
      </table>
    </>
  );
}

const data = [
  {
    type: "pending",
    id: "101",
    username: "prince",
    name: "Prince Kumar",
    email: "Admin@gmail.com",
    gender: "Male",
    dob: "23/07/2002",
    mobile: 9876543211,
    kyc_status: "pending",
    user_id_proof: "null",
    verified_user_status: "pending",
  },
  {
    type: "Solved",
    id: "101",
    username: "reflex",
    name: "Neha Sharma",
    email: "Admin123@yopmail.com",
    gender: "Female",
    dob: "15/10/2002",
    mobile: 98765246211,
    kyc_status: "solved",
    user_id_proof: "null",
    verified_user_status: "solved",
  },
];
