import React from "react";
import { useParams } from "react-router-dom";

const GetTickets = () => {
  const { type } = useParams();
  return (
    <div>
      <h1>Get {type} tickets page</h1>
    </div>
  );
};

export default GetTickets;
