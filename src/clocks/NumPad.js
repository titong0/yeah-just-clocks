import { useEffect, useState } from "react";
import { FiDelete, FiPlay } from "react-icons/fi";

const NumPad = (props) => {
  const [highlighted, setHighlighted] = useState();

  const delNum = () => {
    let str = props.time;
    str = "0" + str;
    str = str.slice(0, str.length - 1);
    props.setTime(str);
  };

  const addNum = (num) => {
    let str = props.time;
    // if timer is already "full"
    if (str[0] !== "0") return;
    str += num;
    str = str.slice(num.length);
    props.setTime(str);
    setHighlighted(parseInt(num));
    setTimeout(() => setHighlighted(-1), 200);
  };

  useEffect(() => {
    const handleDigitPress = (event) => {
      if (event.composedPath().find((i) => i.nodeName === "BUTTON")) return;

      if (event.code.startsWith("Digit")) {
        addNum(event.code.substr(5, 1));
      }
      if (event.code === "Backspace") {
        delNum();
      }
      if (event.code === "Enter") {
        if (props.time !== "000000") {
          props.start();
        }
      }
    };
    document.addEventListener("keydown", handleDigitPress);
    return () => {
      document.removeEventListener("keydown", handleDigitPress);
    };
  });
  return (
    <>
      {Array(10)
        .fill()
        .map((i, idx) => {
          return (
            <button
              className={`num ${idx === highlighted ? "hover" : ""}`}
              onClick={() => addNum(idx.toString())}
              key={idx}
              tabIndex="-1"
            >
              {idx}
            </button>
          );
        })}
      <button className="num" onClick={() => addNum("00")} tabIndex="-1">
        00
      </button>
      <button className="danger" onClick={delNum} tabIndex="-1">
        <FiDelete />
      </button>
      <div></div>
      {props.time !== "000000" ? (
        <button className="start" onClick={props.start} tabIndex="-1">
          <FiPlay />
        </button>
      ) : null}
    </>
  );
};

export default NumPad;
