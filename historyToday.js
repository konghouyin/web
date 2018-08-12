// JavaScript source code
var timeNow = new Date();
var month = timeNow.getMonth() + 1;
var day = timeNow.getDate();
var message;
calendarchange()
getMessage(month);

function getMessage(month) {
    month = monthText(month);
    var http = new XMLHttpRequest();
    var xmlUrl = "https://baike.baidu.com/cms/home/eventsOnHistory/" + month + ".json";
    http.open("GET", xmlUrl, true);
    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
            message = JSON.parse(http.response);
            calendar();
            calendarchange();
        }
    };
    http.send();
}
//获取数据
//传入月份字符串，更新message。

function monthText(month) {
    if (month < 10) {
        month = "0" + month;
    } else {
        month = month + "";
    }
    return month;
}
//月份字符串转换
//输入数字，返回字符串

function backday(month) {
    switch (month) {
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12: return 31;
        case 4:
        case 6:
        case 9:
        case 11: return 30;
        case 2: return 28;
    }
}
//月份日期查询

function calendar() {
 
    var calendarDom = document.getElementsByClassName("day")[0];
    if (calendarDom == undefined) {
        var calendarDom = document.getElementsByClassName("day-shot")[0];
    }
    calendarDom.remove();
   
    calendarDom = document.createElement("ul");
    timeNow.setMonth(month - 1);
    timeNow.setDate(1);
    for (var i = 0; i < backday(month); i++) {
        var kid = document.createElement("li");

        kid.appendChild(document.createElement("a"));
        kid.appendChild(document.createElement("img"));
        kid.appendChild(document.createElement("p"));
        kid.appendChild(document.createElement("div"));
        kid.children[2].innerHTML = (i + 1) + "";
        for (prop in message[monthText(month)][monthText(month) + monthText(i + 1)]) {
            if (message[monthText(month)][monthText(month) + monthText(i + 1)][prop].cover == true) {
                kid.children[1].setAttribute("src", picLock(message[monthText(month)][monthText(month) + monthText(i + 1)][prop].pic_calendar));
                kid.children[3].innerHTML = aOut(message[monthText(month)][monthText(month) + monthText(i + 1)][prop].title);
            }
        }
        calendarDom.appendChild(kid);
    }
    var add = (timeNow.getDay() == 0) ? (6) : (timeNow.getDay() - 1);
    var inputdate = backday(month - 1)
    for (i = 0; i < add; i++) {
        kid = document.createElement("li");
        kid.appendChild(document.createElement("a"));
        kid.appendChild(document.createElement("p"));
        kid.children[1].innerHTML = inputdate + "";
        calendarDom.insertBefore(kid, calendarDom.children[0]);
        inputdate--;
    }
    inputdate = 1;
    if (calendarDom.children.length <= 35) {
        for (i = calendarDom.children.length; i < 35; i++) {
            var kid = document.createElement("li");
            kid.appendChild(document.createElement("a"));
            kid.appendChild(document.createElement("p"));
            kid.children[1].innerHTML = inputdate + "";
            calendarDom.appendChild(kid);
            inputdate++;
        }
        calendarDom.setAttribute("class", "day");
        var flag = 0;
    } else {
        for (i = calendarDom.children.length; i < 42; i++) {
            var kid = document.createElement("li");
            kid.appendChild(document.createElement("a"));
            kid.appendChild(document.createElement("p"));
            kid.children[1].innerHTML = inputdate + "";
            calendarDom.appendChild(kid);
            inputdate++;
        }
        calendarDom.setAttribute("class", "day-shot");
        var flag = 1;
    }
    var father = document.getElementsByClassName("left")[0];
    father.appendChild(calendarDom);
    dayChoose(day);
    things((flag == 1) ? 42 : 35, add, backday(month));

}
//日历的dom树的构建

