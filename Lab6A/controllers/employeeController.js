const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');

router.get('/', (req, res) => {        
    res.render("employee/addOrEdit",{
        viewTitle: "Enter New Employee",
        departments: ['Programmer', 'Sales', 'Human Resources']   
    });    
});

router.post('/', (req,res) => {
    if(req.body._id == '')
        insertRecord(req,res);
    else
        updateRecord(req,res);
});

router.get('/list', (req,res) => {
    Employee.find((err,docs) => {
        if(!err){
            res.render('employee/list',{
                list: docs
            })
                
        }
    });
});

router.get('/:id', (req, res) => { 
    
    Employee.findById(req.params.id, (err,doc) =>{
        if(!err){

            res.render("employee/addOrEdit",{
                viewTitle: "Update Employee",
                employee: doc,
                departments: ['Programmer', 'Sales', 'Human Resources']               
            });    
        }
    });
    
});

router.get('/delete/:id',(req,res) =>{
    Employee.findByIdAndRemove(req.params.id,(err,doc) =>{
        if(!err){
            res.redirect('/employee/list');
        }
        else{        
            console.log("Error during record update: " + err)                        
        }        
    })
})

function insertRecord(req,res){ 
    var employee = new Employee();
    employee.firstName = req.body.firstName;
    employee.lastName = req.body.lastName;
    employee.department = req.body.department;
    employee.jobTitle = req.body.title;
    employee.startDate = req.body.startDate;
    employee.salary = req.body.salary;
    employee.save((err, doc)=>{
        if(!err)
            res.redirect('employee/list');
        else{
            if(err.name == 'ValidationError'){
                handleValidationError(err,req.body);
                res.render("employee/addOrEdit",{
                    viewTitle: "Enter New Employee",
                    employee: req.body
                });  
            }
            else
                console.log("Error during record creation: " + err)                             
        }
    });   
}

function updateRecord(req,res){
    Employee.findByIdAndUpdate({_id: req.body._id},req.body, {new: true}, (err,doc) =>{
        if(!err){
            res.redirect('employee/list');
        }
        else{        
            console.log("Error during record update: " + err)                        
        }        
    });
}

function handleValidationError(err,body){
    for(field in err.errors){
        switch (err.errors[field].path){
            case 'firstName': body['firstNameError'] = err.errors[field].message;
            break;
            case 'lastName': body['lastNameError'] = err.errors[field].message;
            break;
            case 'department': body['departmentError'] = err.errors[field].message;
            break;
            case 'jobTitle': body['titleError'] = err.errors[field].message;
            break;
            case 'startDate': body['startDateError'] = err.errors[field].message;
            break;
            case 'salary': body['salaryError'] = err.errors[field].message;
            break;
        }            
    }

}

module.exports = router;