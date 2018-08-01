// JavaScript source code
var div = document.getElementsByClassName("choose")[0];
var show = document.getElementsByClassName("show");
var tools = div.children;
var toolNum = 0;
for (var i = 0; i < tools.length; i++) {
    (function (n) {
        tools[n].onclick = function () {
            for (var j = 0; j < tools.length; j++) {
                tools[j].classList.remove("active");
                show[j].style.display = "none";
            }
            this.classList.add("active");
            show[n].style.display = "block";
            toolNum = n;
        }
    }(i));
}

var goF = function () {
    var timeNow = new Date().getTime();
    var num = (timeNow - timeStart3) % 100;
    var numS = (parseInt((timeNow - timeStart3) / 1000)) % 60;
    var numM = (parseInt((timeNow - timeStart3) / 60000)) % 60;
    var numH = (parseInt((timeNow - timeStart3) / 3600000)) % 60;
    if (num < 10) {
        ms.innerHTML = "0" + num;
    } else {
        ms.innerHTML = "" + num;
    }
    if (numS < 10) {
        s.innerHTML = "0" + numS + ".";
    } else {
        s.innerHTML = "" + numS + ".";
    }
    if (numM < 10) {
        m.innerHTML = "0" + numM + ":";
    } else {
        m.innerHTML = "" + numM + ":";
    }
    if (numH < 10) {
        h.innerHTML = "0" + numH + ":";
    } else {
        h.innerHTML = "" + numH + ":";
    }
};

var go = document.getElementsByClassName("go")[0];
var start = document.getElementsByClassName("start")[0];
var time = document.getElementsByClassName("time")[0];
var back = document.getElementsByClassName("back")[0];

var div=document.getElementsByClassName("goshow")[0];
var h = div.children[0];
var m = div.children[1];
var s = div.children[2];
var ms = div.children[3];
var timerturn1 = setTimeout(function () {
    var timer = setInterval(function () {
        if (m.innerHTML != "00:") {
            m.setAttribute("style", "color:#000");
            clearTimeout(timerturn1);
        }
    }, 10);
}, 55000);
var timerturn2 = setTimeout(function () {
    var timer = setInterval(function () {
        if (h.innerHTML != "00:") {
            h.setAttribute("style", "color:#000");
            clearTimeout(timerturn2);
        }
    }, 10);
}, 3595000);

var startTicket3 = 1;
start.onclick = function () {
    if (startTicket3 == 1) {
        startTicket3++;
        this.style.backgroundPosition = "18px -35px";
        timeStart3 = new Date().getTime();
        timer3 = setInterval(goF, 63);
        time.setAttribute("style", "background-image:url(./img/time.png);")
    } else if (startTicket3 % 2) {
        startTicket3++;
        this.style.backgroundPosition = "18px -35px";
        var timeNow = new Date().getTime();
        timeStart3 += (timeNow - timestop3);
        timer3 = setInterval(goF, 63);
        back.setAttribute("style", "background-image:url(./img/back2.png);")
        time.setAttribute("style", "background-image:url(./img/time.png);")
    }
    else {
        this.style.backgroundPosition = "22px 16px";
        startTicket3++;
        timestop3 = new Date().getTime();
        clearInterval(timer3);
        time.setAttribute("style", "background-image:url(./img/time2.png);")
        back.setAttribute("style", "background-image:url(./img/back.png);")
    }
}

