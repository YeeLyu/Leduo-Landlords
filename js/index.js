var userData = {};
var storage = window.localStorage;
$.getJSON("allData.json", function(data) {
	let id = storage.getItem("name");
	console.log(id);
	if(JSON.parse(storage.getItem(id)) == undefined) {//判断local是否已经存在该用户数据
		for(let i = 0; i < data.length; i++) {//不存在，在json中找
			console.log(data[i].name);
			if(data[i].name == id) {
				var d = JSON.stringify(data[i]);//找到数据并保存到local中
				console.log(d);
				storage.setItem(id, d);
				break;
			}
		}
	}
   storage.setItem("koko",JSON.stringify(data[data.length-2]));
   storage.setItem("ko",JSON.stringify(data[data.length-1]));
	userData = JSON.parse(storage.getItem(id));
	console.log(userData.dou);
	$("#douNum").html(userData.dou);
	console.log(userData.img);
	
	$(".tb img").attr("src",userData.img);
	$(".tb span").text(userData.name);
	
});



$(".title").click(function() {
	$(this).addClass("active").siblings().removeClass("active");
	var index = $(this).index();
	$(".content-right").eq(index).css("display", "block").siblings().css("display", "none");
	addDivL($('.active'));
  leftFloat($('.little-tubiao'));
//	$(".content-right").eq(index).addClass("active").siblings().removeClass("active");
	$(".content-left").show();

	if(index == 0) {
		$('.tip-info').css("display", "block");
	} else {
		$('.tip-info').css("display", "none");
	}
})

function dunp() {
	var index = 0;
	$(".title").eq(index).addClass("active").siblings().removeClass("active");
	$(".content-right").eq(index).css("display", "block").siblings().css("display", "none");
	$(".content-left").show();
}

function junp() {
	if($('.submit-info').val()) {
		alert("感谢您的反馈，我们会及时处理！！！");
		dunp();
	} else {
		alert("请填写后再提交哟");
	}
}
window.onload = () => {
	var mus = document.getElementById("music1");
	var base = document.getElementsByClassName("sy")[0];
	let s = 0
	base.onclick = () => {

		if(s == 1) {
			base.style.background = "url(img/index/voice.png)";
			mus.play();
			s=0;
		} else {
			base.style.background = "url(img/index/quite.png)";
			mus.pause();
			s=1;
		}
		base.style.backgroundSize = "50px 50px";
	}
}


let index;
$('.little-bg').click(function(){
	index = $(this).index();
	let id= storage.getItem("name")
	let dates = JSON.parse(storage.getItem(id));
	let dou = dates.dou;
	
//let dou = 80001;
  if(index==0){
  	Tiao(0,dou,20000,2000);
  }else if(index==1){
  	Tiao(1,dou,200000,10000);
  }else if(index==2){
  	Tiao(2,dou,300000,80000);
  }else if(index==3){
  	Tiao(3,dou,-1,300000);
  }
})

function Tiao(index,dou,max,min){
	if(dou>max&&max!=-1){
		$('.tiaozhuan').css('display','block');
	}else if(dou>=min){
		window.location.href = "start.html"+"?index="+index;
	}else{
		alert('你的豆子不够此场次哟');
	}
	
}
$('.sjiClose').click(function(){
	$('.tiaozhuan').css('display','none');
})
$('.qianw').click(function(){
	window.location.href = "start.html"+"?index="+(index+1);
})
$('.speed-start').click(function(){
  window.location.href = "start.html"+"?index="+(index+1);
})