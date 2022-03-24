// image dimensions (can be found in mainpage.html canvas)
const x_max = 900
const y_max = 692

// ADJUSTABLE   [offset, left_x, left_y]
let first_mole = [50, 170, 6]   // for size 50
let diglett = [85, 155, 50]     // for size 80
let chosen_mole = diglett
const offset = chosen_mole[0]
const left_x = chosen_mole[1]
const left_y = chosen_mole[2]

// right coords
const right_x = x_max - left_x - offset
const right_y = y_max - left_y - offset

// middle coords
const middle_x = (left_x + right_x) / 2
const middle_y = (left_y + right_y) / 2

// leave here for debugging
// SOLELY FOR DEBUGGING (USELESS OTHERWISE)
let holeObj2 = [
  {"name": "hole1", "xcord": left_x, "ycord": left_y},
  {"name": "hole2", "xcord": middle_x, "ycord": middle_y},
  {"name": "hole3", "xcord": right_x, "ycord": right_y}
]

let holeObj = [
  {"name": "hole1", "xcord": left_x, "ycord": left_y},
  {"name": "hole2", "xcord": left_x, "ycord": middle_y},
  {"name": "hole3", "xcord": left_x, "ycord": right_y},

  {"name": "hole4", "xcord": middle_x, "ycord": left_y},
  {"name": "hole5", "xcord": middle_x, "ycord": middle_y},
  {"name": "hole6", "xcord": middle_x, "ycord": right_y},

  {"name": "hole7", "xcord": right_x, "ycord": left_y},
  {"name": "hole8", "xcord": right_x, "ycord": middle_y},
  {"name": "hole9", "xcord": right_x, "ycord": right_y},
]

export {holeObj};