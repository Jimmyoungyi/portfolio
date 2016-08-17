	
$(function(){
	document.body.addEventListener('touchstart', function(e){ e.preventDefault(); });
	var currentProject = -1;
	var currentDetail = 0;
	var targetProject;
	var targetDetail;
	var totalProject = Object.keys(data).length;
	var defaultPage = false;
	var animate = true;
	var detail = false;
	//load default page (project page)
	$("#page1").html($("#home-temp").html().replace(/{title}/,data[0].title)).css({"top":"0","left":"0"});
	$(document).on("click touchend",".cover span",function(){
		getStart();
	})
	//sub nav click
	$(document).on("click touchend","nav li",function(){
		targetDetail = $(this).index() - 1;
			changeDetail(targetDetail);
	})
	//scroll page
	$("body").mousewheel(function(event, delta) {
		if(animate){
			animate=false;
			if(detail){
				if(delta>0){
					//console.log("up",currentProject);	
					targetDetail = currentDetail-1;
					if(targetDetail == -2){
						targetDetail = -1;
						animate=true;
					}
					changeDetail(targetDetail);
				}else{
					//console.log("down",currentProject);
					targetDetail = currentDetail+1;
					if(targetDetail == data[currentProject].detailpage.length){
						targetDetail = data[currentProject].detailpage.length-1;
						animate=true;
					}
					changeDetail(targetDetail);
				}
			}
		}	
	})
	var touchY;
	$(document).on("touchstart",".page",function(e){
		var y = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
		touchY = y.pageY;
	})
	$(document).on("touchend",".page",function(e){
		var y = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
		if(animate){
			animate=false;
			if(detail){
				if(touchY-y.pageY < -50){
					//console.log("up",currentProject);	
					targetDetail = currentDetail-1;
					if(targetDetail == -2){
						targetDetail = -1;
						animate=true;
					}
					changeDetail(targetDetail);
				}else if(touchY-y.pageY > 50){
					//console.log("down",currentProject);
					targetDetail = currentDetail+1;
					if(targetDetail == data[currentProject].detailpage.length){
						targetDetail = data[currentProject].detailpage.length-1;
						animate=true;
					}
					changeDetail(targetDetail);
				}else{
					animate = true;
				}
			}
		}
	})
	//go detail page
	$(document).on("click touchend",".project-list li",function(){
		currentProject = $(this).index();
		goDetail();
	})
	//go project
	$(document).on("click touchend",".show-list",function(){
		goProjectList(currentProject);
	})
	//click contact me
	$(document).on("click touchend","header",function(){
		goContactme();
	})
	//project hover
	$(document).on("mouseleave",".project-list li",function(){
		$(".project-list li").css("background-color","rgba(173,216,230,1)").css("color","#ffffff");
	})
	$(document).on("mouseenter",".project-list li",function(){
		$(".list").css("background-image","url('"+$(this).find(".image-link").html()+"')");
		$(".project-list li").css("background-color","rgba(173,216,230,0.7)").css("color","#ffffff");
		$(this).css("background-color","rgba(255,255,255,1)").css("color","#444444");
	})
	
	//get container
	var targetIn = $("#page2");
	var targetOut = $("#page1");
	function getContainer(){
		if(defaultPage){
			targetIn = $("#page2");
			targetOut = $("#page1");
		}else{
			targetIn = $("#page1");
			targetOut = $("#page2");
		}
	}
	//get start
	function getStart(){
		$("header").animate({opacity:"1"},800);
		$(".show-list").animate({opacity:"1"},800);
		$("#page1").css("z-index","9999");
		$("#page2").html($("#project-temp").html()).css({"top":"0","left":"0"});
		//place projectpage list
		for(var i=0; i<totalProject; i++){
			if(data[i].detailpage){
				$(".project-list").append(
					$("#project-item").html().replace(/{plantform}/,data[i].plantform)
											.replace(/{title}/,data[i].title)
											.replace(/{imgLink}/g,data[i].imgLink)
				);
			}
		}
		$("#page1").animate({opacity:"0"},800,function(){
			$("#page1").css({"top":"-100vh","left":0,"opacity":1});
		});
	}
	//go detail
	function goDetail(){
		//place nav
		$("nav ul").html("");
		$("nav").css("opacity","1");
		// $("nav ul").append($("#nav-item").html().replace(/{title}/,"before"));
		$("nav ul").append($("#nav-item").html().replace(/{title}/,"cover"));
		for(var i=0; i<data[currentProject].detailpage.length; i++){
			$("nav ul").append($("#nav-item").html().replace(/{title}/,data[currentProject].detailpage[i].type));
		}
		$("nav .nav-point").eq(0).addClass("active");
		// $("nav ul").append($("#nav-item").html().replace(/{title}/,"after"));
		var subnavHeight = data[currentProject].detailpage.length*30+10;
		var mainnavHeight = subnavHeight+90;
		$("nav").css({height:mainnavHeight+"px",top:($(window).height()-mainnavHeight)/2+"px"});
		//console.log(data[currentProject].title);
		currentDetail = -1;
		getContainer();
		if(currentDetail == -1){
			targetIn.html(
				$("#list-temp").html().replace(/{title}/g,data[currentProject].title)
										.replace(/{description}/,data[currentProject].description)
										.replace(/{tech}/,data[currentProject].tech)
										.replace(/{plantform}/,data[currentProject].plantform)
										.replace(/{link}/,data[currentProject].link)
										.replace(/{github}/,data[currentProject].github)
										.replace(/{imgLink}/,data[currentProject].imgLink)
			)
		}else{
			targetIn.html(
				$("#detail-summary-temp").html().replace(/{title}/g,data[currentProject].title)
												.replace(/{background}/,data[currentProject].detailpage[0].background)
												.replace(/{goal}/,data[currentProject].detailpage[0].goal)
												.replace(/{solution}/,data[currentProject].detailpage[0].solution)
												.replace(/{imgLink}/,data[currentProject].detailpage[0].imgLink)
			)
		}
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
	}
	//change detail page
	function changeDetail(newDetail){
		//nav change
		$(".nav-point").removeClass("active");
		$("nav .nav-point").eq(newDetail+1).addClass("active");
		getContainer();
		//load page
		if(newDetail == -1){
			targetIn.html(
				$("#list-temp").html().replace(/{title}/g,data[currentProject].title)
										.replace(/{description}/,data[currentProject].description)
										.replace(/{tech}/,data[currentProject].tech)
										.replace(/{plantform}/,data[currentProject].plantform)
										.replace(/{link}/,data[currentProject].link)
										.replace(/{github}/,data[currentProject].github)
										.replace(/{imgLink}/,data[currentProject].imgLink)
			)
		}else if(data[currentProject].detailpage[newDetail].type == "summary"){
			targetIn.html(
				$("#detail-summary-temp").html().replace(/{title}/g,data[currentProject].title)
												.replace(/{background}/,data[currentProject].detailpage[newDetail].background)
												.replace(/{goal}/,data[currentProject].detailpage[newDetail].goal)
												.replace(/{solution}/,data[currentProject].detailpage[newDetail].solution)
												.replace(/{imgLink}/,data[currentProject].detailpage[newDetail].imgLink)
			)
		}else if(data[currentProject].detailpage[newDetail].type == "description"){
			targetIn.html(
				$("#detail-description-temp").html().replace(/{title}/g,data[currentProject].title)
												.replace(/{subtitle}/,data[currentProject].detailpage[newDetail].subtitle)
												.replace(/{imgLink}/,data[currentProject].detailpage[newDetail].imgLink)
			);
			for(var i=0; i<data[currentProject].detailpage[1].list.length; i++){
				targetIn.find("ul").append("<li>"+data[currentProject].detailpage[1].list[i]+"</li>");
			}
		}else if(data[currentProject].detailpage[newDetail].type == "video"){
			targetIn.html(
				$("#detail-video-temp").html().replace(/{title}/g,data[currentProject].title)
												.replace(/{videoLink}/,data[currentProject].detailpage[newDetail].videoLink)
			);
		}else if(data[currentProject].detailpage[newDetail].type == "taskflow"){
			targetIn.html(
				$("#detail-taskflow-temp").html().replace(/{title}/g,data[currentProject].title)
												.replace(/{taskname}/,data[currentProject].detailpage[newDetail].taskname)
												.replace(/{description}/,data[currentProject].detailpage[newDetail].description)
												.replace(/{imgType}/,data[currentProject].detailpage[newDetail].imgType)
												.replace(/{imgLink}/,data[currentProject].detailpage[newDetail].imgLink)
			);
			$(".taskflow-content").on("touchend",function(){
				$(".mobile-img").css("height","calc(50vh + 50vw)");
				$(".mobile-img img").prop("src",$(this).parent().find(".detail-img img").attr("src"));
				if($(this).parent().find(".detail-img img").hasClass("highimg")){
					$(".mobile-img img").css("height","95%").css("width","initial");
				}else{
					$(".mobile-img img").css("width","100%").css("height","initial");
				}
				$(".mobile-img").on("touchend",function(){
					$(".mobile-img").css("height","0");
				})
			})
		}else if(data[currentProject].detailpage[newDetail].type == "sitemap"){
			targetIn.html(
				$("#detail-sitemap-temp").html().replace(/{title}/g,data[currentProject].title)
			);
			placeSiteMap(data[currentProject].detailpage[newDetail].system,$(".sitemap-content .map"));
			$(".sitemap-content .map li").on({
				mouseenter: function () {
					$(".sitemap-description img").prop("src",$(this).find(".hoverdetail").html());
				},
				mouseleave: function () {
					$(".sitemap-description img").prop("src","img/Project_detail_sitemap_empty.png");
				},
				touchend: function () {
					$(".mobile-img").css("height","calc(50vh + 50vw)");
					$(".mobile-img img").prop("src",$(this).find(".hoverdetail").html());
					$(".mobile-img span").html($(this).find(".hovertitle").html())
					$(".mobile-img img").css("width","100%").css("height","initial");
				}
			});
			$(".mobile-img").on("touchend",function(){
				$(".mobile-img").css("height","0");
			})
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
	function placeSiteMap(currentdata,container){
		for(var i=0; i<Object.keys(currentdata).length; i++){
			var target = currentdata[Object.keys(currentdata)[i]];
			if(target.length == 1){
				//console.log(target,container,"detail");
				container.append("<li><span class='hovertitle'>" + Object.keys(currentdata)[i] +"</span><span class='hoverdetail'>" + target[0] + "</span>" + "</li>");
			}else{
				//console.log(target,container,"detail","getmore");
				container.append("<li><span class='hovertitle'>" + Object.keys(currentdata)[i] +"</span><span class='hoverdetail'>" + target[0] + "</span>" + "</li>");
				container.append("<ul class='"+ Object.keys(currentdata)[i].replace(/\s+/g, '') + i +"'><ul>");
				placeSiteMap(target[1],container.find("."+Object.keys(currentdata)[i].replace(/\s+/g, '') + i));
			}
		}
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
	function goProjectList(newProject){
		if(!animate){
			targetIn.html($("#project-temp").html());
			currentProject = -1;
			for(var i=0; i<totalProject; i++){
				if(data[i].detailpage){
					$(".project-list").append(
						$("#project-item").html().replace(/{plantform}/,data[i].plantform)
												.replace(/{title}/,data[i].title)
												.replace(/{imgLink}/,data[i].imgLink)
					);
				}
			}
			$("nav").css({"height":"0px","opacity":"0","top":0});
			goContactme();
			return;
		}
		getContainer();
		targetIn.html($("#project-temp").html());
		currentProject = -1;
		//place projectpage list
		for(var i=0; i<totalProject; i++){
			if(data[i].detailpage){
				$(".project-list").append(
					$("#project-item").html().replace(/{plantform}/,data[i].plantform)
											.replace(/{title}/,data[i].title)
											.replace(/{imgLink}/,data[i].imgLink)
				);
			}
		}
		$("nav").css({"height":"0px","opacity":"0","top":0});
		if(newProject == -1){
			//animate
			animate=false;
			targetIn.css("z-index","10");
			targetOut.css("z-index","1");
			targetIn.css({"top":"0%","left":"0"});
			targetOut.css({"top":"-100%","left":"0"});
			animate=true;
			detail=false;
			document.location="#";
		}else{
			//animate
			animate=false;
			targetIn.css("z-index","10");
			targetOut.css("z-index","1");
			targetIn.css({"top":"0%","left":"-100vw"});
			targetIn.animate({left:"0%"},800,function(){
				animate=true;
				detail=false;
				document.location="#";
				$("nav").html("<ul></ul>");
			});
		}
		defaultPage = !defaultPage;
	}
	function goContactme(){
		if(animate){
			targetOut.html($("#contact-temp").html()).css({"top":"0","left":"0","z-index":"9999","opacity":0});

			$("header").animate({"top":"-25px"},400,function(){
				$("header").html("Back").animate({"top":"15px"},400);
			})

			targetOut.animate({opacity:"1"},800);
		}else{
			$("header").animate({"top":"-25px"},400,function(){
				$("header").html("Contact me").animate({"top":"15px"},400);
			})

			targetOut.animate({opacity:"0"},800,function(){
				targetOut.css({"top":"-100vh","opacity":1});
			});
		}
		animate = !animate;	
	}
})
	
////window on, go detail page