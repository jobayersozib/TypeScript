const express = require('express')
const app = express()
type  DB_CONN_TYPE={host:string,user:string,password:string,database:string}

type ADD_USER={name:string,email:string,address:string}

let result:any;

const DB_CONN_OBJ:DB_CONN_TYPE={
    host:"localhost",
    user:"root",
    password:"",
    database:"nodedb"
}

 interface CRUD{
    select():any
    create(info:ADD_USER):string
    update(id:number , info:ADD_USER):string
    delete(id:number):string
}



export class DB implements CRUD{
    private mysql= require('mysql');
    private connection =this.mysql.createConnection(DB_CONN_OBJ)
    
    constructor(){
        this.connection.connect(function (err) {
            if (err) {
                console.error('error connecting: ' + err.stack);
                return;
            }
            console.log("connected");
        });
        
    }

    select():any{
        this.connection.query('SELECT * FROM users WHERE 1', function (error, results, fields) {
            if (error){
                console.log("Error ....")
               
            }else{
                 var data={}
                 app.get('/',function(req,res){
                    res.setHeader('Content-Type', 'application/json');
                    for(var i:number=0; i<results.length;i++){
                    //  console.log('Name: ',results[i].username);
                    //  console.log('E-mail: ',results[i].email);
                    //  console.log('Address: ',results[i].address);
                    data[results[i].id]={name:results[i].username,email:results[i].email,address:results[i].address}
                    
                   }
                    res.send(data);
                    
                });
                
                app.listen(process.env.PORT,() => console.log('Example app listening on port 3000!'))
            }
            result=results;
          });
          this.connection.end();
          return result;
          
          
          
    }

    update(id:number,info:ADD_USER):string{
        this.connection.query("UPDATE users SET username= ?, email= ?, address = ?  WHERE id=?",[info.name,info.email,info.address,id],function (error, results, fields) {
            if (error){
                console.log(error)
               
            }else{
                  console.log("User updated ")
                   
            }
            
          });
          this.connection.end();
       
        return "";
    }

    create(info:ADD_USER):string{
        this.connection.query("INSERT INTO users (username,email,address) VALUES(?,?,?)",[info.name,info.email,info.address],function (error, results, fields) {
            if (error){
                console.log(error)
               
            }else{
                  console.log("User created ")
                  console.log("Name : ",info.name);
                  console.log("E-mail : ",info.email);
                  console.log("Address : ",info.address);  
            }
            
          });
          this.connection.end();
          return "";
    }
    delete(id:number):string{
        this.connection.query("DELETE FROM `users` WHERE id=?",[id],function (error, results, fields) {
            if (error){
                console.log(error)
               
            }else{
                  console.log("User deleted ")
                   
            }
            
          });
          this.connection.end();
        return "";
    }
    
    


}