import express from "express";
import path from "path";
const app = express();
const PORT = 4100;
app.use(express.static(__dirname));
app.get("/", (req, res) => {
  res.sendfile("./index.html");
});
const handleListening = () => {
  console.log(`${PORT}에 연결되었습니다.`);
};
app.listen(PORT, handleListening);
