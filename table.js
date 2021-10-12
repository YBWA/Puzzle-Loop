window.onload = initAll;
window.onresize = setPuz;
function initAll() {
	setPuz();
	setLine();
	setPoint();
	setSummit();
	setFork();
}

let mouseDowning = 0, putState = -1, downButton = -1;

function setFork() {
	document.oncontextmenu = function() { // 取消右键菜单
		return false;
	};
}

function setLine() {
	let Ln1 = document.getElementsByClassName("l1");
	let Ln2 = document.getElementsByClassName("l2");
	window.onmousedown = function() {
		mouseDowning = 1;
		cleanLine();
		downButton = event.button;
	};
	window.onmouseup = function() {
		mouseDowning = 0;
		putState = -1;
		downButton = -1;
		checkNum();
	};
	for (let i = 0; i < Ln1.length; i ++) {
		Ln1[i].onmouseover = cLine;
		Ln1[i].onmousedown = scLine;
	}
	for (let i = 0; i < Ln2.length; i ++) {
		Ln2[i].onmouseover = cLine;
		Ln2[i].onmousedown = scLine;
	}	
}

function cLine() {
	if (mouseDowning != 0 && downButton != -1) changeLine(this);
	else hlLine(this);
}

function scLine() {
	downButton = event.button;
	changeLine(this);
}

function hlLine(x) { // 改变联通块边、点颜色
	if (x.style.backgroundColor != "black") return;
	cleanLine();
	let Id = x.getAttribute("id"), Cl;
	for (let i = 1; i <= 30; i ++) {
		if ("1l" + i == Id) {
			Id = i, Cl = 0;
			break;
		}
		if ("2l" + i == Id) {
			Id = i, Cl = 1;
			break;
		}
	}
	let Que = [ 0, 0, 0, 0, 0, 0,	0, 0, 0, 0, 0, 0,	0, 0, 0, 0, 0, 0,	0, 0, 0, 0, 0, 0,	0, 0, 0, 0, 0, 0,
				0, 0, 0, 0, 0, 0,	0, 0, 0, 0, 0, 0,	0, 0, 0, 0, 0, 0,	0, 0, 0, 0, 0, 0,	0, 0, 0, 0, 0, 0, 0], hd = 0, tl = 0;
	let Vis1 = [0, 0, 0, 0, 0, 0,	0, 0, 0, 0, 0, 0,	0, 0, 0, 0, 0, 0,	0, 0, 0, 0, 0, 0,	0, 0, 0, 0, 0, 0, 0];
	let Vis2 = [0, 0, 0, 0, 0, 0,	0, 0, 0, 0, 0, 0,	0, 0, 0, 0, 0, 0,	0, 0, 0, 0, 0, 0,	0, 0, 0, 0, 0, 0, 0];
	Que[tl] = Id + Cl * 30;
	while (hd <= tl) {
		let Now = Que[hd], Flag = 0; hd ++;
		if (Now <= 30) {
			document.getElementById("1l" + Now).style.backgroundColor = "rgb(82, 184, 184)";
			let i = Math.floor(Now / 5), j = Now % 5; if (!j) j = 5, i -= 1;
			if (j > 1 && Now - 1 > 0) if (document.getElementById("1l" + (Now - 1)).style.backgroundColor == "black" && Vis1[Now - 1] == 0) {
				Que[++ tl] = Now - 1, Vis1[Now - 1] = 1, Flag = 1;
			}
			if (j < 5 && Now + 1 < 31) if (document.getElementById("1l" + (Now + 1)).style.backgroundColor == "black" && Vis1[Now + 1] == 0) {
				Que[++ tl] = Now + 1, Vis1[Now + 1] = 1, Flag = 1;
			}
			let t = (i - 1) * 6 + j;
			if (t > 0 && i > 0) if (document.getElementById("2l" + t).style.backgroundColor == "black" && Vis2[t] == 0) {
				Que[++ tl] = t + 30, Vis2[t] = 1, Flag = 1;
			}
			if (t + 1 < 31 && i > 0 && j < 6) if (document.getElementById("2l" + (t + 1)).style.backgroundColor == "black" && Vis2[t + 1] == 0) {
				Que[++ tl] = t + 1 + 30, Vis2[t + 1] = 1, Flag = 1;
			}
			if (t + 6 < 31 && i < 6) if (document.getElementById("2l" + (t + 6)).style.backgroundColor == "black" && Vis2[t + 6] == 0) {
				Que[++ tl] = t + 6 + 30, Vis2[t + 6] = 1, Flag = 1;
			}
			if (t + 7 < 31 && i < 6 && j < 6) if (document.getElementById("2l" + (t + 7)).style.backgroundColor == "black" && Vis2[t + 7] == 0) {
				Que[++ tl] = t + 7 + 30, Vis2[t + 7] = 1, Flag = 1;
			}
		} else {
			Now -= 30;
			document.getElementById("2l" + Now).style.backgroundColor = "rgb(82, 184, 184)";
			let i = Math.floor(Now / 6), j = (Now % 6), t = i * 5 + j - 1;
			if (i > 0 && Now - 6 > 0) if (document.getElementById("2l" + (Now - 6)).style.backgroundColor == "black" && Vis2[Now - 6] == 0) {
				Que[++ tl] = Now - 6 + 30, Vis2[Now - 6] = 1, Flag = 1;
			}
			if (j > 0 && t > 0) if (document.getElementById("1l" + (t)).style.backgroundColor == "black" && Vis1[t] == 0) {
				Que[++ tl] = t, Vis1[t] = 1, Flag = 1;
			}
			if (j > 1 && t + 5 < 31) if (document.getElementById("1l" + (t + 5)).style.backgroundColor == "black" && Vis1[t + 5] == 0) {
				Que[++ tl] = t + 5, Vis1[t + 5] = 1, Flag = 1;
			}
			// if (Flag == 0) document.getElementById("p" + (i * 6 + j)).style.backgroundColor = "rgb(130, 180, 0)"; Flag = 0;
			if (i < 6 && Now + 6 < 31) if (document.getElementById("2l" + (Now + 6)).style.backgroundColor == "black" && Vis2[Now + 6] == 0) {
				Que[++ tl] = Now + 6 + 30, Vis2[Now + 6] = 1, Flag = 1;
			}
			if (j < 6 && t + 1 < 31) if (document.getElementById("1l" + (t + 1)).style.backgroundColor == "black" && Vis1[t + 1] == 0) {
				Que[++ tl] = t + 1, Vis1[t + 1] = 1, Flag = 1;
			}
			if (i < 6 && j < 6 && t + 6 < 31) if (document.getElementById("1l" + (t + 6)).style.backgroundColor == "black" && Vis1[t + 6] == 0) {
				Que[++ tl] = t + 6, Vis1[t + 6] = 1, Flag = 1;
			}
			// if (Flag == 0) document.getElementById("p" + (i * 6 + j + 6)).style.backgroundColor = "rgb(130, 180, 0)"; Flag = 0;
		}
	}
}

