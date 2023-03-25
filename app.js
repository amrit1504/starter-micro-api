const express = require("express");
const mailchimp = require("@mailchimp/mailchimp_marketing");
// Mailchimp Configuration
mailchimp.setConfig({
    apiKey: "2fb6c936f1a153ca8073195095b329f8-us21",
    server: "us21"
})
// Installing Plugins to Express.js
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname+ '/'));
// Responding to Home Page with HTML file
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
})
// Fetching data from Client Request and adding it to mailchimp
app.post("/", function (req, res) {
    const listId = "bd5533330e";
    var firstName = req.body.firname;
    var lastName = req.body.lasname;
    var email = req.body.email;
    async function run() {
        try {
            const response = await mailchimp.lists.addListMember(listId, {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            });
 
            console.log(
                `Successfully added contact as an audience member. The contact's id is ${response.id
                }.`
            );
            res.sendFile(__dirname + "/success.html")
        } catch (e) {
            console.log(e);
            res.sendFile(__dirname + "/failure.html")
        }
    }
    run();
})
 
app.listen(process.env.PORT || 3000 , function () {
    console.log("Server is running on Port 3000.");
})
// const express = require("express");
// const request = require("request");
// const bodyParser = require("body-parser")
// const app = express(); 
// app.use(bodyParser.urlencoded({extended: true}));
// const mailchimp = require("@mailchimp/mailchimp_marketing");
// const { url } = require("inspector");

// app.get("/" , function(req , res) {
//     res.sendFile(__dirname + "/signup.html", function(req , res ) {
//         console.log("File is Running");
//     })
// })

// mailchimp.setConfig({
//     apiKey: "f3de16dc1ac54c1e15b9daaed821f0fd-us21",
//     server: "us21",
//   });

// app.use(express.static(__dirname));

// app.post("/" , function( req , response){
    
    

//     const listId = "bd5533330e" ; 
//     const subscribingUser = {

//      fName : req.body.firName,
//      lName : req.body.lasName, 
//      email :  req.body.email,

//    };


//   async function run() {
//     try {const response = await mailchimp.lists.addListMember(listId, {
//       email_address: subscribingUser.email,
//       status: "subscribed",
//       merge_fields: {
//         FNAME: subscribingUser.fName,
//         LNAME: subscribingUser.lName,
//       }
//     });
  

//     console.log(response);
//       response.sendFile(__dirname + "/failure.html");
// } catch (err) {
//       console.log(err.status);
//       response.sendFile(__dirname + "/success.html");
//     }

//  console.log(
//         "Successfully added contact as an audience member. The contact's id is" + response.id );

//  }

// run();

// app.post("/success", function(req, res) {
//     res.redirect("/");
//   });



    
// });


// app.listen(3000 , function(req , res){
//     console.log ("Server is running at 3000") ; 
// })

