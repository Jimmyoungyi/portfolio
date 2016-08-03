var data=[
	{
		"title":"Hello World"
	},
	{
		"title":"Life Timer",
		"description":"Life Timer is an app that can help users understand how they spend time on one thing. It helps users know themselves better and improve their efficiency.",
		"plantform":"IOS",
		"tech":"XCode, Swift",
		"link":"https://github.com/Jimmyoungyi/portfolio/tree/project-monkeyhiking-original/Project/LifeTimer",
		"github":"https://github.com/Jimmyoungyi/portfolio/tree/project-monkeyhiking-original/Project/LifeTimer",
		"imgLink":"img/Project_Lifetime_List.png",
		"detailpage":[
			{
				"type":"summary",
				"background":"There are a lot of time management apps. However, people should know how they spend their time first. Then start to manage their time.",
				"goal":"Build an IOS app to help users know how they use their time.",
				"solution":"First, users need to split one thing to small parts and create a list with sections of those parts. Then, when users work on that thing, they start the timer and select the parts they are working on. At last, When users finish the job, they can go to statistic page view the analyzation graphic. ",
				"imgLink":"img/Project_Lifetime_detail_summary.png"
			},
			{
				"type":"description",
				"subtitle":"technic",
				"list":[
					"Using Core Data store information",
					"Using drawRect function draw data statistic graphic",
					"Using Navigation Controller and Tab Bar Controller build navigation system",
					"Using multiple views, delegates and open source build layout "
				],
				"imgLink":"img/Project_Lifetime_detail_tech.png"
			},
			{
				"type":"video",
				"videoLink":"https://player.vimeo.com/video/172488582?title=0&byline=0&portrait=0"
			},
			{
				"type":"sitemap",
				"system":{
					"Loading page":["When users click the icon from the desktop, open the loading page load the app.",{
						"List page":["When users first time open this app, they will go to this page. This page shows the current list users created. From this page, users can delete exist items from the list or go to add item page.",{
							"Adding item page":["This is adding item page. In this page, users can add a section and/or an item to the list."]
						}],
						"Timer page":["After users created a list, they go to this page.  Start the timer when they are working on the things on the list. When users start to do another thing on the list, select the new item in the list without stop the timer.  Until everything is done."],
						"Statistic page":["After users stop the timer, they go to this page to view the result. The statistic will create a pie chart basic on the percentage of how long each thing cost. Users can know themselves betters by view this statistic."],
						"About me page":["This page has not been developed yet. In this page, users can view their personal profile and the timer history."]
					}]
				}
			},
			{
				"type":"taskflow",
				"taskname":"1.1 Create List",
				"description":"First, users need to split one thing they are going to do to small parts. Then create a list with sections follow those parts. This list can be edited during timer running.",
				"imgType":"borderimg highimg ",
				"imgLink":"img/Project_Lifetime_detail_task1.gif"
			},
			{
				"type":"taskflow",
				"taskname":"1.2 Start Timer",
				"description":"Start the timer. When you working on different part of the thing, switch to that selection without reset the timer.",
				"imgType":"borderimg highimg ",
				"imgLink":"img/Project_Lifetime_detail_task2.gif"
			},
			{
				"type":"taskflow",
				"taskname":"1.3 View Statistic",
				"description":"View the results of data statistic.",
				"imgType":"borderimg highimg ",
				"imgLink":"img/Project_Lifetime_detail_task3.png"
			}
		]
	},
	{
		"title":"Dungeness Point",
		"description":"This is the Dungeness Crab point tracking app. Users can use this app report or find the newest information about Dungeness Crab point in San Francisco.",
		//"This is anduggness track app. Users can upload where they find dungeness and share with other users.",
		"plantform":"Local app packaged by PhoneGap",
		"tech":"HTML, CSS, Google Map API, jQuery mobile, php, MySQL, PhoneGap",
		"link":"http://jimmyoungyi.com/aau/wnm617/phonegapG/www/index.html",
		"github":"https://github.com/Jimmyoungyi/portfolio/tree/project-DungenessPoint-original/Project/DungenessPoint",
		"imgLink":"img/temp.png",
		"detailpage":[
			{
				"type":"summary",
				"background":"During November to Jun, people living around San Francisco can catch crabs by themselves. Dungeness Crab are one of the popular crab. There are a lot of points people can catch Dungeness Crab, but there is not a system can analyze those points.",
				"goal":"Let users can find good Dungeness Crab point easier and show other people their achievement.",
				"solution":"Build a Dungeness Crab point database. Get the basic data from the Internet. Then users can upload their own experiment to upload the database. Other users can view all those data and find which point they prefer to go.",
				"imgLink":"img/temp.png"
			},
			{
				"type":"description",
				"subtitle":"technic",
				"list":[
					"Using MySQL build database",
					"Using PHP call and upload database",
					"Using jQuery mobile build front-end",
					"Using aJax call php file to connect front-end and database",
					"Using Google Map API build map system",
					"Using PhongGap package website to local app"
				],
				"imgLink":"img/temp.png"
			},
			{
				"type":"video",
				"videoLink":"https://player.vimeo.com/video/172488582?title=0&byline=0&portrait=0"
			},
			{
				"type":"sitemap",
				"system":{
					"loading page":["loading page",{
						"list page":["show list",{
							"list detail page":["show detail for each list item"]
						}],
						"history page":["show your catch crab history",{
							"history detail page":["show detail for each history"]
						}],
						"record page":["record one catch experience",{
							"locate page":["it's a map shows where your catch the crab"]
						}]
					}]
				}
			},
			{
				"type":"taskflow",
				"taskname":"1.3 View Statistic",
				"description":"View the results of data statistic.",
				"imgType":"borderimg highimg ",
				"imgLink":"img/Project_Lifetime_detail_task3.png"
			}
		]
	},
	{
		"title":"Enina Word",
		"description":"Using Chinese symbols look like English letters create new shapes look like Chinese word",
		"plantform":"Single page website",
		"tech":"HTML, CSS, JavaScript, jQuery",
		"link":"http://jimmyoungyi.com/601/Yang_Jianyi_601final/button/",
		"github":"https://github.com/Jimmyoungyi/portfolio/tree/project-enina-original/Project/Enina",
		"imgLink":"img/Project_Enina_List.png",
		"detailpage":[
			{
				"type":"summary",
				"background":"Many Americans like Chinese word, because they feel the structure is beautiful. they don't really understand the meaning of those words and most of them don't care about the meanings.",
				"goal":"Users don't limit by the existing Chinese word. They can create their own Chinese symbol and enjoy the structure.",
				"solution":"Users input some English letters. then the system will suggest some Chinese element looks like those letters. Then users select, move, and scale those elements and finally create a symbol looks like Chinese word.",
				"imgLink":"img/Project_Enina_List.png"
			},
			{
				"type":"description",
				"subtitle":"technic",
				"list":[
					"Using HTML, Css, jQuery build simple page",
					"This site is build two years ago. I like this idea, so I will rebuild it recently."
				],
				"imgLink":"img/Project_Enina_List.png"
			},
			{
				"type":"video",
				"videoLink":"https://player.vimeo.com/video/172488582?title=0&byline=0&portrait=0"
			},
			{
				"type":"taskflow",
				"taskname":"1.3 View Statistic",
				"description":"View the results of data statistic.",
				"imgType":"borderimg highimg ",
				"imgLink":"img/Project_Lifetime_detail_task3.png"
			}
		]
	},
	{
		"title":"Monkey Hiking",
		"description":"Monkey Hiking is an app helps users find hiking groups and track their hiking routine.",
		"plantform":"Mobile App simulator",
		"tech":"Flash, ActionScript 3",
		"link":"http://jimmyoungyi.com/606final/index.html",
		"github":"https://github.com/Jimmyoungyi/GDS_RW_07_mid_markCrossStreet",
		"imgLink":"img/Project_MonkeyHiking_List.png",
		"detailpage":[
			{
				"type":"summary",
				"background":"There are a lot of people like hiking. However, hiking has a lot of levels. From the easiest work in the park for few hours, to cross the mountain for few days. It's important to find a level suitable for the users.",
				"goal":"Help people post and find the suitable hiking group. Record routine during their hiking.",
				"solution":"Create a platform that let Authenticated users can post their plan. Other users can review those post and decide which one to apply. During hiking, the app can record personal routine and show other partners location.",
				"imgLink":"img/Project_MonkeyHiking_List.png"
			},
			{
				"type":"description",
				"subtitle":"technic",
				"list":[
					"Using sprite package each screens\' animation.",
					"Using frames store each sprite.",
					"Using ActionScript build interactive, trigger animation.",
					"Using HTML display the page."
				],
				"imgLink":"img/Project_MonkeyHiking_List.png"
			},
			{
				"type":"video",
				"videoLink":"https://player.vimeo.com/video/172488582?title=0&byline=0&portrait=0"
			},
			{
				"type":"sitemap",
				"system":{
					"login page":["login or regisit",{
						"Home":["show suggest trips for user",{
							"home detail page":["show detail for selected options. User can also apply the trip here"]
						}],
						"search":["user can search by name or filters",{
							"search item detail page":["show detail for selected options. User can also apply the trip here"]
						}],
						"recording":["record the trip, can also help locate the group members.",{
							"statistic page":["show the analyze data for this routine"]
						}],
						"my plan":["If you have applied a trip and be accepted, this page show the detail for that trip."],
						"about me":["Show the basic information about the user and the list of groups that user attendance",{
							"group detail page":["show the details about the group."]
						}],
						"contact":["show the user's contact people."]
					}]
				}
			},
			{
				"type":"taskflow",
				"taskname":"1.3 View Statistic",
				"description":"View the results of data statistic.",
				"imgType":"borderimg highimg ",
				"imgLink":"img/Project_Lifetime_detail_task3.png"
			}
		]
	},
	{
		"title":"Contact"
	}
]
// name----single page web----app----now working----trip----infography----durpal----contect