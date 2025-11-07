/*
ATTRIBUTES:
  Website:SecureBlog Activity
  Author: talia0404
  URL: https://github.com/talia0404/INSY7314/tree/main/SecureBlog%20Activity
  Accessed on: 2025-09-29

  Website: Fix MongoDB error
  Author: ChatGPT
  URL: https://chatgpt.com/share/68e7e4fb-f4c0-8006-a2f7-014e3eba16d9
  Accessed on: 2025-10-08

  Website: JWT MongoDB integration steps
  Author: ChatGPT
  URL: https://chatgpt.com/c/68e7a64f-e470-832d-8038-d916ae7595b3
  Accessed on: 2025-10-09

  Website: DevcSecOps pipeline setup
  Author: ChatGPT
  URL: https://chatgpt.com/share/68e95e4b-0b1c-8006-ab93-46d401787029
  Accessed on: 2025-10-10  
*/

const mongoose = require("mongoose");
const app = require("./app");
const https = require("https");
const fs = require("fs");

require("dotenv").config();

const PORT = process.env.PORT || 5000;
//const HTTPS_PORT = process.env.HTTPS_PORT || 5001;

// Start the Express server and listen on the defined port
/*app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});*/
const sslOptions = {
  key: fs.readFileSync("./ssl/privatekey.pem"),
  cert: fs.readFileSync("./ssl/certificate.pem"),
};

//connect to mongodb and start https server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    https.createServer(sslOptions, app).listen(PORT, () => {
      console.log(`secure server running at https://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Mongo DB connections error:", err);
  });
