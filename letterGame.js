// JavaScript source code
Array.prototype.indexOf = function (val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
    }
    return -1;
};

Array.prototype.remove = function (val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};

(function () {
    var obj = {
        pageMax: 4,//说明书页数
        pageNow: 1,//说明书当前页数
        num: 5,//单词个数
        live: 100,//生命总值
        liveMax:100,
        continueMax:5,//连击倍率最大值
        continueEach: 0.2,//连击递增倍率
        continueSub:0.03,//连击时间递减
        timeStart:0,
        timePause: 0,
        green: 250,//绿色退后触发几率
        line: 80,//红线位置
        flag: 0,//控制游戏起止
        count: 0,//得分
        continue: 1,//倍率
    }
    var data = {
        plans: document.getElementsByClassName('target')[0],
        id:1//工厂id
    }
    letterAll = new Array();

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
            timer4=setInterval(timeGo, 174);
            creatLetter();
            var target = document.getElementsByClassName('target')[0];
            target.style.display = "block";
            timer1 = setInterval(move, 17);
            timer2 = setInterval(continueLess, 245);
            timer3 = setInterval(harder,15000);
        }, 3500)

        window.onkeydown = function (e) {
            var key = e.keyCode;
            judge(key);
        }
    }

    //难度递增
    function harder() {
        if (obj.num <= 15) {
            obj.num++;
        }
        if (obj.line <= 25) {
            return;
        } else {
            obj.line -= 3;
            var line = document.getElementsByClassName('line')[0];
            line.style.top = obj.line + "%";
        }
    }

    //倍率显示+回血颜色
    function continueShow() {
        var show = document.getElementsByClassName('continue')[0];
        show.children[1].innerHTML = "X " + (obj.continue.toFixed(2));
        show.children[2].children[0].style.width = (obj.continue - 1) / (obj.continueMax - 1) * 100 + "%";
        if (obj.continue >= obj.continueMax - 0.3 && obj.live < 99) {
            var show = document.getElementsByClassName('main')[0];
            show.classList.add("greening");
        } else if (obj.continue < obj.continueMax - 0.3 || obj.live == 100) {
            var show = document.getElementsByClassName('main')[0];
            show.classList.remove("greening");
        }
    }

    //时间递减倍率
    function continueLess() {
        if (obj.continue - obj.continueSub > 1) {
            obj.continue -= obj.continueSub;
            continueShow();
        } else {
            obj.continue = 1;
            continueShow();
        }
    }

    //判断字符是否正确
    function judge(key) {
        var okin = 0;//标记是否打错
        var real = letterAll.length;
        while (real--) {
            var really = letterAll[real];
            if (really.thing == key) {

                delDom(really.id);
                okin = 1;
                if (obj.continue + obj.continueEach < obj.continueMax) {
                    obj.continue += obj.continueEach;
                } else {
                    obj.continue = 5.03;
                }
                obj.count += letterAll.length * obj.continue;
                counting();
                letterAll.remove(really);


                if (really.style == 0) {
                    obj.line += 7;
                    var line = document.getElementsByClassName('line')[0];
                    line.style.top = obj.line + "%";
                }


                if (obj.continue >= obj.continueMax - 0.3 && obj.live < 100) {
                    obj.live += 1.5;
                    liveShow();
                }
            }
        }
        if (okin == 0) {
            obj.continue = 1;
        }
    }

    //更新分数
    function counting() {
        var code = document.getElementsByClassName('count')[0];
        code.children[1].innerHTML = obj.count.toFixed(0);
    }

    //删除出现的内容
    function delDom(id) {
        var del = document.getElementById("id_" + id);
        del.remove();
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
        this.id = data.id;
        this.letter.setAttribute('id', "id_"+data.id );
        this.thing = Math.floor(Math.random() * 26 + 65);
        this.randomX = Math.random();
        this.randomY = this.randomX;
        this.positionY = 7;
        this.positionX = 95 * Math.random();
        this.style = Math.floor(Math.random()*obj.green);
        data.plans.children[0].appendChild(this.letter);
    }
    //游戏结束
    function gameOver() {
        var end = document.getElementsByClassName('end')[0];
        end.style.display = "block";
        end.children[1].innerHTML = "分数：" + obj.count.toFixed(0);
        var timeNow = new Date();
        var second, minute, det;
        det = timeNow - obj.timeStart;
        second = (det / 1000);
        minute = parseInt(second / 60);
        second = parseInt(second - minute * 60);
        end.children[2].innerHTML = "时间：" + timeTurn(minute) + ":" + timeTurn(second);
    }

    //显示血量
    function liveShow() {
        var live = document.getElementsByClassName('main')[0];
        live.style.width = obj.live / 100 * 180 + "px";
        if (obj.live <= 0) {
            obj.flag = 0;
            clearInterval(timer1);
            clearInterval(timer2);
            clearInterval(timer3);
            clearInterval(timer4);
            var father = document.getElementsByClassName('target')[0];
            father.children[0].remove();
            gameOver();
        }
    }

    //减血函数
    function lessLive() {
        obj.live -= 0.01;
        liveShow();
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
            if (really.positionY > obj.line - 5) {
                really.style = 5;
                really.positionY = 7;
                really.letter.classList.remove("white");
                really.letter.classList.remove("green");
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