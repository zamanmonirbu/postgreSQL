const express = require('express');
const app = express();
app.use(express.json());
const { v4: uuidv4 } = require('uuid');
const pool = require('./db');


// post 

app.post('/save', async (req, res) => {
    const { name, description } = req.body;
    const id = uuidv4();

    try {
        const newBook = await pool.query("INSERT INTO book(id, name, description) VALUES($1, $2, $3) RETURNING *", [id, name, description]);

        if (newBook.rows.length > 0) {
            res.json({ "message": "Successfully saved data", data: newBook.rows[0] });
        } else {
            res.json("No save Data");
        }
    } catch (error) {
        console.error("Error saving data:", error);
        res.json("Error saving data");
    }
});





// Get all data

app.get('/all/book', async (req, res) => {
    try {
        const getAllBook=await pool.query("SELECT * FROM book")       
        res.json({ "message": "Successfully retried data",data:getAllBook.rows });
    } catch (error) {
        res.json("No found Data");
    }
});


// Get a specific data
app.get('/book/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const getAllBook = await pool.query("SELECT * FROM book WHERE id = $1 ", [id]);
        // console.log(getAllBook.rows);
        res.json({ "message": "Successfully retrieved data", data: getAllBook.rows });
    } catch (error) {
        console.error('Error retrieving data:', error);
        res.json("No found Data");
    }
});



// Update 

app.put('/book/update/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;
        const updatedBook = await pool.query("UPDATE book SET name = $1, description = $2 WHERE id = $3 RETURNING *", [name, description, id]);
        res.json({ "message": "Successfully update data", data: updatedBook.rows });
    } catch (error) {
        console.error('Error updating data:', error);
        res.json("No update Data");
    }
});

// Get 

app.delete('/book/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBook = await pool.query("DELETE FROM book WHERE id = $1 RETURNING *", [id]);

        if (deletedBook.rows.length > 0) {
            res.json({ "message": "Successfully deleted data", data: deletedBook.rows[0] });
        } else {
            res.json("No delete Data");
        }
    } catch (error) {
        console.error('Error deleting data:', error);
        res.json("No delete Data");
    }
});



app.listen(3000, () => {
    console.log("Running");
})