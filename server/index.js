require('dotenv').config();
const express = require('express');
const taskRoutes = require('./routes/task.routes');
const userRoutes = require('./routes/user.routes');
const connectDB = require('./DB');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors({origin:"*"}))

taskRoutes(app);
userRoutes(app);

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})