function cleanLine() {
	for (let i = 1; i <= 30; i ++) {
		if (document.getElementById("1l" + i).style.backgroundColor == "rgb(82, 184, 184)") {
			document.getElementById("1l" + i).style.backgroundColor = "black";
		}
		if (document.getElementById("2l" + i).style.backgroundColor == "rgb(82, 184, 184)") {
			document.getElementById("2l" + i).style.backgroundColor = "black";
		}
	}
	for (let i = 1; i <= 36; i ++) {
		if (document.getElementById("p" + i).style.backgroundColor == "rgb(130, 180, 0)") {
			document.getElementById("p" + i).style.backgroundColor = "black";
		}
	}
}

function changeLine(x) {
	cleanLine();
	if (x.style.backgroundColor == "") x.style.backgroundColor = "white";
	if (downButton == 0) {
		if (x.style.backgroundColor == "black" && (putState == 0 || putState == -1)) {
			putState = 0;
			x.style.backgroundColor = "white";
		} else if (x.style.backgroundColor == "white" && (putState == 1 || putState == -1)) {
			putState = 1;
			x.style.backgroundColor = "black";
		}
	} else {
		if (x.style.backgroundColor == "rgb(215, 0, 34)" && (putState == 2 || putState == -1)) {
			putState = 2;
			x.style.backgroundColor = "white";
		} else if (x.style.backgroundColor != "rgb(215, 0, 34)" && (putState == 3 || putState == -1)) {
			putState = 3;
			x.style.backgroundColor = "rgb(215, 0, 34)";
		}
	}
}
/*
putState = 
	-1 : none 
	0 : black to white
	1 : white to black
	2 : rgb(215, 0, 34) to white
	3 : white to rgb(215, 0, 34)
*/

