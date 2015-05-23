function getDerivedImages(id){
	//alert(id);
	$.get("/dashboard/listderivedimages/"+id, function(data){
		var obj = data
		$('#derivedimages').empty()
    for(var i=0;i<obj.length;i++){
      $('#derivedimages').append(new Option(obj[i]['description'],obj[i]['id']))
    }
	});
}
$(document).ready(function () {
            $('#terminalpanel').hide();
            
             $('#detailspanel').hide();
             $('#tablediv').show();
    cvmactiondropdown();
$( ".slider" ).slider( "values", [ 55, 105 ] );
 });

function edithost(){
  $('#hosttablediv').hide();
  $('#statisticsdiv').hide();
  $('#edithostdiv').show();
  $('#addhostdiv').hide();
}

function gethosts(){
  $('#hosttablediv').show();
  $('#statisticsdiv').hide();
  $('#edithostdiv').hide();
  $('#addhostdiv').hide();

}
function addhost(){
  $('#hosttablediv').hide();
  $('#statisticsdiv').hide();
  $('#edithostdiv').hide();
  $('#addhostdiv').show();
  
}
function getstatistics(){
  $('#hosttablediv').hide();
  $('#statisticsdiv').show();
  $('#edithostdiv').hide();
  $('#addhostdiv').hide();  
}

function getterminal(){
  $('#terminalpanel').attr('src',"");
  var data = $('#cvm_radio:checked').val().split('_');
  var ip  = "http://"+data[1];
  var port = parseInt(data[0]) + 25001;
  var url = (ip+":"+port);
  $('#terminalpanel').attr('src',url);   
  $('#tablediv').hide();
  $('#detailspanel').hide();
  $('#terminalpanel').show();
}

function getdetails(){
	var id = $('#cvm_radio:checked').val();
   $('#terminalpanel').hide();
   $('#tablediv').hide();
   $('#detailspanel').show();
}

function cvmlist(){
     $('#terminalpanel').hide();
     cvmactiondropdown();         
     $('#detailspanel').hide();
     $('#tablediv').show();
}
function cvmactiondropdown()
{   
  $("tr").click(function () {
      $(this).children().find(":radio").attr('checked', 'checked');
      }) 
   
   $(".actionmenu").click(function(){
   	var data = $('#cvm_radio:checked').val().split('_');
    var cvmid = parseInt(data[0]);
   	var operation = $(this).attr('value');
      $.get("/dashboard/operatecvm/"+cvmid+"/"+operation, function(data){
   	alert(data);
   });
  }); 

}







