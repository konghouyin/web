// JavaScript source code
var timeNow = new Date();
var month = timeNow.getMonth() + 1;
var day = timeNow.getDate();
var message;



function getMessage(month) {
    month = monthText(month);
    var http = new XMLHttpRequest();
    var xmlUrl = "https://baike.baidu.com/cms/home/eventsOnHistory/" + month + ".json";
    http.open("GET", xmlUrl, true);
    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
            message = JSON.parse(http.response);
            calendar(month);
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

function calendar(month) {
    try {
        var calendarDom = document.getElementsByClassName("day")[0];
        calendarDom.remove();
    } catch{ }
    calendarDom = document.createElement("ul");
    timeNow.setMonth(month - 1);
    timeNow.setDate(1);
    for (var i = 0; i < backday(month); i++) {
        var kid = document.createElement("li");
        kid.appendChild(document.createElement("a"));
        kid.appendChild(document.createElement("img"));
        kid.appendChild(document.createElement("div"));
        kid.appendChild(document.createElement("div"));
        kid.children[2].innerHTML = (i+1) + "";
        for (prop in message[monthText(month)][monthText(month) + monthText(i+1)]) {
            console.log(message[monthText(month)][monthText(month) + monthText(i+1)][prop]);
            if (message[monthText(month)][monthText(month) + monthText(i+1)][prop].cover == true) {
                kid.children[3].innerHTML = message[monthText(month)][monthText(month) + monthText(i+1)][prop].title;
            }
        }
       
        calendarDom.appendChild(kid);
    }
    var add = (timeNow.getDay() == 0) ? (6) : (timeNow.getDay() - 1);
    var inputdate = backday(month - 1)
    for (i = 0; i < add; i++) {
        kid = document.createElement("li");
        kid.appendChild(document.createElement("a"));
        kid.children[0].innerHTML = inputdate + "";
        calendarDom.insertBefore(kid, calendarDom.children[0]);
        inputdate--;
    }
    inputdate = 1;
    if (calendarDom.children.length <= 35) {
        for (i = calendarDom.children.length; i < 35; i++) {
            var kid = document.createElement("li");
            kid.appendChild(document.createElement("a"));
            kid.children[0].innerHTML = inputdate + "";
            calendarDom.appendChild(kid);
            inputdate++;
        }
        calendarDom.setAttribute("class", "day");
    } else {
        for (i = calendarDom.children.length; i < 42; i++) {
            var kid = document.createElement("li");
            kid.appendChild(document.createElement("a"));
            kid.children[0].innerHTML = inputdate + "";
            calendarDom.appendChild(kid);
            inputdate++;
        }
        calendarDom.setAttribute("class", "day shot");
    }
    var father = document.getElementsByClassName("left")[0];
    father.appendChild(calendarDom);
}
//日历的dom树的构建