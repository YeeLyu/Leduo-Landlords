	var storage = window.localStorage;
	let id = storage.getItem("name");
	let index = window.location.href.split("=")[1];
window.onload =()=>{
	let userdata=JSON.parse(storage.getItem(id)); 
	$("#bottom-img").attr("src",userdata.img);
	$(".dou-num").eq(1).html(userdata.dou);
	$(".username").eq(1).text(userdata.name);
	let user1=JSON.parse(storage.getItem("koko")); 
	$("#left-img").attr("src",user1.img);
	$(".dou-num").eq(0).html(user1.dou);
	$(".username").eq(0).text(user1.name);
	let user2=JSON.parse(storage.getItem("ko")); 
	$("#right-img").attr("src",user2.img);
	$(".dou-num").eq(2).html(user2.dou);
	$(".username").eq(2).text(user2.name);
  if(index==0){
  	$('.pingm').text('菜鸟场');
  	$('.di-num').text('200');
  	$('.player1_grade').text('200')
  	$('.player2_grade').text('200')
  	$('.player3_grade').text('200')
  }else if(index==1){
  	$('.pingm').text('平民场');
  	$('.di-num').text('600');
  		$('.player1_grade').text('600')
  	$('.player2_grade').text('600')
  	$('.player3_grade').text('600')
  }else if(index==2){
  	$('.pingm').text('官甲场');
  	$('.di-num').text('1000');
  	$('.player1_grade').text('1000')
  	$('.player2_grade').text('1000')
  	$('.player3_grade').text('1000')
  }else if(index==3){
  	$('.pingm').text('土豪场');
  	$('.di-num').text('2000');
  		$('.player1_grade').text('2000')
  	$('.player2_grade').text('2000')
  	$('.player3_grade').text('2000')
  }
}
