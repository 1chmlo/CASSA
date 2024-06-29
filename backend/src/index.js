import httpServer from "./app.js";
import { pool } from "./db.js";

const port = process.env.PORT || 4000;

httpServer.listen(port, () => {
  console.log("Server is running on port 4000");
});
