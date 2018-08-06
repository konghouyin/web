 //JavaScript source code
document.body.style.height = window.innerHeight + "px";
timerHeightView = setInterval(function () {
    document.body.style.height = window.innerHeight + "px";
}, 100);                                            

var timeWidthView3;
var timeWidthtLike = 1;
var timeWidthtTime = 1;
var timeWidthView1 = setInterval(function () {
    screenWidth = window.screen.width;
    if ((window.innerWidth < screenWidth-50 || window.innerWidth > screenWidth+50 )&& Boolean(timeWidthtLike)) {
        alert("调整浏览器窗口，会影响页面，建议100%缩放全屏使用！");
        timeWidthtLike = 0;
        timeWidthtTime++;
        timeWidthView3 = setInterval(function () {
            if ((window.innerWidth < screenWidth-50 || window.innerWidth > screenWidth+50) && (!Boolean(timeWidthtLike)) && (timeWidthtTime<4)) {
                alert("调整浏览器窗口，会影响页面，建议100%缩放全屏使用！");
                timeWidthtTime++;
            }
        }, 10000);
    }
}, 1000);

var timeWidthView2 = setInterval(function () {
    if (window.innerWidth > screenWidth-50 && window.innerWidth < screenWidth+50 ) {
        timeWidthtLike = 1;
        timeWidthtTime = 1;
        clearInterval(timeWidthView3);
    }
}, 1000);


var pic = document.getElementById("turn");
var picture = pic.children.length;
var first = document.getElementsByClassName("ic-first")[0];
var before = document.getElementsByClassName("ic-before")[0];
var start = document.getElementsByClassName("ic-start")[0];
var next = document.getElementsByClassName("ic-next")[0];
var music = document.getElementsByClassName("ic-music")[0];

var input = document.getElementsByClassName("input")[0];



var speedle = parseInt(input.children[0].children[1].value);//切换速度
var picNumber = parseInt(input.children[0].children[0].value);//起始页
var autoTime = parseInt(input.children[0].children[2].value)*1000;//自动播放时间


var lists = document.createElement("div");
lists.setAttribute("class", "lists");
var father = document.getElementsByClassName("list-show")[0];
father.appendChild(lists);
for (var i = 0; i < picture - 2; i++) {
    var o = document.createElement("div")
    lists.appendChild(o);
    o.appendChild(document.createElement("a"));
}
//创建图形
var a = document.getElementsByTagName("a");

for (var i = 0; i < picture - 2; i++) {
    (function (n) {
        a[n].parentElement.onclick = function () {
            clearInterval(go);
            if (go != -1) {
                go = null;
            }
            picNumber = n+1;
            move(picNumber);
        }
    })(i);
}
//小圆点事件


a[picNumber - 1].className = "active";
pic.style.left = -(picNumber * 589) + "px";
//初始化设置

function active(from, to) {
    try {
        clearInterval(timer);
    } catch{ };

    var step = (from - to) /speedle;
    if (step< 589/speedle && step>0) {
        step = 589/speedle;
    }
    timer = setInterval(function () {
        pic.style.left = parseInt(pic.style.left) - step + "px";
        if ((Math.abs(parseInt(pic.style.left) - to)) < Math.abs(step)) {
            pic.style.left = to + "px";
            if (go === null) {
                go = setInterval(turnNum, autoTime);
            }
            clearInterval(timer);
        }
    }, 1);
}
//运动函数


function circle(num) {
    for (var i = 0; i < picture - 2; i++) {
        a[i].className = "none";
    }
    if (num == picture - 1) {
        a[0].className = "active";
    } else if (num == 0) {
        a[picture - 3].className = "active";
    }
    else { 
    a[num - 1].className = "active";
    }
}
//圆圈跳转

function move(num) {
    console.log(num);
    var leftTo = -(num * 589);
    var leftFrom = parseInt(pic.style.left);
    active(leftFrom, leftTo);
    circle(num);
}
//计算移动


function turnNum() {
    if (picNumber < picture-1) {
        picNumber++;
    } else if (picNumber >= picture - 1 && (Math.abs(parseInt(pic.style.left) + (picture - 1) * 589) < 30)) {
        picNumber = 2;
        pic.style.left = "-589px";
    }
    move(picNumber);
}
//自动移动数字控制

