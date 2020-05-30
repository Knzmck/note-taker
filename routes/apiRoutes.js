const util = require("util");
const fs = require("fs");
const fsp = require('fs').promises;
const path = require('path');


module.exports = function (app) {
    // app.get to read the db.json file and return saved notes as JSON

    app.get("/api/notes", function (req, res) {
        fs.readFile('db/db.json', 'utf8', function (err, data) {
            if (err) throw err
            // console.log(data);
            // console.log(JSON.parse(data));
            res.send(JSON.parse(data));
        }
        );
    })
    app.post("/api/notes", function (req, res) {
        // console.log(req.body);
        fs.readFile('db/db.json', 'utf8', function (err, data) {
            if (err) throw err;
            // console.log(data);
            // console.log(JSON.parse(data));
            const noteArray = JSON.parse(data);
            noteArray.push(req.body);
            // console.log(noteArray)
            fs.writeFile('db/db.json', JSON.stringify(noteArray), function (err, data) {
                if (err) throw err;
                res.send(data);
            })

        });

    });

    app.delete("/api/notes/:id", (req, res) => {
        fs.readFile('db/db.json', 'utf8', function (err, data) {
            if (err) throw err;
            const noteArray = JSON.parse(data);
            let deletedNote = req.params.id;
            noteArray.splice(deletedNote, 1);
            for (let i = deletedNote; i < noteArray.length; i++) {
                noteArray[i].id--;
            }
            fs.writeFile('db/db.json', JSON.stringify(noteArray), (err, data) => {
                if (err) throw err;
                console.log("note deleted")
                res.send(data);
            });

        })
    })
}

