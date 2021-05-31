const timerValidator = (time: number): string => {
  console.log(time);

  const sec = time % 60;
  const min = Math.floor(time / 60);
  return `${min < 10 ? `0${min}` : min}:${sec < 10 ? `0${sec}` : sec}`;
};

export default timerValidator;
