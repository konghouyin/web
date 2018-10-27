var flag = 0;
var timelast = 0;
var num = 1;
var start = document.getElementsByClassName("start")[0];
var reset = document.getElementsByClassName("reset")[0];
var showdom = document.getElementsByClassName('show')[0];
var out = document.getElementsByClassName('out')[0];

start.addEventListener('touchstart', function () {
    if (flag == 0) {
        timeStart = new Date();
        start.innerHTML = "PAUSE";
        flag = 1;
        document.getElementsByClassName('line')[0].style.transition = "all 1s";
        document.getElementsByClassName('line')[0].style.WebkitAnimation = "myfirst 4s linear 0s infinite normal none running";
        document.getElementsByClassName('line')[0].style.backgroundImage = "url(./img/pic3.png)";
        timer = setInterval(function () {
            timeNow = new Date();
            var list = suan(timeNow - timeStart + timelast);
            show(list);
        }, 43)
    } else {
        document.getElementsByClassName('line')[0].style.transition = "all 0.3s";
        document.getElementsByClassName('line')[0].style.WebkitAnimationPlayState = "paused";
        document.getElementsByClassName('line')[0].style.backgroundImage = "url(./img/pic2.png)";
        timelast += (timeNow - timeStart);
        clearInterval(timer);
        start.innerHTML = "START";
        flag = 0;
    }
    
})

reset.addEventListener("touchstart", function () {
    if (flag == 0) {
        timelast = 0;
        document.getElementsByClassName('line')[0].style.WebkitAnimation = "none";
        document.getElementsByClassName('line')[0].style.transform = "rotate(0deg)";
        var list = new Array();
        list.push(0, 0, 0);
        show(list);
        var length = out.children.length;
        for (var i = 0; i < length ; i++) {
            out.children[0].remove();
        }
        num = 1;
    }
})

function show(list) {
    for (var i = 0; i < 3; i++) {
        showdom.children[i*2].innerHTML = (list[i] < 10) ? ("0" + list[i]) : ("" + list[i]);
    }
}

function suan(sub) {
    var min = Math.floor(sub / 60000);
    var sec = (Math.floor(sub / 1000))%60;
    var poi = Math.floor((sub % 1000)/10);
    var list = new Array();
    list.push(min, sec, poi);
    return list;
}

var button = document.getElementsByClassName('button')[0];
button.addEventListener('touchstart', function () {
    if (flag == 1) {
        var div = document.createElement('div');
        var left = document.createElement('span');
        var right = document.createElement('span');
        left.innerHTML = "Lap" + num++;
        var list = suan(timeNow - timeStart + timelast);
        //console.log(list);
        right.innerHTML = ((list[0] < 10) ? ((list[0]==0)?("00"):("0"+list[0])) : ("" + list[0]))+ ":" + ((list[1] < 10) ? ("0" + list[1]) : ("" + list[1])) + "." + ((list[2] < 10) ? ("0" + list[2]) : ("" + list[2]));
        div.appendChild(left);
        div.appendChild(right);
        out.insertBefore(div, out.firstChild)
    }
})
