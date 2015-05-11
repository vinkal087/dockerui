function getDerivedImages(id){
	//alert(id);
	$.get("/dashboard/listderivedimages/"+id, function(data){
		
		
		
		var obj = data
		
        $('#derivedimages').empty()
       
        //$('#derivedimages').append(new Option("--Select--","select"))
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


function getterminal(){
  
  var id = $('#cvm_radio:checked').val();  
   $.get("/dashboard/getcvmdetails/"+id, function(data){
     //var data = JSON.parse(data);
     shellinabox_path = data.SHELLINABOX_PATH;
     $('#terminalpanel').attr('src', shellinabox_path);
   });   
   $('#tablediv').hide();
    $('#detailspanel').hide();
   $('#terminalpanel').show();
   
}
function getdetails(){
	var id = $('#cvm_radio:checked').val();
   //$.get("/dashboard/listderivedimages/"+id, function(data){
   	
   //});
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
{   $("tr").click(function () {
                //alert('Table row clicked');
                $(this).children().find(":radio").attr('checked', 'checked');
            }) 
   
   $(".actionmenu").click(function(){
   	var cvmid = $('#cvm_radio:checked').val();
   	var operation = $(this).attr('value');
      $.get("/dashboard/operatecvm/"+cvmid+"/"+operation, function(data){
   	alert(data);
   });
  }); 

}







