import {Component, Input, OnDestroy, SimpleChanges} from '@angular/core';
import {Events} from "ionic-angular";

@Component({
  selector: 'dot',
  templateUrl: 'dot.html'
})
export class Dot implements OnDestroy {
  @Input() left: number;
  @Input() top: number;
  @Input() dotWidth: number;
  @Input() type: number;
  @Input() isMonkey: Boolean = false;
  @Input() direction: number;

  @Input() row: number;
  @Input() column: number;

  imageSrc: String;
  dotClass: String;

  timer: number;

  constructor(public events: Events) {
  }

  handleTouchDot() {
    console.log(this.type);
    this.events.publish('dot:touched', this.type, this.row, this.column);
  }
  ngOnChanges(simpleChanges: SimpleChanges) {
    this.dotClass = 'dot';

    if( this.isMonkey ) {
      this.imageSrc = 'assets/images/monkeyface@3x.png';
      this.dotClass += ' monkey';

      if( !simpleChanges.isMonkey && (simpleChanges.row || simpleChanges.column || simpleChanges.direction) ) {
        this.timer = setTimeout(() => {
          this.events.publish('command:handled');

          this.timer = null;
        }, 1000);
      }
    }

    if( this.type > 2 ) {
      this.imageSrc = 'assets/images/'+(this.type === 3 ? 'apple@3x.png':'ghost-1@3x.png');
    }

    if( this.type < 3 && !this.isMonkey ) {
      this.dotClass += (this.type < 1 ? ' empty' : ' filled');
    }
  }

  ngOnDestroy() {
    if( this.timer ) {
      clearTimeout(this.timer);
    }

    if( this.isMonkey ) {
      console.log('I should die.');
    }
  }
}
