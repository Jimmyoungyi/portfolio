import {Component, Directive, HostListener, EventEmitter, ElementRef, OnInit} from '@angular/core';
import {map, merge} from 'rxjs/Rx';

@Directive({
	selector: '[draggable]'
})
export class Draggable implements OnInit {
	mouseup = new EventEmitter();
	mousedown = new EventEmitter();
	mousemove = new EventEmitter();
	mouseout = new EventEmitter();
	sizeChange = -1;
	sizeOnChange = false;
	sizePosition = "";
	@HostListener('mouseup', ['$event'])
	onMouseup(event) {
		this.mouseup.emit(event);
		this.sizeChange = -1
	}
	@HostListener('mousedown', ['$event'])
	onMousedown(event) {
		let elementTop = this.element.nativeElement.getBoundingClientRect().top;
		let elementLeft = this.element.nativeElement.getBoundingClientRect().left;
		let elementHeight = this.element.nativeElement.style.height.replace("px","")/1;
		let elementWidth = this.element.nativeElement.style.width.replace("px","")/1;
		this.mousedown.emit(event);
		if(event.clientY - elementTop < 20){
			this.sizePosition = "top";
		}else if( elementTop + elementHeight - event.clientY < 20){
			this.sizePosition = "bottom";
		}else if( event.clientX - elementLeft < 20){
			this.sizePosition = "left";
		}else if( elementLeft + elementWidth - event.clientX < 20){
			this.sizePosition = "right";
		}else{
			this.sizePosition = "";
		}
		if(this.sizePosition==""){
			this.sizeOnChange = false;
		}else{
			this.sizeOnChange = true;
		}
		return false; // Call preventDefault() on the event
	}
	@HostListener('mousemove', ['$event'])
	onMousemove(event) {
		this.mousemove.emit(event);
	}
	@HostListener('mouseout', ['$event'])
	onMouseout(event) {
		this.mouseout.emit(event);
		return false; // Call preventDefault() on the event
	}
	constructor(public element: ElementRef) {
		this.element.nativeElement.style.position = 'absolute';
		this.element.nativeElement.style.height = "150px";
		this.element.nativeElement.style.width = "150px";
		map;
		merge;
		this.mousedrag = this.mousedown.map(event => {
			return {
				top: event.clientY- this.element.nativeElement.offsetTop ,
				left: event.clientX - this.element.nativeElement.offsetLeft
			};
		})
		.flatMap(
			imageOffset => this.mousemove.merge(this.mouseout).map(pos => ({
				top: pos.clientY - imageOffset.top,
				left: pos.clientX - imageOffset.left
			}))
			.takeUntil(this.mouseup)
		);
	}
	ngOnInit() {
		this.mousedrag.subscribe({
			next: pos => {
				let top = this.element.nativeElement.style.top.replace("px","")/1;
				let left = this.element.nativeElement.style.left.replace("px","")/1;
				let width = this.element.nativeElement.style.width.replace("px","")/1;
				let height = this.element.nativeElement.style.height.replace("px","")/1;
				if(!this.sizeOnChange){
					this.element.nativeElement.style.top = pos.top + 'px';
					this.element.nativeElement.style.left = pos.left + 'px';
				}else{
					if(this.sizeChange == -1){
						if(this.sizePosition == "bottom" || this.sizePosition == "top"){
							this.sizeChange = pos.top - top;
						}else if(this.sizePosition == "right" || this.sizePosition == "left"){
							this.sizeChange = pos.left - left;
						}
					}else{
						if(this.sizePosition == "bottom"){
							this.element.nativeElement.style.width = width + pos.top - top - this.sizeChange + 'px';
							this.element.nativeElement.style.height = height + pos.top - top - this.sizeChange + 'px';
							this.sizeChange = pos.top - top;
						}else if(this.sizePosition == "right"){
							this.element.nativeElement.style.width = width + pos.left - left - this.sizeChange + 'px';
							this.element.nativeElement.style.height = height + pos.left - left - this.sizeChange + 'px';
							this.sizeChange = pos.left - left;
						}else if(this.sizePosition == "top"){
							this.element.nativeElement.style.top = pos.top + 'px';
							this.element.nativeElement.style.left = left + this.sizeChange + 'px';
							this.element.nativeElement.style.height = height - this.sizeChange + 'px';
							this.element.nativeElement.style.width = width - this.sizeChange + 'px';
							this.sizeChange = pos.top - top;
						}else if(this.sizePosition == "left"){
							this.element.nativeElement.style.top = top + this.sizeChange + 'px';
							this.element.nativeElement.style.left = pos.left + 'px';
							this.element.nativeElement.style.height = height - this.sizeChange + 'px';
							this.element.nativeElement.style.width = width - this.sizeChange + 'px';
							this.sizeChange = pos.left - left;
						}
					}
				}
			}
		});
	}
}
