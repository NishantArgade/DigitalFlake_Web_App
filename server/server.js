import app from "./app.js";
import { connect } from "./connection.js";
const PORT = process.env.PORT || 8000;

connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is listening on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(`Server could not connecting ERROR: ${error}`);
  });
