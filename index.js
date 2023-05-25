const { connect } = require('http2');
const mysql = require('mysql2');

const express = require('express');
const bodyParser = require('body-parser');
let mysql_connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"12345",
    database:"employee"

});


let app = express();

app.use(bodyParser.json());
app.get("/employee",(req,res)=>{ 

    mysql_connection.connect((err)=>{
        if(err){
           console.log("not connected" + JSON.stringify(err));
        }else{
           mysql_connection.query("SELECT * FROM employee.new_table;", (err,rows) =>{
               console.log(rows);
               res.send(rows);
           });
        }
   });
});



app.get("/employee/:id",(req,res)=>{ 

    mysql_connection.connect((err)=>{
        if(err){
           console.log("not connected" + JSON.stringify(err));
        }else{
           mysql_connection.query("SELECT * FROM employee.new_table WHERE id=?;",[req.params.id], (err,rows) =>{
               console.log(rows);
               res.send(rows);
           });
        }
   });
});


app.delete("/employee/:id",(req,res)=>{ 

    mysql_connection.connect((err)=>{
        if(err){
           console.log("not connected" + JSON.stringify(err));
        }else{
           mysql_connection.query("DELETE FROM employee.new_table WHERE id=?;",[req.params.id], (err,rows) =>{
               console.log(rows);
               res.send(rows);
           });
        }
   });
});
let port=8000
app.listen(port,()=>console.log(`express on ${port} port`));