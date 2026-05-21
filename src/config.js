const API_URL =
  process.env.NODE_ENV === "development"
    ? "http://127.0.0.1:5000"
    : process.env.REACT_APP_API_URL;

export default API_URL; 