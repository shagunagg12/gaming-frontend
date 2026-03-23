import { colors } from "../../../styles/colors"
const pins = {
  startPins: 3,
  pinSize: 3,
  pinGap: {16:30, 15:32, 14:34, 13:36, 12:38, 11:40, 10:44 ,9:48 ,8 :60, },
}

const ball = {
  ballSize: 6
}

const engine = {
  engineGravity: 1
}

const world = {
  width: 700,
  height: 650
}

export const config = {
  pins,
  ball,
  engine,
  world,
  colors
}
