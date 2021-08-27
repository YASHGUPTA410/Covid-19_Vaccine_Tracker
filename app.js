const express = require("express");
const bodyParser = require("body-parser");
const https = require("https")
const app = express();
app.use(bodyParser.urlencoded({extended:true}))
app.set("view engine",'ejs')
app.get("/", function (req, res) {
    res.render("home");
    
});

app.post("/",function (req, res) {
    var pin = req.body.pincode;
    var date = req.body.date;
    var year = "2F" + date[0] + date[1] + date[2] + date[3];
    var month = "2F"+date[5]+date[6]
    var day = date[8] + date[9];
    date = day + "%" + month + "%" + year;
    const url = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode="+ pin +"&date=" + date+"";
    https.get(url, function (responce) {
        
        responce.on("data", function (data) {
            var vaccineData = JSON.parse(data);
          //  var data1 = (vaccineData.sessions[0]);
            res.render("result", { vaccineData:vaccineData.sessions});        
        })
    })
})
app.listen(process.env.PORT || 3000, function (req, res) {
    console.log("server started at port 3000");
})