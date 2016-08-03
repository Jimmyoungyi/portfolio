import { Component, Input， Output, EventEmitter } from '@angular/core'; 
import { Draggable } from './drag.directive';

@Component({
	selector: "occupation",
	template: `
		<section class="occupation" *ngIf="contentArray[0]" >
			<div class="display">
				<div class="selected-container" 
					*ngFor="let select of selectedArray; let i = index" 
					[ngClass]="{active: active[0]==i}"
					draggable>

					<div class="selected-element" 
					*ngIf=select 
					[style.backgroundImage]="select[1]"
					(click)="changeActive(i)">
					
						<div class="move-trigger"></div>
					</div>
				</div>
			</div>
			<div class="options">
				<ul>
					<li class="letter title-text" *ngFor="let letter of contentArray; let i = index">
						{{letter}}:
						<br>
						<ul>
							<li class="element" *ngFor="let index of [1,2,3]">
								<img src="elements/{{letter}}{{index}}.svg" alt="" 
									[ngClass]="{selected: (selectedArray[i][0] == index),
												activity: (active[0] == i && active[1] == index)}" 
									(click)="selectImage(i,letter,index)"/>
							</li>
						</ul>
					</li>
				</ul>
				<div class="restart title-text" (click)="restart()">Restart</div>
			</div>
		</section>
	`,
	styles:[`
		.occupation{
			overflow: hidden;
			width: 80%;
			margin-left: 10%;
			margin-top: 10vh;
		}
		.occupation .display{
			width: 450px;
			height: 450px;
			float: left;
			background-image: url('img/wordform.png');
			background-size: cover;
			position: relative;
		}
		.occupation .display .selected-container{
			background-size: contain;
			position: absolute;
			left: 12.5vw;
			top: 12.5vw;
			z-index: 5;
		}
		.occupation .display .selected-container.active{
			z-index: 10;
		}
		.occupation .display .selected-element{
			background-image: url(elements/a1.svg);
			border: 2px solid transparent;
			height: 100%;
			width: 100%;
			background-repeat: no-repeat;
			background-position: center;
			cursor: nesw-resize;
		}
		.occupation .display .selected-element:hover{
			border: 2px solid lightgray;
		}
		.occupation .display .selected-element .move-trigger{
			width: calc( 100% - 40px );
			height: calc( 100% - 40px);
			margin-top: 20px;
			margin-left: 20px;
			background-color: #eee;
			opacity: 0;
			cursor: all-scroll;
		}
		.occupation .options{
			width: calc(100% - 450px);
			float: left;
		}
		.occupation .options ul{
			overflow: hidden;
			padding: 0;
		}
		.occupation .options .letter{
			text-transform: uppercase;
			padding-left: 10%;
			list-style: none;
		}
		.occupation .options .element{
			width: 33.3333%;
			float: left;
			list-style: none;
			padding: 10px;
		} 
		.occupation .options .element img{
			border: 2px solid transparent;
			width: 100%;
		} 
		.occupation .options .element img.selected{
			border: 2px solid gray;
		} 
		.occupation .options .element img.activity{
			border: 2px solid green;
		} 
		.occupation .options .restart{
			text-decoration: underline;
			cursor: pointer;
			text-align: center;
		}
	`],
	directives:[Draggable]
})
export class OccupationComponent{
	@Input() contentArray;
	@Output() onCleanContentArray = new EventEmitter<string[]>();
	selectedArray=[];
	active=[];
	url="url('elements/a1.svg')";
	ngOnChanges(){
		for(var item in this.contentArray){
			this.selectedArray.push(false);
		}
	}
	restart(){
		this.onCleanContentArray.emit([]);
		this.selectedArray = [];
		this.active = [];
	}
	selectImage(i,letter,index){
		if(this.selectedArray[i][0] != index && this.selectedArray[i][1] != "url('elements/" + letter + index + ".svg')"){
			this.selectedArray[i] = [index,"url('elements/" + letter + index + ".svg')"];
		}
		this.active=[i,index];
	}
	changeActive(index){
		this.active=[index,this.selectedArray[index][0]];
	}

}