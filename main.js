var canvas = window.xxx
var yyy = document.getElementById('xxx');
var context = yyy.getContext('2d');

autosetCanvasSize(yyy)

listenToUser(yyy)

var eraserEnabled = false
eraser.onclick = function () {
  eraserEnabled = true
  actions.className = 'actions x'
}
brush.onclick = function () {
  eraserEnabled = false
  actions.className = 'actions'
}
/********/
function autosetCanvasSize(canvas) {
  setCanvasSize()

  window.onresize = function () {
    setCanvasSize()
  }
  function setCanvasSize() {
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight
    canvas.width = pageWidth
    canvas.height = pageHeight
  }
}


function drawCircle(x, y, radius) {
  context.beginPath()
  context.fillStyle = 'black'
  context.arc(x, y, radius, 0, Math.PI * 2);
  context.fill()
}
function drawLine(x1, y1, x2, y2) {
  context.beginPath()
  context.strokeStyle = 'black'
  context.moveTo(x1, y1)
  context.lineWidth = 5
  context.lineTo(x2, y2)
  context.stroke();
  context.closePath()
}


/******/
function listenToUser(canvas) {

  var using = false
  var lastPoint = { x: undefined, y: undefined }
  //特性检测
  if (document.body.ontouchstart !== undefined) {
    //触屏设备
    canvas.ontouchstart = function (aaa) {
      var x = aaa.touches[0].clientX
      var y = aaa.touches[0].clientY
      console.log(x,y)
      using = true
      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10)
      }
      else {
        lastPoint = { "x": x, "y": y }
      }
    }
    canvas.ontouchmove = function (aaa) {
      //console.log('bmbd')
      var x = aaa.touches[0].clientX
      var y = aaa.touches[0].clientY

      if (!using) { return }

      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10)
      }
      else {
        var newPoint = { "x": x, "y": y }
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        lastPoint = newPoint
      }
    }
    canvas.ontouchend = function () {
      console.log('mwl')
      using = false
    }
  } else {
    //非触屏设备
    canvas.onmousedown = function (aaa) {
      console.log('down')
      var x = aaa.clientX
      var y = aaa.clientY
      using = true
      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10)
      }
      else {
        lastPoint = { "x": x, "y": y }
      }
    }
    canvas.onmousemove = function (aaa) {
      console.log('move')
      var x = aaa.clientX
      var y = aaa.clientY

      if (!using) { return }

      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10)
      }
      else {
        var newPoint = { "x": x, "y": y }
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        lastPoint = newPoint
      }
    }

    canvas.onmouseup = function (aaa) {
      console.log('up')
      using = false
    }
  }
}


