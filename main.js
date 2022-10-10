import './style.css'
import moment from 'moment';
var burner = [{
  1: "Off"
}, {
  2: "Dual"
}, {
  3: "Gas"
}, {
  4: "Dual"
}, {
  5: "Dual"
}, {
  6: "Dual"
}, {
  7: "Dual"
}, {
  8: "Dual"
}, {
  9: "Gas"
}, {
  10: "Gas"
}, {
  11: "Off"
}, {
  12: "Dual"
}, {
  13: "Gas"
}, {
  14: "Dual"
}, {
  15: "Gas"
}, {
  16: "Dual"
}, {
  17: "Dual"
}, {
  18: "Gas"
}, {
  19: "Off"
}, {
  20: "Off"
}]
var dual_burner = burner.filter(x => {
  return Object.values(x)[0] == "Dual"
})

const listshift =
  [
    ["A1 Malam", "B2 Pagi", "C3 Sore", "D Off Malam"],
    ["A2 Malam", "B3 Pagi", "D1 Sore", "C Off Sore"],
    ["A3 Malam", "C1 Pagi", "D2 Sore", "B Off Pagi"],
    ["B1 Malam", "C2 Pagi", "D3 Sore", "A Off Malam"],
    ["B2 Malam", "C3 Pagi", "A1 Sore", "D Off Sore"],
    ["B3 Malam", "D1 Pagi", "A2 Sore", "C Off Pagi"],
    ["C1 Malam", "D2 Pagi", "A3 Sore", "B Off Malam"],
    ["C2 Malam", "D3 Pagi", "B1 Sore", "A Off Sore"],
    ["C3 Malam", "A1 Pagi", "B2 Sore", "D Off Pagi"],
    ["D1 Malam", "A2 Pagi", "B3 Sore", "C Off Malam"],
    ["D2 Malam", "A3 Pagi", "C1 Sore", "B Off Sore"],
    ["D3 Malam", "B1 Pagi", "C2 Sore", "A Off Pagi"]
  ]


function getPeriod(min) {
  if (min < 480) {
    return 0
  } if (min < 960) {
    return 1
  } else {
    return 2
  }
}

function checkShift(x) {
  var now;
  switch (x) {
    case "now":
      now = moment(new Date());
      break;
    case "prev":
      now = moment(new Date()).subtract({ hours: 8 });
      break;
    case "next":
      now = moment(new Date()).add({ hours: 8 });
      break;

    default:
      break;
  }


  var end = moment("2021-12-22");
  var duration = moment.duration(now.diff(end));
  var day = Math.trunc(duration.asDays()) % 12
  var minutes = Math.trunc(duration.asMinutes()) % 1440
  return listshift[day][getPeriod(minutes)];
}
function checkFlush(x) {
  var cur_prev;
  switch (x) {
    case "prev":
      cur_prev = 2
      break;
    case "now":
      cur_prev = 1
      break;
    case "next":
      cur_prev = 0
      break;
    default:
      break;
  }
  var now = moment(new Date());
  var end = moment("2022-10-10");
  var duration = moment.duration(now.diff(end)).asMinutes();
  var elapsed = Math.trunc(duration / (8 * 60)) + 1
  var position = elapsed % dual_burner.length

  return dual_burner[position - cur_prev]
}
var shift = document.getElementsByClassName("shift_child")
shift[0].childNodes[3].innerText = checkShift("prev")
shift[1].childNodes[3].innerText = checkShift("now")
shift[2].childNodes[3].innerText = checkShift("next")


shift[0].childNodes[5].innerText = `Flush number ${Object.keys(checkFlush("prev"))[0]}`
shift[1].childNodes[5].innerText = `Flush number ${Object.keys(checkFlush("now"))[0]}`
shift[2].childNodes[5].innerText = `Flush number ${Object.keys(checkFlush("next"))[0]}`

var burner_box = document.getElementsByClassName("burner_box")
Array.from(burner_box).forEach((x, i) => {
  var num = x.childNodes[1].innerText
  var mode = Object.values(burner[parseInt(num) - 1])[0]
  x.childNodes[3].innerText = mode
  switch (mode) {
    case "Off":
      x.classList.add("off");
      break;
    case "Gas":
      x.classList.add("gas");
      break;
    case "Dual":
      x.classList.add("dual");
      break;
    default:
      break;
  }
}
)

