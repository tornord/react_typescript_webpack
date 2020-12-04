import React, { useState, useEffect, Fragment } from "react";
import ReactDOM from "react-dom";
import { Animate, NodeGroup } from "react-move";
import * as d3 from "d3";

// These lines of code are explained here:
// https://dev.to/tornord/how-to-create-animated-svg-using-react-296l

var colors = ["#236997", "#52aaeb", "#a75e07", "#f4a22d", "#f95b3a"];

var delay = 1000;
var linearTiming = { duration: delay, ease: d3.easeLinear };
var tickTiming = { duration: 800, ease: d3.easeElasticOut.amplitude(1.5).period(1.5) };

function useTick(delay: number, initialIndex: number) {
  const [tick, setTick] = useState(initialIndex ? initialIndex : 0);
  useEffect(() => {
    const interval = setInterval(() => {
      if (!document.hidden) {
        setTick((tick) => tick + 1);
      }
    }, delay);
    return () => clearInterval(interval);
  }, []);
  return tick;
}

function Bar({ x, y, width, height, fill }: { x: number; y: number; width: number; height: number; fill: string }) {
  return <rect x={x} y={y - height} width={width} height={height} fill={fill} />;
}

function AnimatedBar(props: any) {
  const { height } = props;
  return (
    <Animate
      start={{ height }}
      enter={{ height: [height], timing: tickTiming }}
      update={{ height: [height], timing: tickTiming }}
    >
      {(state) => <Bar {...props} height={state.height} />}
    </Animate>
  );
}

function App({ data }: { data: any }) {
  var index = useTick(delay, 0);
  var values = data[index % data.length];
  return (
    <g>
      {values.map((d: any, i: number) => (
        <AnimatedBar x={60 + 24 * i} y={115} width={24} height={(d * 95) / 36} fill={colors[i]} />
      ))}
    </g>
  );
}

var data = [
  [36, 26, 9, 9, 26],
  [34, 32, 15, 6, 18],
  [29, 36, 23, 7, 11],
  [21, 35, 30, 12, 7],
  [14, 31, 35, 19, 6],
  [8, 24, 36, 27, 10],
  [6, 16, 33, 33, 16],
  [8, 10, 27, 36, 24],
  [13, 6, 19, 35, 31],
  [21, 7, 12, 30, 35],
  [29, 11, 7, 23, 36],
  [34, 18, 6, 15, 32],
];

ReactDOM.render(<App data={data} />, document.querySelector("#root"));
