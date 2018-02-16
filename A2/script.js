function newuser() {
  var start = document.getElementById("start");
  start.innerHTML += "<label" + " for=" + " fname" + " >" + "F Name:"+ "</label>" +"<input"+ " id ="+ " fname" + " placeholder=" +' first'+ " name=" + ' fname'+ " type="+' text'+" /> <br />"
  start.innerHTML += "<label" + " for=" + " lname" + " >" + "L Name:"+ "</label>" +"<input"+ " id ="+ " lname" + " placeholder=" +' last'+ " name=" + ' lname'+ " type="+' text'+" /> <br />"
  start.innerHTML += "<label" + " for=" + " age" + " >" + "Age:"+ "</label>" +"<input"+ " id ="+ " age" + " placeholder=" +' 0'+ " name=" + ' age'+ " type="+' number'+" /> <br />"
}
