import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appScrollTop]',
  exportAs: 'appScrollTop'
})
export class ScrollTopDirective {

  hideBtn: boolean = true;
  top: number;
  offSetHeight:number;
  scrollHeight:number;

  constructor(private eleRef: ElementRef) { }

  @HostListener('scroll') onScrollEvent(event: Event) {
    this.top = this.eleRef.nativeElement.scrollTop;
    this.offSetHeight = this.eleRef.nativeElement.offsetHeight;
    this.scrollHeight = this.eleRef.nativeElement.scrollHeight;
    if(this.top === 0){
      this.hideBtn = true;
    }
    if(this.top > this.scrollHeight - this.offSetHeight - 1){
      this.hideBtn = false;
    }
  }

}
