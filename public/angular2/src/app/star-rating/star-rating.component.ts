import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})
export class StarRatingComponent implements OnInit {

  stars:boolean[] = []
  @Input() value:number = 1;
  @Input() readonly:boolean = false
  @Output() valueChange: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
    this.updateStars(this.value)
  }

  private updateStars(stars):void {
    this.value = stars
    this.valueChange.emit(stars)
    this.stars = []
    for(var val=1; val<=5; val++) {
      this.stars.push(val<=this.value)
    }
  }

  toggle(index):void {
    if(!this.readonly) {
      this.updateStars(index+1)
    }
  }

  starClass(star:boolean):string {
    return star ? "fa fa-star" : "fa fa-star-o";
  }

}
