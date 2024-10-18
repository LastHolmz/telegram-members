const uri =
  process.env.NODE_ENV === "production"
    ? "https://production.example.com/api/v1"
    : "http://localhost:8080/api/v1";
export default uri;
