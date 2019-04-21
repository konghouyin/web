var pageLink = document.getElementsByClassName('pageLink')[0].children[0];
var flag_page = 1;
var flag_once = 0;
pageLink.addEventListener('click', function(e) {
	if (flag_page != 1) {
		return;
	}
	flag_page = 0
	var pageList = document.getElementsByClassName('page-list')[0];
	pageList.classList.add('small');
	pageList.style.marginLeft = "-" + e.path[0].nonce + "00%";
	setTimeout(function() {
		pageList.classList.remove('small');
		flag_page = 1;
	}, 1000)
	setTimeout(function() {
		if (e.path[0].nonce == "2" && flag_once==0) {
			flag_once++;
			page3();
		}
	}, 1500)
})

function page3() {
	var oWrap = document.getElementById('wrap');
	var oImg = oWrap.getElementsByTagName('img');
	var oImgLength = oImg.length;
	var Deg = 360 / oImgLength;
	var nowX, nowY, lastX, lastY, minusX = 0,
		minusY = 0;
	var roY = 0,
		roX = -10;
	var timer;

	for (var i = 0; i < oImgLength; i++) {
		oImg[i].style.transform = 'rotateY(' + i * Deg + 'deg) translateZ(350px)';
		oImg[i].style.transition = 'transform 1s ' + (oImgLength - 1 - i) * 0.1 + 's';

	}

	mTop();

	window.onresize = mTop;

	function mTop() {
		var wH = document.documentElement.clientHeight;
		oWrap.style.marginTop = wH / 2 - 180 + 'px';
	}

	// 拖拽：三个事件-按下 移动 抬起
	//按下
	document.onmousedown = function(ev) {
		ev = ev || window.event;


		roY = Number.parseFloat(document.getElementById('wrap').style.transform.split(/[()]/)[3]);
		roX = Number.parseFloat(document.getElementById('wrap').style.transform.split(/[()]/)[1]);

		//鼠标按下的时候，给前一点坐标赋值，为了避免第一次相减的时候出错
		lastX = ev.clientX;
		lastY = ev.clientY;

		//移动
		this.onmousemove = function(ev) {
			ev = ev || window.event;

			clearInterval(timer);

			nowX = ev.clientX; // clientX 鼠标距离页面左边的距离
			nowY = ev.clientY; // clientY ………………………………顶部………………

			//当前坐标和前一点坐标差值
			minusX = nowX - lastX;
			minusY = nowY - lastY;

			//更新wrap的旋转角度，拖拽越快-> minus变化大 -> roY变化大 -> 旋转快
			roY += minusX * 0.2; // roY = roY + minusX*0.2;
			roX -= minusY * 0.1;

			oWrap.style.transform = 'rotateX(' + roX + 'deg) rotateY(' + roY + 'deg)';

			/*
			//生成div，让div跟着鼠标动
			var oDiv = document.createElement('div');
			oDiv.style.cssText = 'width:5px;height:5px;background:red;position:fixed;left:'+nowX+'px;top:'+nowY+'px';
			this.body.appendChild(oDiv);
			*/

			//前一点的坐标
			lastX = nowX;
			lastY = nowY;

		}
		//抬起
		this.onmouseup = function() {
			this.onmousemove = null;
			timer = setInterval(function() {
				minusX *= 0.95;
				minusY *= 0.95;
				roY += minusX * 0.2; // roY = roY + minusX*0.2;
				roX -= minusY * 0.1;
				oWrap.style.transform = 'rotateX(' + roX + 'deg) rotateY(' + roY + 'deg)';

				if (Math.abs(minusX) < 0.1 && Math.abs(minusY) < 0.1) {
					clearInterval(timer);
				}
			}, 13);
		}
		return false;
	}
}
//page3页面动画js





var startList = document.getElementsByClassName('page1Con');

for (let i = 0; i < startList.length; i++) {
	startList[i].addEventListener('click', function() {
		var video = document.getElementsByClassName('video')[i];
		video.style.display = "block";
		var player = document.getElementsByTagName('video')[i];
		player.currentTime = 0;
		player.play();
	})
}


var stop = document.getElementsByClassName('back');
for (let i = 0; i < stop.length; i++) {
	stop[i].addEventListener('click', function() {
		var video = document.getElementsByClassName('video')[i];
		video.style.display = "none";
		var player = document.getElementsByTagName('video')[i];
		player.currentTime = 0;
		player.pause();
	})
}

