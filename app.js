const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();
require('dotenv').config()

// Mailchimp Marketing API Details
const SERVER = process.env.SERVER;
const API_KEY = process.env.API_KEY;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req, res) => {
    const fName = req.body.fName;
    const lName = req.body.lName;
    const email = req.body.email;

    const listId = process.env.LIST_ID;
    const url = `https://${SERVER}.api.mailchimp.com/3.0/lists/${listId}`;

    const options = {
        method: "POST",
        auth: `adityanarad:${API_KEY}`
    };
    // First Authenticate the request
    const clientRequest = https.request(url, options, (response) => {
        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        }
        else {
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data", (data) => {
            console.log(JSON.parse(data));
        });
    });

    const data = {
        members: [
            {
                email_address: email,
                merge_fields: {
                    FNAME: fName,
                    LNAME: lName
                },
                status: "subscribed"
            }
        ]
    };
    clientRequest.write(JSON.stringify(data));

    clientRequest.end();
});

app.post("/failure", (req, res) => {
    res.redirect("/");
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Server started at port " + (process.env.PORT || 3000));
});
