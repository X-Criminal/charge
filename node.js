let http = require("http"),
    express = require("express"),
    app = express();

let user = 123;
let password = 123;

app.get("/checkPhone",(req,res)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    res.send({"name":"xiaoming"})
});


app.listen(3005,()=>{
    console.log(3005);
});