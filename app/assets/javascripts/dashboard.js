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

