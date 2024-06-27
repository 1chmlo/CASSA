import httpServer from "./app.js";
import { pool } from "./db.js";

httpServer.listen(4000, () => {
  console.log("Server is running on port 4000");
});
