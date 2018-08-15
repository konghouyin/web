// JavaScript source code
//需要建立ul > li
//每个li里又包括div（绿色）
//div（绿色）中两个div（红色）
//div（红色）包括两个div（篮框和橘圆）
//div（蓝色）包括两个div（橘色）
var message = window.localStorage;

function createList() {
    var ul = document.createElement("ul");
    for (var i = 0; i < 24; i++) {
        var thing = JSON.parse(message.a);
        var li = document.createElement("li");

        var box1 = document.createElement("div");
        box1.setAttribute("class", "top");
        var box2 = document.createElement("div");
        box2.setAttribute("class", "bottom");
        box2.setAttribute("style", "6px solid #fff");

        li.appendChild(box1);
        li.appendChild(box2);

        var tittle = document.createElement("div");
        tittle.setAttribute("class", "tittle");
        var show = document.createElement("div");
        show.setAttribute("class", "show");
        var pict = document.createElement("div");
        pict.setAttribute("class", "pic");
        pict.setAttribute ("style",'background-Image:url(' + thing.result.list[i].pic + ")");

        box1.appendChild(tittle);
        box1.appendChild(show);5
        box1.appendChild(pict);

        var big = document.createElement("div");
        big.setAttribute("class", "big");
        big.innerHTML = thing.result.list[i].name;
        var season = document.createElement("div");
        season.setAttribute("class", "season");
        var small = document.createElement("div");
        small.setAttribute("class", "small");
        small.innerHTML = (thing.result.list[i].time).substr(0,10);
        if (thing.result.list[i].jieqiid < 7) {
            season.innerHTML = "春";
        } else if (thing.result.list[i].jieqiid < 14) {
            season.innerHTML = "夏";
        } else if (thing.result.list[i].jieqiid < 19) {
            season.innerHTML = "秋";
        } else {
            season.innerHTML = "冬";
        }

        tittle.appendChild(big);
        tittle.appendChild(small);
        tittle.appendChild(season);

        ul.appendChild(li);
    }
    var list = document.getElementsByClassName("left")[0];
    list.appendChild(ul);
    action()
}
//生成左侧列表

(function getBaseMassage() {
    if (message.a == undefined) {
        var script = document.createElement("script");
        script.src = "http://api.jisuapi.com/jieqi/query?appkey=fd723f4e8718afa9&year=2018&callback=time";
        document.body.appendChild(script);
    } else {
        createList();
    }
})();
function time(x) {
    message.a = JSON.stringify(x);
    createList();
}
//获取24节气基本数据并存储

function dayTurn(num) {
    if (num < 2) {
        return num + 23;
    } else {
        return num - 1;
    }
}
//日期转换

function action() {
    var ul = document.getElementsByTagName("ul")[0];
    for (var i = 0; i < 24; i++) {
        (function (i) {
            ul.children[i].firstElementChild.addEventListener("mouseenter", function () {
                ul.children[i].lastElementChild.style.border = "3px solid #fff";
                ul.children[i].firstElementChild.style.marginLeft = "115px";
                ul.children[i].firstElementChild.lastElementChild.classList.add("active");
            })
            ul.children[i].firstElementChild.addEventListener("mouseleave", function () {
                ul.children[i].lastElementChild.style.border = "6px solid #fff";
                ul.children[i].firstElementChild.style.marginLeft = "100px";
                ul.children[i].firstElementChild.lastElementChild.classList.remove("active");
            })
            ul.children[i].firstElementChild.addEventListener("click", function () {
                getMessage(dayTurn(i));
                for (var j = 0; j < 24; j++) {
                    ul.children[j].firstElementChild.firstElementChild.classList.remove("point");
                    ul.children[j].firstElementChild.firstElementChild.children[0].classList.remove("white");
                    ul.children[j].firstElementChild.firstElementChild.children[1].classList.remove("white");
                    ul.children[j].firstElementChild.firstElementChild.children[2].classList.remove("white");
                    ul.children[j].firstElementChild.children[1].classList.remove("point");
                    ul.children[j].firstElementChild.children[2].classList.remove("point");
                }
                ul.children[i].firstElementChild.firstElementChild.classList.add("point");
                ul.children[i].firstElementChild.firstElementChild.children[0].classList.add("white");
                ul.children[i].firstElementChild.firstElementChild.children[1].classList.add("white");
                ul.children[i].firstElementChild.firstElementChild.children[2].classList.add("white");
                ul.children[i].firstElementChild.children[1].classList.add("point");
                ul.children[i].firstElementChild.children[2].classList.add("point");

                move(i);
            })
        })(i);
    }
}
//生成左侧事件

function move

function getMessage(id) {
    var right = document.getElementsByClassName("right")[0];
    right.classList.remove("start");
    var now = new Date();
    var script = document.createElement("script");
    script.src = "http://api.jisuapi.com/jieqi/detail?appkey=fd723f4e8718afa9&jieqiid="+id+"&year="+now.getFullYear()+"&callback=local";
    document.body.appendChild(script);
}
//请求详细数据

function local(x) {
    var right = document.getElementsByClassName("right")[0];
    setTimeout(function () { 
        right.children[0].children[0].src = x.result.pic;
        right.children[0].children[1].innerHTML = x.result.name;
        right.children[0].children[2].innerHTML = x.result.date;
        right.children[2].children[0].children[1].innerHTML = x.result.jianjie;
        right.children[2].children[1].children[1].innerHTML = x.result.youlai;
        right.children[2].children[2].children[1].innerHTML = x.result.xisu;
        right.children[2].children[3].children[1].innerHTML = x.result.yangsheng;
        right.classList.add("start");
    }, 800)
}
//解析详细数据