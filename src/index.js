const app = require('./server')
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.SERVER_PORT || 3003;
app.listen(PORT, ()=>{console.log(`Server is running at http://localhost:${PORT}`)})