
var express = require('express');
var app = express();
var serverIndex = require('serve-index');
var http = require('http');
var path = require('path');
var session =require('express-session');
var fs = require('fs');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://cmpt218:pass@ds061777.mlab.com:61777/cmpt218"
// {
//
//   poolSize: 20,
//   {socketTimeoutMS:480000},
//   {keepAlive: 300000},
//   {ssl: true},
//   {sslValidate: false}
//
// };

var admincheck = require('./Public/js/admincheck.js');

var username;
var pass;
var dbo;
var students;
var users;
var student_table;
var date;

var port = process.env.PORT || 3000;
var users = [];
var ssn;

var current_course;
var name;

// parsing body
app.use(express.json());
app.use(express.urlencoded( { extended:false} ));


app.use(express.static(path.join(__dirname,'/Public/')));
app.use(session({secret:'PASWAG'}));

var options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm','html'],
  index: "login.html"
}

var admin_option= {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm','html'],
  index: "admin.html"
}


MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");

  dbo = db.db("cmpt218");
  students = dbo.collection("students");
  console.log("Collection created");
  });



app.use('/', function(req,res,next){
  console.log(req.method, 'request:', req.url, JSON.stringify(req.body));
  next();
});




app.get('/', function(req,res,next){
  console.log("checking session");
  if(ssn == null)
  {
    console.log("setting session");
    ssn = req.session;
  }
  console.log("serving page");

  res.sendFile(__dirname + "/login.html");

});
//this should be done using ajax.
app.post('/', function(req,res,next){
  console.log("setting the session params");
  ssn = req.session;
  username = req.body.user;
  pass = req.body.pass;

  ssn.user = username;
  ssn.pass = pass;

  if(ssn.user === 'admin' && ssn.pass === '1234' )
  {
    console.log("loging in adming user");
    return res.redirect('/admin');
  }

  else {
    console.log("the user is not an admin");
    return res.redirect('/');
    }
});

app.get('/admin',function(req,res,next)

{
  if(ssn == null)
  {
    console.log("first timer");
    return res.redirect("/");


  }
  else{
    console.log("buddy already logged on");

    ssn = req.session;

    if(ssn.user === 'admin' && ssn.pass === '1234' )
    {
      console.log("loging buddy in");
      return res.sendFile(__dirname + "/admin.html");
    }

    else
     {
       console.log("my mans not an admin")
       return res.redirect("/");
     }

  }
  next();
});

app.post('/admin',function(req,res,next)
{

  console.log("the course added is: ",req.body);
  current_course = req.body.id;
  date = new Date();
  var month = date.getUTCMonth() + 1;
  var day = date.getUTCDate();
  var year = date.getUTCFullYear();

  var newdate = year + "/" + month + "/" + day;

  var hours = date.getHours();
  var mins = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';

  hours = hours % 12;
  hours = hours ? hours : 12;

  mins = mins < 10 ? '0' + mins : mins;


  var newtime = hours + ":" + mins + " " + ampm;

  date = newtime;



  students.insert({open:"true", checkinID: current_course, date: date, users: []}, function(err){
    if(err) throw err;

    console.log("table is inserted are now insertd.");
  })
  return res.redirect("/admincheck");

});

app.get('/checkin',function(req,res)

{
  console.log("checking in ovee heeii");
  return res.sendFile(__dirname + "/checkin.html");
});
  //console.log(req.body);

  app.get('/admincheck',function(req,res)

  {
    console.log("writing to file");

    var page_create = admincheck.courseid(current_course);

    fs.writeFile("./admincheck.html",page_create,function(err,data){

      if(err)
      {
        console.log(err);
      }

      else{
        console.log("file write success")
        res.sendFile(__dirname + "/admincheck.html");
      }

  });

  });
app.post('/admincheck',function(req,res){

  console.log("stopping the checkin");
  current_course = '';
  var open = {open: 'true'};
  var close = {$set: {open: 'false'}};
  students.updateOne(open,close, function(err,data){
    if(err) throw err;
    console.log("check in is no longer open")
  });


  dbo.collection("students").find({date: date}).toArray(function(err, result) {
   if (err) throw err;
   //var somer = JSON.parse(result.users);

   for(var i = 0; i < result.length; i++)
   {
       result[i] = result[i].users;
   }

   var peser = JSON.stringify(result);
   peser = JSON.parse(peser);
   console.log("these are the peser ", peser);

   var current_create = admincheck.history(peser);
   fs.writeFile("./current.html",current_create,function(err,data){

     if(err)
     {
       console.log(err);
     }

     else{
       console.log("file write to peser success")
       res.sendFile(__dirname + "/current.html");
     }

 });


 });
});


  app.post('/checkin',function(req,res)
  {
    console.log("Checking in to the course" , current_course);

if(current_course)
{
  if(req.body.checkstr === current_course)
  {
    console.log("the course exsists, succesfull ");
    name = req.body.name;
    // usrid = req.body.userid;
    //
    // var users = [name , usrid];

    var nusers = {
      name: req.body.name,
      userid: req.body.userid,
      courseid: current_course,
      time: date
    };

    console.log("users type of is",typeof(nusers));
    console.log("the user inserted is ", JSON.stringify(nusers));
    students.update({open:"true", date: date, checkinID: current_course}, {$push: {users: JSON.stringify(nusers)}});
    console.log("users are now insertd.");
    res.redirect("/submit");
  }
}
else {
    console.log("the course doesnt exist, error");
    res.redirect("/checkin");
}


  });

  // app.get('/history', function(req,res){
  //
  // });

  app.get('/submit', function(req,res){
    console.log("the name of person", name);
    var sub_create = admincheck.checkinsuc(name,current_course);

    fs.writeFile("./submit.html",sub_create,function(err,data){

      if(err)
      {
        console.log(err);
      }

      else{
        console.log("file write success")
        res.sendFile(__dirname + "/submit.html");
      }

  });
});

app.post('/history', function(req,res){
  dbo.collection("students").find({}).toArray(function(err, result) {
   if (err) throw err;
   //var somer = JSON.parse(result.users);


console.log("length of table", result.length);

   for(var i = 0; i < result.length; i++)
   {
       result[i] = result[i].users;
   }

   var reser = JSON.stringify(result);
   reser = JSON.parse(reser);
   console.log("these are the students ", reser);

   var history_create = admincheck.history(reser);
   fs.writeFile("./history.html",history_create,function(err,data){

     if(err)
     {
       console.log(err);
     }

     else{
       console.log("file write to history success")
       res.sendFile(__dirname + "/history.html");
     }

 });


 });
});



app.delete('/users-api/:id', function(req,res,next){
  // search database for id
  users = users.filter(function(people){
    return ((people.fname !== req.body.fname) || (people.lname !== req.body.lname));
  });
  res.json(users);
});




http.createServer(app).listen(port);
console.log('running on port',port);
