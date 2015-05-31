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
  host_id = $('#host_radio:checked').val();
  $.get("/dashboard/gethostdetails/"+host_id, function(data){
    var obj = data;
    $('#edit_hostid').val(host_id);
    $('#edit_hostname').val(obj.hostname);
    $('#edit_ip').val(obj.ip);
    $('#edit_username').val(obj.username);
    $('#edit_password').val(obj.password);
    $('#edit_cpu').val(obj.cpu);
    $('#edit_ram').val(obj.ram);
    $('#edit_storage').val(obj.storage);
    $('#edit_host_os').val(obj.host_os);
    if(obj.active == 1){ 
      $('input[name=edit_active][value=1]').prop('checked',true)
    }
    else{
      $('input[name=edit_active][value=0]').prop('checked',true);
    }
  });

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
  var port = parseInt(data[0])*2 + 25001;
  var url = (ip+":"+port);
  $('#terminalpanel').attr('src',url);   
  $('#tablediv').hide();
  $('#detailspanel').hide();
  $('#terminalpanel').show();
}

function getdetails(){
	var data = $('#cvm_radio:checked').val().split('_');
  var ip  = data[1];
  
  var port = parseInt(data[0])*2 + 25000;
   $('#details_sship').text(ip);
   $('#details_sshport').text(port);
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


function showgraph() {
  
 
  var influxdb = new InfluxDB({
  "host" :"172.27.20.159",
  "port" :"8086",
  "username" :"ritika",
  "password" :"ritika",
  "database" :"stats"
   });
   
  influxdb.query("select cpu_all from hostname4_cpu_172.27.20.163;", function(points) {
     points = points[0].points
     console.log(points);
      var data = points.map(function(point) {
      return { x: point.time/ 1000, y: point.cpu_all };
    }).reverse();
   
    console.log(data);
  
  var graph = new Rickshaw.Graph({
      element: document.querySelector("#chart"),
      width: 640,
      height: 180,
      renderer: 'line',
      series: [{ data: data, color: 'steelblue' }]
    });

    var xAxis = new Rickshaw.Graph.Axis.Time({ graph: graph });
    var yAxis = new Rickshaw.Graph.Axis.Y({
      graph: graph,
      orientation: 'left',
      element: document.getElementById('y_axis')
    });

    xAxis.render();
    yAxis.render();
    graph.render();
   });
}