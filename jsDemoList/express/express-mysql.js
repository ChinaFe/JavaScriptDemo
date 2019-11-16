const express=require('express');
const mysql=require('mysql');
const server=express();
server.listen(1112,() => {
    console.log('----------------')
})

// 建立与数据库的连接                        数据库用户名，密码                        数据库名称
const db=mysql.createPool({host:'localhost',user:'root',password:'123456',database:'testmsg'}); 

server.get('/user',() => {
    //query()请求数据,sql语句↓'test'为表名称
    db.query(`SELECT * FROM test`,(err,data) => {
        if(err){
            console.log(err)
        }else{
            console.log(data);
        }
    })
})


