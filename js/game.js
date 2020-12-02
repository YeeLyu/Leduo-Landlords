$(function() {
	var all_play = []; //新建函数用来保存玩家数据
	//初始化player,name姓名,integeral积分,role身份,poker手上的牌,mutiple倍数,alarm_flag警报触发判断
	all_play.push({
		name: '柯南',
		integral: 100,
		role: 0,
		poker: [],
		multiple: 1,
		alarm_flag: 0
	});
	all_play.push({
		name: '小灰',
		integral: 100,
		role: 0,
		poker: [],
		multiple: 1,
		alarm_flag: 0
	});
	all_play.push({
		name: '小兰',
		integral: 100,
		role: 0,
		poker: [],
		multiple: 1,
		alarm_flag: 0
	});
	playAgain();
	var screen = $(window).width(); //获取屏幕宽度
	var deskplayer = 2; //当前玩家
	// window.screen.width 	//获取屏幕分辨率宽度
	//-----重新开始----------------------------------------			
	function playAgain() {
		$('#close').click(function() {
			window.close();
		});

		let poker110, poker66, poker88, poker31, poker32, poker33, poker999, poker422, poker42;
		var qiang = 0;
		//-----解绑事件开始----------------------------------------
		$('#boom')[0].pause();
		//开始事件清除
		$('body').off('click', '.all_poker li');
		//明牌事件清除
		$('.left').off('click', '.mingpai');
		$('.right').off('click', '.mingpai');
		//出牌事件清除
		$('.play_event').eq(0).off('click', '.play').off('click', '.no_play');
		$('.play_event').eq(1).off('click', '.play').off('click', '.no_play');
		$('.play_event').eq(2).off('click', '.play').off('click', '.no_play');
		//抢地主事件清除
		$('.button_container').eq(0).off('click', '.land_grab').off('click', 'not_call');
		$('.button_container').eq(1).off('click', '.land_grab').off('click', 'not_call');
		$('.button_container').eq(2).off('click', '.land_grab').off('click', 'not_call');
		//双击事件清除
		$('.player2_poker').off('dblclick', 'li');
		//扑克牌升起清除
		$('.player1_poker').off('click', 'li');
		$('.player2_poker').off('click', 'li');
		$('.player3_poker').off('click', 'li');
		//player2拖拽事件清除
		$('.bottom').off('mousedown');
		$('.bottom').off('mousemove');
		$('.bottom').off('mouseup');
		//提示事件清除
		$('.play_event').eq(0).off('click', '.hint');
		$('.play_event').eq(1).off('click', '.hint');
		$('.play_event').eq(2).off('click', '.hint');
		//背景音乐清除
		$('#ado').attr('src', '');

		//重置叫地主时的按钮
		$('.land_grab').attr('value', '叫地主');
		$('.not_call').attr('value', '不叫');

		//重置农民地住图片
		$('.right .name').html('');
		$('.bottom .name').html('');
		$('.left .name').html('');

		//-----解绑事件借结束----------------------------------------

		$('.alarm').hide();
		$('.player1_poker li').remove();
		$('.player2_poker li').remove();
		$('.player3_poker li').remove();
		$('.all_poker li').remove();
		$('.three_poker li').remove();
		$('.play_event').css('display', 'none');
		//重置玩家数据
		for(var i = 0; i < 3; i++) {
			all_play[i].poker = [];
			all_play[i].multiple = 1;
			all_play[i].alarm_flag = 0;
		}
		var clearTime4;
		var clearTime5;
		var xunhantt = 15;
		var click = 0; //新建变量用来记录点击扑克的次数
		var over_land_grab = false; //标志位是否抢完地主
		var ready_poker = {
			poker: [],
			type: 0,
			max: 0
		}; // 玩家准备出的牌详细内容。poker选牌具体数据，type是牌型类型，max是该牌型用于判断大小的判断值\
		var desktop_poker = {
			poker: [],
			type: 0,
			max: 0
		};
		var game_status = {
			boss: -1,
			player: -1,
			cancle: 0
		}; // 初始化当游戏的状态
		var drag = {
			flag: 0,
			start_left: 0,
			end_left: 0,
			current_left: 0,
			start_top: 0,
			end_top: 0,
			current_top: 0
		} //拖拽数据
		var over_land_grab = false; // 判断是否抢完地主
		//--------------------------
		//----------重置积分板开始---------------------------------------------------------
		//----------重置积分板结束---------------------------------------------------------

		var poker_arr = ['14_0', '15_0']; //大小boss
		for(var i = 0; i < 54; i++) {
			$('.all_poker').append('<li class="back"></li>'); //生成54个li
		}

		for(var i = 1; i < 14; i++) { //生成扑克的数据，前面代表点数，后面代表花色
			for(var j = 0; j < 4; j++) {
				poker_arr.push(i + '_' + j);
			}
		}

		/*			$('.grade').eq(1).attr('value',all_play[1].integral);
					$('.grade').eq(2).attr('value',all_play[2].integral);*/
		// count_integral();
		// 结束动画
		// function count_integral(){
		// 	$('.count').show();
		// 	$('.count').animate({top:'200px'},1200);
		// }

		//绑定点击事件
		$('body').on('click', '.all_poker li', function() {
			var n = 0;
			if(click == 0) {
				zzhang(n);
				click++;
			} else if(click == 1) { //没有点击过的时候调用洗牌函数洗牌
				clearPoker();
				click++;
			} else if(click > 1 && click < 3) { //点击过一次扑克了就调用发牌函数，给玩家发牌
				deal(0);
				click++;
				// //对玩家牌组进行排序
				sort_showPoker(all_play[0].poker);
				// sort_showPoker(all_play[1].poker);
				sort_showPoker(all_play[2].poker);

			}

			// console.log(all_play);

		});
		//背面牌先上推函数
		function zzhang(n) {
			if(n > 54) {
				return false;
			} else {
				$('.back').eq(n).animate({
					top: '' + -n + ''
				}, 300)
				n++;
				zzhang(n);
			}
		}

		var three_arr = []; //三张地主牌的数组
		//洗牌函数
		function clearPoker() {

			for(var i = 0; i < 3; i++) {

				poker_arr.sort(function(x, y) {
					return Math.random() - 0.5;
				}); //随机打乱牌的数据
			}

			//生成玩家牌组

			for(var i = 0; i < 17; i++) {
				all_play[0].poker.push(poker_arr[53 - (i * 3)]);

				all_play[1].poker.push(poker_arr[53 - (i * 3) - 1]);

				all_play[2].poker.push(poker_arr[53 - (i * 3) - 2]);

			}
			//	三张地主牌的数据
			for(var j = 0; j < 3; j++) {

				three_arr[j] = poker_arr[j];

			}
			var all_poker = $('.mid_top').html(); //把扑克数据保存起来

			$('.all_poker').remove(); //删掉ul扑克堆

			//生成三堆牌用于洗牌动画
			for(i = 0; i < 3; i++) {
				var $ul = $('<ul />').attr('class', 'all_poker').css({
					top: -i * 150 + 'px'
				});
				for(var j = 0; j < 18; j++) {
					var $li = $('<li />').attr('class', 'back').css({
						top: -j + 'px'
					});
					$ul.append($li);
				}
				$('.mid_top').append($ul);
			}

			//洗牌动画
			for(var j = 0; j < 3; j++) {
				$('.all_poker').eq(0).animate({
					left: '-300px'
				}, 300).animate({
					left: '0px'
				}, 300);
				$('.all_poker').eq(1).animate({
					left: '300px'
				}, 300).animate({
					left: '0px'
				}, 300);
			}

			setTimeout(function() {
				$('.mid_top').html(all_poker);
			}, 1800);

		}
		//发牌函数
		function deal(number) {
			if(screen > 1386) {
				//将动画2,3放1里面是为了动画衔接
				//给左边玩家发牌
				$('.all_poker li:last').animate({
					left: '-650px',
					top: '200px'
				}, 120, function() { //最后一张的动画
					$('.all_poker li:last').remove();
					//删掉盒子里的的最后一张扑克
					// console.log(screen);
					if(screen > 1386) {
						//将扑克正面传值
						var poker_html = '<li style="width: 100px; height: 150px; border-radius: 6px">' + ssPoker(all_play[0].poker[number]) + '<a href="javascript:;" class="list flip " style="background:url(img/poker/back.jpg) no-repeat; background-size:100px 150px; border-radius: 6px;"></a></li>';
					} else {
						var poker_html = '<li style="width: 80px; height: 120px; border-radius: 6px">' + ssPoker(all_play[0].poker[number]) + '<a href="javascript:;" class="list flip asd " style="background:url(img/poker/back.jpg) no-repeat; background-size:80px 120px; border-radius: 6px;"></a></li>';
					}

					// var poker_html = '<li class="back"></li>';
					$('.player1_poker').append(poker_html).css({
						top: -9 * number + 144 + 'px'
					}); //玩家1增加扑克
					if(screen > 1386) {
						$('.player1_poker li:last').css({
							top: number * 24 + 'px'
						});
					} else {
						$('.player1_poker li:last').css({
							top: number * 19 + 'px'
						});
					}

					//给中间玩家发牌
					$('.all_poker li:last').animate({
						top: '450px'
					}, 120, function() {
						$('.all_poker li:last').remove();
						var poker_html = showPoker(all_play[1].poker[number]);
						// var poker_html = '<li class="back"></li>';
						$('.player2_poker').append(poker_html).css({
							left: -9 * number + 404 + 'px'
						});
						if(screen > 1386) {
							$('.player2_poker li:last').css({
								left: number * 24 + 'px'
							});
						} else {
							$('.player2_poker li:last').css({
								left: number * 19 + 'px'
							});
						}

						//给右边玩家发牌
						$('.all_poker li:last').animate({
							left: '650px',
							top: '200px'
						}, 120, function() {
							$('.all_poker li:last').remove();
							if(screen > 1386) {
								var poker_html = '<li style="width: 100px; height: 150px; border-radius: 6px">' + ssPoker(all_play[2].poker[number]) + '<a href="javascript:;" class="list flip " style="background:url(img/poker/back.jpg) no-repeat; background-size:100px 150px; border-radius: 6px;"></a></li>';
							} else {
								var poker_html = '<li style="width: 100px; height: 150px; border-radius: 6px">' + ssPoker(all_play[2].poker[number]) + '<a href="javascript:;" class="list flip " style="background:url(img/poker/back.jpg) no-repeat; background-size:80px 120px; border-radius: 6px;"></a></li>';
							}

							// var poker_html = '<li class="back"></li>';
							$('.player3_poker').append(poker_html).css({
								top: -9 * number + 144 + 'px'
							});
							if(screen > 1386) {
								$('.player3_poker li:last').css({
									top: number * 24 + 'px'
								});
							} else {
								$('.player3_poker li:last').css({
									top: number * 19 + 'px'
								});
							}

							//重复进行发17张牌
							number++;
							if(number < 17) {
								deal(number);
							} else {
								//删除原来的li，并且加入收缩动画
								$('.player2_poker li').animate({
									left: '0px'
								}, 1000, function() {
									$('.player2_poker li').remove();
									sort_showPoker(all_play[1].poker); //执行排序事件
									//开始动画
									for(var i = 0; i < all_play[1].poker.length; i++) {
										var poker_html = showPoker(all_play[1].poker[i]);
										$('.player2_poker').append(poker_html).css({
											left: '0px'
										});
										$('.player2_poker li:first').css({
											left: '0px'
										});
									}
									$('.player2_poker').css({
										left: '261px'
									});
									//$('.play_2 li:first').css({left:'-144px'});

									for(var i = 0; i < all_play[1].poker.length; i++) {

										$('.player2_poker li').eq(i).animate({
											left: 24 * i + 'px'
										}, 1000);
									}
								});

								//----------------------------------------------------
								if(screen > 1386) {
									$('.all_poker li').eq(0).animate({
										top: '-315px'
									}, 500).animate({
										left: '-180px'
									}, 500);
									$('.all_poker li').eq(2).animate({
										top: '-315px'
									}, 500).animate({
										left: '180px'
									}, 500);
									$('.all_poker li').eq(1).animate({
										top: '-315px'
									}, 500);
								} else {
									$('.all_poker li').eq(0).animate({
										top: '-202px'
									}, 500).animate({
										left: '-142px'
									}, 500);
									$('.all_poker li').eq(2).animate({
										top: '-202px'
									}, 500).animate({
										left: '218px'
									}, 500);
									$('.all_poker li').eq(1).animate({
										top: '-202px'
									}, 500).animate({
										left: '38px'
									}, 500);
								}

								var poker_html = $('.all_poker li');

								// console.log(poker_html);

								setTimeout(function() { //三张地主牌背面的动画效果
									$('.all_poker li').remove();
									for(var i = 0; i < 3; i++)
										$('.three_poker').append('<li class="back" style="left:' + (i * 180 + 20) + 'px;"></li>');

								}, 1600);

								//叫地主

								var landlord = Math.ceil(Math.random() * 3);

								//调用抢地主函数

							}
						});
					});
				});
			} else {
				//将动画2,3放1里面是为了动画衔接
				//给左边玩家发牌
				$('.all_poker li:last').animate({
					left: '-470px',
					top: '150px'
				}, 120, function() { //最后一张的动画
					$('.all_poker li:last').remove();
					//删掉盒子里的的最后一张扑克
					// console.log(screen);
					if(screen > 1386) {
						//将扑克正面传值
						var poker_html = '<li style="width: 100px; height: 150px; border-radius: 6px">' + ssPoker(all_play[0].poker[number]) + '<a href="javascript:;" class="list flip " style="background:url(img/poker/back.jpg) no-repeat; background-size:100px 150px; border-radius: 6px;"></a></li>';
					} else {
						var poker_html = '<li style="width: 80px; height: 120px; border-radius: 6px">' + ssPoker(all_play[0].poker[number]) + '<a href="javascript:;" class="list flip asd " style="background:url(img/poker/back.jpg) no-repeat; background-size:80px 120px; border-radius: 6px;"></a></li>';
					}

					// var poker_html = '<li class="back"></li>';
					$('.player1_poker').append(poker_html).css({
						top: -9 * number + 144 + 'px'
					}); //玩家1增加扑克
					if(screen > 1386) {
						$('.player1_poker li:last').css({
							top: number * 24 + 'px'
						});
					} else {
						$('.player1_poker li:last').css({
							top: number * 19 + 'px'
						});
					}

					//给中间玩家发牌
					$('.all_poker li:last').animate({
						top: '320px'
					}, 120, function() {
						$('.all_poker li:last').remove();
						var poker_html = showPoker(all_play[1].poker[number]);
						// var poker_html = '<li class="back"></li>';
						$('.player2_poker').append(poker_html).css({
							left: -9 * number + 404 + 'px'
						});
						if(screen > 1386) {
							$('.player2_poker li:last').css({
								left: number * 24 + 'px'
							});
						} else {
							$('.player2_poker li:last').css({
								left: number * 19 + 'px'
							});
						}

						//给右边玩家发牌
						$('.all_poker li:last').animate({
							left: '500px',
							top: '150px'
						}, 120, function() {
							$('.all_poker li:last').remove();
							if(screen > 1386) {
								var poker_html = '<li style="width: 100px; height: 150px; border-radius: 6px">' + ssPoker(all_play[2].poker[number]) + '<a href="javascript:;" class="list flip " style="background:url(img/poker/back.jpg) no-repeat; background-size:100px 150px; border-radius: 6px;"></a></li>';
							} else {
								var poker_html = '<li style="width: 100px; height: 150px; border-radius: 6px">' + ssPoker(all_play[2].poker[number]) + '<a href="javascript:;" class="list flip " style="background:url(img/poker/back.jpg) no-repeat; background-size:80px 120px; border-radius: 6px;"></a></li>';
							}

							// var poker_html = '<li class="back"></li>';
							$('.player3_poker').append(poker_html).css({
								top: -9 * number + 144 + 'px'
							});
							if(screen > 1386) {
								$('.player3_poker li:last').css({
									top: number * 24 + 'px'
								});
							} else {
								$('.player3_poker li:last').css({
									top: number * 19 + 'px'
								});
							}

							//重复进行发17张牌
							number++;
							if(number < 17) {
								deal(number);
							} else {
								//删除原来的li，并且加入收缩动画
								$('.player2_poker li').animate({
									left: '0px'
								}, 1000, function() {
									$('.player2_poker li').remove();
									sort_showPoker(all_play[1].poker); //执行排序事件
									//开始动画
									for(var i = 0; i < all_play[1].poker.length; i++) {
										var poker_html = showPoker(all_play[1].poker[i]);
										$('.player2_poker').append(poker_html).css({
											left: '0px'
										});
										$('.player2_poker li:first').css({
											left: '0px'
										});
									}
									$('.player2_poker').css({
										left: '261px'
									});
									//$('.play_2 li:first').css({left:'-144px'});

									for(var i = 0; i < all_play[1].poker.length; i++) {

										$('.player2_poker li').eq(i).animate({
											left: 24 * i + 'px'
										}, 1000);
									}
								});

								//----------------------------------------------------
								if(screen > 1386) {
									$('.all_poker li').eq(0).animate({
										top: '-315px'
									}, 500).animate({
										left: '-180px'
									}, 500);
									$('.all_poker li').eq(2).animate({
										top: '-315px'
									}, 500).animate({
										left: '180px'
									}, 500);
									$('.all_poker li').eq(1).animate({
										top: '-315px'
									}, 500);
								} else {
									$('.all_poker li').eq(0).animate({
										top: '-202px'
									}, 500).animate({
										left: '-142px'
									}, 500);
									$('.all_poker li').eq(2).animate({
										top: '-202px'
									}, 500).animate({
										left: '218px'
									}, 500);
									$('.all_poker li').eq(1).animate({
										top: '-202px'
									}, 500).animate({
										left: '38px'
									}, 500);
								}

								var poker_html = $('.all_poker li');

								// console.log(poker_html);

								setTimeout(function() { //三张地主牌背面的动画效果
									$('.all_poker li').remove();
									for(var i = 0; i < 3; i++)
										$('.three_poker').append('<li class="back" style="left:' + (i * 180 + 20) + 'px;"></li>');

								}, 1600);

								//叫地主

								var landlord = Math.ceil(Math.random() * 3);

								//调用抢地主函数

								land_grab(landlord, 0, 0, 0, 0);

							}
						});
					});
				});
			}
		}

		//____明牌结束_____________________________________________________________

		function therr() { //抢完地主之后三张地主牌出现
			$('#ado').attr('src', './audio/loves me not.mp3');
			setTimeout(function() {
				$('.three_poker li').remove();
				for(var j = 0; j < 3; j++) {
					$('.three_poker').append(showPoker(three_arr[j]));
				}
				$('.three_poker li').eq(0).css({
					left: '19px'
				});
				$('.three_poker li').eq(1).css({
					left: '198px'
				});
				$('.three_poker li').eq(2).css({
					left: '379px'
				});
			}, 500);

		}

		var flag = 0; //判断是否继续执行出现抢地主按钮
		let land = document.getElementsByClassName('land_grab');
		let not_call = document.getElementsByClassName('not_call');
		for(let i = 0; i < 3; i++) {
			console.log(land[i]);
			land[i].onclick = function() {
				var woqiang = document.getElementById('woqiang');
				woqiang.play();
			}
		}
		for(let i = 0; i < 3; i++) {
			// console.log(land_grab[i]);
			not_call[i].onclick = function() {
				var buqiang = document.getElementById('buqiang');
				buqiang.play();
			}
		}
		//抢地主函数
		function land_grab(landlord, call, a, b, c) { //landlord:随机出现第一个抢地主的人	//a,b,c:分别判断玩家1，2,3抢地主情况 //call:判断是否叫完地主可以开始抢地主
			if(call > 0) {
				$('.land_grab').attr('value', '抢地主');
				$('.not_call').attr('value', '不抢');
			}
			//判断地主
			if(a == -1 && b == -1 && c == -1) {

				setTimeout(function() {
					$('.tip-play1').text('')
					$('.tip-play2').text('')
					$('.tip-play3').text('')
					alert('重新发牌');
				}, 1000)

				flag = 1;
				playAgain();

				// deal();
				return false;
			}
			if(a == 2) {

				game_status.boss = 0;
				game_status.player = 0;
				all_play[0].multiple = all_play[0].multiple * 2;
				$('.mom').eq(0).attr('value', all_play[0].multiple * 2);
				giveLandGrab();
				flag = 1;
				therr();
				return landlord;
			}
			if(b == 2) {
				game_status.boss = 1;
				game_status.player = 1;
				all_play[1].multiple = all_play[1].multiple * 2;
				$('.mom').eq(1).attr('value', all_play[1].multiple * 2);
				giveLandGrab();
				flag = 1;
				therr();
				return landlord;
			}
			if(c == 2) {
				game_status.boss = 2;
				game_status.player = 2;
				all_play[2].multiple = all_play[2].multiple * 2;
				$('.mom').eq(2).attr('value', all_play[2].multiple * 2);
				giveLandGrab();
				flag = 1;
				therr();
				return landlord;
			}
			if(a == 1 && b == -1 && c == -1) {
				game_status.boss = 0;
				game_status.player = 0;
				all_play[0].multiple = all_play[0].multiple * 2;
				$('.mom').eq(0).attr('value', all_play[0].multiple * 2);
				giveLandGrab();
				flag = 1;
				therr();
				return landlord;
			}
			if(a == -1 && b == 1 && c == -1) {
				game_status.boss = 1;
				game_status.player = 1;
				all_play[1].multiple = all_play[1].multiple * 2;
				$('.mom').eq(1).attr('value', all_play[1].multiple * 2);
				giveLandGrab();
				flag = 1;
				therr();
				return landlord;
			}
			if(a == -1 && b == -1 && c == 1) {
				game_status.boss = 2;
				game_status.player = 2;
				all_play[2].multiple = all_play[2].multiple * 2;
				$('.mom').eq(2).attr('value', all_play[2].multiple * 2);
				giveLandGrab();
				flag = 1;
				therr();
				return landlord;
			}

			//输出谁是地主------------------------------------------------------------------------
			if(landlord == 1) {
				if(b == -1) {
					landlord = 3;
				} else {
					landlord = 2;
				}
				$('.call_clock').eq(0).attr('value', '7');

				//添加计时
				var clearTime1 = setInterval(function() {
					$('.tip-play3').text('')
					$('.tip-play2').text('')

					var time = $('.call_clock').eq(0).attr('value');
					$('.call_clock').eq(0).attr('value', time - 1);
					if(time == 0) {
						$('.not_call').eq(0).trigger("click");
					}
					console.log(time);
				}, 1000);

				//绑定叫地主事件
				$('.button_container').eq(0).show().on('click', '.land_grab', function() {
					qiang++;
					if(flag == 0) {
						call++;
						a++;
						showmultiple(); //调用积分翻倍函数
						$('.button_container').eq(0).hide(); //隐藏按钮

						$('.tip-play1').text($(this).val())
						// landlord=2;
						clearInterval(clearTime1);
						return land_grab(landlord, call, a, b, c); //返回函数，重新再调用
					}

					//绑定不叫事件
				}).on('click', '.not_call', function() {
					if(flag == 0) {
						a = -1;
						$('.button_container').eq(0).hide();
						$('.tip-play1').text($(this).val())
						// landlord=2;
						clearInterval(clearTime1);
						return land_grab(landlord, call, a, b, c);
					}
				});

			} else if(landlord == 2) {
				if(c == -1) {
					landlord = 1;
				} else {
					landlord = 3;
				}

				$('.call_clock').eq(1).attr('value', '7');

				//添加计时
				var clearTime2 = setInterval(function() {
					$('.tip-play1').text('')
					$('.tip-play3').text('')
					var time2 = $('.call_clock').eq(1).attr('value');
					$('.call_clock').eq(1).attr('value', time2 - 1);
					if(time2 == 0) {
						$('.not_call').eq(1).trigger("click");
					}
				}, 1000);

				//绑定叫地主事件
				$('.button_container').eq(1).show().on('click', '.land_grab', function() {
					qiang++;
					if(flag == 0) {
						call++;
						b++;
						showmultiple(); //调用积分翻倍函数
						$('.button_container').eq(1).hide();
						$('.tip-play2').text($(this).val())
						// landlord=3;
						clearInterval(clearTime2);
						return land_grab(landlord, call, a, b, c);
					}

					//绑定不叫事件	
				}).on('click', '.not_call', function() {
					if(flag == 0) {
						b = -1;
						$('.button_container').eq(1).hide();
						$('.tip-play2').text($(this).val())
						// landlord=3;
						clearInterval(clearTime2);
						return land_grab(landlord, call, a, b, c);
					}
				});
			} else {
				if(a == -1) {
					landlord = 2;
				} else {
					landlord = 1;
				}

				$('.call_clock').eq(2).attr('value', '7');

				// 添加计时

				var clearTime3 = setInterval(function() {
					$('.tip-play1').text('')
					$('.tip-play2').text('')
					var time = $('.call_clock').eq(2).attr('value');
					$('.call_clock').eq(2).attr('value', time - 1);
					if(time == 0) {
						$('.not_call').eq(2).trigger("click");
					}
				}, 1000);

				//绑定叫地主事件
				$('.button_container').eq(2).show().on('click', '.land_grab', function() {
					qiang++;
					if(flag == 0) {
						call++;
						c++;
						showmultiple(); //调用积分翻倍函数
						$('.button_container').eq(2).hide();
						$('.tip-play3').text($(this).val())
						// landlord=1;
						clearInterval(clearTime3);
						return land_grab(landlord, call, a, b, c);

					}

					//绑定不叫事件
				}).on('click', '.not_call', function() {
					if(flag == 0) {
						c = -1;
						$('.button_container').eq(2).hide();
						$('.tip-play3').text($(this).val())
						// landlord=1;
						clearInterval(clearTime3);
						return land_grab(landlord, call, a, b, c);
					}

				});
			}
		}
		//给地主牌
		function giveLandGrab() {
			$('.button_container').hide(); //所有抢地主按钮隐藏

			for(var i = 0; i < 3; i++) {
				all_play[game_status.boss].poker.push(three_arr[i]);
			}
			console.log(game_status.boss);
			// console.log('.player'+(game_status.boss+1)+'_poker');
			/*console.log()*/
			sort_showPoker(all_play[game_status.boss].poker);
			refresh_poker('.player' + (game_status.boss + 1) + '_poker', all_play[game_status.boss].poker);

			over_land_grab = true; //抢完地主后就可以出牌
			//添加出牌按钮

			//让地主出牌按钮出现
			$('.play_event').eq(game_status.boss).show();

			clearTime4 = setInterval(function() {
				$('.tip-play1').text('')
				$('.tip-play2').text('')
				$('.tip-play3').text('')
				$('.play_clock').eq(game_status.boss).attr('value', xunhantt - 1);
				xunhantt--;
				if(xunhantt == 0) {
					clearInterval(clearTime4);
					playerHint('top', '-10px');
					$('.play').eq(game_status.boss).trigger("click");
					if(deskplayer == 2) {
						// console.log(game_status.player)
						xunhantt = 15;
					} else {
						xunhantt = 3;
						// console.log(game_status.player)
					}
				}
			}, 1000);
		}
		//绑定player1出牌事件

		$('.play_event').eq(0).on('click', '.play', function() {
			clearInterval(clearTime4);
			clearInterval(clearTime5);
			deskplayer = 2;
			play(1);
			if((all_play[0].poker.length - ready_poker.poker.length) <= 3) {

				$('.left_alarm').show();
			}
		}).on('click', '.no_play', function() {
			clearInterval(clearTime4);
			clearInterval(clearTime5);
			deskplayer = 2;
			noPlay(1);
		});
		//绑定player2出牌事件
		$('.play_event').eq(1).on('click', '.play', function() {
			clearInterval(clearTime4);
			clearInterval(clearTime5);
			deskplayer = 3;
			play(2);
			if((all_play[1].poker.length - ready_poker.poker.length) <= 3) {

				$('.bottom_alarm').show();
			}
		}).on('click', '.no_play', function() {
			clearInterval(clearTime4);
			clearInterval(clearTime5);
			deskplayer = 3;
			noPlay(2);
		});
		//绑定player3出牌事件
		$('.play_event').eq(2).on('click', '.play', function() {
			clearInterval(clearTime4);
			clearInterval(clearTime5);
			deskplayer = 1;
			play(3);
			if((all_play[2].poker.length - ready_poker.poker.length) <= 3) {

				$('.right_alarm').show();
			}

		}).on('click', '.no_play', function() {
			clearInterval(clearTime4);
			clearInterval(clearTime5);
			deskplayer = 1;
			noPlay(3);
		});
		/*
			0   无效牌型
			1 	单张
			2   对子
			110 王炸
			66  顺子
			88 	连对
			31  3带1
			32  3带2
			33  飞机
			999 普通炸蛋
			422 4带一对
			42  4带2
		 */
		//绑定出牌事件
		function play() {
			console.log("玩家" + deskplayer + "出牌了");
			// console.log(all_play[0].poker.length, all_play[1].poker.length, all_play[2].poker.length)
			/*		clearInterval(clearTime5);
					clearInterval(clearTime6);*/

			if(deskplayer == 2) {
				var manbig = document.getElementById('manbig');
				manbig.play();
				// console.log(game_status.player)
				xunhantt = 15;

			} else {
				var ibig = document.getElementById("ibig");
				ibig.play();
				xunhantt = 3;
				// console.log(game_status.player)
			}
			if(!checkPoker(ready_poker.poker)) {
				clearTime5 = setInterval(showClock, 1000);
				//				$('.a1').addClass('alert').html('你不是小学二年级！');
				$('.unreasonable').css('display', 'block');
				setTimeout(function() {
					//					$('.a1').addClass('a2');
					//					$('.a1').removeClass('alert');
					//					setTimeout(function () {
					//						$('.un-get').css('display','none');
					////						$('.a1').removeClass('a2').html('');
					//					}, 1000)
					$('.unreasonable').css('display', 'none');
				}, 1500)
				return false;
			} else if(!pokerVs()) {
				clearTime5 = setInterval(showClock, 1000);
				//				$('.a1').addClass('alert').html('你的智商没有人家高！');

				$('.un-get').css('display', 'block');

				setTimeout(function() {
					//					$('.a1').addClass('a2');
					//					$('.a1').removeClass('alert');
					//					setTimeout(function () {
					////						$('.a1').removeClass('a2').html('');
					//					}, 1000)
					$('.un-get').css('display', 'none');
				}, 1500)
				return false;
			}

			if(ready_poker.type == 66) {
				clearTimeout(poker66)
				$('.bbj').addClass('bjj');
				$('.show-img').css('background', 'url(img/game/顺子.png)')
				$('.show-img').css('background-repeat', 'no-repeat')
				$('.show').css("display", "block")
				//				$('.bjj').html('顺子');
				poker66 = setTimeout(function() {
					$('.show').css("display", "none")
					$('.bbj').removeClass('bjj');
					$('.bbj').html('');
				}, 3000)
				$('.sz img').animate({
					'marginLeft': '-100%'
				}, 8000, function() {
					$('.sz img').css('marginLeft', '100%')
				})
			} else if(ready_poker.type == 33) {
				clearTimeout(poker33)
				$('.bbj').addClass('bjj');
				$('.show-img').css('background', 'url(img/game/飞机.png)')
				$('.show-img').css('background-repeat', 'no-repeat')
				$('.show').css("display", "block")
				poker33 = setTimeout(function() {
					$('.show').css("display", "none")
					$('.bbj').removeClass('bjj');
					$('.bbj').html('');
				}, 3000)
			} else if(ready_poker.type == 999) {
				$('.yh').removeClass('yinghua');
				clearTimeout(poker999)
				showmultiple();
				$('.booo').addClass('boom');
				//				$('.bbj').addClass('bjj');
				//				$('.bbj').html('炸弹');
				$('#boom')[0].play();
				$('body').addClass('main');
				$('.right').addClass('right_1');
				$('.score').addClass('score_1');
				poker999 = setTimeout(function() {
					$('.booo').removeClass('boom');
					//					$('.bbj').removeClass('bjj');
					//					$('.bbj').html('');
					$('body').removeClass('main');
					$('.right').removeClass('right_1');
					$('.score').removeClass('score_1');
					$('.yh').addClass('yinghua');
				}, 3000)

			} else if(ready_poker.type == 110) {
				showmultiple();

				$('.bos').addClass('boss');
				//				$('.bbj').addClass('bjj');
				//				$('.bjj').html('王炸');
				$('.yh').removeClass('yinghua');
				setTimeout(function() {
					$('.bos').removeClass('boss');
					//					$('.bbj').removeClass('bjj');
					//					$('.bbj').html('');
					$('.yh').addClass('yinghua');
				}, 10000)
			} else if(ready_poker.type == 88) {
				clearTimeout(poker88)
				$('.bbj').addClass('bjj');
				$('.show-img').css('background', 'url(img/game/连对.png)')
				$('.show-img').css('background-repeat', 'no-repeat')
				$('.show').css("display", "block")
				poker88 = setTimeout(function() {
					$('.show').css("display", "none")
					$('.bbj').removeClass('bjj');
					$('.bbj').html('');
				}, 3000)
			} else if(ready_poker.type == 31) {
				clearTimeout(poker31)
				$('.bbj').addClass('bjj');
				$('.show-img').css('background', 'url(img/game/三带一.png)')
				$('.show-img').css('background-repeat', 'no-repeat')
				$('.show').css("display", "block")
				$('.show').css({
					'top': '50%',
					'left': '50%',
					'transform': 'translateX(-200px) translateY(-150px)'
				});
				poker31 = setTimeout(function() {
					$('.show').css("display", "none")
					$('.bbj').removeClass('bjj');
					//					$('.bbj').html('');
				}, 3000)

			} else if(ready_poker.type == 32) {
				clearTimeout(poker32)
				$('.bbj').addClass('bjj');
				$('.show-img').css('background', 'url(img/game/三带一对.png)')
				$('.show-img').css('background-repeat', 'no-repeat')
				$('.show').css({
					'top': '50%',
					'left': '50%',
					'transform': 'translateX(-200px) translateY(-150px)'
				});
				$('.show').css("display", "block")
				poker32 = setTimeout(function() {
					$('.show').css("display", "none")
					$('.bbj').removeClass('bjj');
					//					$('.bbj').html('');
				}, 3000)

			} else if(ready_poker.type == 422) {
				clearTimeout(poker422)
				$('.bbj').addClass('bjj');
				$('.show-img').css('background', 'url(img/game/四带一对.png)')
				$('.show-img').css('background-repeat', 'no-repeat')
				$('.show').css({
					'top': '50%',
					'left': '50%',
					'transform': 'translateX(-200px) translateY(-150px)'
				});
				$('.show').css("display", "block")
				poker422 = setTimeout(function() {
					$('.show').css("display", "none")
					$('.bbj').removeClass('bjj');
					//					$('.bbj').html('');
				}, 3000)
			} else if(ready_poker.type == 42) {
				clearTimeout(poker42)
				$('.bbj').addClass('bjj');
				$('.show-img').css('background', 'url(img/game/四带二.png)')
				$('.show-img').css('background-repeat', 'no-repeat')
				$('.show').css({
					'top': '50%',
					'left': '50%',
					'transform': 'translateX(-200px) translateY(-130px)'
				});
				$('.show').css("display", "block")
				poker42 = setTimeout(function() {
					$('.show').css("display", "none")
					$('.bbj').removeClass('bjj');
					//					$('.bbj').html('');
				}, 3000)
			}

			//----剩三张判断-------------------------------

			//----剩三张判断-------------------------------

			desktop_poker.type = ready_poker.type;
			desktop_poker.max = ready_poker.max;
			desktop_poker.poker = [];

			for(var i = 0; i < ready_poker.poker.length; i++) {
				desktop_poker.poker.push(ready_poker.poker[i]);
				for(var j = 0; j < all_play[game_status.player].poker.length; j++) {
					if(ready_poker.poker[i] == all_play[game_status.player].poker[j]) {
						$('.player' + (game_status.player + 1) + '_poker' + ' li').eq(j).remove();
						all_play[game_status.player].poker.splice(j, 1);
					}
					refresh_poker('.player' + (game_status.player + 1) + '_poker', all_play[game_status.player].poker);
				}
			}
			//调用检查牌的类型的方法
			//console.log('类型：' + ready_poker.type + ',最大值：' + ready_poker.max);

			//调用出牌方法
			showCard('.all_poker', ready_poker.poker);

			//判断玩家手牌是否剩3张
			if(all_play[game_status.player].alarm_flag == 0) {
				if(all_play[game_status.player].poker.length <= 3) {
					$('.alarm').eq(game_status.player).show();
					all_play[game_status.player].alarm_flag = 1;
				}
			}
			//判断是否是赢了
			if(all_play[game_status.player].poker.length == 0) {
				//-----------积分加减开始----------------------------------------------------------------------------
				var storage = window.localStorage;
				clearRe()
				var user2 = storage.getItem("name");
				var user1 = JSON.parse(storage.getItem("ko"));
				var user3 = JSON.parse(storage.getItem("koko"));
			
				$('.result-all').css('display', 'block')
			  let index = window.location.href.split("=")[1];
				
				if(game_status.player == game_status.boss) {
					//地主赢了	} else if(index == 3) {
			

					//	$('.result').attr('value', '地主胜');
					if(game_status.boss == 1) {
						$('.win-bg').css('display', 'block')
						$('.win-record .dz').css('display', 'block')
						$('.win-bg .player_beans').eq(1).text($('.di-num').text() * qiang * 2)
						let pN2=$('.di-num').text() * qiang * 2;
						
						$('.win-bg .player_beans').eq(0).text(-($('.di-num').text() * qiang))
						let pN1= -($('.di-num').text() * qiang);
						$('.win-bg .player_beans').eq(2).text(-($('.di-num').text() * qiang))
						let pN3= -($('.di-num').text() * qiang);
						$('.win-bg .usernames').eq(1).text(user2)
						$('.win-bg .usernames').eq(0).text(user1.name)
						$('.win-bg .usernames').eq(2).text(user3.name)
						
						$('.dou-num').eq(0).text(($('.dou-num').eq(0).text())*1+pN1*1)
						$('.dou-num').eq(1).text(($('.dou-num').eq(1).text())*1+pN2*1)
						$('.dou-num').eq(2).text(($('.dou-num').eq(2).text())*1+pN3*1)
						
						
					
						$('.win-bg .dz-icon').eq(1).css('display','block');
					} else {
						$('.lose-bg').css('display', 'block')
						$('.lose-record .nm').css('display', 'block')
						
						
						let reDou1,reDou2;
						for(let i = 0; i < 3; i++) {
							if(game_status.boss == i) {
								
								 $('.lose-bg .player_beans').eq(i).text($('.di-num').text() * qiang * 2)
								 reDou1 =$('.di-num').text() * qiang * 2;
							  $('.dou-num').eq(i).text(($('.dou-num').eq(i).text())*1+reDou1*1)
							  $('.lose-bg .dz-icon').eq(i).css('display','block');
							} else {
								$('.lose-bg .player_beans').eq(i).text(-($('.di-num').text() * qiang))
								reDou2=-($('.di-num').text() * qiang)
							  $('.dou-num').eq(i).text(($('.dou-num').eq(i).text())*1+reDou2*1)
							}
						}
						
						$('.lose-bg .usernames').eq(1).text(user2)
						$('.lose-bg .usernames').eq(0).text(user1.name)
						$('.lose-bg .usernames').eq(2).text(user3.name)
            
						//        
						//					for(var i = 0; i < 3; i++) {
						//						if(i == game_status.boss) {
						//							$('.dz-icon').eq(i).css('display','block');
						//							$('.player_beans').eq(i).text($('.di-num').text()*qiang*2)
						////							console.log("地主赢了play2+6000豆子");
						//						} else {
						//							$('.player_beans').eq(i).text(-($('.di-num').text()*qiang))
						////							console.log("play"+(i+1)+"输了-3000豆子");
						//						}
						//					}
						//地主输了
					}
				} else {
					if(game_status.boss == 1) {
						$('.lose-bg').css('display', 'block')
						$('.lose-record .dz').css('display', 'block')
						$('.lose-bg .player_beans').eq(1).text(-($('.di-num').text() * qiang * 2))
						$('.lose-bg .player_beans').eq(0).text($('.di-num').text() * qiang)
						$('.lose-bg .player_beans').eq(2).text($('.di-num').text() * qiang)
						let loseDou2 = -($('.di-num').text() * qiang * 2);
						let loseDou1 = $('.di-num').text() * qiang
						let loseDou3 = $('.di-num').text() * qiang;
						$('.lose-bg .usernames').eq(1).text(user2)
						$('.lose-bg .usernames').eq(0).text(user1.name)
						$('.lose-bg .usernames').eq(2).text(user3.name)
						
						$('.dou-num').eq(0).text(($('.dou-num').eq(0).text())*1+loseDou1*1)	
						
						$('.dou-num').eq(1).text(($('.dou-num').eq(1).text())*1+loseDou2*1)
						$('.dou-num').eq(2).text(($('.dou-num').eq(2).text())*1+loseDou3*1)
						
					
						$('.lose-bg .dz-icon').eq(1).css('display','block');
					} else {
						$('.win-bg').css('display', 'block')
						$('.win-record .nm').css('display', 'block')
					
						let winDou1,winDou2;
						for(let i = 0; i < 3; i++) {
							if(game_status.boss == i) {
								 $('.win-bg .player_beans').eq(i).text(-($('.di-num').text() * qiang * 2))
								 winDou1 =-($('.di-num').text() * qiang * 2)
							  $('.dou-num').eq(i).text(($('.dou-num').eq(i).text())*1+winDou1*1)
							  $('.win-bg .dz-icon').eq(i).css('display','block');
							} else {
								 $('.win-bg .player_beans').eq(i).text($('.di-num').text() * qiang)
								 winDou2 =$('.di-num').text() * qiang;
							  $('.dou-num').eq(i).text(($('.dou-num').eq(i).text())*1+winDou2*1)
							}
						}
						
						$('.win-bg .usernames').eq(1).text(user2)
						$('.win-bg .usernames').eq(0).text(user1.name)
						$('.win-bg .usernames').eq(2).text(user3.name)
						
					}
				}

          storage = window.localStorage;
           
        	let userdata1=JSON.parse(storage.getItem(storage.getItem("name"))); 
        	let users1=JSON.parse(storage.getItem("koko"));
        	let users2=JSON.parse(storage.getItem("ko"));
        	
        if(index == 0) {
					for(let i=0;i<6;i++){
						$('.player_grade').eq(i).text('200')
					}
				} else if(index == 1) {
					
					for(let i=0;i<6;i++){
						$('.player_grade').eq(i).text('600')
					}
				} else if(index == 2) {

					for(let i=0;i<6;i++){
						$('.player_grade').eq(i).text('1000')
					}
					
					for(let i=0;i<6;i++){
						$('.player_grade').eq(i).text('2000')
					}
				}
        $('.closs').click(function(){
        	playAgain();
        	clearRe()
        })
         $('.continue-btn').click(function(){
        	playAgain();
        	clearRe()
        })
        
//				$('.over').on('click', '#continue', function() {
//					$('.over').removeClass('over_1');
//					$('.over_2').removeClass('conceal');
//					$('.over_3').removeClass('count');
//					
//				});
				////______判断是否已特殊的牌型结尾____________________________________________________				
				return false;
			}

			function clearRe() {
				$('.result-all').css('display', 'none')
				$('.lose-bg').css('display', 'none')
				$('.lose-record .dz').css('display', 'none')
				$('.lose-record .dz').css('display', 'none')
				$('.win-bg').css('display', 'none')
				$('.win-record .dz').css('display', 'none')
				$('.win-record .dz').css('display', 'none')
				$('.win-bg .dz-icon').css('display','none')
				$('.lose-bg .dz-icon').css('display','none')
			}
			$('.play_event').eq(game_status.player).hide();
			clearInterval(clearTime5);
			if(game_status.player == 2) {
				game_status.player = 0;
			} else {
				game_status.player++;
			}
			clearInterval(clearTime5);
			$('.play_event').eq(game_status.player).show();
			if(deskplayer == 2) {
				$('.play_clock').eq(game_status.player).attr('value', "15");
			} else {
				$('.play_clock').eq(game_status.player).attr('value', "3");
			}

			//计时器执行
			clearTime5 = setInterval(showClock, 1000);
			ready_poker = {
				poker: [],
				type: 0,
				max: 0
			};
			game_status.cancle = 0;
		}
		//绑定不出牌事件
		function noPlay(cardIndex) {
			// clearInterval(clearTime5);
			// clearInterval(clearTime6);
			console.log("玩家" + cardIndex + "不出");
			if(deskplayer == 2) {
				// console.log(game_status.player)
				xunhantt = 15;
				var manbuyao = document.getElementById("manbuyao");
				manbuyao.play();
			} else {
				var sorry = document.getElementById("sorry");
				sorry.play();
				xunhantt = 3;
				// console.log(game_status.player)
			}
			// clearInterval(clearTime);
			if(desktop_poker.type == 0) {

				clearTime5 = setInterval(showClock, 1000);
				//				$('.a1').addClass('alert').html('你必须要出一张！')     
				$('.unreasonable').css('display', 'block');

				setTimeout(function() {
					//					$('.a1').addClass('a2');
					//					$('.a1').removeClass('alert');
					//					setTimeout(function () {
					//						$('.a1').removeClass('a2').html('');
					//					}, 1000)
					$('.unreasonable').css('display', 'none');
				}, 1500)
				return false;
			} else {

				// sorry.src = 'audio/sorry.mp3'

				if(cardIndex == 1) {
					$('.tip-play1').text('要不起');
				} else if(cardIndex == 2) {
					$('.tip-play2').text('要不起');
				} else if(cardIndex == 3) {
					$('.tip-play3').text('要不起');
				}
				game_status.cancle += 1;
				if(game_status.cancle == 2) {
					$('.un-get').css('display', 'none');
					desktop_poker = {
						type: 0,
						max: 0,
						poker: []
					};
				}

				setTimeout(function() {
					$('.tip-play1').text('');
					$('.tip-play2').text('');
					$('.tip-play3').text('');
				}, 2000)
			}
			refresh_poker('.player' + (game_status.player + 1) + '_poker', all_play[game_status.player].poker);
			ready_poker = {
				poker: [],
				type: 0,
				max: 0
			};
			$('.play_event').eq(game_status.player).hide();
			clearInterval(clearTime5);
			if(game_status.player == 2) {
				game_status.player = 0;
			} else {
				game_status.player++;
			}
			$('.play_event').eq(game_status.player).show();
			$('.play_clock').eq(game_status.player).attr('value', 3);
			//-------------------------------------------------------------

			//计时器执行
			clearTime5 = setInterval(showClock, 1000);
		}
		//==========计时函数开始=================================================
		function showClock() {
			console.log("玩家" + deskplayer + "正在出牌");
			$('.play_clock').eq(game_status.player).attr('value', xunhantt - 1);
			xunhantt--;

			if(xunhantt == 0) {
				if(deskplayer == 2) {
					// console.log(game_status.player)
					xunhantt = 15;
				} else {
					xunhantt = 3;
					// console.log(game_status.player)
				}

				if(game_status.cancle == 2) {

					if(game_status.player == 1) {
						playerHint('top', '-10px');
						$('.play').eq(game_status.player).trigger("click");
					} else if(game_status.player == 0) {
						playerHint('left', '10px');
						$('.play').eq(game_status.player).trigger("click");
					} else {
						playerHint('left', '-10px');
						$('.play').eq(game_status.player).trigger("click");
					}

				} else {

					if(game_status.player == 1) {
						if(playerHint('top', '-10px')) {
							$('.play').eq(game_status.player).trigger("click");
						} else {
							$('.no_play').eq(game_status.player).trigger("click");
						}
					} else if(game_status.player == 0) {
						if(playerHint('left', '10px')) {
							$('.play').eq(game_status.player).trigger("click");
						} else {
							$('.no_play').eq(game_status.player).trigger("click");
						}
					} else {
						if(playerHint('left', '-10px')) {
							$('.play').eq(game_status.player).trigger("click");
						} else {
							$('.no_play').eq(game_status.player).trigger("click");
						}

					}

				}
			}
			// console.log(xunhantt);
		}
		//==========计时函数结束=================================================
		//将牌移到出牌区域
		function showCard(play, play_poker) {
			$(play + ' li').remove();
			for(var i = 0; i < play_poker.length; i++) {
				var poker_html = showPoker(play_poker[i]);
				$(play).append(poker_html).css({
					left: -9 * i + 'px'
				});
				$(play + ' li:last').css({
					left: i * 18 + 'px'
				});
			}
		}
		//玩家二双击事件
		$('.player2_poker').on('dblclick', 'li', function() {
			play();
		});

		//player1点击事件
		$('.player1_poker').on('click', 'li', function() {
			if(over_land_grab && game_status.player == 0) {
				var left = $(this).css('left');
				if(left != '10px') {
					$(this).css({
						left: '10px'
					});
					// alert($(this).attr('data-value'));
					ready_poker.poker.push($(this).attr('data-value'));
					sort_showPoker(ready_poker.poker);
					console.log(ready_poker.poker);
				} else {
					$(this).css({
						left: '0px'
					});
					var index = ready_poker.poker.indexOf($(this).attr('data-value'));
					ready_poker.poker.splice(index, 1);
					console.log(ready_poker.poker);
				}
			}
		});

		// 绑定player2点击事件
		$('.player2_poker').on('click', 'li', function() {
			if(over_land_grab && game_status.player == 1) {
				var top = $(this).css('top');
				if(top != '-10px') { //如果没有往上移,点击则往上移
					$(this).css({
						top: '-10px'
					});
					ready_poker.poker.push($(this).attr('data-value'));
					sort_showPoker(ready_poker.poker);
					//					console.log(ready_poker.poker);
				} else { //如果往上移了，则点击就下来
					$(this).css({
						top: '0px'
					});
					var index = ready_poker.poker.indexOf($(this).attr('data-value'));
					ready_poker.poker.splice(index, 1);
					console.log(ready_poker.poker);
				}
			}
		});

		//player1点击事件
		$('.player3_poker').on('click', 'li', function() {
			if(over_land_grab && game_status.player == 2) {
				var left = $(this).css('left');
				if(left != '-10px') {
					$(this).css({
						left: '-10px'
					});
					// alert($(this).attr('data-value'));
					ready_poker.poker.push($(this).attr('data-value'));
					sort_showPoker(ready_poker.poker);
					console.log(ready_poker.poker);
				} else {
					$(this).css({
						left: '0px'
					});
					var index = ready_poker.poker.indexOf($(this).attr('data-value'));
					ready_poker.poker.splice(index, 1);
					console.log(ready_poker.poker);
				}
			}
		});

		//play_2拖拽事件
		$('.bottom').mousedown(function(e) {
			if(over_land_grab && game_status.player == 1) {
				drag.start_left = e.pageX;
				drag.flag = 1; //判断是否按着鼠标
				$('.bottom').mousemove(function(e) {
					if(drag.flag == 1) {
						drag.end_left = e.pageX; //获取鼠标与mid_buttom的做偏移量
						for(var i = 0; i < all_play[1].poker.length; i++) {
							drag.current_left = $('.player2_poker li').eq(i).offset().left; //循环判断每一个li的left值是否在拖拽的范围内
							if(drag.current_left <= drag.start_left && drag.current_left >= drag.end_left || drag.current_left >= drag.start_left && drag.current_left <= drag.end_left) {
								$('.player2_poker li').eq(i).find('div').css({
									opacity: '0.3'
								}); //如果在范围内则变颜色
							} else {
								$('.player2_poker li').eq(i).find('div').css({
									opacity: '0'
								});
							}
						}
					}

				});
				return false;
			}
		});

		$('.bottom').mouseup(function(e) {
			if(over_land_grab && game_status.player == 1) {
				drag.flag = 0; //当鼠标松开时，不再执行移动时的事件
				drag.end_left = e.pageX; //获取结束时鼠标的左偏移量
				for(var i = 0; i < all_play[1].poker.length; i++) {
					drag.current_left = $('.player2_poker li').eq(i).offset().left; //循环获取每个li的左偏移量
					var top = $('.player2_poker li').eq(i).css('top');
					if(drag.current_left <= drag.start_left && drag.current_left >= drag.end_left || drag.current_left >= drag.start_left && drag.current_left <= drag.end_left) { //如果li在开始和结束之间改变自身的高度，并且颜色变回原来
						if(top != '-10px') {
							$('.player2_poker li').eq(i).find('div').eq(0).css({
								opacity: '0'
							});
							$('.player2_poker li').eq(i).css({
								top: '-10px'
							});
							ready_poker.poker.push($('.player2_poker li').eq(i).attr('data-value'));
							sort_showPoker(ready_poker.poker);
						} else if(top == '-10px') {
							$('.player2_poker li').eq(i).find('div').eq(0).css({
								opacity: '0'
							});
							$('.player2_poker li').eq(i).css({
								top: '0px'
							});
							var index = ready_poker.poker.indexOf($('.player2_poker li').eq(i).attr('data-value'));
							ready_poker.poker.splice(index, 1);
						}
					}
				}
			}
		});

		//加载牌面的数据
		function showPoker(poker) {
			// var poker_arr = poker.split ('_');
			if(screen > 1386) {
				return '<li style="width: 100px; height: 150px; background: url(./img/poker/' + poker + '.jpg) no-repeat; background-size:100px 150px; border-radius: 6px;" data-value="' + poker + '"><div class="frame"></div></li>';
			} else {
				return '<li style="width: 80px; height: 120px; background: url(./img/poker/' + poker + '.jpg) no-repeat; background-size:80px 120px; border-radius: 6px;" data-value="' + poker + '"><div class="frame" style="width:80px; height:120px"></div></li>';
			}
		}

		function ssPoker(poker) {
			if(screen > 1386) {
				return '<a href="javascript:;" class="list flip out" style="background: url(./img/poker/' + poker + '.jpg) no-repeat; background-size:100px 150px; border-radius: 6px;" data-value="' + poker + '"></a>'
			} else {
				return '<a href="javascript:;" class="list flip out" style="background: url(./img/poker/' + poker + '.jpg) no-repeat; background-size:80px 120px; border-radius: 6px;" data-value="' + poker + '"></a>'
			}

		}
		//刷新牌堆
		function refresh_poker(play, play_poker) {
			$(play + ' li').remove(); //删掉原牌堆
			// console.log(play_poker);
			for(var i = 0; i < play_poker.length; i++) { //重新添加牌
				var poker_html = showPoker(play_poker[i]);
				if(game_status.player == 1) { //玩家为2的时候
					$(play).append(poker_html).css({
						left: -9 * i + 404 + 'px'
					});
					if(screen > 1386) {
						$(play + ' li:last').css({
							left: i * 24 + 'px'
						});
					} else {
						$(play + ' li:last').css({
							left: i * 19 + 'px'
						});
					}

				} else { //玩家为1跟3的时候
					$(play).append('<li style="width: 100px; height: 150px; border-radius: 6px">' + '<a href="javascript:;" class="list flip " style="background:url(img/poker/back.jpg) no-repeat; background-size:100px 150px; border-radius: 6px;"></a></li>').css({
						top: -9 * i + 144 + 'px'
					});
					if(screen > 1386) {
						$(play + ' li:last').css({
							top: i * 24 + 'px'
						});
					} else {
						$(play + ' li:last').css({
							top: i * 19 + 'px'
						});
					}

				}

			}
		}
		//对玩家的牌的数据进行排序
		function sort_showPoker(play_poker) {
			//获取点数的值k
			function getCount(count) {
				var index = count.indexOf('_'); //以—分界拿到扑克点数
				var x = count.substr(0, index); //截取扑克的点数
				return x;
			}

			//获取花色
			function getFace(face) {
				var index = face.indexOf('_'); //截取扑克的花色
				var x = face.substring(index + 1, index + 2);
				return x;
			}
			//进行排序
			play_poker.sort(function(x, y) { //用sort（）方法排序
				var count1 = getCount(x);
				var count2 = getCount(y);

				if(count1 == count2) { //如果点数一样
					var count3 = getFace(x);
					var count4 = getFace(y);
					return count4 - count3; //排序花色
				} else {
					return count2 - count1; //否则排序点数
				}
			});

		}

		//----------积分翻倍函数开始---------------------------------------
		function showmultiple() {
			for(var i = 0; i < 3; i++) {
				all_play[i].multiple = all_play[i].multiple * 2;
			}
			$('.mom').eq(0).attr('value', all_play[0].multiple * 2);
			$('.mom').eq(1).attr('value', all_play[1].multiple * 2);
			$('.mom').eq(2).attr('value', all_play[2].multiple * 2);
		}
		//----------积分翻倍函数结束---------------------------------------
		/*
			0   无效牌型
			1 	单张
			2   对子
			110 王炸
			66  顺子
			88 	连对
			31  3带1
			32  3带2
			33  飞机
			999 普通炸蛋
			422 4带一对
			42  4带2
		 */

		//检查牌方法上
		function checkPoker(poker) {
			var length = poker.length;
			var arr = []; //临时数组
			var poker_data = [];

			for(var i = 0; i < length; i++) { //找到每张牌的点数
				arr.push(poker[i].split('_'));
				poker_data.push(arr[i][0]);
			}

			//判断牌的类型
			switch(length) {
				case 1:
					ready_poker.type = 1;
					ready_poker.max = poker_data[0]; // 设置该牌型的判断值
					return true;
					break;

				case 2:
					if(poker_data[0] == poker_data[1]) { //对子
						ready_poker.type = 2;
						ready_poker.max = poker_data[0];
						return true;
					} else if(poker_data[0] == 15 && poker_data[1] == 14) { //王炸
						ready_poker.type = 110;
						ready_poker.max = 110;
						return true;
					} else { //无效牌型
						ready_poker.type = 0;
						ready_poker.max = 0;
						return false;
					}
					break;

				case 3:
					if(poker_data[0] == poker_data[1] && poker_data[1] == poker_data[2]) { //3张
						ready_poker.type = 3;
						ready_poker.max = poker_data[0];
						return true;
					} else {
						ready_poker.type = 0; //无效牌型
						ready_poker.max = 0;
						return false;
					}
					break;

				case 4:
					if(threeWith(1, poker_data, 1)) { //3带1
						ready_poker.type = 31;
						/*ready_poker.max = poker_data[1];*/
						return true;
					} else if(poker_data[0] == poker_data[3]) { //普通炸弹
						ready_poker.type = 999;
						ready_poker.max = poker_data[0];
						return true;
					} else {
						ready_poker.type = 0; //无效牌型
						ready_poker.max = 0;
						return false;
					}
					break;

				case 5:
					if(threeWith(2, poker_data, 1)) { //3带2
						ready_poker.type = 32;
						return true;
					} else if(straight(poker_data)) { //顺子
						ready_poker.type = 66;
						ready_poker.max = poker_data[0];
						return true;
					} else {
						ready_poker.type = 0; //无效牌型
						ready_poker.max = 0;
						return false;
					}
					break;

				case 6:
					if(allThree(poker_data)) { //纯3张相连
						ready_poker.type = 33;
						ready_poker.max = poker_data[0];
						return true;
					} else if(straight(poker_data)) { //顺子
						ready_poker.type = 66;
						ready_poker.max = poker_data[0];
						return true;
					} else if(strainghtPair(poker_data)) { //连对
						ready_poker.type = 88;
						ready_poker.max = poker_data[0];
						return true;
					} else if(poker_data[0] == poker_data[3] || poker_data[3] == poker_data[5]) { //4带2
						ready_poker.type = 42;
						ready_poker.max = poker_data[2];
						return true;
					} else {
						ready_poker.type = 0; //无效牌型
						ready_poker.max = 0;
						return false;
					}
					break;

				case 7:
					if(straight(poker_data)) {
						ready_poker.type = 66;
						ready_poker.max = poker_data[0];
						return true;
					} else {
						ready_poker.type = 0; //无效牌型
						ready_poker.max = 0;
						return false;
					}
					break;

				case 8:
					if(straight(poker_data)) { //顺子
						ready_poker.type = 66;
						ready_poker.max = poker_data[0];
						return true;
					} else if(strainghtPair(poker_data)) { //连对
						ready_poker.type = 88;
						ready_poker.max = poker_data[0];
						return true;
					} else if(threeWith(1, poker_data, 2)) {
						ready_poker.type = 31;
						return true;
					} else if(allFour(poker_data)) { //纯4张
						ready_poker.type = 44;
						ready_poker.max = poker_data[0];
						return true;
					} else if(poker_data[0] == poker_data[3] && poker_data[4] == poker_data[5] && poker_data[6] == poker_data[7] ||
						poker_data[0] == poker_data[1] && poker_data[2] == poker_data[5] && poker_data[6] == poker_data[7] ||
						poker_data[0] == poker_data[1] && poker_data[2] == poker_data[3] && poker_data[4] == poker_data[7]) { //4带一对
						ready_poker.type = 422;
						ready_poker.max = poker_data[3];
					} else {
						ready_poker.type = 0; //无效牌型
						ready_poker.max = 0;
						return false;
					}
					break;

				case 9:
					if(straight(poker_data)) { //顺子
						ready_poker.type = 66;
						ready_poker.max = poker_data[0];
						return true;
					} else if(allThree(poker_data)) { //纯3张
						ready_poker.type = 33;
						ready_poker.max = poker_data[2];
						return true;
					} else {
						ready_poker.type = 0; //无效牌型
						ready_poker.max = 0;
						return false;
					}
					break;

				case 10:
					if(straight(poker_data)) { //顺子
						ready_poker.type = 66;
						ready_poker.max = poker_data[0];
						return true;
					} else if(threeWith(2, poker_data, 2)) { //3带2
						ready_poker.type = 32;
						return true;
					} else if(strainghtPair(poker_data)) { //连对
						ready_poker.type = 88;
						ready_poker.max = poker_data[0];
						return true;
					} else {
						ready_poker.type = 0; //无效牌型
						ready_poker.max = 0;
						return false;
					}
					break;

				case 11:
					if(straight(poker_data)) { //顺子
						ready_poker.type = 66;
						ready_poker.max = poker_data[0];
						return true;
					} else {
						ready_poker.type = 0; //无效牌型
						ready_poker.max = 0;
						return false;
					}
					break;

				case 12:
					if(threeWith(1, poker_data, 3)) { //3带1
						ready_poker.type = 31;
						return true;
					} else if(strainghtPair(poker_data)) { //连对
						ready_poker.type = 88;
						ready_poker.max = poker_data[0];
						return true;
					} else if(allThree(poker_data)) { //纯3张
						ready_poker.type = 33;
						ready_poker.max = poker_data[0];
						return true;
					} else {
						ready_poker.type = 0; //无效牌型
						ready_poker.max = 0;
						return false;
					}
					break;

				case 13:
					ready_poker.type = 0; //无效牌型
					ready_poker.max = 0;
					return false;
					break;

				case 14:
					if(strainghtPair(poker_data)) { //连对
						ready_poker.type = 88;
						ready_poker.max = poker_data[0];
						return true;
					} else {
						ready_poker.type = 0; //无效牌型
						ready_poker.max = 0;
						return false;
					}
					break;

				case 15:
					if(threeWith(2, poker_data, 3)) { //3带2
						ready_poker.type = 32;
						return true;
					} else if(allThree(poker_data)) { //纯3张
						ready_poker.type = 33;
						ready_poker.max = poker_data[0];
						return true;
					} else {
						ready_poker.type = 0; //无效牌型
						ready_poker.max = 0;
						return false;
					}
					break;

				case 16:
					if(strainghtPair(poker_data)) { //连对
						ready_poker.type = 88;
						ready_poker.max = poker_data[0];
						return true;
					} else if(threeWith(1, poker_data, 4)) { //3带1
						ready_poker.type = 31;
						return true;
					} else {
						ready_poker.type = 0; //无效牌型
						ready_poker.max = 0;
						return false;
					}
					break;

				case 17:
					ready_poker.type = 0; //无效牌型
					ready_poker.max = 0;
					return false;
					break;

				case 18:
					if(strainghtPair(poker_data)) {
						ready_poker.type = 88;
						ready_poker.max = poker_data[0];
						return true;
					} else {
						ready_poker.type = 0; //无效牌型
						ready_poker.max = 0;
						return false;
					}
					break;

				case 19:
					ready_poker.type = 0; //无效牌型
					ready_poker.max = 0;
					return false;
					break;

				case 20:
					if(strainghtPair(poker_data)) { //连对
						ready_poker.type = 88;
						ready_poker.max = poker_data[0];
						return true;
					} else if(threeWith(1, poker_data, 5)) { //3带1
						ready_poker.type = 31;
						return true;
					} else if(threeWith(2, poker_data, 4)) { //3带2
						ready_poker.type = 32;
						return true;
					} else {
						ready_poker.type = 0; //无效牌型
						ready_poker.max = 0;
						return false;
					}
					break;

			}
		}

		//判断是否为3带1  pokerArr牌,n为3带1还是3带2,num为牌是有几个3带n
		function threeWith(n, pokerArr, num) {
			var arr = []; //
			var three = [];
			var poker_count = []; //每张牌出现次数
			var three_count = []; //里面有多少3张
			var one_count = 0; //有多少张单张
			var max_location = 0; //初始化最大值得位置
			for(var i = 0; i < pokerArr.length; i++) {
				if(arr.indexOf(pokerArr[i]) == -1) {
					arr.push(pokerArr[i]);
					poker_count.push(1);
				} else {
					var x = arr.indexOf(pokerArr[i]);
					poker_count[x] += 1;
				}
			}

			//记录单张和3张有多少张
			for(var i = 0; i < arr.length; i++) {
				if(poker_count[i] == 3 && arr[i] - 1 == arr[i + 1] && poker_count[i + 1] == 3) { //当前为3张且下一个数为本身-1，出现的牌数也是3
					if(arr[i] > 12 && num > 1) {
						return false;
					} else {
						three.push(arr[i]);
					}

				}
				if(poker_count[i] == n) {
					one_count++;
				} else if(poker_count[i] > n) {
					for(var j = 0; j < three_count.length; j++) {
						if(arr[i] == three_count[j]) {
							one_count = one_count + 2;
						}
					}
				}
			}
			//找最大值得位置
			for(var i = 0; i < arr.length; i++) {
				if(poker_count[i] == 3) {
					break;
				} else {
					max_location++;
				}
			}
			//把最大值付给ready_poker
			ready_poker.max = arr[max_location];

			if(three_count == num - 1 && one_count == num) {
				return true;
			} else {
				return false;
			}

		}

		//顺子函数
		function straight(pokerArr) {
			////判断最大值是否大于2，如果超过2无法相连，长度大于11，则没有顺子
			if(Number(pokerArr[0]) > 12 || pokerArr.length > 12) {
				return false;
			} else {
				//循环判断该牌组是否是-1不相等，如果有一张则不相等，否则就全部都相等，return true；
				for(var i = 0; i < pokerArr.length - 1; i++) {
					if(pokerArr[i] - 1 != pokerArr[i + 1]) {
						return false;
					}
				}
				return true;
			}

		}

		//纯3张函数
		function allThree(pokerArr, length) {
			//判断最大值是否大于2，如果超过2无法相连
			var num = length / 3;
			if(Number(pokerArr[0]) > 12) {
				return false;
			} else {
				//判断没3张是否是+1相等，且自身同时有3张
				var arr = []; //
				var poker_count = []; //每张牌出现次数
				var three_count = 0; //里面有多少3张
				for(var i = 0; i < pokerArr.length; i++) {
					if(arr.indexOf(pokerArr[i]) == -1) {
						arr.push(pokerArr[i]);
						poker_count.push(1);
					} else {
						var x = arr.indexOf(pokerArr[i]);
						poker_count[x] += 1;
					}
				}
				//记录单张和3张有多少张
				for(var i = 0; i < arr.length; i++) {
					if(poker_count[i] == 3 && arr[i] - 1 == arr[i + 1] && poker_count[i + 1] == 3) { //当前为3张且下一个数为本身-1，出现的牌数也是3
						three_count++;
					}

				}
				if(three_count == num - 1) {
					return true;
				} else {
					return false;
				}
			}

		}

		//连对函数
		function strainghtPair(pokerArr) {
			//判断最大值是否是2，如果超过2无法相连
			if(Number(pokerArr[0]) > 12) {
				return false;
			} else {
				//判断每2张是否是+1相等，且自身同时自身与=与下一张相等
				for(var i = 0; i < pokerArr.length - 3; i += 2) {
					if(pokerArr[i] != pokerArr[i + 1] || pokerArr[i] - 1 != pokerArr[i + 3]) {
						return false
					}
				}
				return true;
			}
		}

		//纯4张函数
		function allFour(pokerArr) {
			//判断最大值是否是2，如果超过2无法相连
			if(Number(pokerArr[0]) > 12) {
				return false;
			} else {
				//循环判断是否当前4张为一样的值，并且隔4张相等
				for(var i = 0; i < pokerArr.length - 5; i += 4); {
					if(pokerArr[i] != pokerArr[i + 3] || pokerArr[i] + 1 != pokerArr[i + 4]) {
						return false;
					} else {
						return true;
					}
				}
			}
		}

		//牌比较函数
		function pokerVs() {
			// 桌面上没有牌，任间牌型都可以出
			if(desktop_poker.type == 0) {
				return true;
			} else if(ready_poker.type == 110) { // 出牌的是王炸可以直接出
				return true;
			} else if(desktop_poker.type != 999 && desktop_poker.type != 110 && ready_poker.type == 999) { // 桌面的牌不是炸弹跟王炸，那玩家的牌只要是炸就可以出
				return true;
			} else if(desktop_poker.type == ready_poker.type && ready_poker.poker.length == desktop_poker.poker.length && Number(ready_poker.max) > Number(desktop_poker.max)) { // 普能牌型大小的判断
				return true;
			} else {
				return false;
			}
		}

		//play2提示功能
		$('.play_event').eq(1).on('click', '.hint', function() {
			playerHint('top', '-10px');
		});

		//play1提示功能
		$('.play_event').eq(0).on('click', '.hint', function() {
			playerHint('left', '10px');
		});

		//play3提示功能
		$('.play_event').eq(2).on('click', '.hint', function() {
			playerHint('left', '-10px');
		});

		//提示函数
		function playerHint(move, move_length) {
			//判断当前game_status.player值，获取当前需要提示的玩家
			if(hintPoker(game_status.player)) { //调用提示函数
				sort_showPoker(ready_poker.poker); //每一次都对数组进行排序，防止冲突
				for(var i = 0; i < all_play[game_status.player].poker.length; i++) { //循环匹配牌的数据，匹配到就让他提起
					for(var j = 0; j < ready_poker.poker.length; j++) {
						if($('.player' + (game_status.player + 1) + '_poker' + ' li').eq(i).attr('data-value') == ready_poker.poker[j])
							$('.player' + (game_status.player + 1) + '_poker' + ' li').eq(i).css(move, move_length);
					}
				}
				return true;
			} else if(findBomb(game_status.player)) {
				sort_showPoker(ready_poker.poker); //每一次都对数组进行排序，防止冲突
				for(var i = 0; i < all_play[game_status.player].poker.length; i++) { //循环匹配牌的数据，匹配到就让他提起
					for(var j = 0; j < ready_poker.poker.length; j++) {
						if($('.player' + (game_status.player + 1) + '_poker' + ' li').eq(i).attr('data-value') == ready_poker.poker[j])
							$('.player' + (game_status.player + 1) + '_poker' + ' li').eq(i).css(move, move_length);
					}
				}
				return true;
			} else {

				//				$('.a1').addClass('alert').html('你的智商没有人家高！');

				//				$('.no_play').eq(game_status.player).trigger("click");
				$('.un-get').css('display', 'block');
				//				 $('.tip-play2').text('要不起');
				setTimeout(function() {
					//					$('.a1').addClass('a2');
					//					$('.a1').removeClass('alert');
					//					setTimeout(function () {
					////						$('.a1').removeClass('a2').html('');
					//					}, 900)
					$('.un-get').css('display', 'none');
					//         $('.tip-play2').text('');
				}, 1500)
				return false;
			}
		}

		//提示函数
		function hintPoker(player) {
			ready_poker = {
				poker: [],
				type: 0,
				max: 0
			}; //每一次调用都清空准备出牌数组，防止添加
			var arr = []; //临时数组
			var player_poker = []; //用于存玩家手牌的点数
			var count_arr = []; //出现了什么点数
			var num = []; //出现点数的次数

			//获取点数
			for(var i = 0; i < all_play[player].poker.length; i++) {
				arr.push(all_play[player].poker[i].split('_'));
				player_poker.push(Number(arr[i][0]));
			}

			//去重获取有什么牌和这张牌有多少张
			for(var i = 0; i < player_poker.length; i++) {
				if(count_arr.indexOf(player_poker[i]) == -1) {
					count_arr.push(player_poker[i]);
					num.push(1);
				} else {
					var x = count_arr.indexOf(player_poker[i]);
					num[x] += 1;
				}
			}

			/*		console.log(player_poker);
					console.log(count_arr);
					console.log(num);*/

			//获取点数
			var length = desktop_poker.poker.length;
			//console.log('长度:' + desktop_poker.poker.length + ',类型:' + desktop_poker.type + ',最大值:' + desktop_poker.max);

			switch(length) {
				//如果是长度为0时，则提示最后一张牌
				case 0:
					ready_poker.poker.push(all_play[player].poker[all_play[player].poker.length - 1]);
					return true;

					//长度为1
				case 1:
					if(hintSola(player_poker, player)) { //是否有单张
						return true;
					} else {
						return false;
					}

					break;

					//长度为2
				case 2:
					if(hintPair(player_poker, player)) {
						return true;
					} else {
						return false;
					}

					break;

				case 3:
					if(hint33or44(arr, player, count_arr, num, length, 3)) { //找纯3张
						return true;
					} else {
						return false;
					}
					break;

				case 4:
					if(desktop_poker.type == 31) { //判断当前是否是3带1
						if(hint31(player_poker, player, count_arr, num, length)) {
							return true;
						} else {
							return false;
						}
					} else if(desktop_poker.type == 999) { //当前是否是普通炸弹
						if(hintBomb(player_poker, player, count_arr, num, length)) {
							return true;
						} else {
							return false;
						}
					}
				case 5:
					if(desktop_poker.type == 66) { //找顺子
						if(hintStraight(player_poker, player, count_arr, length)) {
							return true;
						} else {
							return false;
						}
					} else if(desktop_poker.type == 32) { //找3带2
						if(hint32(player_poker, player, count_arr, num, length)) {
							return true;
						} else {
							return false;
						}
					} else {
						return false;
					}

					break;

				case 6:
					if(desktop_poker.type == 33) { //找纯3张
						if(hint33or44(player_poker, player, count_arr, num, length, 3)) {
							return true;
						} else {
							return false;
						}
					} else if(desktop_poker.type == 42) { //找4带2
						if(hint42(player_poker, player, count_arr, num)) {
							return true;
						} else {
							return false;
						}
					} else if(desktop_poker.type == 66) { //找顺子
						if(hintStraight(player_poker, player, count_arr, length)) {
							return true;
						} else {
							return false;
						}
					} else if(desktop_poker.type == 88) { //找连对
						if(hint88(player_poker, player, count_arr, num, length)) {
							return true;
						} else {
							return false;
						}
					} else {
						return false;
					}
					break;

				case 7:
					if(hintStraight(player_poker, player, count_arr, length)) { //找顺子
						return true;
					} else {
						return false;
					}
					break;

				case 8:
					if(desktop_poker.type == 66) { //找顺子
						if(hintStraight(player_poker, player, count_arr, length)) {
							return true;
						} else {
							return false;
						}
					} else if(desktop_poker.type == 88) { //找连对
						if(hint88(player_poker, player, count_arr, num, length)) {
							return true;
						} else {
							return false;
						}
					} else if(desktop_poker.type == 31) { //找3带1
						if(hint31(player_poker, player, count_arr, num, length)) {
							return true;
						} else {
							return false;
						}
					} else if(desktop_poker.type == 44) { //找纯4张
						if(hint33or44(player_poker, player, count_arr, num, length, 4)) {
							return true;
						} else {
							return false;
						}
					} else if(desktop_poker.type == 422) { //找4带2
						if(hint422(player_poker, player, count_arr, num, length)) {
							return true;
						} else {
							return false;
						}
					} else {
						return false;
					}
					break;

				case 9:
					if(desktop_poker.type == 66) { //找顺子
						if(hintStraight(player_poker, player, count_arr, length)) {
							return true;
						} else {
							return false;
						}
					} else if(desktop_poker.type == 33) { //找纯3张
						if(hint33or44(player_poker, player, count_arr, num, length, 3)) {
							return true;
						} else {
							return false;
						}
					} else {
						return false;
					}
					break;

				case 10:
					if(desktop_poker.type == 66) { //找顺子
						if(hintStraight(player_poker, player, count_arr, length)) {
							return true;
						} else {
							return false;
						}
					} else if(desktop_poker.type == 88) { //找连对
						if(hint88(player_poker, player, count_arr, num, length)) {
							return true;
						} else {
							return false;
						}
					} else if(desktop_poker.type == 32) { //找3带2
						if(hint32(player_poker, player, count_arr, num, length)) {
							return true;
						} else {
							return false;
						}
					} else {
						return false;
					}

				case 11:
					return false;
					break;

				case 12:
					if(desktop_poker.type == 88) { //找连对
						if(hint88(player_poker, player, count_arr, num, length)) {
							return true;
						} else {
							return false
						}
					} else if(desktop_poker.type == 33) { //找纯3张
						if(hint33or44(player_poker, player, count_arr, num, length, 3)) {
							return true;
						} else {
							return false;
						}
					} else if(desktop_poker.type == 31) { //找3带1
						if(hint31(player_poker, player, count_arr, num, length)) {
							return true;
						} else {
							return false;
						}
					} else {
						return false;
					}
					break;

				case 13: //没有13张的牌型
					return false;
					break;

				case 14:
					if(desktop_poker.type == 88) { //找连对
						if(hint88(player_poker, player, count_arr, num, length)) {
							return true;
						} else {
							return false
						}
					} else {
						return false;
					}
					break;

				case 15:
					if(desktop_poker.type == 33) { //找纯3张
						if(hint33or44(player_poker, player, count_arr, num, length, 3)) {
							return true;
						} else {
							return false;
						}
					} else if(desktop_poker.type == 32) { //找3带2
						if(hint32(player_poker, player, count_arr, num, length)) {
							return true;
						} else {
							return false;
						}
					} else {
						return false;
					}
					break;

				case 16:
					if(desktop_poker.type == 32) { //找3带2
						if(hint32(player_poker, player, count_arr, num, length)) {
							return true;
						} else {
							return false;
						}
					} else if(desktop_poker.type == 88) { //找连对
						if(hint88(player_poker, player, count_arr, num, length)) {
							return true;
						} else {
							return false
						}
					} else {
						return false;
					}
					break;
					//超过17张后就没有得打，全部return false
				case 17:
					return false;
					break;

				case 18:
					return false;
					break;

				case 19:
					return false;
					break;

				case 20:
					return false;
					break;

			}

		}

		//找是否有炸弹和王炸的函数
		function findBomb(player) {
			ready_poker = {
				poker: [],
				type: 0,
				max: 0
			}; //刷新准备的对象
			var arr = []; //临时数组
			var player_poker = []; //用于存玩家手牌的点数
			var count_arr = []; //出现了什么点数
			var num = []; //出现点数的次数

			//获取点数
			for(var i = 0; i < all_play[player].poker.length; i++) {
				arr.push(all_play[player].poker[i].split('_'));
				player_poker.push(Number(arr[i][0]));
			}

			//去重获取点数，并获取有多少张
			for(var i = 0; i < player_poker.length; i++) {
				if(count_arr.indexOf(player_poker[i]) == -1) {
					count_arr.push(player_poker[i]);
					num.push(1);
				} else {
					var x = count_arr.indexOf(player_poker[i]);
					num[x] += 1;
				}
			}

			//判断当前类型是否是炸弹，如果不是则执行
			if(hintBomb(player_poker, player, count_arr, num)) {
				return true;
			} else if(hintKingBomb(player_poker, player)) {
				return true
			} else {
				return false;
			}
		}

		//是否有单张
		function hintSola(arr, player) {
			for(var i = arr.length - 1; i >= 0; i--) {
				if(arr[i] > desktop_poker.max) {
					ready_poker.poker.push(all_play[player].poker[i]);
					return true;
				}
			}
			return false;
		}

		//是否有对子
		function hintPair(arr, player) {
			for(var i = arr.length - 1; i >= 0; i--) {
				if(arr[i] > desktop_poker.max && arr[i] == arr[i + 1]) {
					ready_poker.poker.push(all_play[player].poker[i]);
					ready_poker.poker.push(all_play[player].poker[i + 1]);
					return true;
				}
			}
			return false;
		}

		//提示顺子
		function hintStraight(arr, player, count_arr, length) { //当前玩家手牌,当前玩家,出的牌的长度,点数数组,次数数组,长度
			//如果最大值为A，则直接退出，否则进行判断
			//
			var new_arr = []; //临时数组
			if(desktop_poker.max > 12) {
				return false;
			} else {
				//找顺子
				for(var i = count_arr.length - 1; i >= 0; i--) {
					if(count_arr[i] > desktop_poker.max) {
						new_arr.push(count_arr[i]);
						for(var j = 0; j < length - 1; j++) {
							//循环判断-1是否等于下一张，如果找到相应长度则跳出
							if(count_arr[i + j] - 1 == count_arr[i + j + 1]) {
								new_arr.push(count_arr[i + j + 1]);
							}
						}
					}

					//如果找到相应长度的数组就跳出循环
					if(new_arr.length == length) {
						break;
					} else {
						new_arr = [];
					}
				}

				//判断是否长度是否为0，并且第一是否大于A，大于A就不能获取提示
				if(new_arr.length == 0 || new_arr[0] > 12) {
					return false;
				} else {
					//去当前玩家的数组去找对应的牌
					for(var i = arr.length - 1; i >= 0; i--) {
						for(var j = new_arr.length - 1; j >= 0; j--) {
							if(arr[i] == new_arr[j]) {
								ready_poker.poker.push(all_play[player].poker[i]);
								new_arr.pop();
							}
						}
					}
					return true;
				}
			}
		}

		//提示4带2函数
		function hint42(arr, player, count_arr, num) { //当前玩家手牌,当前玩家,出的牌的长度,点数数组,次数数组
			var new_arr = []; //临时数组
			var new_arr2 = []; //临时数组2
			//找4张
			for(var i = count_arr.length - 1; i >= 0; i--) {
				//判断是否有4张
				if(num[i] == 4 && count_arr[i] > desktop_poker.max) {
					new_arr.push(count_arr[i])
					break;
				}
			}
			//如果没有找到有4张的就退出
			if(new_arr.length != 1) {
				return false;
			}
			//判断有没有2个单张
			for(var i = count_arr.length - 1; i >= 0; i--) {
				if(num[i] == 1 && count_arr[i] != 14 && count_arr[i] != 15) {
					new_arr2.push(count_arr[i])
				}
				if(new_arr2.length == 2) {
					break;
				}
			}

			//如果没有单张就去找对子
			if(new_arr2.length != 2) {
				new_arr2 = [];
				for(var i = count_arr.length - 1; i >= 0; i--) {
					if(num[i] == 2) {
						new_arr2.push(count_arr[i])
						if(new_arr2.length == 1) {
							break;
						}
					}
				}
				//如果没有对子就去找3张
				if(new_arr2.length != 1) {
					for(var i = count_arr.length - 1; i >= 0; i--) {
						if(num[i] == 3) {
							new_arr2.push(count_arr[i])
							if(new_arr2.length == 1) {
								break;
							}
						}
					}
					//如果没有3张就去找4张
					if(new_arr2.length != 1) {
						for(var i = count_arr.length - 1; i >= 0; i--) {
							if(num[i] == 4 && count_arr[i] != new_arr[0]) {
								new_arr2.push(count_arr[i])
								if(new_arr2.length == 1) {
									break;
								}
							}
						}
					}
				}
			}

			//如果找不到带的就return false;
			if(new_arr2.length == 0) {
				return false;
			}

			//去当前玩家的数组去找对应的牌
			for(var i = arr.length - 1; i >= 0; i--) {
				if(arr[i] == new_arr[0]) {
					ready_poker.poker.push(all_play[player].poker[i]);
				}
			}
			//去当前玩家的数组去找对应的牌
			for(var i = arr.length - 1; i >= 0; i--) {
				for(var j = 0; j < new_arr2.length; j++) {
					if(arr[i] == new_arr2[j]) {
						ready_poker.poker.push(all_play[player].poker[i]);
					}
				}
				if(result.length == 6) {
					break;
				}
			}
			return true;
		}

		//提示连对函数
		function hint88(arr, player, count_arr, num, length) { //当前玩家手牌,当前玩家,点数数组,张数数组,出的牌的长度
			var new_arr = []; //临时数组
			var length2 = length / 2; //有多少对对子
			if(desktop_poker.max > 12) { //如果最大值是A，则不需要判断
				return false
			}
			//找连对
			for(var i = count_arr.length - 1; i >= 0; i--) {
				if(num[i] == 2 && count_arr[i] > desktop_poker.max) { //判断当前点数大于max值并且是有两张以上
					new_arr.push(count_arr[i]);
					for(var j = 1; j < length2; j++) {
						if(num[i + j] == 2 && count_arr[i + j - 1] - 1 == count_arr[i + j]) { //判断下一张是否也是点数-1且有两张
							new_arr.push(count_arr[i + j]);
						}

					}
					//找到相应长队的对子就跳出循环
					if(new_arr.length == length2) {
						break;
					} else {
						new_arr = [];
					}
				}
			}

			//如果没找到就return false;
			if(new_arr.length == 0 || new_arr[0] > 12) {
				return false;
			}

			//去当前玩家的数组去找对应的牌
			for(var i = arr.length; i >= 0; i--) {
				for(var j = new_arr.length - 1; j >= 0; j--) {
					if(arr[i] == new_arr[j]) {
						ready_poker.poker.push(all_play[player].poker[i]);
					}
				}
			}
		}

		//提示3带1函数
		function hint31(arr, player, count_arr, num, length) {
			var new_arr = []; //临时数组
			var new_arr2 = []; //临时数组2
			var three = length / 4; //有多少个3张
			if(desktop_poker.max > 12 && three != 1) { //如果3张数量为1，则可以匹配到222，否则如果最大值等A就不用比较了
				return false
			} else {
				//找3张
				for(var i = count_arr.length - 1; i >= 0; i--) { //循环遍历找到数量相等且符合-1的3张
					if(count_arr[i] > desktop_poker.max && num[i] == 3) {
						new_arr.push(count_arr[i]);
						for(var j = 0; j < three; j++) {
							if(num[i + j + 1] == 3 && count_arr[i + j] - 1 == count_arr[i + j + 1]) {
								new_arr.push(count_arr[i + j + 1]);
							} else {
								break;
							}
						}
						if(new_arr.length == three) { //如果找到相应长度的就跳出循环，否则就清空数组，如果找不到数组就为空
							break;
						} else {
							new_arr = [];
						}
					}
				}

				//判断有没有单张
				for(var i = count_arr.length - 1; i >= 0; i--) {
					console.log(count_arr[i]);
					if(num[i] == 1 && count_arr[i] != 14 && count_arr[i] != 15) {
						new_arr2.push(count_arr[i])
					}
					if(new_arr2.length == three) {
						break;
					}
				}

				for(var i = arr.length - 1; i >= 0; i--) {
					for(var j = new_arr.length - 1; j >= 0; j--) {
						if(arr[i] == new_arr[j]) {
							ready_poker.poker.push(all_play[player].poker[i]);
						}
					}
				}

				//判断是否达到条件
				if(new_arr.length < three || new_arr2 < three || (new_arr[0] > 12 && three != 1)) {
					return false;
				}

				//去当前玩家的数组去找对应的牌
				for(var i = arr.length - 1; i >= 0; i--) {
					for(var j = 0; j < new_arr2.length; j++) {
						if(arr[i] == new_arr2[j]) {
							ready_poker.poker.push(all_play[player].poker[i]);
						}
					}
					if(ready_poker.poker.length >= length) {
						break;
					}
				}
				return true;
			}
		}

		//3带2
		function hint32(arr, player, count_arr, num, length) {
			var new_arr = [];
			var new_arr2 = [];
			var three = length / 5; //有多少个3张
			if(desktop_poker.max > 12 && three != 1) {
				return false
			} else {
				//找3张
				for(var i = count_arr.length - 1; i >= 0; i--) {
					if(count_arr[i] > desktop_poker.max && num[i] == 3) {
						new_arr.push(count_arr[i]);
						for(var j = 0; j < three; j++) {
							if(num[i + j + 1] == 3 && count_arr[i + j] - 1 == count_arr[i + j + 1]) {
								new_arr.push(count_arr[i + j + 1]);
							} else {
								break;
							}
						}
						if(new_arr.length == three) {
							break;
						} else {
							new_arr = [];
						}
					}
				}

				//判断有没有单张
				for(var i = count_arr.length - 1; i >= 0; i--) {
					console.log(count_arr[i]);
					if(num[i] == 2 && count_arr[i] != 14 && count_arr[i] != 15) {
						new_arr2.push(count_arr[i])
					}
					if(new_arr2.length == three) {
						break;
					}
				}

				for(var i = arr.length - 1; i >= 0; i--) {
					for(var j = new_arr.length - 1; j >= 0; j--) {
						if(arr[i] == new_arr[j]) {
							ready_poker.poker.push(all_play[player].poker[i]);
						}
					}
				}

				//判断是否达到条件
				if(new_arr.length < three || new_arr2 < three || new_arr[0] > 12) {
					return false;
				}

				//去当前玩家的数组去找对应的牌
				for(var i = arr.length - 1; i >= 0; i--) {
					for(var j = 0; j < new_arr2.length; j++) {
						if(arr[i] == new_arr2[j]) {
							ready_poker.poker.push(all_play[player].poker[i]);
						}
					}
					if(ready_poker.poker.length >= length) {
						break;
					}
				}
				return true;
			}
		}

		//全3张或全4张
		function hint33or44(arr, player, count_arr, num, length, n) { //n纯3还是纯4
			var new_arr = [];
			var m = length / n; //m是需要多少个3张或4张
			if(desktop_poker.max > 12) {
				return false;
			} else {
				for(var i = count_arr.length - 1; i >= 0; i--) { //循环遍历去找存在3，4张的点数，并且为4张点数相连的
					if(count_arr[i] > desktop_poker.max && num[i] == n) {
						new_arr.push(count_arr[i]);
						for(var j = 0; j < m; j++) {
							if(num[i + j + 1] == n && count_arr[i + j] - 1 == count_arr[i + j + 1]) {
								new_arr.push(count_arr[i + j + 1]);
							} else {
								break;
							}
						}
						if(new_arr.length == m) { //如果找到对应的长度的就跳出循环，否则清空数组
							break;
						} else {
							new_arr = [];
						}
					}
				}

				if(new_arr.length == 0 || new_arr[0] > 12) { //如果数组为空就退出
					return false;
				}

				for(var i = arr.length - 1; i >= 0; i--) { //否则就去当前玩家的数组去找对应的牌
					for(var j = new_arr.length - 1; j >= 0; j--) {
						if(arr[i] == new_arr[j]) {
							ready_poker.poker.push(all_play[player].poker[i]);
						}
					}
				}
				return true
			}
		}

		function hint422(arr, player, count_arr, num, length) {
			var new_arr = []; //临时数组
			var new_arr2 = [] //临时数组2
			for(var i = count_arr.length - 1; i >= 0; i--) { //循环遍历找4张
				if(num[i] == 4 && count_arr[i] > desktop_poker.max) {
					new_arr.push(count_arr[i]);
					break;
				}
			}

			//判断有没有2个对子
			for(var i = count_arr.length - 1; i >= 0; i--) {
				if(num[i] == 2 && count_arr[i] != 14 && count_arr[i] != 15) {
					new_arr2.push(count_arr[i])
				}
				if(new_arr2.length == 2) {
					break;
				}
			}

			if(new_arr.length == 0 || new_arr2.length != 2) { //判断是否有4张和两个对子了，如果没有就return false
				return false;
			}

			for(var i = arr.length - 1; i >= 0; i--) { //就去当前玩家的数组去找对应的牌
				if(arr[i] == new_arr[0]) {
					ready_poker.poker.push(all_play[player].poker[i]);
				}
			}

			for(var i = arr.length - 1; i >= 0; i--) { //就去当前玩家的数组去找对应的牌
				for(var j = 0; j < new_arr2.length; j++) {
					if(arr[i] == new_arr2[j]) {
						ready_poker.poker.push(all_play[player].poker[i]);
					}
				}
				if(ready_poker.poker.length == length) { //如果达到长度就不存了
					break;
				}
			}
		}
		//判断是否有普通炸弹
		function hintBomb(arr, player, count_arr, num) {
			var new_arr = [];
			if(desktop_poker.type == 999) {
				for(var i = arr.length - 1; i >= 0; i--) {
					if(num[i] == 4 && count_arr[i] > desktop_poker.max) {
						new_arr.push(count_arr[i]);
					}
					if(new_arr.length == 1) {
						break;
					}
				}
			} else {
				for(var i = arr.length - 1; i >= 0; i--) {
					if(num[i] == 4) {
						new_arr.push(count_arr[i]);
					}
					if(new_arr.length == 1) {
						break;
					}
				}
			}

			if(new_arr.length == 0) {
				return false;
			} else {
				for(var i = arr.length - 1; i >= 0; i--) {
					if(arr[i] == new_arr[0]) {
						ready_poker.poker.push(all_play[player].poker[i]);
					}
				}
			}
			return true;
		}
		//判断是否有王炸
		function hintKingBomb(arr, player) { //判断是否有王炸
			if(arr[0] == 15 && arr[1] == 14) { //判断当前点数是否是16,17
				ready_poker.poker.push(all_play[player].poker[0]);
				ready_poker.poker.push(all_play[player].poker[1]);
				return true;
			}
			return false;
		}
	}
	//---------------------------------------------

});