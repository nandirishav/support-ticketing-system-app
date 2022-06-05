import React from "react";
import FeaturedInfo from "../components/FeaturedInfo";
import Sidebar from "../components/Sidebar";
import WidgetLg from "../components/WidgetLg";
import WidgetSm from "../components/WidgetSm";

const featureTicketInfo = [
  {
    title: "All Tickets",
    money: 2415,
    timeLine: "Compared to last month",
  },
  {
    title: "OverDue Tickets",
    money: 4415,
    timeLine: "Compared to last month",
  },
  {
    title: "UnAssigned Tickets",
    money: 2225,
    timeLine: "Compared to last month",
  },
  {
    title: "Due Today Tickets",
    money: 2225,
    timeLine: "Compared to last month",
  },
];

const Dashboard = () => {
  return (
    <>
      <div className="wrapper">
        <Sidebar />
        <div className="body">
          <FeaturedInfo cardData={featureTicketInfo} />
          <div className="homeWidgets">
            <WidgetSm />
            <WidgetLg />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
