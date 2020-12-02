$(function() {
			// 调用 公告滚动函数
			setInterval("noticeUp('.tip-info ul','-10px',500)", 2000);
		});

function noticeUp(obj, top, time) {
	$(obj).animate({
		marginTop: top,
		opacity: 0
	}, time, function() {
		$(this).css({
			marginTop: "0",
			opacity: 1
		}).find(":first").appendTo(this);
	})
}