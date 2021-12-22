export const pad = (number, length) => {
  let str = "" + number;
  while (str.length < length) {
    str = "0" + str;
  }
  return str;
};

export const formatMs = (ms) => {
  const minutes = Math.floor(ms / 1000 / 60);
  ms = ms - minutes * 1000 * 60;
  const seconds = Math.floor(ms / 1000);
  ms = ms - seconds * 1000;
  const milliseconds = ms.toString().substr(0, 2);
  return [minutes, seconds, milliseconds];
};

export const formatStopwatchTime = (time) => {
  return `${pad(time[0], 2)}:${pad(time[1], 2)}.${pad(time[2], 2)}`;
};
export const formatLaps = (lap, prevLap = 0) => {
  const msDiff = lap - prevLap;
  const formatedDiff = formatMs(msDiff);
  const formatedLap = formatMs(lap);

  const diff = `${pad(formatedDiff[0], 2)}:${pad(formatedDiff[1], 2)}.${pad(
    formatedLap[2],
    2
  )}`;
  const total = `${pad(formatedLap[0], 2)}:${pad(formatedLap[1], 2)}.${pad(
    formatedLap[2],
    2
  )}`;
  return { diff, total };
};

export const formatTimer = (time) => {
  // console.log(time);
  const hours = time.substr(0, 2);
  const minutes = time.substr(2, 2);
  const seconds = time.substr(4, 2);
  return `${pad(hours, 2)} ${pad(minutes, 2)}' ${pad(seconds, 2)}"`;
};

export const correctTimer = (time) => {
  let [hours, minutes, seconds] = time.match(/.{1,2}/g).map((i) => parseInt(i));
  if (seconds > 60) {
    seconds -= 60;
    minutes++;
  }
  if (minutes > 60) {
    minutes -= 60;
    hours++;
  }
  if (hours > 99) {
    hours = 99;
  }
  const joined = `${pad(hours, 2)}${pad(minutes, 2)}${pad(seconds, 2)}`;
  return joined;
};

export const decreaseSec = (time) => {
  let [hours, minutes, seconds] = time.current.match(/.{1,2}/g);

  if (seconds - 1 >= 0) {
    seconds--;
  } else if (minutes - 1 >= 0) {
    minutes--;
    seconds = 59;
  } else {
    hours--;
    minutes = 59;
    seconds = 59;
  }
  seconds = pad(seconds, 2);
  minutes = pad(minutes, 2);
  hours = pad(hours, 2);
  return `${hours}${minutes}${seconds}`;
};
