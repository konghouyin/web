// JavaScript source code

(function () {
    var obj = {
        pageMax: 4,//˵����ҳ��
        pageNow: 1,//˵���鵱ǰҳ��
        num: 5,//���ʸ���
        live:100,//������ֵ
        continueMax:5,//�����������ֵ
        continueEach: 0.35,//������������
        continueSub:0.05,//����ʱ��ݼ�
        timeStart:0,
        timePause: 0,
        green:250,//��ɫ�˺󴥷�����
    }
    var data = {
        plans: document.getElementsByClassName('target')[0],
        id:1//����id
    }
    var letterAll = [];

    //˵���鰴ť
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

    //˵���鷭ҳ��
    function pageTurn() {
        var explain = document.getElementsByClassName('express')[0].children[1];
        explain.style.marginLeft= -explain.children[0].offsetWidth * (obj.pageNow - 1) + "px";
    }

    //����ʱ
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

    //��ʱ���ı�ת��
    function timeTurn(x) {
        if (x < 10) {
            return "0" + x;
        } else {
            return "" + x;
        }
    }

    //��ʱ��
    function timeGo() {
        var timeShow = document.getElementById("timeShow");
        var timeNow = new Date();
        var second, minute, det;
        det = timeNow - obj.timeStart;
        second = (det / 1000);
        minute = parseInt(second / 60);
        console.log(minute);
        second = parseInt(second - minute * 60);
        timeShow.innerHTML = timeTurn(minute) + ":" + timeTurn(second);
    }

    //��Ϸ�߼�
    function gameStart() {
        antoMove();
        setTimeout(function () {
            obj.timeStart = new Date();
            setInterval(timeGo, 174);
            creatLetter();
        }, 3000)
        


    }



    function creatOneLetter(){
        var let = factoryLetter();
        console.log(let);
        let.letter.innerHTML = String.fromCharCode(let.thing);
        if (let.style == 0) {
            let.letter.setAttribute("class", "green");
        } else {
            let.letter.setAttribute("class", "white");
        }
        let.letter.style.top = let.positionX + "px";
        let.letter.style.left = let.positionY + "px";
        data.id++;
        letterAll.push(let);
    }

    //��ĸ����
    function factoryLetter() {
        this.letter = document.createElement('li');
        this.letter.setAttribute('id', "id"+data.id );
        this.thing = Math.floor(Math.random() * 26 + 65);
        this.positionX = 50;
        this.positionY = 500 * Math.random();
        this.style = Math.floor(Math.random()*obj.green);
        data.plans.children[0].appendChild(this.letter);
        return this;
    }

    main();
    function main() {
        pageCtrl();
    }

})();