function things(all, before, dayofall) {
    console.log(all, before, dayofall, month);//////////////////////////、、、、、、、、、
    var calendarDom = document.getElementsByClassName("day")[0];
    if (calendarDom == undefined) {
        var calendarDom = document.getElementsByClassName("day-shot")[0];
    }
    
    var beforepro = before;
    var allpro = 1;
    for (var i = 0; i < all; i++) {
        if (before > 0 && month > 1) {
            (function (j, before) {
                calendarDom.children[j].addEventListener("click", function () {
                    month = month - 1;
                    day = backday(month) - before + 1;
                    getMessage(month);
                })
            })(i, before);
            before--;
        } else if (dayofall > 0) {
            (function (j, before) {
                calendarDom.children[j].addEventListener("click", function () {
                    day = j - before + 1;
                    dayChoose(day);
                })
            })(i, beforepro);
            (function (j) {
                calendarDom.children[j].addEventListener("mouseenter", function () {
                    calendarDom.children[j].children[0].classList.add("active-a");
                    calendarDom.children[j].children[2].classList.add("active-p");
                    calendarDom.children[j].children[3].classList.add("active-div");
                })
            })(i);
            (function (j) {
                calendarDom.children[j].addEventListener("mouseleave", function () {
                    calendarDom.children[j].children[0].classList.remove("active-a");
                    calendarDom.children[j].children[2].classList.remove("active-p");
                    calendarDom.children[j].children[3].classList.remove("active-div");
                })
            })(i);
            dayofall--;
        } else {
            if (month != 12) {
                (function (j, allpro) {
                    calendarDom.children[j].addEventListener("click", function () {
                        month = month + 1;
                        day = allpro;
                        getMessage(month);
                    })
                })(i, allpro);
                allpro++;
            }
        }
    }

}
//添加事件

function aOut(letter) {
    var reg = /[<>]/g;
    var array = letter.split(reg);
    for (var i = array.length; i > 0; i--) {
        if (i % 2 == 1) {
            array.splice(i, 1);
        }
    }
    return array.join("");
}
//去除a标签

function dayChoose(e) {
    var calendarDom = document.getElementsByClassName("day")[0];
    if (calendarDom == undefined) {
        var calendarDom = document.getElementsByClassName("day-shot")[0];
    }
   var clear = calendarDom.getElementsByTagName("div");
    for (var i = 0; i < clear.length; i++) {
        clear[i].parentElement.children[0].classList.remove("point");
        clear[i].parentElement.children[2].style.display = "block";
        clear[i].parentElement.children[3].style.display = "block";
    }
    clear[e-1].parentElement.children[0].classList.add("point");
    clear[e-1].parentElement.children[2].style.display = "none";
    clear[e - 1].parentElement.children[3].style.display = "none";
    dayAdd();
    //当日信息添加
}
//日期选择

function dayAdd() {
    var time = document.getElementById("time");
    time.innerHTML = month + "月" + day + "日";
    var right = document.getElementsByClassName("thing")[1];
    for (prop in message[monthText(month)][monthText(month) + monthText(day)]) {
        if (message[monthText(month)][monthText(month) + monthText(day)][prop].cover == true) {
            right.children[0].innerHTML = message[monthText(month)][monthText(month) + monthText(day)][prop].year+"，"+message[monthText(month)][monthText(month) + monthText(day)][prop].title;
            right.children[1].setAttribute("href", message[monthText(month)][monthText(month) + monthText(day)][prop].link);
            right.children[1].children[0].setAttribute("src", picLock(message[monthText(month)][monthText(month) + monthText(day)][prop].pic_share));
            right.children[2].innerHTML = message[monthText(month)][monthText(month) + monthText(day)][prop].desc;
        }
    }
    //添加当日详细事件
}

function calendarchange() {
    var change = document.getElementsByClassName("month")[0];
    change.innerHTML = timeNow.getFullYear() + "年" + month + "月";
}
//显示月份

function picLock(list) {
    var reg = /e.hiphotos/
    if (reg.test(list)) {
        var array = list.split("e.hiphotos");
        list = array.join("imgsa");
        array = list.split("http");
        list = array.join("https");
    }
    reg = /d.hiphotos/g;
    if (reg.test(list)) {
        var array = list.split("d.hiphotos");
        list = array.join("imgsa");
        array = list.split("http");
        list = array.join("https");
    }
    reg = /hiphotos/g;
    if (reg.test(list)) {
        var array = list.split("hiphotos");
        list = array.join("imgsa");
        array = list.split("http");
        list = array.join("https");
    }
    return list;
}
//骗百度图片函数
