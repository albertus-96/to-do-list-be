//import env variable
require("dotenv").config(".env");
import app from "./src/app/index"

// Set port, listen for requests
const PORT = process.env.PORT || process.env.PORT_BACKUP;

//start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

export default app;
