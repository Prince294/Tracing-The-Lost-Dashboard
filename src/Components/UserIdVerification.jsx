import React, { useEffect, useState } from "react";
import "../ComponentCss/Home.css";
import http from "./Services/utility";
import { apisPath } from "./Utils/path";
import UserIdVerificationPopup from "./UserIdVerificationPopup";
import GppBadRoundedIcon from "@mui/icons-material/GppBadRounded";
import GppGoodRoundedIcon from "@mui/icons-material/GppGoodRounded";

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

export default function UserIdVerification(props) {
  const [verificaionUsername, setVerificaionUsername] = useState("");
  const [data, setData] = useState([]);
  const [totalPendingTableRows, setTotalPendingTableRows] = useState(0);
  const [totalSolvedTableRows, setTotalSolvedTableRows] = useState(0);
  const [totalRejectedTableRows, setTotalRejectedTableRows] = useState(0);
  const [toggleHomeTableHeaders, setToggleHomeTableHeaders] = useState(0);
  const mapTableItemType = ["", "pending", "solved", "rejected"];
  const [imageView, setImageView] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    getUsersData();
    //UserIdVerification List on click event
    var homeListItems = document.querySelectorAll(".homeMenu ul li");
    var line = document.querySelectorAll(".homeMenu ul li .line");
    function mouseOverHomeListItems() {
      console.log("clicked");
      line.forEach((item) => {
        item.classList.remove("after");
      });
      let linee = this.querySelector(".line");
      linee.classList.add("after");
      setToggleHomeTableHeaders(
        Array.from(this.parentNode.children).indexOf(this)
      );
    }
    homeListItems.forEach((item) => {
      item.addEventListener("click", mouseOverHomeListItems);
    });
  }, []);

  useEffect(() => {
    if (data?.length > 0) {
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        if (data[i].type.toLowerCase() === "pending") {
          setTotalPendingTableRows((prev) => prev + 1);
        } else if (data[i].type.toLowerCase() === "solved") {
          setTotalSolvedTableRows((prev) => prev + 1);
        } else {
          setTotalRejectedTableRows((prev) => prev + 1);
        }
      }
    }
  }, [data]);

  const getUsersData = async () => {
    await http
      .post(apisPath?.admin?.usersData, {
        session: localStorage.getItem("session"),
      })
      .then((res) => {
        setData(res?.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const verifiyTheUser = async (username) => {
    await http
      .post(apisPath?.admin?.verifyUser, {
        session: localStorage.getItem("session"),
        username: username,
      })
      .then((res) => {
        console.log(res);
        getUsersData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <h2>
        Tracing The Lost Admin Panel<sub>request for last 30days</sub>
      </h2>
      <hr className="partitionHr" />
      <div className="homeMenu">
        <ul>
          {[
            { no_of_msgs: data?.length, name: "Request" },
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
          {toggleHomeTableHeaders === 0 || toggleHomeTableHeaders === 1 ? (
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
          {toggleHomeTableHeaders === 0
            ? data.map((item, key) => {
                return (
                  <tr key={key}>
                    <td style={{ minWidth: "5vw" }}>{item?.id}</td>
                    <td style={{ minWidth: "10vw" }}>{item?.username}</td>
                    <td style={{ minWidth: "12vw" }}>{item?.email}</td>
                    <td style={{ minWidth: "5vw" }}>{item?.mobile}</td>
                    <td style={{ minWidth: "7vw" }}>{item?.dob}</td>
                    <td style={{ minWidth: "10vw" }}>{item?.name}</td>
                    <td style={{ minWidth: "5vw" }}>{item?.gender}</td>
                    <td style={{ minWidth: "6vw" }}>
                      {!item?.kyc_status ||
                      item?.verified_user_status !== "solved" ? (
                        <GppBadRoundedIcon
                          style={{
                            color:
                              !item?.kyc_status &&
                              item?.verified_user_status !== "solved"
                                ? "red"
                                : "orange",
                          }}
                        />
                      ) : (
                        <GppGoodRoundedIcon color="success" />
                      )}
                    </td>
                    <td style={{ minWidth: "6vw" }}>
                      <img
                        src={item?.verified_user_id_proof}
                        alt="User"
                        className="verified_user_id_proof"
                        onClick={() => {
                          setImageUrl(item?.verified_user_id_proof);
                          setImageView(true);
                        }}
                      />
                    </td>
                    {item?.verified_user_status === "pending" ? (
                      <td style={{ minWidth: "6vw" }}>
                        <button
                          onClick={() => {
                            verifiyTheUser(item?.username);
                          }}
                        >
                          Verify
                        </button>
                      </td>
                    ) : (
                      <td></td>
                    )}
                  </tr>
                );
              })
            : toggleHomeTableHeaders !== 0
            ? data?.map((item, key) => {
                if (
                  item?.type?.toLowerCase() ===
                  mapTableItemType[
                    parseInt(toggleHomeTableHeaders)
                  ]?.toLowerCase()
                ) {
                  return (
                    <tr key={key}>
                      <td style={{ minWidth: "5vw" }}>{item?.id}</td>
                      <td style={{ minWidth: "10vw" }}>{item?.username}</td>
                      <td style={{ minWidth: "12vw" }}>{item?.email}</td>
                      <td style={{ minWidth: "5vw" }}>{item?.mobile}</td>
                      <td style={{ minWidth: "7vw" }}>{item?.dob}</td>
                      <td style={{ minWidth: "10vw" }}>{item?.name}</td>
                      <td style={{ minWidth: "5vw" }}>{item?.gender}</td>
                      <td style={{ minWidth: "6vw" }}>
                        {!item?.kyc_status ||
                        item?.verified_user_status !== "solved" ? (
                          <GppBadRoundedIcon
                            style={{
                              color:
                                !item?.kyc_status &&
                                item?.verified_user_status !== "solved"
                                  ? "red"
                                  : "orange",
                            }}
                          />
                        ) : (
                          <GppGoodRoundedIcon color="success" />
                        )}
                      </td>
                      <td style={{ minWidth: "6vw" }}>
                        <img
                          src={item?.verified_user_id_proof}
                          alt="User"
                          className="verified_user_id_proof"
                          onClick={() => {
                            setImageUrl(item?.verified_user_id_proof);
                            setImageView(true);
                          }}
                        />
                      </td>
                      {item?.verified_user_status === "pending" && (
                        <td style={{ minWidth: "6vw" }}>
                          <button
                            onClick={() => {
                              verifiyTheUser(item?.username);
                            }}
                          >
                            Verify
                          </button>
                        </td>
                      )}
                    </tr>
                  );
                }
              })
            : ""}
        </tbody>
      </table>
      {imageView && (
        <UserIdVerificationPopup
          open={imageView}
          handleClose={() => setImageView(false)}
          imageUrl={imageUrl}
        />
      )}
    </>
  );
}
