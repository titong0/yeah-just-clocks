import { formatTimer } from "../helpers";

const NumPad = (props) => {

  const addNum = (num) => {
    let str = props.time;
    if (str[0] !== "0") return alert("nao nao");
    str += num;
    str = str.slice(num.length);
    props.setTime(str);
  };
  const delNum = () => {
    let str = props.time;

    str = "0" + str;
    str = str.slice(0, str.length - 1);
    props.setTime(str);
  };

  return (
    <>
      {Array(10)
        .fill()
        .map((i, idx) => {
          return (
            <button
              className="num"
              onClick={() => addNum(idx.toString())}
              key={idx}
            >
              {idx}
            </button>
          );
        })}
      <button className="num" onClick={() => addNum("00")}>
        00
      </button>
      <button className="danger" onClick={delNum}>
        D
      </button>
      <div></div>
      {props.time !== "000000" ? (
        <button className="start" onClick={props.start}>
          S
        </button>
      ) : null}
    </>
  );
};

export default NumPad;
