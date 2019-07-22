var express = require('express');
var mongoose = require('mongoose');
var colors = require('colors');
const bodyParser = require('body-parser');

// creating app 
var app = express();

// body parser middleware 
app.use(bodyParser.json());

//  creating models path variable 
student = require('./models/students');


// creating connection from our app to mongodb databse 
mongoose.connect("mongodb+srv://root:<password>@lakshmibisht-bo8fb.mongodb.net/test?retryWrites=true&w=majority", {
    useNewUrlParser: true
});

// get connection variable 
var db = mongoose.connection;

// creating Routs 

app.get('/',(req,res)=>{
    res.send('Hello Welcone to Coaching WEB API \n if you want to use web api you need to follow following path \n 1) "/api/student/--activity--" \n 2) "/api/teachers/--activity--"');
    console.log(colors.green("home api hit"));
});

app.get('/api/students',(req,res)=>{
    student.getStudents((err,students)=>{
        if(err){
            throw err;
        }
        res.json(students);
    });
});

// FindByIDRout 
app.get('/api/student/:_id',(req,res)=>{
    student.getStudentByID(req.params._id,(err,student)=>{
        if(err){
            console.log(colors.red("cant find id du to some error "+err));
            throw err;
        }
        res.json(student);
    });
});



// post routs insertion of a student
app.post('/api/student',(req,res) =>{
    var data = req.body;
    student.insertStudent(data,(err,data)=>{
        if(err){
            console.log(colors.red("data not inserted properly"));
            throw err;
        }
        console.log(colors.bgGreen("insert success full ..."));
        console.log(data);
        res.json(data);
    });
});

//update student
app.put('/api/student/:_id',(req,res)=>{
    const data = req.body;
    const id = req.params._id;
    student.updateStudent(id,data,{},(err,data)=>{
        if(err){
            console.log(colors.bgRed("update Unsuccess-full :( !!"));
            throw err;

        }
        console.log(colors.bgGreen("update success-full :) !!"));
        res.json(data);
    });
});


//delete student 

app.delete('/api/student/:_id',(req,res)=>{
    const id = req.params._id;
    student.deleteStudent(id,(err,data)=> {
        if(err){
            console.log(colors.bgRed("student not deleted !! "));
            throw err;
        }
        console.log(colors.bgGreen("Deleted success full :) "));
        res.json(data);
    }); 
});

app.listen(3000);

console.log(colors.yellow("server is running !!!!"));