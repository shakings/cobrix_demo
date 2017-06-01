import {Component, Input, SimpleChanges} from '@angular/core';

@Component({
  selector: 'direction',
  templateUrl: 'direction.html'
})
export class Direction {
  @Input() left: number;
  @Input() top: number;
  @Input() dotWidth: number;
  @Input() direction: number;

  margin = 20;
  dirWidth = 0;

  dirImageWidth = 0;
  dirImageHeight = 0;

  constructor() {

  }

  ngOnChanges(changes: SimpleChanges) {
    if( changes.dotWidth ) {
      this.dirWidth = this.dotWidth + this.margin*2;

      this.dirImageWidth = this.margin-6;
      this.dirImageHeight = this.dirImageWidth/13*22;
    }
  }
}
