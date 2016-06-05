var currentPage;
var totalPage = Object.keys(data).length;
$(function(){
	var dpage=true;
	var animate=true;
	currentPage=0;
	//scroll page
	$("body").mousewheel(function(event, delta) {
		if(animate){
			animate=false;
			if(delta>0){
				console.log("up",currentPage);
				currentPage--;
				currentPage == -1 ? currentPage = totalPage - 1 : currentPage=currentPage;
				if(dpage){
					loadpage($("#page2"));
					//animate
					$("#page2").css("top","-100%");
					$("#page1").animate({top:"100%"},1000,function(){animate=true});
					$("#page2").animate({top:"0%"},1000,function(){animate=true});
					dpage=false;
				}else{
					loadpage($("#page1"));
					//animate
					$("#page1").css("top","-100%");
					$("#page2").animate({top:"100%"},1000,function(){animate=true});
					$("#page1").animate({top:"0%"},1000,function(){animate=true});
					dpage=true;
				}
			}else{
				console.log("down",currentPage);
				currentPage++;
				currentPage == totalPage ? currentPage = 0 : currentPage=currentPage;
				if(dpage){
					loadpage($("#page2"));
					//animate
					$("#page2").css("top","100%");
					$("#page1").animate({top:"-100%"},1000,function(){animate=true});
					$("#page2").animate({top:"0%"},1000,function(){animate=true});
					dpage=false;
				}else{
					loadpage($("#page1"));
					//animate
					$("#page1").css("top","100%");
					$("#page2").animate({top:"-100%"},1000,function(){animate=true});
					$("#page1").animate({top:"0%"},1000,function(){animate=true});
					dpage=true;
				}
			}
		}	
    });
    //load page function
    loadpage($("#page1"));
})
function loadpage(target){
	if(currentPage == 0){
		target.html($("#home-temp").html().replace(/{title}/,data.p0.title));
	}else{
		target.html(
			$("#list-temp").html().replace(/{title}/,data["p"+currentPage].title)
									.replace(/{description}/,data["p"+currentPage].description)
									.replace(/{tech}/,data["p"+currentPage].tech)
									.replace(/{link}/,data["p"+currentPage].link)
									.replace(/{github}/,data["p"+currentPage].github)
									.replace(/{imgLink}/,data["p"+currentPage].imgLink)
		)
	}
}
////window on, go detail page