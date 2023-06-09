import React, { useEffect, useState } from "react";
import "../../ComponentCss/Home.css";
import http from "../Services/utility";
import { apisPath } from "../Utils/path";
import UserIdVerificationPopup from "./UserIdVerificationPopup";
import GppBadRoundedIcon from "@mui/icons-material/GppBadRounded";
import GppGoodRoundedIcon from "@mui/icons-material/GppGoodRounded";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import NoDataFound from "../../Images/no_data_found.jpg";

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
  const [data, setData] = useState([]);
  const [totalPendingTableRows, setTotalPendingTableRows] = useState(0);
  const [totalSolvedTableRows, setTotalSolvedTableRows] = useState(0);
  const [totalRejectedTableRows, setTotalRejectedTableRows] = useState(0);

  const [TABLE_HEAD, setTABLE_HEAD] = useState([
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
  ]);
  const TABLE_HEAD1 = [
    "Id",
    "Username",
    "Email",
    "Mobile",
    "Name",
    "DOB",
    "Gender",
    "KYC Status",
    "User ID Proof",
  ];

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

  const getUsersData = async () => {
    await http
      .post(apisPath?.admin?.usersData, {
        session: localStorage.getItem("session"),
      })
      .then((res) => {
        setData(res?.data?.data?.data);
        setTotalPendingTableRows(res?.data?.data?.total_pending);
        setTotalRejectedTableRows(res?.data?.data?.total_rejected);
        setTotalSolvedTableRows(res?.data?.data?.total_solved);
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

  const cancelTheUser = async (username) => {
    await http
      .post(apisPath?.admin?.cancelUser, {
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
      <h2>User ID Verification</h2>
      <hr className="partitionHr" />
      <div className="homeMenu">
        <ul>
          {[
            { no_of_msgs: data?.length, name: "All Requests" },
            { no_of_msgs: totalPendingTableRows, name: "Pending" },
            { no_of_msgs: totalSolvedTableRows, name: "Solved" },
            { no_of_msgs: totalRejectedTableRows, name: "Rejected" },
          ]?.map((item, index) => {
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
          {(toggleHomeTableHeaders === 0 || toggleHomeTableHeaders === 1) &&
          totalPendingTableRows > 0 ? (
            <tr>
              {TABLE_HEAD?.map((item) => {
                return <TableTr key={item} name={item} />;
              })}
            </tr>
          ) : (
            <tr>
              {TABLE_HEAD1?.map((item) => {
                return <TableTr key={item} name={item} />;
              })}
            </tr>
          )}
        </thead>
        <tbody>
          {toggleHomeTableHeaders === 0 && data?.length > 0 ? (
            data?.map((item, key) => {
              return (
                <tr key={key}>
                  <td>{item?.id}</td>
                  <td>{item?.username}</td>
                  <td>{item?.email}</td>
                  <td>{item?.mobile}</td>
                  <td>{item?.name}</td>
                  <td>{item?.dob}</td>
                  <td>{item?.gender}</td>
                  <td>
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
                  <td>
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
                    <td>
                      <IconButton
                        size="small"
                        onClick={() => {
                          verifiyTheUser(item?.username);
                        }}
                      >
                        <Tooltip title="Verify" arrow>
                          <CheckCircleIcon color="success" />
                        </Tooltip>
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => {
                          cancelTheUser(item?.username);
                        }}
                      >
                        <Tooltip title="Cancel" arrow>
                          <CancelRoundedIcon color="error" />
                        </Tooltip>
                      </IconButton>
                    </td>
                  ) : (
                    totalPendingTableRows > 0 && <td></td>
                  )}
                </tr>
              );
            })
          ) : toggleHomeTableHeaders !== 0 &&
            data?.length > 0 &&
            data?.filter((el) => {
              return (
                el?.type?.toLowerCase() ==
                mapTableItemType[
                  parseInt(toggleHomeTableHeaders)
                ]?.toLowerCase()
              );
            }).length > 0 ? (
            data?.map((item, key) => {
              if (
                item?.type?.toLowerCase() ===
                mapTableItemType[
                  parseInt(toggleHomeTableHeaders)
                ]?.toLowerCase()
              ) {
                return (
                  <tr key={key}>
                    <td>{item?.id}</td>
                    <td>{item?.username}</td>
                    <td>{item?.email}</td>
                    <td>{item?.mobile}</td>
                    <td>{item?.dob}</td>
                    <td>{item?.name}</td>
                    <td>{item?.gender}</td>
                    <td>
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
                    <td>
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
                      <td>
                        <IconButton
                          size="small"
                          onClick={() => {
                            verifiyTheUser(item?.username);
                          }}
                        >
                          <Tooltip title="Verify" arrow>
                            <CheckCircleIcon color="success" />
                          </Tooltip>
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => {
                            cancelTheUser(item?.username);
                          }}
                        >
                          <Tooltip title="Cancel" arrow>
                            <CancelRoundedIcon color="error" />
                          </Tooltip>
                        </IconButton>
                      </td>
                    )}
                  </tr>
                );
              }
            })
          ) : (
            <tr>
              <td colSpan={TABLE_HEAD?.length}>
                <img
                  src={NoDataFound}
                  alt="No Data Found"
                  className="no_data_found"
                />
              </td>
            </tr>
          )}
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
