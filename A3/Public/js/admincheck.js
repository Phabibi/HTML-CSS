
exports.current = function(table)
{
  console.log("displaying Current");
  console.log("the table", table);
  var fss = table;
  var ss= JSON.stringify(fss);

     var page = `<!DOCTYPE html>
   <html>
   <head>

       <meta name="viewport" content="minimum-scale=1.0, width=device-width, maximum-scale=1.0, user-scalable=no"/>
       <meta charset="utf-8">

       <title>Users</title>

       <link rel="stylesheet" href="./css/style.css"/>

   </head>
   <body>
       <div id= "boxer">
           <h1>The students table</h1>
           <table id= "top" border = "1">
           <tr>
           <td class ="head">Name</td>
           <td class ="head">ID</td>
           <td class ="head">Course</td>
           <td class ="head">Time</td>
           </tr>
           </table>
             <table id= "tablu" class= "tbl" border= "1">
             </table>
       <div>


     <script>
          var the_table = document.getElementById("tablu");
          var arr = new Array;
          var students =[` +JSON.parse(ss)+ `]
          console.log("students",students);
          //var top = document.getElementById("top");
          //var top_arr = new Array;
          //top_arr[0] = top.insertRow(0);

          // for(var i = 0 ; i < students.length; i++)
          // {
          //   top_arr[i].insertCell(0);
          //   top_arr[i].insertCell(1);
          //   top_arr[i].insertCell(2);
          // }
          // for(var i = 0; i < students.length; i++)
          // {
          //   for(var j = 0; j < students.length; j++)
          //   {
          //     top.rows[i].cells[0].innerHTML = "Names"
          //     top.rows[i].cells[1].innerHTML = "ID"
          //     rop.rows[i].cells[2].innerHTML = "Course"
          //   }
          //
          // }
          for(var i = 0 ; i < students.length; i++)
          {
            arr[i] = the_table.insertRow(i);
            arr[i].insertCell(0);
            arr[i].insertCell(1);
            arr[i].insertCell(2);
            arr[i].insertCell(3);


          }

          for(var i =0; i < students.length; i++)
          {
            for(var j = 0; j < students.length; j++)
            {
                the_table.rows[i].cells[0].innerHTML = students[i].name
                the_table.rows[i].cells[1].innerHTML = students[i].userid
                the_table.rows[i].cells[2].innerHTML = students[i].courseid
                the_table.rows[i].cells[3].innerHTML = students[i].time

            }
          }


     </script>
   </body>
  </html>
  `
  return page;

};




exports.history = function (table)
{
  console.log("displaying histroy");
  console.log("the table", table);
  var fss = table;
  var ss= JSON.stringify(fss);

     var page = `<!DOCTYPE html>
   <html>
   <head>

       <meta name="viewport" content="minimum-scale=1.0, width=device-width, maximum-scale=1.0, user-scalable=no"/>
       <meta charset="utf-8">

       <title>Users</title>

       <link rel="stylesheet" href="./css/style.css"/>

   </head>
   <body>
       <div id= "boxer">
           <h1>The students table</h1>
           <table id= "top" border = "1">
           <tr>
           <td class ="head">Name</td>
           <td class ="head">ID</td>
           <td class ="head">Course</td>
           <td class ="head">Time</td>
           </tr>
           </table>
             <table id= "tablu" class= "tbl" border= "1">
             </table>
       <div>


     <script>
          var the_table = document.getElementById("tablu");
          var arr = new Array;
          var students =[` +JSON.parse(ss)+ `]
          console.log("students",students);
          //var top = document.getElementById("top");
          //var top_arr = new Array;
          //top_arr[0] = top.insertRow(0);

          // for(var i = 0 ; i < students.length; i++)
          // {
          //   top_arr[i].insertCell(0);
          //   top_arr[i].insertCell(1);
          //   top_arr[i].insertCell(2);
          // }
          // for(var i = 0; i < students.length; i++)
          // {
          //   for(var j = 0; j < students.length; j++)
          //   {
          //     top.rows[i].cells[0].innerHTML = "Names"
          //     top.rows[i].cells[1].innerHTML = "ID"
          //     rop.rows[i].cells[2].innerHTML = "Course"
          //   }
          //
          // }
          for(var i = 0 ; i < students.length; i++)
          {
            arr[i] = the_table.insertRow(i);
            arr[i].insertCell(0);
            arr[i].insertCell(1);
            arr[i].insertCell(2);
            arr[i].insertCell(3);


          }

          for(var i =0; i < students.length; i++)
          {
            for(var j = 0; j < students.length; j++)
            {
                the_table.rows[i].cells[0].innerHTML = students[i].name
                the_table.rows[i].cells[1].innerHTML = students[i].userid
                the_table.rows[i].cells[2].innerHTML = students[i].courseid
                the_table.rows[i].cells[3].innerHTML = students[i].time

            }
          }


     </script>
   </body>
  </html>
  `
  return page;
};




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


exports.checkinsuc = function(id, course){
  var page = `<!DOCTYPE html>
  <html>
  <head>

      <meta name="viewport" content="minimum-scale=1.0, width=device-width, maximum-scale=1.0, user-scalable=no"/>
      <meta charset="utf-8">

      <title>Users</title>

      <link rel="stylesheet" href="./css/style.css"/>

  </head>
  <body>
  <div id= "box">
      <section>

          <h1>Thank You for Your Submitting in `

           page += course;
           page += id + `!`;
           page += `</h1>







      </section>
  <div/>
      <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
      <script src="./js/login.js"></script>

  </body>
  </html>
`
return page;
}
