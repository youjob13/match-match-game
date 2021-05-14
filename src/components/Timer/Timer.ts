import './timer.scss';

import timerValidator from '../functions/timerValidator';
import BaseControl from '../BaseControl/BaseControl';

const START_TIMER_VALUE = '00:00';

class Timer extends BaseControl {
  counter: number;

  output: BaseControl;

  timerId: number | null;

  isStarted: boolean;

  constructor(props: { tagName: string; classes: string[] }) {
    super(props);
    this.output = new BaseControl({
      tagName: 'output',
      classes: ['timer__output'],
    });
    this.node.append(this.output.node);
    this.counter = 0;
    this.timerId = null;
    this.isStarted = false;
    this.init();
  }

  init(): void {
    this.render(START_TIMER_VALUE);
    // this.start();
    // document.addEventListener('click', (e: any) => {
    //   if (e.target.classList.contains('timer')) {
    //     if (!this.isStarted) {
    //       this.isStarted = true;
    //       this.start();
    //     }
    //   } else
    //   this.stop();
    // })
  }

  start(): void {
    this.timerId = window.setTimeout(() => {
      ++this.counter;
      const time = timerValidator(this.counter);
      this.render(time);
      console.log(this.counter);

      this.start();
    }, 1000);
  }

  stop(): void {
    window.clearTimeout(this.timerId || undefined);
    this.counter = 0;
    this.render(START_TIMER_VALUE);
    this.isStarted = false;
  }

  private render(time: string): void {
    this.output.node.textContent = `${time}`;
  }
}

export default Timer;
