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
  var host_id = $('#host_radio:checked').val();
  createGraphforcpuhost(host_id,8);
  createGraphformemhost(host_id);
  
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
  $('#statisticspanel').hide();
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
   $('#statisticspanel').hide();
}

function cvmlist(){
     $('#terminalpanel').hide();
     cvmactiondropdown();         
     $('#detailspanel').hide();
     $('#tablediv').show();
     $('#statisticspanel').hide();
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
   	
   });

  }); 
 //location.reload();
}
 function getcvmstats(){
   var data = $('#cvm_radio:checked').val().split('_');
   createGraphforcvm(data[0],1);
   createGraphforcvm_mem(data[0]);
  $('#statisticspanel').show();  
  $('#tablediv').hide();
  $('#detailspanel').hide();
  $('#terminalpanel').hide();
  
 }

//id, type, numberofcores
function createGraphforcvm(id ,cores){
    
    var dps = []; // dataPoints

    var chart = new CanvasJS.Chart("chart_cpu",{
      width: 420,
      height: 320,
      title :{
        text: "CPU usage"
      },
      toolTip: {
        shared: true
        
      },
      legend: {
        verticalAlign: "top",
        horizontalAlign: "center",
                                fontSize: 14,
        fontWeight: "bold",
        fontFamily: "calibri",
        fontColor: "dimGrey"
      }, 
      axisY:{ 
       title: "CPU in %",
       suffix : " %",
       maximum : 100,
       minimum : 0
       },     
      data: [{
        type: "line",
        xValueType: "dateTime",
        showInLegend: true,
        dataPoints: dps 
      }],
       legend:{
            cursor:"pointer",
            itemclick : function(e) {
              if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
                e.dataSeries.visible = false;
              }
              else {
                e.dataSeries.visible = true;
              }
              chart.render();
            }
          }
    });
    
    var xVal = 0;
    var yVal = 100; 
    var updateInterval = 500;
    var dataLength = 60; // number of dataPoints visible at any point
    var time = new Date;
    var updateChart = function (count) {
      count = count || 1;
      // count is number of times loop runs to generate random dataPoints.
      
      for (var j = 0; j < count; j++) { 
        time.setTime(time.getTime()+ updateInterval);
         $.get("/dashboard/lastinfluxcvmdata/"+id, function(rdata){
          //console.log(rdata['time']);
          if(timeXVal==-1){
            timeXVal = parseInt(rdata['time']);
          }
          xVal = (parseInt(rdata['time']) - timeXVal)%60;
          yVal =rdata['cpu'];
            dps.push({
            x: time.getTime()-1560000,
            y: yVal
             });
            //console.log(rdata['memtotal_in_mb']);
          
          chart.options.data[0].legendText = " CPU Utilized is " + Math.floor(yVal) +"%";
         });

       
      
        
      };
      
      if (dps.length > dataLength)
      {
        dps.shift();        
      }
      
      chart.render();   

    };

    // generates first set of dataPoints
    updateChart(dataLength); 
    updateChart(3000);
    // update chart after specified time. 
    setInterval(function(){updateChart()}, updateInterval); 


  }
    
    var timeXVal = -1;
function createGraphforcvm_mem(id) {

    var dps = []; // dataPoints

    var chart = new CanvasJS.Chart("chart_mem",{
      width: 420,
      height: 320,
      title :{
        text: "Memory usage"
      },
      toolTip: {
        shared: true
        
      },
      legend: {
        verticalAlign: "top",
        horizontalAlign: "center",
                                fontSize: 14,
        fontWeight: "bold",
        fontFamily: "calibri",
        fontColor: "dimGrey"
      }, 
      axisY:{ 
       title: "Memory in MB",
       suffix : " MB",
       maximum : 15720,
       minimum : 0
       },     
      data: [{
        type: "line",
        xValueType: "dateTime",
        showInLegend: true,
        dataPoints: dps 
      }],
       legend:{
            cursor:"pointer",
            itemclick : function(e) {
              if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
                e.dataSeries.visible = false;
              }
              else {
                e.dataSeries.visible = true;
              }
              chart.render();
            }
          }
    });
    
    var xVal = 0;
    var yVal = 100; 
    var updateInterval = 400;
    var dataLength = 60; // number of dataPoints visible at any point
    var time = new Date;
    var updateChart = function (count) {
      count = count || 1;
      // count is number of times loop runs to generate random dataPoints.
      
      for (var j = 0; j < count; j++) { 
        time.setTime(time.getTime()+ updateInterval);
         $.get("/dashboard/lastinfluxcvmdatamem/"+id, function(rdata){
          //console.log(rdata['time']);
          if(timeXVal==-1){
            timeXVal = parseInt(rdata['time']);
          }
          xVal = (parseInt(rdata['time']) - timeXVal)%60;
          yVal =rdata['memused_in_mb'];
            dps.push({
            x: time.getTime()-1560000,
            y: yVal
             });
            //console.log(rdata['memtotal_in_mb']);
          chart.options.axisY.maximum = rdata['memtotal_in_mb'];
          chart.options.data[0].legendText = " Memory Utilized is " + parseInt(yVal) +" MB";
         });

       
      
        
      };
      
      if (dps.length > dataLength)
      {
        dps.shift();        
      }
      
      chart.render();   

    };

    // generates first set of dataPoints
    updateChart(dataLength); 
    updateChart(3000);
    // update chart after specified time. 
    setInterval(function(){updateChart()}, updateInterval); 

  }


