const express = require("express");

const db = require("../data/dbConfig.js");

const router = express.Router();

// .then(response => {
//     console.log(response);
// })
// .catch(error => {
//     console.log(error);
// })

router.get("/", (req, res) => {
    db.select('*').from('accounts')
    .then(response => {
        console.log(response);
        res.status(200).json({ message: response });
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ message: error.message });
    })
})

router.post("/", (req, res) => {
    const changes = req.body;
    // console.log(changes);

    // A post must have title and contents
    if (isValidPost(changes)) {
        // Once you know the post is valid then try to save to the db
        db('accounts')
            // There will be a warning in the console about .returning(), ignore it
            .insert(changes, "id")
            .then(response => {
                // console.log(response);
                res.status(201).json({ data: response });
            })
            .catch(error => {
                // console.log(error);
                res.status(500).json({ message: error.message });
            })
    } else {
        res.status(400).json({ message: "Please provide title and contents for the post" });
    }
})

router.put("/:id", (req, res) => {
    const id = req.params.id;
    const changes = req.body;

    // Validate the data
    if(isValidPost(changes)) {
        db('accounts')
            .where({ id })
            .update(changes)
            .then(response => {
                console.log(response);
                res.status(200).json({ data: response})
            })
            .catch(error => {
                console.log({ message: "List was not updated."});
            })
    } else {
        res.status(400).json({ message: "Please provide name and budget" })
    }
})

router.delete("/:id", (req, res) => {
    const id = req.params.id;
    
    db('accounts')
    .where({ id })
    .del()
    .then(response => {
        // The count is the number of records updated
        // If the count is 0, it means the record was not found
        if (0 < response) {
            console.log(response);
            res.status(200).json({ data: response });
        } else {
            res.status(404).json({ message: "Record was not found" });
        }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ message: "Record was not found" });
    })
})


const isValidPost = (accounts) => {
    return Boolean(accounts.name && accounts.budget);
}

module.exports = router;