go = setInterval(turnNum, autoTime);

var startTicket = 1;
start.onclick = function () {
    if (startTicket == 1) {
        clearInterval(go);
        go = -1;
        startTicket = 0;
        start.children[0].children[0].setAttribute("style", "background-image:url(./img/ic_action_playback_play.png);background-position:4px 12px");
    } else {
        go = setInterval(turnNum, autoTime);
        startTicket = 1;
        start.children[0].children[0].setAttribute("style", "background-image:url(./img/ic_action_playback_pause.png);background-position:4px 12px");
    }
};
//开始暂停

before.onclick = function () {
    if (picNumber > 0) {
        picNumber--;
    }else if (picNumber == 0 && (Math.abs(parseInt(pic.style.left) + 0) < 30)) {
        picNumber = 11;
        pic.style.left = -(picture - 2) * 589+"px";
    }

    clearInterval(go);
    if (go != -1) {
        go = null;
    }
    move(picNumber);
};
next.onclick = function () {
    if (picNumber <picture - 1) {
        picNumber++;
    } else if (picNumber >=picture - 1 && (Math.abs(parseInt(pic.style.left) + (picture-1)*589) < 30)) {
        picNumber = 2;
        pic.style.left="-589px";
    }
    clearInterval(go);
    if (go != -1) {
        go = null;
    }
    move(picNumber);
};
//上一页下一页

first.onclick = function () {
    clearInterval(go);
    picNumber = parseInt(input.children[0].children[0].value);
    move(picNumber);
    go = setInterval(turnNum, autoTime);
    start.children[0].children[0].setAttribute("style", "background-image:url(./img/ic_action_playback_pause.png);background-position:4px 12px");
}
//首页

var song = document.getElementsByTagName("audio")[0];
var musicTicket = 1;


music.onclick = function () {
    if (musicTicket == 1) {
        musicTicket = 0;
        song.pause();
        music.children[0].children[0].style.backgroundImage ="url(./img/ic_action_volume_mute.png)"
    } else {
        song.play();
        music.children[0].children[0].style.backgroundImage = "url(./img/ic_action_volume_up.png)"
        musicTicket = 1;
    }
}
//音乐事件


var pull = document.getElementsByClassName("pull")[0];

pull.addEventListener("mouseenter", function () {
    input.className = "input out";
});

input.addEventListener("mouseenter", function () {
    try {
        clearTimeout(pullOut);
    } catch{ }
});
input.addEventListener("mouseleave", function () {
    if (window.getComputedStyle(input, null).top == "5px") {
        pullOut = setTimeout(function () {
            input.className = "input";
        }, 1000);
    }
});

input.children[0].children[3].addEventListener("click", function () {
    speedle = parseInt(input.children[0].children[1].value);//切换速度
    autoTime = parseInt(input.children[0].children[2].value) * 1000;//自动播放时间
    clearInterval(go);
    startTicket = 1;
    start.children[0].children[0].setAttribute("style", "background-image:url(./img/ic_action_playback_pause.png);background-position:4px 12px");
    go = setInterval(turnNum, autoTime);
});
//调速事件

var menuTicket = 1;
var ctrl= document.getElementsByClassName("ctrl")[0];
var menu = document.getElementsByClassName("button")[0];
menu.onclick = function () {
    if (menuTicket == 1) {
        first.style.opacity = "1";
        before.style.opacity = "1";
        start.style.opacity = "1";
        next.style.opacity = "1";
        music.style.opacity = "1";
        this.style.opacity = "0.6";
        ctrl.style.top = "70%";
        this.innerHTML = "CLOSE";
        menuTicket = 0;
    } else if (menuTicket == 0) {
        first.style.opacity = "0";
        before.style.opacity = "0";
        start.style.opacity = "0";
        next.style.opacity = "0";
        music.style.opacity = "0";
        this.style.opacity = "1";
        ctrl.style.top = "60%";
        this.innerHTML = "MENU";
        menuTicket = 1;
    }    
}
//按钮渐隐效果