function createGraphforcpuhost(id ,cores){
    
    var dps = [];
    //var data = [];
    for(var i=0;i<cores;i++){
      hash = {};
      hash["label"] = "Core"+i.toString();
      hash["y"] = 0;
      dps.push(hash);
    }
      hash = {};
      hash["label"] = "all";
      hash["y"] = 0;
      dps.push(hash);
      
    var chart = new CanvasJS.Chart("chart_cpu",{
      theme: "theme3",
      width: 420,
      height: 320,
      title: {
        text: "% CPU utilization"    
      },
      axisY: {        
        suffix: " %",
        maximum : 100,
        minimum : 0
      },    
      legend :{
        cursor: "pointer",
        verticalAlign: 'center',
        horizontalAlign: "left"
      },
      data: [
      {
        type: "column", 
        bevelEnabled: true,       
        indexLabel: "{y} %",
        dataPoints: dps         
      }
      ],

          
    });

    var updateInterval = 500;
    // initial value
    var yValue2 =0;
      var yValue = [];
    var updateChart = function (yValue,yValue2) {
       yValue2 =0;
       yValue = [];
       $.get("/dashboard/lastinfluxdata/"+id, function(rdata){
          
          for(var i=0;i<cores;i++){
            s = "core_"+i.toString();
            //console.log(s);
            yValue[i] = rdata[s];
            //console.log("hi"+yValue[i]);
          }
          
          yValue2 = rdata['cpu_all'];
         
          for (var i = 0; i < cores; i++) {

          dps[i] = {label: "Core"+ i.toString(), y: yValue[i]};

           };
           dps[cores]={label: "all", y: Math.ceil(yValue2)};
          
        });
       
      

      chart.render();
    };
    
    updateChart();    

    // update chart after specified interval 
    setInterval(function(){updateChart(yValue,yValue2)}, updateInterval);


  }
    
function createGraphformemhost(id) {
      var dps = []; // dataPoints

    var chart = new CanvasJS.Chart("chart_mem",{
      width: 420,
      height: 320,
      title :{
        text: "Memory usage"
      },
      toolTip: {
        shared: true
        
      },
      legend: {
        verticalAlign: "top",
        horizontalAlign: "center",
                                fontSize: 14,
        fontWeight: "bold",
        fontFamily: "calibri",
        fontColor: "dimGrey"
      }, 
      axisY:{ 
       title: "Memory in MB",
       suffix : " MB",
       maximum : 15720,
       minimum : 0
       },     
      data: [{
        type: "line",
        xValueType: "dateTime",
        showInLegend: true,
        dataPoints: dps 
      }],
       legend:{
            cursor:"pointer",
            itemclick : function(e) {
              if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
                e.dataSeries.visible = false;
              }
              else {
                e.dataSeries.visible = true;
              }
              chart.render();
            }
          }
    });
    
    var xVal = 0;
    var yVal = 100; 
    var updateInterval = 500;
    var dataLength = 60; // number of dataPoints visible at any point
    var time = new Date;
    var updateChart = function (count) {
      count = count || 1;
      // count is number of times loop runs to generate random dataPoints.
      
      for (var j = 0; j < count; j++) { 
        time.setTime(time.getTime()+ updateInterval);
         $.get("/dashboard/lastinfluxdatamem/"+id, function(rdata){
          //console.log(rdata['time']);
          if(timeXVal==-1){
            timeXVal = parseInt(rdata['time']);
          }
          xVal = (parseInt(rdata['time']) - timeXVal)%60;
          yVal =rdata['memused'];
            dps.push({
            x: time.getTime() - 1560000,
            y: yVal
             });
            //console.log(rdata['memtotal_in_mb']);
          chart.options.axisY.maximum = rdata['memused'] + rdata['memfree'];
          chart.options.data[0].legendText = " Memory Utilized is " + parseInt(yVal) +" MB";
         });

       
      
        
      };
      
      if (dps.length > dataLength)
      {
        dps.shift();        
      }
      
      chart.render();   

    };

    // generates first set of dataPoints
    updateChart(dataLength); 
    updateChart(3000);
    // update chart after specified time. 
    setInterval(function(){updateChart()}, updateInterval); 


     }
    


  /*  nav_bar.haml to support select ur own host
/.row
                              /%label{:for => "specifiedhost"} Specified Host(optional)
                              /%select#imagename.form-control{"data-original-title" => "", :name => "image", :title => ""}
                                /%option{:value => "select"} --Select-- 
                                /- hosts_active = get_active_hosts
                                /- hosts_active.each do |host|
                                  /%option{:value => host["id"]}= host["hostname"]
                        
  */