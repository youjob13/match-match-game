import './timer.scss';
import timerValidator from '../../functions/timerValidator';
import BaseControl from '../BaseControl/BaseControl';

const START_TIMER_VALUE = '00:00';

class Timer extends BaseControl {
  counter: number;

  output: BaseControl;

  timerId: number | null;

  isStarted: boolean;

  constructor(propsToBaseControl: { tagName: string; classes: string[] }) {
    super(propsToBaseControl);
    this.output = new BaseControl({
      tagName: 'output',
      classes: ['timer__output'],
    });
    this.counter = 0;
    this.timerId = null;
    this.isStarted = false;
    this.render(START_TIMER_VALUE);
  }

  start(): void {
    this.timerId = window.setTimeout(() => {
      ++this.counter;
      const time = timerValidator(this.counter);
      this.render(time);
      this.start();
    }, 1000);
  }

  clearTimer(): void {
    this.counter = 0;
    this.render(START_TIMER_VALUE);
  }

  stop(): void {
    window.clearTimeout(this.timerId || undefined);
    this.isStarted = false;
  }

  private render(time: string): void {
    this.output.node.textContent = `${time}`;
    this.node.append(this.output.node);
  }
}

export default Timer;
