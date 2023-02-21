const express = require('express');
const mongoose = require('mongoose');
let students = require('./InitialData');
const bodyParser = require('body-parser');
const app = express();
const port = 8080;
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// your code goes here
app.get("/api/student", ( req, res ) => {
    res.json(students);
    res.end();
} )
app.get("/api/student/:id", ( req, res ) => {
    const id = parseInt(req.params.id);
    let flag = true;
    for (let data of students){
        if(data===null){continue;}
        if(data.id===id){
            flag = false;
            res.json(data);
            res.end();
            break;
        }
    }
    if(flag){
        res.writeHead(404);
        res.write("Student Not Found");
        res.end();
    }
} )
app.delete("/api/student/:id", (req, res) => {
    const id = parseInt(req.params.id);
    let flag = true;
    for (let i in students){
        if(students[i]===null){continue;}
        if(students[i].id===id){
            flag = false;
            students[i] = null;
            res.write("Student Data Deleted");
            res.end();
            break;
        }
    }
    if(flag){
        res.writeHead(404);
        res.write("Student Not Found");
        res.end();
    }
})

app.put("/api/student/:id", (req, res) => {
    const id = parseInt(req.params.id);
    let flag = true;
    for (let i in students){
        if(students[i]===null){continue;}
        if(students[i].id===id){
            if(req.body.name!==undefined){
                flag = false;
                students[i].name = req.body.name;
            }
            if(req.body.currentClass!==undefined){
                flag = false;
                students[i].currentClass = req.body.currentClass;
            }
            if(req.body.division!==undefined){
                flag = false;
                students[i].division = req.body.division;
            }
        }
    }
    if(flag){
        res.writeHead(400);
        res.write("Student Not Found");
        res.end();
    }else{
        res.writeHead(200);
        res.write("Student updated successfully");
        res.end();
    }
})

app.post("/api/student", (req, res) => {
    let flag = true;
    if(req.body.name!==undefined && req.body.currentClass!==undefined && req.body.division!==undefined){
        flag = false;
        let len = students.length;
        students[len] = {
            id: len+1,
            name: req.body.name,
            currentClass: req.body.currentClass,
            division: req.body.division
        }
        res.send("Student added successfully");
    }
    if(flag){
        res.writeHead(400);
        res.write("Student not added");
        res.end();
    }
})

app.listen(port, () => console.log(`App listening on port ${port}!`));