var timeTicket3 = 1;
time.onclick = function () {
    if (timeTicket3 == 1 && !(startTicket3 % 2)) {
        go.style.marginLeft = "-320px";
        var lists = document.createElement("div");
        var tittleB = document.createElement("h4");
        var tittleS = document.createElement("h5");
        var list = document.createElement("div");
        var test = document.createElement("div");
        var message1 = document.createElement("div");
        var message2 = document.createElement("div");
        list.appendChild(test);
        list.appendChild(message1);
        list.appendChild(message2);
        lists.appendChild(tittleB);
        lists.appendChild(tittleS);
        lists.appendChild(list);
        go.appendChild(lists);
        tittleB.innerHTML = "分圈计时";
        tittleS.innerHTML = "分段计时";
        lists.className = "test";
        tittleB.className = "tittleb";
        tittleS.className = "tittles";

        timetime = new Date().getTime();

        var num = (timetime - timeStart3) % 100;
        var numS = (parseInt((timetime - timeStart3) / 1000)) % 60;
        var numM = (parseInt((timetime - timeStart3) / 60000)) % 60;
        var numH = (parseInt((timetime - timeStart3) / 3600000)) % 60;
        if (num < 10) {
            num = "0" + num;
        } else {
            num = "" + num;
        }
        if (numS < 10) {
            numS = "0" + numS + ".";
        } else {
            numS = "" + numS + ".";
        }
        if (numM < 10) {
            numM = "0" + numM + ":";
        } else {
            numM = "" + numM + ":";
        }
        if (numH < 10) {
            numH = "0" + numH + ":";
        } else {
            numH = "" + numH + ":";
        }


        var out = lists.lastElementChild.children;
        out[0].innerHTML = timeTicket3 + "";
        out[1].innerHTML = numH + numM + numS + num;
        out[2].innerHTML = numH + numM + numS + num;
        out[0].setAttribute("class", "first");
        out[1].setAttribute("class", "second");
        out[2].setAttribute("class", "third");
        lastTime = new Date().getTime();
        timeTicket3++;
    } else if (!(startTicket3 % 2)) {
        test = document.getElementsByClassName("test")[0];
        var list = document.createElement("div");
        var num = document.createElement("div");
        var message1 = document.createElement("div");
        var message2 = document.createElement("div");
        test.insertBefore(list, test.children[2]);
        list.appendChild(num);
        list.appendChild(message1);
        list.appendChild(message2);
        timetime = new Date().getTime();
        var num = (timetime - timeStart3) % 100;
        var numS = (parseInt((timetime - timeStart3) / 1000)) % 60;
        var numM = (parseInt((timetime - timeStart3) / 60000)) % 60;
        var numH = (parseInt((timetime - timeStart3) / 3600000)) % 60;
        if (num < 10) {
            num = "0" + num;
        } else {
            num = "" + num;
        }
        if (numS < 10) {
            numS = "0" + numS + ".";
        } else {
            numS = "" + numS + ".";
        }
        if (numM < 10) {
            numM = "0" + numM + ":";
        } else {
            numM = "" + numM + ":";
        }
        if (numH < 10) {
            numH = "0" + numH + ":";
        } else {
            numH = "" + numH + ":";
        }
        var ou = test.children[2];
        var out = ou.children;
        out[0].innerHTML = timeTicket3 + "";
        out[1].innerHTML = numH + numM + numS + num;
        out[0].setAttribute("class", "first");
        out[1].setAttribute("class", "second");
        var num = (timetime - lastTime) % 100;
        var numS = (parseInt((timetime - lastTime) / 1000)) % 60;
        var numM = (parseInt((timetime - lastTime) / 60000)) % 60;
        var numH = (parseInt((timetime - lastTime) / 3600000)) % 60;
        if (num < 10) {
            num = "0" + num;
        } else {
            num = "" + num;
        }
        if (numS < 10) {
            numS = "0" + numS + ".";
        } else {
            numS = "" + numS + ".";
        }
        if (numM < 10) {
            numM = "0" + numM + ":";
        } else {
            numM = "" + numM + ":";
        }
        if (numH < 10) {
            numH = "0" + numH + ":";
        } else {
            numH = "" + numH + ":";
        }
        out[2].setAttribute("class", "third");
        out[2].innerHTML = numH + numM + numS + num;
        lastTime = new Date().getTime();
        timeTicket3++;
    } else {
    }
}

back.onclick = function () {
    if (startTicket3 % 2) {
        startTicket3 = 1;
        timeTicket3 = 1;
        start.style.backgroundPosition = "22px 16px";
        if (document.getElementsByClassName("test")[0]) {
            go.removeChild(document.getElementsByClassName("test")[0]);
            go.setAttribute("style", "left=-200px");
        }
        clearInterval(timer3);
        ms.innerHTML = "00";
        s.innerHTML = "00.";
        m.innerHTML = "00:";
        h.innerHTML = "00:";
        back.setAttribute("style", "background-image:url(./img/back2.png);")
        var goshow = document.getElementsByClassName("goshow")[0];
        goshow.children[0].setAttribute("style", "color:#bbb");
        goshow.children[1].setAttribute("style", "color:#bbb");

    }
}

//秒表结束
