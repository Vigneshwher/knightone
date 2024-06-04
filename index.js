const bodyParser = require('body-parser');
var express= require('express');
var mongoose =require('mongoose');
const app =express();
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
mongoose.connect('mongodb://localhost:27017/construction',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error', ()=> console.log("Error is connecting to the db"));
db.once('open', ()=> console.log("Connection to the db suffully"));

app.post("/signup", (req,res) =>{
    var Name = req.body.username;
    var Email = req.body.email;
    var Subject = req.body.Subject;
    var Message = req.body.message;
    var data ={
        "Fullname": Name,
        "email": Email,
        "subject": Subject,
        "message": Message,
    };

    db.collection('buliding').insertOne(data, (err, collection) =>{
        if(err){
            console.error("Error inserting record:", err);
            return res.status(500).send("Error inserting record");
        }
        console.log("Record Inserted Succesfully:", collection.insertedID);
        return res.redirect('success.html');
    });
});

app.get("/", (req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": "*"
    });
    return res.redirect('index.html');
});

app.listen(4445, ()=>{
    console.log("Listening on PORT 4445")
});
