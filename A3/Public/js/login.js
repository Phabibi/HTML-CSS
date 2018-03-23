$(document).ready(function(){
  console.log("calling GET /checkin");

  $("#checkin").click(function()
{
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
