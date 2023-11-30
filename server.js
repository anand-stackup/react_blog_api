const express = require("express");
const morgan = require("morgan");
const PORT = 4000;
const cors = require("cors");


const app = express();

app.use(cors());

app.use(express.json());

//  log requests
app.use(morgan("tiny"));




//  load routes
app.use("/", require("./server/routes/router"));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
