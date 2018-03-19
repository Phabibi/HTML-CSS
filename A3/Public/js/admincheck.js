exports.courseid = function(id) {
  console.log("the id is changing.");

   var page = `<!DOCTYPE html>
   <html>
   <head>

       <meta name="viewport" content="minimum-scale=1.0, width=device-width, maximum-scale=1.0, user-scalable=no"/>
       <meta charset="utf-8">

       <title>Users</title>

       <link rel="stylesheet" href="./css/style.css"/>

   </head>
   <body>
       <div id= "login">
         <form id ="form" action="" method="post">
           <h1>Please Check In Now</h1>
             <button id="button"> Stop Check-In `
             page += id;
             page += `</button>
         </form>

       <div>

     <script src="./Public/js/admincheck.js"></script>
     <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
   </body>
  </html>
`
return page;
}