function checkNum() {
	for (let i = 0; i < 5; i ++) {
		for (let j = 1; j <= 5; j ++) {
			let k = i * 5 + j, s = 0, ss = 4;
			if (document.getElementById("n" + k).innerText == "") continue;
			let Lin = i * 5 + j;
			if (document.getElementById("1l" + Lin).style.backgroundColor == "black") s ++;
			if (document.getElementById("1l" + (Lin + 5)).style.backgroundColor == "black") s ++;
			if (document.getElementById("1l" + Lin).style.backgroundColor == "rgb(215, 0, 34)") ss --;
			if (document.getElementById("1l" + (Lin + 5)).style.backgroundColor == "rgb(215, 0, 34)") ss --;
			Lin = i * 6 + j;
			if (document.getElementById("2l" + Lin).style.backgroundColor == "black") s ++;
			if (document.getElementById("2l" + (Lin + 1)).style.backgroundColor == "black") s ++;
			if (document.getElementById("2l" + Lin).style.backgroundColor == "rgb(215, 0, 34)") ss --;
			if (document.getElementById("2l" + (Lin + 1)).style.backgroundColor == "rgb(215, 0, 34)") ss --;
			if (s > document.getElementById("n" + k).innerText || ss < document.getElementById("n" + k).innerText) {
				document.getElementById("n" + k).style.color = "rgb(215, 0, 34)";
			} else if (s == document.getElementById("n" + k).innerText) {
				document.getElementById("n" + k).style.color = "lightgrey";
			} else {
				document.getElementById("n" + k).style.color = "black";
			}
		}
	}
}

function setSummit() {
	document.getElementById("smt").onclick = function() {
		for (let i = 0; i < 5; i ++) { // 判断每个数字边上的边数是否满足要求
			for (let j = 1; j <= 5; j ++) {
				let k = i * 5 + j, s = 0;
				if (document.getElementById("n" + k).innerText == "") continue;
				let Lin = i * 5 + j;
				if (document.getElementById("1l" + Lin).style.backgroundColor == "black") s ++;
				if (document.getElementById("1l" + (Lin + 5)).style.backgroundColor == "black") s ++;
				Lin = i * 6 + j;
				if (document.getElementById("2l" + Lin).style.backgroundColor == "black") s ++;
				if (document.getElementById("2l" + (Lin + 1)).style.backgroundColor == "black") s ++;
				if (s != document.getElementById("n" + k).innerText) {
					putMessage(0);
					return;
				}
			}
		}
		let dx = [-1, 1, 0, 0], dy = [0, 0, -1, 1];
		let e = [
			[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], 
			[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], 
			[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], 
			[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], 
			[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], 
			[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], 
			[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], 
		];
		let a = [
			[0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], 
			[0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], 
		], vis = [
			[0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], 
			[0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], 
		];
		for (let i = 0; i < 6; i ++) { // 判断经过每个点的边数是否满足要求
			for (let j = 1; j <= 6; j ++) {
				let k = i * 5 + j, s = 0;
				if (j < 6) if (document.getElementById("1l" + k).style.backgroundColor == "black") s ++, e[i * 6 + j][3] = 1; // right
				if (j > 1) if (document.getElementById("1l" + (k - 1)).style.backgroundColor == "black") s ++, e[i * 6 + j][2] = 1; // left
				k = i * 6 + j;
				if (i < 5) if (document.getElementById("2l" + k).style.backgroundColor == "black") s ++, e[i * 6 + j][1] = 1; // down
				if (i > 0) if (document.getElementById("2l" + (k - 6)).style.backgroundColor == "black") s ++, e[i * 6 + j][0] = 1; // up
				if (s == 1 || s == 3) {
					putMessage(0);
					return;
				} else if (s == 2) {
					a[i + 1][j] = 1;
				}
			}
		}

		for (let k = 1; k <= 36; k ++) {
			let i = Math.ceil(k / 6), j = k % 6;
			if (a[i][j] == 1) {
				vis[i][j] = 1;
				let sti = i, stj = j;
				while (true) {
					let Flag = 0;
					for (let l = 0; l < 4; l ++) {
						if (e[(i - 1) * 6 + j][l] == 0) continue;
						let x = i + dx[l], y = j + dy[l];
						if (x < 1 || y < 1 || x > 6 || y > 6) continue;
						if (a[x][y] == 1 && vis[x][y] == 0) {
							vis[x][y] = 1, i = x, j = y, Flag = 1;
							break;
						}
					}
					if (Flag == 0) break;	
				}
				for (i = 1; i <= 6; i ++) {
					for (j = 1; j <= 6; j ++) {
						if (a[i][j] == 1 && vis[i][j] == 0) {
							putMessage(0);
							return;
						}
					}
				}
				putMessage(1);
				break;
			}
		}
	}
}

