const mongoose = require('mongoose');


// creatng schema of students
const studentsSchema = mongoose.Schema({
    name : {
        type : String,
        require : true
    },
    age : {
        type : Number,
        require : true,
    } ,
    class : {
        type : Number,
        require : true
    },
    fees : {
        type : Number,
        require : true
    },
    date : {
        type : Date,
        default : Date.now
    },

});
// creating module accessable 
// mongoose.model('collection name ',schema name )--------|>
const students = module.exports = mongoose.model('students',studentsSchema);



// creating operation accessable 

module.exports.getStudents = (callback,limit)=>{
    students.find(callback).limit(limit);
};

//find by id

module.exports.getStudentByID = (id , callback)=>{
    students.findById(id,callback);
};

//insert student
module.exports.insertStudent = (data,callback)=> {
    students.create(data,callback);
};

// update student 
module.exports.updateStudent = (id, data, option, callback) =>{
    const _id = {_id : id };
    const update = {
        name : data.name
    };
    students.findByIdAndUpdate(_id,update,option,callback);
};


// delete student 
module.exports.deleteStudent = (id,callback) => {
    const _id = {_id : id };
    students.deleteOne(_id,callback);
};