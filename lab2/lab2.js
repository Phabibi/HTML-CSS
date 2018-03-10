var sec;
var minss;
var hourss;



//var res = document.getElementsByTagName('h1')[0].innerHTML.split (":");
var sec1 =0;
var minss1 =0;
var hourss1 =0;

function secs(){
  sec1++;

//  second = Number(second)  + 1;

   document.getElementsByTagName('h1')[0].innerHTML = hourss1 + ':' + minss1 + ':' + sec1 ;
}


function mins(){

sec1 = 0;
  minss1++;

   //document.getElementsByTagName('h1')[0].innerHTML = hour + ':' + min + ':' + second ;
}

function hours(){
  sec1 = 0 ;
  minss1 = 0;
  hourss1++;
}


function startclock() {

  sec = setInterval( secs ,1000);
  minss = setInterval( mins ,60000);
  hourss = setInterval( hours ,360000);

}

function stopclock() {

clearInterval(sec);
clearInterval(minss);
clearInterval(hourss);
}

function resetclock(){


  clearInterval(sec);
  clearInterval(minss);
  clearInterval(hourss);

   document.getElementsByTagName('h1')[0].innerHTML = " 0:0:0";
}
