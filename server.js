const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const app = express();
  
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));
app.use(bodyParser.json());
  
// Connecting gfg-employees database to our express application 
  
    mongoose.connect("mongodb://localhost:27017/mydb", {
        useNewUrlParser: true,
        //useCreateIndex: true,
        useUnifiedTopology: true
        }).then(res=>{
         console.log("DB Connected!")
        }).catch(err => {
         console.log(Error, err.message);
       })
  
  
// Writing schema for employee-data collection
const employeeSchema = {
    username: String,
    password: String,
    age: Number
};
  
// Creating a model around employeeSchema
const EmployeeData = mongoose.model(
  "EmployeeData", employeeSchema);
  console.log(EmployeeData);



  app.get("/getposts", async(req, res) => {
    EmployeeData.find((err, foundEmployees) => {
        if (!err) {
            res.send(foundEmployees)
        } else {
            res.send(err);
        }
    })
})

app.post("/addposts", async(req, res) => {
    const newEmployee = new EmployeeData({
        username: req.body.username,
        password: req.body.password,
        age: req.body.age
    });
  
    // Saving the employee
   
    newEmployee.save(function(err) {
        if (!err) {
            res.send("Successfully added a new employee.");
        } else {
            res.send(err);
        }
    });
})

  
  
app.listen(3000, function() {
    console.log("Server started on port 3000");
});