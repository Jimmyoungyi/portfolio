	
$(function(){
	var currentProject = 0;
	var targetProject;
	var totalProject = Object.keys(data).length;
	var defaultPage = true;
	var animate = true;
	//place navigation
	for(var i=0; i<totalProject; i++){
		$("nav ul").append(
			$("#nav-item").html().replace(/{title}/,data["p"+i].title)
		)
	}
	$("nav ul li").eq(0).find(".nav-point").addClass("active");
	$("nav").css("top","calc( 50vh - "+(totalProject*32+10)/2+"px)");
	//nav click
	$("nav ul li").click(function(){
		targetProject = $(this).index();
		loadpage(targetProject);
	})
	//

	//scroll page
	$("body").mousewheel(function(event, delta) {
		if(animate){
			animate=false;
			if(delta>0){
				console.log("up",currentProject);
			 	targetProject = currentProject-1;
				targetProject == -1 ? targetProject = totalProject - 1 : targetProject=targetProject;
				loadpage(targetProject);
			}else{
				console.log("down",currentProject);
				targetProject = currentProject+1;
				targetProject == totalProject ? targetProject = 0 : targetProject=targetProject;
				loadpage(targetProject);
			}
		}	
    });
    //load page function
    loadpage(0);


	function loadpage(newProject){
		//nav change
		$(".nav-point").removeClass("active");
		$("nav ul li").eq(newProject).find(".nav-point").addClass("active");
		//get container
		var targetIn;
		var targetOut;
		if(defaultPage){
			targetIn = $("#page2");
			targetOut = $("#page1");
		}else{
			targetIn = $("#page1");
			targetOut = $("#page2");
		}
		//load page
		if(newProject == 0){
			targetIn.html($("#home-temp").html().replace(/{title}/,data.p0.title));
		}else{
			targetIn.html(
				$("#list-temp").html().replace(/{title}/,data["p"+newProject].title)
										.replace(/{description}/,data["p"+newProject].description)
										.replace(/{tech}/,data["p"+newProject].tech)
										.replace(/{link}/,data["p"+newProject].link)
										.replace(/{github}/,data["p"+newProject].github)
										.replace(/{imgLink}/,data["p"+newProject].imgLink)
			)
		}
		//animate
		if(newProject > currentProject){
			targetIn.css("top","100%");
			targetIn.animate({top:"0%"},1000,function(){animate=true});
			targetOut.animate({top:"-100%"},1000,function(){animate=true});
			
		}else if(newProject < currentProject){
			targetIn.css("top","-100%");
			targetIn.animate({top:"0%"},1000,function(){animate=true});
			targetOut.animate({top:"100%"},1000,function(){animate=true});
		}else{
			targetIn.css("top","0%");
			targetOut.css("top","-100%");
		}
		//update data
		currentProject = newProject;
		defaultPage = !defaultPage;
	}


})
	
////window on, go detail page