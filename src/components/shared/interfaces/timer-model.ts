export interface ITimer {
  start: () => void;
  clearTimer: () => void;
  stop: () => void;
  getFinishTime: () => number;
  startCountdown: (startTime: number) => void;
}