function putMessage(b) {
	let x = document.getElementById("msg");
	x.style.color = (b ? "green" : "rgb(215, 0, 34)");
	x.innerHTML = (b ? "AC!" : "WA!");
}

function setPuz() {
	let x = document.body.clientWidth / 2 - 12;
	let y = 270;
	document.getElementById("ending").style.position = "absolute";
	document.getElementById("ending").style.left = (x) + "px";
	document.getElementById("ending").style.top = (y + 450) + "px";
	document.getElementById("smt").style.position = "absolute";
	document.getElementById("smt").style.left = (x - 20) + "px";
	document.getElementById("smt").style.top = (y + 220) + "px";
	document.getElementById("smt").onmousedown = function() {
		document.getElementById("smt").style.borderStyle = "ridge";
	};
	document.getElementById("smt").onmouseup = function() {
		document.getElementById("smt").style.borderStyle = "solid";
	};
	document.getElementById("cln").style.position = "absolute";
	document.getElementById("cln").style.left = (x + 110) + "px";
	document.getElementById("cln").style.top = (y + 220) + "px";
	document.getElementById("cln").onmousedown = function() {
		document.getElementById("cln").style.borderStyle = "ridge";
	};
	document.getElementById("cln").onmouseup = function() {
		document.getElementById("cln").style.borderStyle = "solid";
	};
	document.getElementById("cln").onclick = function() {
		document.getElementById("msg").innerHTML = "";
		for (let i = 1; i <= 30; i ++) {
			document.getElementById("1l" + i).style.backgroundColor = "white";
			document.getElementById("2l" + i).style.backgroundColor = "white";
		}
		checkNum();
	}
	document.getElementById("msg").style.position = "absolute";
	document.getElementById("msg").style.left = (x + 15) + "px";
	document.getElementById("msg").style.top = (y - 165) + "px";
	for (let i = 0; i < 5; i ++) {
		for (let j = 1; j <= 5; j ++) {
			let k = "n" + (i * 5 + j);
			document.getElementById(k).style.position = "absolute";
			document.getElementById(k).style.left = ((x + 1) + (j - 3) * 60) + "px";
			document.getElementById(k).style.top = (y + (i - 2) * 60) + "px";
		}
	}
	for (let i = 0; i < 6; i ++) {
		for (let j = 1; j <= 6; j ++) {
			let k = "p" + (i * 6 + j);
			document.getElementById(k).style.position = "absolute";
			document.getElementById(k).style.left = (x - 10 + (j - 3) * 60) + "px";
			document.getElementById(k).style.top = (y - 11 + (i - 2) * 60) + "px";
		}
	}
	for (let i = 0; i < 6; i ++) {
		for (let j = 1; j <= 5; j ++) {
			let k = "1l" + (i * 5 + j);
			document.getElementById(k).style.position = "absolute";
			document.getElementById(k).style.left = (x - 2 + (j - 3) * 60) + "px";
			document.getElementById(k).style.top = (y - 9 + (i - 2) * 60) + "px";
		}
	}
	for (let i = 0; i < 5; i ++) {
		for (let j = 1; j <= 6; j ++) {
			let k = "2l" + (i * 6 + j);
			document.getElementById(k).style.position = "absolute";
			document.getElementById(k).style.left = (x - 7 + (j - 3) * 60) + "px";
			document.getElementById(k).style.top = (y - 3 + (i - 2) * 60) + "px";
		}
	}
}

function setPoint() {
	let x = document.getElementsByClassName("p");
	for (let i = 0; i < x.length; i ++) {
		x[i].style.backgroundColor = "black";
	}
}
