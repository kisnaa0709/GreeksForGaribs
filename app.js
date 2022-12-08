const express = require("express");
const bodyParser = require("body-Parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("Public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")    
});

app.post("/", (req, res) => {

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
            },
        },
    ],
    };
    const jsonData = JSON.stringify(data);

    const url ="https://us14.api.mailchimp.com/3.0/lists/093bedc2ca";

    const options = {
        method: "POST",
        auth: "kisnaa0709:5251d4ab533879f548e3dbe80994840a-us14"
    }
    const request = https.request(url, options, function(response){

        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html")   
        }else{
            res.sendFile(__dirname + "/failure.html")
        }


        response.on("data", function(data){
            console.log(JSON.parse(data));
        });
    });
        request.write(jsonData);
        request.end();
});


    app.post("/failure", (req, res) => {
        res.redirect("/");
    });
  
app.listen(3000, function(){
        console.log("Server Runing at 3000... ");
})

//  Api Key
//  5251d4ab533879f548e3dbe80994840a-us14

//  List id
//  093bedc2ca