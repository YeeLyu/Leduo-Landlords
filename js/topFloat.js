function topFloat(animationTop) {
	let marginL = 0;
	for(let i = 0; i < animationTop.length; i++) {
		let rand = Math.floor(Math.random() * 80);
		marginL += (rand + 7);
		$(animationTop[i]).css({
			left: `${marginL}px`
		});
		$(animationTop[i]).css({
			bottom: `${-rand*i*50}px`
		});
	}
}

function leftFloat(animationLeft) {
	let marginL = 0;
	for(let i = 0; i < animationLeft.length; i++) {
		let rand = Math.floor(Math.random() * 60);
		marginL = (rand + 7);
		$(animationLeft[i]).css({
			top: `${marginL}px`
		});
		$(animationLeft[i]).css({
			left: `${-rand*i*50}px`
		});
	}
}

function addDiv(classNames) {
	console.log(classNames)
	for(let i = 0; i < 12; i++) {
		classNames.append('<div class="little-pic"></div>')
	}
}

function addDivL(classNames) {
	console.log(classNames)
	for(let i = 0; i < 12; i++) {
		classNames.append('<div class="little-tubiao"></div>')
	}
}

addDivL($('.active'));
leftFloat($('.little-tubiao'));

addDiv($('.little-bg1'));
topFloat($('.little-bg1 .little-pic'));
addDiv($('.little-bg2'));
topFloat($('.little-bg2 .little-pic'));
addDiv($('.little-bg3'));
topFloat($('.little-bg3 .little-pic'));
addDiv($('.little-bg4'));
topFloat($('.little-bg4 .little-pic'));