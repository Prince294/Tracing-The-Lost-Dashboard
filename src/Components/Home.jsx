import React, { useState } from "react";
import "../ComponentCss/Home.css";

const DropDown = () => {
  return (
    <select name="dropdownNameSelection" className="dropdownNameSelection">
      <option value="">None</option>
      <option value="gunjansaxena">Gunjan Saxena</option>
      <option value="skarya">S.K. Arya</option>
      <option value="anjaliDubey">Anjali Dubey</option>
      <option value="sanjeevkumar">Sanjeev Kumar</option>
    </select>
  );
};

const HomeMenuListItems = (props) => {
  return (
    <li>
      <div
        className={`line ${props.name == "Complaints" ? "after" : ""}`}
      ></div>
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
  const [descriptionCharLimit, setDescriptionCharLimit] = useState(70);
  const mapTableItemType = ["", "pending", "inprocess", "solved", "rejected"];
  const data = [
    {
      type: "pending",
      id: "101",
      title: "pending",
      user: "Prince Kumar",
      dept: "Admin",
      assigned: "Anjali Saxena",
      desc: "This is a Demo Description to check whether all thing works or not. this is another line of checking the description field at the chrome screen.",
      date: "28 June 2022",
    },
    {
      type: "inProcess",
      id: "102",
      title: "inProcess",
      user: "Shivam Rawat",
      dept: "Registrar",
      assigned: "Krishna Dubey",
      desc: "This is a Demo Description to check whether all thing works or not.",
      date: "28 June 2022",
    },
    {
      type: "solved",
      id: "103",
      title: "solved",
      user: "Akash Kasana",
      dept: "Library",
      assigned: "Komal Rani",
      desc: "This is a Demo Description to check whether all thing works or not.",
      date: "28 June 2022",
    },
    {
      type: "rejected",
      id: "104",
      title: "rejected",
      user: "Ishu Mittal",
      dept: "Admin",
      assigned: "Avinash Tiwari",
      desc: "This is a Demo Description to check whether all thing works or not.",
      date: "28 June 2022",
    },
    {
      type: "pending",
      id: "105",
      title: "pending",
      user: "Ishwar Bana",
      dept: "Library",
      assigned: "Sanjeev Kumar",
      desc: "This is a Demo Description to check whether all thing works or not.",
      date: "28 June 2022",
    },
  ];

  var totalPendingTableRows = 0;
  var totalInProcessTableRows = 0;
  var totalSolvedTableRows = 0;
  var totalRejectedTableRows = 0;

  for (let i = 0; i < data.length; i++) {
    if (data[i].type.toLowerCase() == "pending") {
      totalPendingTableRows++;
    } else if (data[i].type.toLowerCase() == "inprocess") {
      totalInProcessTableRows++;
    } else if (data[i].type.toLowerCase() == "solved") {
      totalSolvedTableRows++;
    } else {
      totalRejectedTableRows++;
    }
  }

  return (
    <>
      <h2>
        Complain Management Dashboard<sub>Complaints for last 30days</sub>
      </h2>
      <hr className="partitionHr" />
      <div className="homeMenu">
        <ul>
          {[
            { no_of_msgs: data.length, name: "Complaints" },
            { no_of_msgs: totalPendingTableRows, name: "Pending" },
            { no_of_msgs: totalInProcessTableRows, name: "In Process" },
            { no_of_msgs: totalSolvedTableRows, name: "Solved" },
            { no_of_msgs: totalRejectedTableRows, name: "Rejected" },
          ].map((item) => {
            return (
              <HomeMenuListItems
                key={item.name}
                name={item.name}
                no_of_msgs={item.no_of_msgs}
              />
            );
          })}
        </ul>
      </div>
      <hr className="partitionHr" />
      <table className="homeTable">
        <thead>
          <tr>
            {[
              "Id",
              "Title",
              "Complaint User",
              "Department",
              "Assigned To",
              "Description",
              "Date Created",
              "Assign Faculty",
            ].map((item) => {
              return <TableTr key={item} name={item} />;
            })}
          </tr>
        </thead>
        <tbody>
          {props.toggleHomeTableHeaders == "0"
            ? data.map((item, key) => {
                return (
                  <tr key={key}>
                    <td style={{ width: "5vw" }}>{item.id}</td>
                    <td style={{ width: "10vw" }}>{item.title}</td>
                    <td style={{ width: "7vw" }}>{item.user}</td>
                    <td style={{ width: "5vw" }}>{item.dept}</td>
                    <td style={{ width: "6vw" }}>{item.assigned}</td>
                    <td style={{ width: "15vw" }}>
                      {item.desc.length > descriptionCharLimit
                        ? item.desc.slice(0, descriptionCharLimit) + "..."
                        : item.desc}
                    </td>
                    <td style={{ width: "6vw" }}>{item.date}</td>
                    <td style={{ width: "6vw" }}>{<DropDown />}</td>
                  </tr>
                );
              })
            : props.toggleHomeTableHeaders != "0"
            ? data.map((item, key) => {
                if (
                  item.type.toLowerCase() ==
                  mapTableItemType[
                    parseInt(props.toggleHomeTableHeaders)
                  ].toLowerCase()
                ) {
                  return (
                    <tr key={key}>
                      <td style={{ width: "5vw" }}>{item.id}</td>
                      <td style={{ width: "10vw" }}>{item.title}</td>
                      <td style={{ width: "7vw" }}>{item.user}</td>
                      <td style={{ width: "5vw" }}>{item.dept}</td>
                      <td style={{ width: "6vw" }}>{item.assigned}</td>
                      <td style={{ width: "15vw" }}>
                        {item.desc.length > 70
                          ? item.desc.slice(0, 70) + "..."
                          : item.desc}
                      </td>
                      <td style={{ width: "6vw" }}>{item.date}</td>
                      <td style={{ width: "6vw" }}>{<DropDown />}</td>
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
