// JavaScript source code


var paint = document.getElementsByTagName("canvas")[0];
var context = paint.getContext("2d");

context.fillStyle = "rgba(255, 255, 255, 1)";
context.strokeStyle = "rgba(255, 255, 255, 1)";
context.lineWidth = 0;

setTimeout(function () {
    context.fillRect(36, 190, 26, 26);
},100)

setTimeout(function () {
    context.fillRect(36, 160, 26, 26);
},150)

setTimeout(function () {
    context.moveTo(61, 155);
    context.lineTo(61, 130);
    context.arcTo(36, 130, 36, 155, 25);
    context.fill();
    context.stroke();
    context.fillRect(67, 130, 26, 26);

},200)

setTimeout(function () {
    context.moveTo(98, 130);
    context.lineTo(98, 155);
    context.arcTo(122, 155, 122, 130, 25);
    context.fill();
    context.stroke();
},250)

setTimeout(function () {
    context.fillRect(98, 98, 26, 26);

},300)

setTimeout(function () {
    context.moveTo(98, 92);
    context.lineTo(98, 67);
    context.arcTo(123, 67, 123, 92, 25);
    context.fill();
    context.stroke();
},350)

setTimeout(function () {
    context.fillRect(67, 65, 26, 26);
},400)

setTimeout(function () {
    context.moveTo(61, 92);
    context.lineTo(61, 67);
    context.arcTo(36, 67, 36, 92, 25);
    context.fill();
    context.stroke();
},450)

setTimeout(function () {
    context.fillRect(36, 98, 26, 26);
},500)
//p

setTimeout(function () {
    context.fillRect(130, 40, 26, 26);
}, 800)

setTimeout(function () {
    context.fillRect(130, 70, 26, 26);
}, 850)

setTimeout(function () {
    context.fillRect(130, 100, 26, 26);
},900)

setTimeout(function () {
    context.moveTo(156, 130);
    context.lineTo(131, 130);
    context.arcTo(131, 155, 156, 155, 25);
    context.fill();
    context.stroke();
},950)

setTimeout(function () {
    context.fillRect(161, 130, 26, 26);
},1000)
//l

setTimeout(function () {
    context.fillRect(255, 100, 26, 26);
},1200)

setTimeout(function () {
    context.moveTo(256, 95);
    context.lineTo(256, 70);
    context.arcTo(281, 70, 281, 95, 25);
    context.fill();
    context.stroke();
},1250)

setTimeout(function () {
    context.fillRect(225, 68, 26, 26);
},1300)
setTimeout(function () {
    context.moveTo(220, 95);
    context.lineTo(195, 95);
    context.arcTo(195, 70, 220, 70, 25);
    context.fill();
    context.stroke();
},1350)

setTimeout(function () {
    context.fillRect(194, 100, 26, 26);
},1400)

setTimeout(function () {
    context.moveTo(220, 130);
    context.lineTo(195, 130);
    context.arcTo(195, 155, 220, 155, 25);
    context.fill();
    context.stroke();
},1450)

setTimeout(function () {
    context.fillRect(225, 130, 26, 26);
},1500)

setTimeout(function () {
    context.fillRect(255, 130, 26, 26);
},1550)
//a

setTimeout(function () {
    context.fillRect(288, 70, 26, 26);
},1850)

setTimeout(function () {
    context.fillRect(288, 100, 26, 26);
},1900)

setTimeout(function () {
    context.moveTo(313, 131);
    context.lineTo(288, 131);
    context.arcTo(288, 156, 313, 156, 25);
    context.fill();
    context.stroke();
},1950)

setTimeout(function () {
    context.fillRect(318, 131, 26, 26);
},2000)

setTimeout(function () {
    context.moveTo(373, 96);
    context.lineTo(348, 96);
    context.arcTo(348, 71, 373, 71, 25);
    context.fill();
    context.stroke();
},2050)

setTimeout(function () {
    context.fillRect(348, 101, 26, 26);
},2100)

setTimeout(function () {
    context.fillRect(348, 131, 26, 26);
},2150)

setTimeout(function () {
    context.fillRect(348, 161, 26, 26);
},2200)

setTimeout(function () {
    context.moveTo(348, 193);
    context.lineTo(373, 193);
    context.arcTo(373, 218, 348, 218, 25);
    context.fill();
    context.stroke();
},2250)

setTimeout(function () {
    context.moveTo(343, 217);
    context.arc(343, 205, 12.5, 0.51 * Math.PI, 1.5 * Math.PI, false);
    context.fill();
    context.stroke();
    
},2300)

setTimeout(function () {
    var wave = document.getElementsByClassName("wave")[0];
    wave.firstElementChild.style.opacity = "1";
    wave.lastElementChild.style.opacity = "1";
},6000)

setTimeout(function () {
    var wave = document.getElementsByClassName("wave")[0];
    wave.firstElementChild.style.opacity = "0";
    wave.lastElementChild.style.opacity = "0";
}, 11000)

setTimeout(function () {
    var turn = document.getElementsByClassName("turn")[0];
    turn.style.height = window.innerHeight + "px";
    turn.style.backgroundColor = "#000";
}, 10900)

setTimeout(function () {
    var logo = document.getElementsByClassName("logo")[0];
    var loading = document.getElementsByClassName("loading")[0];
    logo.style.opacity = "0";
    loading.style.opacity = "0";
}, 15900)
