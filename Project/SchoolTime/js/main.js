var totalWidth = window.innerWidth;
var totalHeight = window.innerHeight;
var typeArray = ["coding","design","class","paper","others"];
var colorArray = ["rgb(232, 139, 118)","rgb(205, 111, 148)","rgb(123, 113, 196)","rgb(95, 179, 204)","rgb(70, 199, 162)"];
//days
for(var i=0; i<5; i++){
	for(var u=0; u<7; u++){
		d3.select(".days").append("div")
			.text(i * 7 + u + 1);
		if(i*7+u+1 == 30){ break; }
	}
}
//display
var displaySVG = d3.select(".displaySVG").append("svg")
										.attr("width",totalWidth*0.32-102)
										.attr("height",typeArray.length*150);
for(var i=0; i<typeArray.length; i++){
	d3.select(".content ul").append("li")
							.classed(typeArray[i],true)
							.text(typeArray[i])
							.style("height","calc((52vh - 42px)/"+typeArray.length+")")
							.style("line-height","calc((52vh - 42px)/"+typeArray.length+")")
							.style("background-color",colorArray[i]);
	displaySVG.append("g")
				.classed(typeArray[i],true)
				.append("text")
					.attr("fill",colorArray[i])
					.text(typeArray[i])
					.attr("y",150*i+20)
					.attr("x",20);
	d3.select(".displaySVG ."+typeArray[i]).append("line")
											.attr("x1","20")
											.attr("y1",150*i+30)
											.attr("x2",20)
											.attr("y2",150*i+140)
											.attr("stroke-width",1)
											.attr("stroke",colorArray[i]);
	d3.select(".displaySVG ."+typeArray[i]).append("line")
											.attr("x1",20)
											.attr("y1",150*i+140)
											.attr("x2",totalWidth*0.32-150)
											.attr("y2",150*i+140)
											.attr("stroke-width",1)
											.attr("stroke",colorArray[i]);
}
//occupation
var pie = d3.pie()
	.sort(null);
function torgba(d,opacity){
	return d.replace("rgb","rgba").replace(")",","+opacity+")");
}
var occupationSVG = d3.select(".occupation").append("svg")
										.attr("width",totalWidth*0.54)
										.attr("height",totalHeight-70);
var outR = totalWidth*0.54*0.35;
var innR = totalWidth*0.54*0.15;
var center = {
	x: totalWidth*0.27,
	y: totalHeight/2-35
}
if(totalWidth*0.54>totalHeight-70){
	outR = (totalHeight-70)*0.35;
	innR = (totalHeight-70)*0.15;
}
var grads = occupationSVG.append("defs").append("radialGradient")
										.attr("gradientUnits", "userSpaceOnUse")
										.attr("cx", 0)
										.attr("cy", 0)
										.attr("r", outR)
										.attr("id", "default");
grads.append("stop").attr("offset", "70%").style("stop-color", "rgba(255,255,255,0)");
grads.append("stop").attr("offset", "100%").style("stop-color", "rgba(255,255,255,0.3)");
for(var u=0;u<5;u++){
	var grads = occupationSVG.append("defs").selectAll("radialGradient").data(pie(colorArray))
																		.enter().append("radialGradient")
																				.attr("gradientUnits", "userSpaceOnUse")
																				.attr("cx", 0)
																				.attr("cy", 0)
																				.attr("r", outR)
																				.attr("id", function(d, i) { return "grad" + i + (u+1); });
	grads.append("stop").attr("offset", innR/outR).style("stop-color", function(d, i) { return torgba(colorArray[i],0); });
	grads.append("stop").attr("offset", (innR+(outR-innR)/4*u)/outR).style("stop-color", function(d, i) { return torgba(colorArray[i],0.5); });
	grads.append("stop").attr("offset", "100%").style("stop-color", function(d, i) { return colorArray[i]; });
}
occupationSVG.append("path")
			.attr("d",drawOccupation((0*Math.PI/180) , (360*Math.PI/180)))
			.attr("fill","url(#default)")
			.attr("transform","translate("+center.x+","+center.y+")");	
//clock
var clock = occupationSVG.append("g")
clock.append("circle")
	.attr("cx",center.x)
	.attr("cy",center.y)
	.attr("r",innR)
	.attr("stroke","#555555");
clock.append("circle")
	.attr("cx",center.x)
	.attr("cy",center.y)
	.attr("r",3)
	.attr("fill","#555555");
