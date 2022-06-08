import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import FeaturedInfo from "../components/FeaturedInfo";
import Sidebar from "../components/Sidebar";
import WidgetLg from "../components/WidgetLg";
import WidgetSm from "../components/WidgetSm";
import { getAllTickets, reset } from "../features/tickets/ticketSlice";
import Spinner from "../components/Spinner";
import axios from "axios";

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
  const { tickets, isLoading, isSuccess } = useSelector(
    (state) => state.tickets
  );
  const [countArray, setCountArray] = useState([]);
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [dispatch, isSuccess]);

  useEffect(() => {
    dispatch(getAllTickets());
  }, [dispatch]);

  useEffect(() => {
    Promise.all([
      fetch("/api/tickets/allCount").then((r) => r.json()),
      fetch("/api/tickets/overDueCount").then((r) => r.json()),
      fetch("/api/tickets/unassignedCount").then((r) => r.json()),
      fetch("/api/tickets/dueTodayCount").then((r) => r.json()),
      // fetch("http://localhost:5000/api/tickets/quick-action").then((r) =>
      //   r.json()
      // ),
    ]).then((data) => {
      setCountArray(data);
    });
  }, []);

  useEffect(() => {
    const getAllUsers = async () => {
      const res = await axios.get("/api/users/all");
      setUsers(res.data);
    };
    getAllUsers().catch(console.error);
  }, []);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <div className="wrapper">
        <Sidebar />
        <div className="body">
          <FeaturedInfo cardCount={countArray} cardData={featureTicketInfo} />
          <div className="homeWidgets">
            <WidgetSm users={users} />
            <WidgetLg tickets={tickets} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
