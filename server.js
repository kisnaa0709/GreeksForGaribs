const https = require("https");
const bodyParser = require("body-Parser");
const express = require("express");

const request = require("request");



const  app = express();
app.use(express.static("Public"));

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html")
    
});

app.post("/", function (req, res){

    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {
        members: [
        {
            email_address: email,
            status: "subscribed",
            merge_fields:{
            FNAME: firstName,
            LNAME: lastName
            }
        }
    ]
    };
    const jsonData = JSON.stringify(data);

    const url ="https://us14.api.mailchimp.com/3.0/lists/093bedc2ca";

    const options = {
        method: "POST",
        auth: "kisnaa0709:65d9c07abc1054d16d0efc01560a7175-us14"
    }
    https.request(url, options, function(response){

        if (response.statusCode === 200) {
            res.send("sucesss")   
        }else{
            res.send("failed")
        }



        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
        request.write(jsonData);
        request.end();
    });
});

// app.get("/contact", function (req, res) {
//     res.send("<h1>Chale jao!! Vapash Chale Jao..</h1>")
    
// })

// app.get("/about", function (req, res) {
//     res.send("<h1>Vo Bahut saktisali h,, Tum usse bach nhi paoge!!##</h1>")
    
// })

// app.get("/functions", function (req, res) {
//     res.send("<h1>No Functions..</h1>")
    
// })

app.listen(3000, function(){
        console.log("Server Runing at 3000... ");
})

//  Api Key
//  65d9c07abc1054d16d0efc01560a7175-us14

//  List id
//  093bedc2ca