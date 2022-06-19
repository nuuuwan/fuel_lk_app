import { DataStructures } from "@nuuuwan/utils-js-dev";

const THETA0 = -Math.PI / 2;
function getD(cx, cy, r, n) {
  return (
    DataStructures.range(0, n)
      .map(function (i) {
        const theta = THETA0 + (Math.PI * 2 * i) / n;
        const [x, y] = [cx + r * Math.cos(theta), cy + r * Math.sin(theta)].map(
          (x) => parseInt(x)
        );
        const label = i === 0 ? "M" : "L";
        return label + x + "," + y;
      })
      .join("") + "Z"
  );
}

export default function EquiPolygon({ cx, cy, r, n, color }) {
  const d = getD(cx, cy, r, n);
  return (
    <svg>
      <path d={d} fill={color} stroke="none" />
    </svg>
  );
}
