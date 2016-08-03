import { Component, Input, Output, EventEmitter } from "@angular/core";
@Component({
	selector:"display",
	template:`
		<section class="description" *ngIf="!contentArray[0]">
			<div class="background"></div>
			<span class="title-text">How it work</span>
			<ul>
				<li>
					<img src="img/sa.png" alt="" />
					<span class="content-text">Enter a word less than 10 letters.</span>
				</li>
				<li>
					<img src="img/sb.png" alt="" />
					<span class="content-text">Select symbol for each letters.</span>
				</li>
				<li>
					<img src="img/sc.png" alt="" />
					<span class="content-text">Congradulations, you made it.</span>
				</li>
			</ul>
			<span class="title-text start" (click)="startEnter()">Try it now</span>
			<div class="content-box" *ngIf="enter">
				<div class="background"></div>
				<div class="content">
					<div class="content-text">
						Please enter a world.
						<br>
						(letters only, no space or punctuation.)
					</div>
					<label for="content-input">word: </label>
					<input id="content-input" [(ngModel)]="content" placeholder="enter a world">
					<br>
					<span class="submit" (click)="createContent()">Submit</span>
				</div>
			</div>
		</section>
	`,
	styles: [`
		.description{
			text-align: center;
			width: 80%;
			overflow: hidden;
			margin-left: 10%;
			margin-top: 5vh;
			padding: 20px;
			background-color: rgba(255,255,255,0.6);
		}
		.description ul{
			padding: 0px;
			overflow: hidden;
			margin: 0;
		}
		.description li{
			list-style: none;
			float: left;
			width: 33.3333%;
			padding: 20px;
		}
		.description li img{
			width: 100%;
			margin-bottom: 10px;
		}
		.description .start{
			text-decoration: underline;
			cursor: pointer;
		}
		.description .content-box{
			position: fixed;
			width: 100vw;
			height: 100vh;
			top: 0;
			left: 0;
			color: #444;
			background-color: rgba(0,0,0,0.6);
		}
		.description .content-box .content{
			width: 500px;
			height: 150px;
			margin-left: calc(50vw - 250px);
			margin-top: calc(45vh - 75px);
			background-color: white;
			padding: 20px;
		}
		.description .content-box .content input{
			margin: 20px 0;
		}
		.description .content-box .content .submit{
			text-decoration: underline;
			cursor: pointer;
		}
	`]
})
export class DisplayComponent{
	@Input() contentArray;
	@Output() onChangeContentArray = new EventEmitter<string[]>();


	enter = false;
	content = "";
	startEnter(){
		this.enter = true;
	};
	createContent(){
		if(/^[a-z]+$/i.test(this.content)){
			this.enter = false;
			this.contentArray = this.content.toLowerCase().split("");
			this.content = "";
			this.onChangeContentArray.emit(this.contentArray);
		}else{
			alert("word is not available");
		}
	}
}