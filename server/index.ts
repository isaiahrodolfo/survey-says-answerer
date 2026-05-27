import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/survey/submit", (req, res) => {
  console.log("Received survey:", req.body);

  return res.status(200).json({
    message: "Survey received!",
  });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
