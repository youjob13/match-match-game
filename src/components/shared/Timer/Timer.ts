import './timer.scss';
import timerValidator from '../../functions/timerValidator';
import BaseControl from '../BaseControl/BaseControl';
import { IPropsToBaseControl } from '../interfaces/api';

const START_TIMER_VALUE = '00:00';

class Timer extends BaseControl<HTMLElement> {
  private counter: number;

  private output: BaseControl<HTMLElement>;

  private timerId: number | null;

  constructor(propsToBaseControl: IPropsToBaseControl) {
    super(propsToBaseControl);
    this.output = new BaseControl<HTMLElement>({
      tagName: 'output',
      classes: ['timer__output'],
    });
    this.counter = 0;
    this.timerId = null;
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

  getFinishTime(): number {
    return this.counter;
  }

  stop(): void {
    window.clearTimeout(this.timerId || undefined);
  }

  private render(time: string): void {
    this.output.node.textContent = `${time}`;
    this.node.append(this.output.node);
  }
}

export default Timer;
