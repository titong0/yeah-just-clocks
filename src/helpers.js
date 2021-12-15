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
  const hours = time.substr(0, 2);
  const minutes = time.substr(2, 2);
  const seconds = time.substr(4, 2);
  return `${pad(hours, 2)} ${pad(minutes, 2)}' ${pad(seconds, 2)}"`;
};
