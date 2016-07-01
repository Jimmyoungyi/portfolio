	
$(function(){
	var currentProject = 0;
	var currentDetail = 0;
	var targetProject;
	var targetDetail;
	var totalProject = Object.keys(data).length;
	var defaultPage = true;
	var animate = true;
	var detail = false;
	var navWidth;
	//place navigation
	for(var i=0; i<totalProject; i++){
		$("nav>ul").append($("#nav-item").html().replace(/{title}/,data[i].title));
		if(data[i].detailpage){
			$("nav>ul>li").eq(i).append("<ul></ul>");
			for(var u=0; u< data[i].detailpage.length ; u++){
				$("nav>ul>li").eq(i).find("ul").append($("#nav-item").html().replace(/{title}/,data[i].detailpage[u].type));
			}
		}
	}
	$("nav ul li").eq(0).find(".nav-point").addClass("active");
	$("nav").css("top","calc( 50vh - "+(totalProject*30+10)/2+"px)").css("opacity","1");
	navWidth = $("nav").width();
	$("nav").css("width",navWidth+"px;")
	//nav click
	$("nav>ul>li>div").click(function(){
		if(detail){
			if($(this).parent().index()==0||$(this).parent().index()==currentProject){
				goHome($(this).parent().index());
			}else{
				changeProjectDetail($(this).parent().index());
			}
		}else{
			targetProject = $(this).parent().index();
			changeProject(targetProject);
		}
	})
	//sub nav click
	$(document).on("click",".detail li",function(){
		targetDetail = $(this).index();
		changeDetail(targetDetail);
	})
	//scroll page
	$("body").mousewheel(function(event, delta) {
		if(animate){
			animate=false;
			if(delta>0){
				//console.log("up",currentProject);	
				if(detail){
					targetDetail = currentDetail-1;
					if(targetDetail == -1){
						targetDetail = 0;
						animate=true;
					}
					changeDetail(targetDetail);
				}else{
				 	targetProject = currentProject-1;
					targetProject == -1 ? targetProject = totalProject - 1 : targetProject=targetProject;
					changeProject(targetProject);
				}
			}else{
				//console.log("down",currentProject);
				if(detail){
					targetDetail = currentDetail+1;
					if(targetDetail == data[currentProject].detailpage.length){
						targetDetail = data[currentProject].detailpage.length-1;
						animate=true;
					}
					changeDetail(targetDetail);
				}else{
					targetProject = currentProject+1;
					targetProject == totalProject ? targetProject = 0 : targetProject=targetProject;
					changeProject(targetProject);
				}
			}
		}	
	})
	//go detail page
	$(document).on("click",".go-detail",function(){
		$(".active").parent().addClass("detail");
		$(".active").removeClass("active");
		$(".detail").find("ul .nav-point").eq(0).addClass("active");
		var subnavHeight = data[currentProject].detailpage.length*30+10;
		var mainnavHeight = subnavHeight+90;
		$(".detail").find("ul").css("height",subnavHeight+"px");
		$("nav").css({height:mainnavHeight+"px",top:($(window).height()-mainnavHeight)/2+"px"});
		$("nav>ul").css("margin-top",-30*(currentProject-1)+"px");
		//console.log(data[currentProject].title);
		currentDetail=0;
		getContainer();
		targetIn.html(
			$("#detail-summary-temp").html().replace(/{title}/g,data[currentProject].title)
											.replace(/{background}/,data[currentProject].detailpage[0].background)
											.replace(/{goal}/,data[currentProject].detailpage[0].goal)
											.replace(/{solution}/,data[currentProject].detailpage[0].solution)
											.replace(/{imgLink}/,data[currentProject].detailpage[0].imgLink)
		)
		targetIn.css("z-index","1");
		targetOut.css("z-index","10");
		animate=false;
		targetIn.css({"top":"0%","left":"0"});
		targetOut.animate({left:"-100vw"},800,function(){
			animate=true;
			detail=true;
			document.location="#"+data[currentProject].title.replace(/\s+/g, '');
		});
		defaultPage = !defaultPage;
	})
	//load porject function
	changeProject(0);
	//get container
	var targetIn;
	var targetOut;
	function getContainer(){
		if(defaultPage){
			targetIn = $("#page2");
			targetOut = $("#page1");
		}else{
			targetIn = $("#page1");
			targetOut = $("#page2");
		}
	}
	//change project
	function changeProject(newProject){
		//nav change
		$(".nav-point").removeClass("active");
		$("nav>ul>li").eq(newProject).find(">.nav-point").addClass("active");
		getContainer();
		//load page
		if(newProject == 0){
			targetIn.html($("#home-temp").html().replace(/{title}/,data[0].title));
		}else{
			targetIn.html(
				$("#list-temp").html().replace(/{title}/g,data[newProject].title)
										.replace(/{description}/,data[newProject].description)
										.replace(/{tech}/,data[newProject].tech)
										.replace(/{plantform}/,data[newProject].plantform)
										.replace(/{link}/,data[newProject].link)
										.replace(/{github}/,data[newProject].github)
										.replace(/{imgLink}/,data[newProject].imgLink)
			)
		}
		//animate
		if(newProject > currentProject){
			targetIn.css("z-index","1");
			targetOut.css("z-index","10");
			targetIn.css({"top":"0","left":"0"});
			targetOut.animate({top:"-100%"},800,function(){animate=true});
		}else if(newProject < currentProject){
			targetIn.css("z-index","10");
			targetOut.css("z-index","1");
			targetIn.css({"top":"-100%","left":"0"});
			targetIn.animate({top:"0%"},800,function(){animate=true});
		}else{
			targetIn.css({"top":"0%","left":"0"});
			targetOut.css("top","-100%");
		}
		//update data
		currentProject = newProject;
		defaultPage = !defaultPage;
	}
	//change detail page
	function changeDetail(newDetail){
		//nav change
		$(".nav-point").removeClass("active");
		$(".detail .nav-point").eq(newDetail+1).addClass("active");
		getContainer();
		//load page
			
		if(newDetail == 0){
			targetIn.html(
				$("#detail-summary-temp").html().replace(/{title}/g,data[currentProject].title)
												.replace(/{background}/,data[currentProject].detailpage[0].background)
												.replace(/{goal}/,data[currentProject].detailpage[0].goal)
												.replace(/{solution}/,data[currentProject].detailpage[0].solution)
												.replace(/{imgLink}/,data[currentProject].detailpage[0].imgLink)
			)
		}else if(newDetail == 1){
			targetIn.html(
				$("#detail-description-temp").html().replace(/{title}/g,data[currentProject].title)
												.replace(/{subtitle}/,data[currentProject].detailpage[1].subtitle)
												.replace(/{imgLink}/,data[currentProject].detailpage[0].imgLink)
			)
			for(var i=0; i<data[currentProject].detailpage[1].list.length; i++){
				targetIn.find("ul").append("<li>"+data[currentProject].detailpage[1].list[i]+"</li>");
			}
		}else{
			targetIn.html(
				$("#detail-"+data[currentProject].detailpage[newDetail].type+"-temp").html().replace(/{title}/g,data[currentProject].title)
			);
		}
		//animate
		if(targetDetail > currentDetail){
			targetIn.css("z-index","1");
			targetOut.css("z-index","10");
			targetIn.css({"top":"0","left":"0"});
			targetOut.animate({top:"-100%"},800,function(){animate=true});
		}else if(targetDetail < currentDetail){
			targetIn.css("z-index","10");
			targetOut.css("z-index","1");
			targetIn.css({"top":"-100%","left":"0"});
			targetIn.animate({top:"0%"},800,function(){animate=true});
		}else{
			targetIn.css({"top":"0%","left":"0"});
			targetOut.css("top","-100%");
		}
		//update data
		currentDetail = newDetail;
		defaultPage = !defaultPage;
	}
	function changeProjectDetail(newProject){
		currentDetail=0;
		//nav
		var subnavHeight = data[newProject].detailpage.length*30+10;
		var mainnavHeight = subnavHeight+90;
		$("nav").css({height:mainnavHeight+"px",top:($(window).height()-mainnavHeight)/2+"px"});
		$("nav>ul").css("margin-top",-30*(newProject-1)+"px");
		$(".detail ul").css("height","0px");
		$(".active").removeClass("active");
		$(".detail").removeClass("detail");
		$("nav>ul>li").eq(newProject).addClass("detail");
		$(".detail ul li").eq(0).find(".nav-point").addClass("active");
		$(".detail").find("ul").css("height",subnavHeight+"px");
		//content
		getContainer();
		console.log(newProject)
		targetIn.html(
			$("#detail-summary-temp").html().replace(/{title}/g,data[newProject].title)
											.replace(/{background}/,data[newProject].detailpage[0].background)
											.replace(/{goal}/,data[newProject].detailpage[0].goal)
											.replace(/{solution}/,data[newProject].detailpage[0].solution)
											.replace(/{imgLink}/,data[newProject].detailpage[0].imgLink)
		)
		//animate
		animate=false;
		if(newProject>currentProject){
			targetOut.animate({top:"-100%"},400,function(){
				targetIn.css({top:"100%",left:"0%"});
				targetIn.animate({top:"0%"},400,function(){
					animate=true;
				});
			});	
		}else{
			targetOut.animate({top:"100%"},400,function(){
				targetIn.css({top:"-100%",left:"0%"});
				targetIn.animate({top:"0%"},400,function(){
					animate=true;
				});
			});
		}
		document.location="#"+data[newProject].title.replace(/\s+/g, '');
		currentProject = newProject;
		defaultPage = !defaultPage;	
	}
	function goHome(newProject){
		//nav 
		var subnavHeight = 0;
		var mainnavHeight = totalProject*30+10;
		$("nav").css({height:mainnavHeight+"px",top:($(window).height()-mainnavHeight)/2+"px"});
		$("nav>ul").css("margin-top","0px");
		$(".detail").find("ul").css("height",subnavHeight+"px");
		$(".active").removeClass("active");
		$(".detail").removeClass("detail");
		//content
		getContainer();
		if(newProject == 0){
			targetIn.html($("#home-temp").html().replace(/{title}/,data[0].title));
			currentProject = 0;
		}else{
			targetIn.html(
				$("#list-temp").html().replace(/{title}/g,data[newProject].title)
										.replace(/{description}/,data[newProject].description)
										.replace(/{tech}/,data[newProject].tech)
										.replace(/{plantform}/,data[newProject].plantform)
										.replace(/{link}/,data[newProject].link)
										.replace(/{github}/,data[newProject].github)
										.replace(/{imgLink}/,data[newProject].imgLink)
			)
		}
		$("nav>ul>li").eq(newProject).find(".nav-point").addClass("active");
		//animate
		animate=false;
		targetIn.css("z-index","10");
		targetOut.css("z-index","1");
		targetIn.css({"top":"0%","left":"-100vw"});
		targetIn.animate({left:"0%"},800,function(){
			animate=true;
			detail=false;
			document.location="#";
		});
		defaultPage = !defaultPage;
	}
})
	
////window on, go detail page