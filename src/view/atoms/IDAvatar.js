import Avatar from "@mui/material/Avatar";

import { DataStructures } from "@nuuuwan/utils-js-dev";

import EquiPolygon from "../../view/atoms/EquiPolygon";

const ID_LENGTH = 32;
const N = 3;
const BITS_PER_COLOR = 3;
const COLOR_BLANK = "808080";
const P_RADIUS = 1;
const N_COLORS = parseInt(ID_LENGTH / BITS_PER_COLOR);

export default function IDAvatar({ size, id }) {
  const cellSize = (size * 1) / N;
  const width = N * cellSize;
  const height = width;

  const colorList = DataStructures.range(0, N_COLORS).map(function (iColor) {
    const iStart = iColor * BITS_PER_COLOR;
    if (iStart + BITS_PER_COLOR >= ID_LENGTH) {
      return null;
    }
    return id.substring(iStart, iStart + BITS_PER_COLOR);
  });

  const colorMatrix = [
    [colorList[0], colorList[1], colorList[2]],
    [colorList[3], colorList[4], colorList[5]],
    [colorList[6], colorList[7], colorList[8]],
  ];

  return (
    <Avatar
      variant="square"
      sx={{
        width: size,
        height: size,
        background: "white",
        border: "2px solid #" + colorList[9],
      }}
    >
      <svg width={width} height={height}>
        {colorMatrix.map(function (colorRow, iRow) {
          return colorRow.map(function (idSubstring, iCol) {
            if (!idSubstring) {
              return null;
            }

            const n = (parseInt(idSubstring, 16) % 3) + 3;
            const [cx, cy] = [(iCol + 0.5) * cellSize, (iRow + 0.5) * cellSize];
            const r = (P_RADIUS * cellSize) / 2;
            const color = idSubstring ? "#" + idSubstring : COLOR_BLANK;
            const keyID = iRow + "-" + iCol;
            return (
              <EquiPolygon
                key={"cell-shape-" + keyID}
                n={n}
                cx={cx}
                cy={cy}
                r={r}
                color={color}
              />
            );
          });
        })}
      </svg>
    </Avatar>
  );
}
