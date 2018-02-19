
var i= 1;
var emailarray= [1];
var j= 0;
function newuser() {
  i=1;
  var item =document.getElementById("inputs");
  var clone = item.cloneNode(true);
  clone.id = "something";
  document.getElementById("start").appendChild(clone);
  j++;
  emailarray[j]= 1;

  console.log(emailarray);
}

function newemail(bun){
  var item = document.getElementById("emaildiv");
  var clone = item.cloneNode(true);
  clone.id = "email clone"
  i++;
  emailarray[j] = i;

  console.log(emailarray);
  bun.parentNode.appendChild(clone);
}
function formsubmit()
{
  document.getElementById("emailcounter").value = emailarray
  document.getElementById("form1").submit();
}
