//if(!window.localStorage) {
//	alert("浏览器不支持localstorage");
//} else {
//	var storage = window.localStorage;
//	var data = {
//		"name": 'Lakers',
//		"password": '12345'
//	};
//	var d = JSON.stringify(data);
//	storage.setItem("data", d);
//}
var storage = window.localStorage;
var pro;

function login() {
	let id = $("#IDcard").val();
	let pass = $("#pass").val();
	let s = 0;
	pro = new Promise((res, rej) => {
		$.getJSON("user.json", function(data) {
			for(let i = 0; i < data.length; i++) {
				if(id == data[i].name && pass == data[i].password) {
					s = 1;
					console.log(s);
					break;
				}
			}
			res();
		});

	});
	pro = pro.then(() => {
		console.log(s);
		if(s == 1) {
			storage.setItem("name", id);
			window.location.href = "index.html";
		} else {
			$("#IDcard").val("");
			$("#pass").val("");
			alert("账号或者密码错误");
		}

	})

}

function other() {
	storage.clear();
	console.log("12456");
	storage.setItem("name", '游客123445');
	document.location  = "index.html";
}