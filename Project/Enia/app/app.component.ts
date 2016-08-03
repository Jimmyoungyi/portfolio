import { Component } from '@angular/core';
import { OccupationComponent } from './occupation.component';
import { DisplayComponent }from './display.component'
@Component({
	selector: 'my-app',
	template: `
		<header>Create Your <br>Own Chinese Symbol</header>
		<display [contentArray]="content" 
			(onChangeContentArray)="onChangeContentArray($event)"></display>
		<occupation [contentArray]="content"
			(onCleanContentArray)="onCleanContentArray($event)"></occupation>
	`,
	styles:[`
		header{
			height: 20vh;
			background-image: url("img/header.png");
			color: white;
			background-size: cover;
			padding-left: 5vw;
			padding-top: calc(10vh - 46px);
			font-size: 40px;
			line-height: 46px;
			min-height: 92px;
		}
	`],
	directives: [OccupationComponent,DisplayComponent]
})
export class AppComponent {
	content = [];
	onChangeContentArray(newContent:string[]){
		this.content = newContent;
	}
	onCleanContentArray(newContent:string[]){
		this.content = newContent;
	}
}