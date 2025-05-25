const dotenv = require('dotenv');
const connectDB = require('./src/Config/db');
const app = require('./src/app');

dotenv.config();
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
