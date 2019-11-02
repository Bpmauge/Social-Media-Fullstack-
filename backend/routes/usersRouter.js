const express = require('express');

//import pg-promise & invokes it
const pgp = require('pg-promise')();

const connectionString = 'postgres://localhost:5432/social_media'; // URL where Postgess is running
const db = pgp(connectionString) //Connected database instance

const router = express.Router();

//ES5 Method dealing with pg-promises
// router.get('/', (req, res) => {
//     db.any('SELECT * FROM users')
//         .then(rows => {
//             res.json(rows) // every object represents a row and each key represents a column
//         })
//         .catch((error) => {
//             console.log(error)
//         })

//     // res.send(`This is /users`)
// })

//ES6 Method dealing with pg-promises (async-await) with try-catch
router.get('/', async (req, res) => {
    try {
        let users = await db.any('SELECT * FROM users');
        res.json({
            payload: users,
            message: `success. retrieved all the users`
        });

    } catch (error) {
        res.status(500);
        res.json({
            message: `Error. Something went wrong!`
        })
        console.log(error);
    }
})

router.post('/register', async (req, res) => {
    console.log(req.body);
    try {
        let insertQuery = `
        INSERT INTO users(firstname, lastname, age)
        VALUES($1, $2, $3)  
        ` 
        //$1 - first element of array, $2 - second element of array, etc
        
        await db.none(insertQuery, [req.body.firstname, req.body.lastname, req.body.age]);

        res.json({
            payload: req.body,
            message: `User was registered!`
        })
    } catch (error) {
        res.json({
            message: `There was an error!`
        })
    }
})





module.exports = router;