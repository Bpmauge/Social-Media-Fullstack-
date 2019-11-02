const express = require('express');
const cors = require('cors');

const app = express();

const port = 1000;

app.use(cors());

app.use(express.urlencoded({
    extended: false
}));

app.use(express.json());

// Routers
const usersRouter = require('./routes/usersRouter');

app.use('/users', usersRouter)
app.get('/', (req, res) => {
    res.send(`Welcome to my social media page`);
});


app.listen(port, () => {
    console.log(`server running at http://localhost:${port}`);
});