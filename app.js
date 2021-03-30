const express = require("express");
const randtoken = require("rand-token");
const bodyparser = require("body-parser");
const app = express();

app.use(express.static('build'));
app.use(bodyparser({extended: true}));
//app.use(express.json());

var planets = [{"name":"Donlon","distance":100},
    {"name":"Enchai","distance":200},
    {"name":"Jebing","distance":300},
    {"name":"Sapir","distance":400},
    {"name":"Lerbin","distance":500},
    {"name":"Pingasor","distance":600}];

var vehicles = [{"name":"Space pod","total_no":2,"max_distance":200,"speed":2},
    {"name":"Space rocket","total_no":1,"max_distance":300,"speed":4},
    {"name":"Space shuttle","total_no":1,"max_distance":400,"speed":5},
    {"name":"Space ship","total_no":2,"max_distance":600,"speed":10}];

var results = [];

app.get("/", (req, res)=>{
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

app.get("/planets",(req, res)=>{
    
    res.send(planets);
});

app.get("/vehicles",(req, res)=>{
    
    res.send(vehicles);
});

app.post("/token",(req, res)=>{
    //console.log(req);
    var token = randtoken.generate(16);
    resultplanet = planets[Math.floor(Math.random()*6)].name;
    results.push({token:token, result:resultplanet});
    //console.log(results);
    res.send(JSON.stringify({token: token}));
});

app.post("/expedationresult",(req, res)=>{
    selectedplanets=req.body.planet_names;
    tokenprovided=req.body.token;
    expectedresult = results.find((item)=>{
        return item.token = tokenprovided;
    })
    var response= null;
    if(selectedplanets.includes(expectedresult))
    {
        response = {planet_name:expectedresult, status:"success"}
    }
    else
    {
        response = {status:"failure"};
    }
    res.send(JSON.stringify(response));
})

app.listen(3000, ()=>{
    console.group("server is in listening mode");
});