var message = [
	{
		url: "url(./pic/钟楼.jpg)",
		message: "&nbsp;&nbsp;&nbsp;&nbsp;西安钟楼位于西安市中心，明城墙内东西南北四条大街的交汇处，是中国现存钟楼中形制最大、保存最完整的一座。钟楼建在方型基座之上，为砖木结构，重楼三层檐，四角攒顶的形式，总高36米，占地面积1377平方米。昔日楼上悬一口大钟，用于报警报时，故名“钟楼”。"
	},
	{
		url: "url(./pic/西安古城墙.jpg)",
		message: "&nbsp;&nbsp;&nbsp;&nbsp;西安古城墙是位于陕西省西安市城区的城墙。西安城墙自明朝初年在唐长安城皇城的基础上建造起来，是中国现存最完整的古城墙之一，也是规模最大的古城墙之一，周长13.74公里，城墙周围有护城河环绕，是中世纪后期最著名的城垣建筑之一。"
	},
		{
		url: "url(./pic/博物馆.jpg)",
		message: "&nbsp;&nbsp;&nbsp;&nbsp;陕西历史博物馆的前身是原陕西省博物馆，即现在的西安碑林博物馆，有人也因此称其为“新馆”。由于陕西省博物馆的空间相对于馆藏过于拥挤，1977年陕西省文化局和省博物馆就开始从建新馆的工作，并列入国家基建项目。"
	},
	{
		url: "url(./pic/半坡.jpg)",
		message: "&nbsp;&nbsp;&nbsp;&nbsp;半坡遗址位于陕西省西安市灞桥区半坡村，半坡遗址是中国黄河流域新石器时代仰韶文化的村落遗址典型代表，至今已有六七千年的历史。是中国第一座新石器时代遗址博物馆，也是新中国第一座史前聚落遗址博物馆。博物馆比较完整的保留的半坡原始社会村落的原貌。"
	},
	{
	url: "url(./pic/大唐芙蓉园.jpg)",
	message: "&nbsp;&nbsp;&nbsp;&nbsp;西安曲江被誉为中国古典园林的先河之一。秦时，在此开辟了皇家禁苑——宜春苑，并建有著名的离宫——宜春下苑。开皇3年（公元583年），隋文帝正式迁入新都。曲江池中的莲花盛开，异常红艳，莲花雅称芙蓉，遂拟更曲江为“芙蓉园”。其后，就一直称此地为芙蓉园，并且有芙蓉湖。"
},
{
	url: "url(./pic/华清宫.jpg)",
	message: "华清池位于中华人民共和国陕西省西安临潼区骊山北麓，是唐代华清宫内的温泉浴池，以温泉和风景秀丽著称，更因唐玄宗和杨贵妃的爱情故事而著称于世。现今华清池的多数亭台楼阁，多为1949年以来修建恢复的仿唐代建筑，现在的华清池坐落在唐代华清宫遗址上，只占盛唐时的一小部分。"
},
{
	url: "url(./pic/大雁塔.jpg)",
	message: "&nbsp;&nbsp;&nbsp;&nbsp;在长安慈恩寺的西塔院建造了一座五层砖塔。和宝鸡的法门寺因塔建寺相反，大雁塔是因寺建塔。唐贞观二十二年（648年），太子李治为追念其生母文德皇后祈求冥福，报答慈母恩德，奏请太宗敕建佛寺，赐名“慈恩寺”。大雁塔坐落在慈恩寺内，故又名“慈恩寺塔”。 "
},
{
	url: "url(./pic/兵马俑.jpg)",
	message: "&nbsp;&nbsp;&nbsp;&nbsp;秦始皇陵建于公元前246年至公元前208年，历时39年，是中国历史上秦朝皇帝秦始皇的陵墓，也是中国第一个规模宏大、布局讲究且保存完好的帝王陵寝，现存陵冢高76米，陵园布置仿秦都咸阳，分内外两城，内城周长2.5公里，外城周长6.3公里。"
},{
	url: "url(./pic/大明宫.jpg)",
	message: "&nbsp;&nbsp;&nbsp;&nbsp;大明宫，大唐帝国的大朝正宫，唐朝的政治中心和国家象征，位于唐京师长安北侧的龙首原。始建于唐太宗贞观八年，是唐长安城大明宫、太极宫、兴庆宫中规模最大的一座。自唐高宗起，先后有17位唐朝皇帝在此处理朝政，历时达200余年。 "
},







]


var image = document.getElementById('wrap').children;
for (let i = 0; i < image.length; i++) {
	image[i].addEventListener('click', function() {
		var imageWrap = document.getElementsByClassName('showMessage')[0];
		imageWrap.style.display = "block";
		imageWrap.children[0].addEventListener('click',function(){});
		
		imageWrap.children[0].children[0].style.backgroundImage=message[i].url;
		imageWrap.children[0].children[1].innerHTML=message[i].message;
		imageWrap.addEventListener('click', function() {
			imageWrap.style.display = "none";
		}, {
			once: true
		});
	})
}
