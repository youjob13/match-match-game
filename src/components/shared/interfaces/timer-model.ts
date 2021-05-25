export interface ITimer {
  start: () => void;
  clearTimer: () => void;
  stop: () => void;
  getFinishTime: () => number;
}
