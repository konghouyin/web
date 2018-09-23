// JavaScript source code

(function () {
    var obj = {
        pageMax: 4,//说明书页数
        pageNow: 1,//说明书当前页数
        num: 5,//单词个数
        live: 100,//生命总值
        liveMax:100,
        continueMax:5,//连击倍率最大值
        continueEach: 0.35,//连击递增倍率
        continueSub:0.05,//连击时间递减
        timeStart:0,
        timePause: 0,
        green: 250,//绿色退后触发几率
        line: 80,
        flag:0,//控制游戏起止
    }
    var data = {
        plans: document.getElementsByClassName('target')[0],
        id:1//工厂id
    }
    var letterAll = new Array();

    //说明书按钮
    function pageCtrl() {
        var button = document.getElementsByClassName('button');
        button[0].addEventListener('click', function () {
            if (obj.pageNow > 1) {
                obj.pageNow--;
                button[2].classList.remove("grey");
                if (obj.pageNow == 1) {
                    button[0].classList.add("grey");
                }
                pageTurn(obj.pageNow);
            } else {
                return;
            }
        })
        button[2].addEventListener('click', function () {
            if (obj.pageNow < obj.pageMax) {
                obj.pageNow++;
                button[0].classList.remove("grey");
                if (obj.pageNow == obj.pageMax) {
                    button[2].classList.add("grey");
                }
                pageTurn(obj.pageNow);
            } else {
                return;
            }
        })

        button[1].addEventListener('click', function () {
            obj.pageNow = 1;
            var show = document.getElementsByClassName('express')[0];
            show.style.display = "none";
            gameStart();
        })
    }

    //说明书翻页器
    function pageTurn() {
        var explain = document.getElementsByClassName('express')[0].children[1];
        explain.style.marginLeft= -explain.children[0].offsetWidth * (obj.pageNow - 1) + "px";
    }

    //倒计时
    function antoMove() {
        stage = document.getElementsByClassName('stage')[0];
        stage.style.display = "block";
        var i;
        setTimeout(function () {
            stage.style.display = "none";
        }, 4000)
        for (i = 3; i >= 0; i--) {
            (function (k) {
                setTimeout(function () {
                    stage.innerHTML = k + "";
                }, 1000 * (3-k))
            })(i);
        }
    }

    //计时器文本转换
    function timeTurn(x) {
        if (x < 10) {
            return "0" + x;
        } else {
            return "" + x;
        }
    }

    //计时器
    function timeGo() {
        var timeShow = document.getElementById("timeShow");
        var timeNow = new Date();
        var second, minute, det;
        det = timeNow - obj.timeStart;
        second = (det / 1000);
        minute = parseInt(second / 60);
        second = parseInt(second - minute * 60);
        timeShow.innerHTML = timeTurn(minute) + ":" + timeTurn(second);
    }

    //游戏逻辑
    function gameStart() {
        antoMove();
        obj.flag = 1;
        setTimeout(function () {
            obj.timeStart = new Date();
            setInterval(timeGo, 174);
            creatLetter();
            var timer = setInterval(move, 15);
        }, 3000)
    }

    //分类型创建
    function creatLetter() {
        if (obj.flag == 1) {
            var num = data.plans.children[0].children.length;
            if (num >= obj.num) {
                setTimeout(creatOneLetter, 1000);
            } else {
                var time = Math.floor(1500 / (obj.num - num));
                setTimeout(creatOneLetter, time);
            }
        }
    }

    //创建具体过程
    function creatOneLetter(){
        var let = new factoryLetter();
        let.letter.innerHTML = String.fromCharCode(let.thing);
        if (let.style == 0) {
            let.letter.setAttribute("class", "green");
            let.creatTime = new Date();
        } else {
            let.letter.setAttribute("class", "white");
        }
        let.letter.style.top = let.positionY + "%";
        let.letter.style.left = let.positionX + "%";
        data.id++;
        letterAll.push(let);
        creatLetter();
    }

    //字母工厂
    function factoryLetter() {
        this.letter = document.createElement('li');
        this.letter.setAttribute('id', "id"+data.id );
        this.thing = Math.floor(Math.random() * 26 + 65);
        this.randomX = Math.random();
        this.randomY = this.randomX;
        this.positionY = 7;
        this.positionX = 95 * Math.random();
        this.style = Math.floor(Math.random()*obj.green);
        data.plans.children[0].appendChild(this.letter);
    }
    //减血函数
    function lessLive() {
        var live = document.getElementsByClassName('main')[0];
        obj.live -= 0.01;
        live.style.width = obj.live / 100 * 180 + "px";
        if (obj.live <= 0) {
            obj.flag = 0;
            //游戏结束
        }
    }

    //移动
    function move() {
        var real = letterAll.length;
        while (real--) {
            var really = letterAll[real];
            really.positionY += really.randomY * 0.05+0.05;
            really.positionX += really.randomX * 0.15;
            if (really.positionX >= 95) {
                really.randomX = -really.randomX;
            }
            if (really.positionX <= 5) {
                really.randomX = -really.randomX;
            }
            if (really.positionY > obj.line-5) {
                really.positionY = 7;
                really.letter.classList.remove("white");
                really.letter.classList.add("red");
                really.style = -1;
                lessLive();
            }
            really.letter.style.top = (really.positionY) + "%";
            really.letter.style.left = (really.positionX) + "%";
            if (really.style == 0) {
                //控制class改变
            }
            if (really.style == -1) {
                lessLive();
            }
        }
    }

    init();
    function init() {
        pageCtrl();
    }

})();






