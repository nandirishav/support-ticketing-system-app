import axios from "axios";

const API_URL = "/api/tickets/";

// Create New Ticket
const createTicket = async (ticketData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, ticketData, config);
  return response.data;
};

//get all Tickets
const getAllTickets = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + "allTickets", config);
  return response.data;
};

//get user Ticket
const getTicket = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + ticketId, config);
  return response.data;
};

//close user Ticket
const closeTicket = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(
    API_URL + ticketId,
    { status: "closed" },
    config
  );
  return response.data;
};

const ticketService = {
  createTicket,
  getAllTickets,
  getTicket,
  closeTicket,
};

export default ticketService;