for(var i=0; i<12; i++){
	clock.append("line")
			.attr("x1",center.x+Math.sin(i*30/180*Math.PI)*innR)
			.attr("y1",center.y+Math.cos(i*30/180*Math.PI)*innR)
			.attr("x2",center.x+Math.sin(i*30/180*Math.PI)*(innR-12))
			.attr("y2",center.y+Math.cos(i*30/180*Math.PI)*(innR-12))
			.attr("stroke-width",3)
			.attr("stroke","#555555");
}
for(var i=0; i<4; i++){
	clock.append("text")
		.text(9+i*3)
		.attr("fill","#888888")
		.attr("x",center.x+Math.sin((270-i*90)/180*Math.PI)*(innR-20)-5)
		.attr("y",center.x+Math.cos((270-i*90)/180*Math.PI)*(innR-20)+5)
		.classed("info",true);
}
//ajax
xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
	if (xhttp.readyState == 4 && xhttp.status == 200){
		var data = JSON.parse(xhttp.responseText);
		var storage={};
		console.log(data);
		d3.select(".days div:nth-child("+(data.day/1+2)+")").classed("selected",true);
		//days
		for(var i=0; i<typeArray.length; i++){
			storage[typeArray[i]]={};
			storage[typeArray[i]]["nextpoint"] = 0;	
			storage[typeArray[i]]["everage"] = 0;
			for(var u=0; u<data.data.length; u++){
				if(typeArray[i] == data.data[u].kind){
					//display
					var arriveZone = data.data[u].arrive.split(":");
					var leaveZone = data.data[u].leave.split(":");
					var itmeWidth = (leaveZone[0]-arriveZone[0])*60+leaveZone[1]/1-arriveZone[1];
					d3.select(".displaySVG ."+typeArray[i]).append("rect")
															.classed(typeArray[i],true)
															.classed("tp",true)
															.attr("width",itmeWidth*0.8)
															.attr("height",18*data.data[u].state)
															.attr("fill",colorArray[i])
															.attr("x",20 + storage[typeArray[i]]["nextpoint"]*0.8)
															.attr("y",(i*150+50+(18*(5-data.data[u].state))));
					storage[typeArray[i]]["everage"] = (storage[typeArray[i]]["everage"]*storage[typeArray[i]]["nextpoint"]+data.data[u].state*itmeWidth)/(storage[typeArray[i]]["nextpoint"]+itmeWidth);
					storage[typeArray[i]]["nextpoint"]+=itmeWidth;
					//occupation
					occupationSVG.append("path")
								.attr("d",drawOccupation(((arriveZone[0]*30+arriveZone[1]/2)*Math.PI/180) , ((leaveZone[0]*30+leaveZone[1]/2)*Math.PI/180)))
								.attr("stroke","url(#grad"+i+")")
								.attr("fill","url(#grad"+i+data.data[u].state+")")
								.attr("stroke-width",0.5)
								.classed(typeArray[i],true)
								.classed("tp",true)
								.attr("transform","translate("+center.x+","+center.y+")");
				}
			}
			d3.select(".displaySVG ."+typeArray[i]).append("text")
													.attr("fill",colorArray[i])
													.text("average efficient: "+ storage[typeArray[i]]["everage"])
													.attr("y",150*i+40)
													.attr("x",25)
													.classed("info",true)
													.classed("tp",true);
			d3.select(".displaySVG ."+typeArray[i]).append("text")
													.attr("fill",colorArray[i])
													.text("total time: " + storage[typeArray[i]]["nextpoint"])
													.attr("y",150*i+140)
													.attr("x",storage[typeArray[i]]["nextpoint"]*0.8+25)
													.classed("info",true)
													.classed("tp",true);
		}
		//hover tp
		d3.selectAll(".tp").on("mouseover", function(){
			var tpArray = d3.select(this).attr("class").split(" ");
			for(var u=0; u<tpArray.length; u++){
				for(var i=0; i<typeArray.length; i++){
					if(typeArray[i] == tpArray[u]){
						d3.selectAll(".tp").style("opacity","0.5");
						d3.selectAll("."+tpArray[u]).style("opacity","1");
						break;
					}
				}
			}
		})
		d3.selectAll(".tp").on("mouseout", function(){
			d3.selectAll(".tp").style("opacity","1");
		})
	}else{
		console.log("other request");
	}
};
function drawOccupation(start,end){
	var ringBannerCcwArc = d3.arc()
							.innerRadius(innR)
							.outerRadius(outR)
							.startAngle(start)
							.endAngle(end);
	return ringBannerCcwArc;
}
//load
var first = Math.floor(Math.random()*30+1);
xhttp.open("POST", "http://jimmyoungyi.com/d3/data.php", true);
xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xhttp.send("startday="+first+"&endday="+first);
//event
d3.selectAll(".days div").on("click",function(){
	var index = d3.select(this).text()/1;
	d3.selectAll(".selected").classed("selected",false);
	d3.selectAll(".tp").remove();
	xhttp.open("POST", "http://jimmyoungyi.com/d3/data.php", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send("startday="+index+"&endday="+index);
})