$(document).ready(function(){
  console.log("calling GET /checkin");

  $("#checkin").click(function()
{

  $.ajax({
    method: 'post',
    url: '/checkin',
    success: function()
    {
      $.ajax({
        method: 'get',
        url: '/checkin',
        success: function()
        {
          alert("Thank You for your sumbmission.");
        }
    });
  }
  });
  $.ajax({
    method: 'get',
    url: '/checkin',
    success: function()
    {
      window.location.pathname = "checkin"

    }
  });



  });


});
