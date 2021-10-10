window.onload = initAll;
window.onresize = setPuz;
function initAll() {
	setPuz();
	setLine();
	setPoint();
	setSummit();
	setFork(); 
}

var MouseDowning = 0, putState = -1;

function setFork() {
	document.oncontextmenu = function() {
		return false;
	};
}

function setLine() {
	var Ln1 = document.getElementsByClassName("l1");
	var Ln2 = document.getElementsByClassName("l2");
	window.onmousedown = function() {
		MouseDowning = 1;
	};
	window.onmouseup = function() {
		MouseDowning = 0;
		putState = -1;
		checkNum();
	};
	for (var i = 0; i < Ln1.length; i ++) {
		Ln1[i].style.backgroundColor = "white";
		Ln1[i].onmouseover = checkLine;
		Ln1[i].onmousedown = changeLine;
	}
	for (var i = 0; i < Ln2.length; i ++) {
		Ln2[i].style.backgroundColor = "white";
		Ln2[i].onmouseover = checkLine;
		Ln2[i].onmousedown = changeLine;
	}
}

function changeLine() {
	if (this.style.backgroundColor == "black" && putState != 1) {
		putState = 0;
		this.style.backgroundColor = "white";
	} else if (putState != 0){
		putState = 1;
		this.style.backgroundColor = "black";
	}
}

function checkLine() {
	if (MouseDowning == 0) return;
	if (this.style.backgroundColor == "black" && putState != 1) {
		putState = 0;
		this.style.backgroundColor = "white";
	} else if (putState != 0) {
		putState = 1;
		this.style.backgroundColor = "black";
	}
}

function checkNum() {
	for (var i = 0; i < 5; i ++) {
		for (var j = 1; j <= 5; j ++) {
			var k = i * 5 + j, s = 0;
			if (document.getElementById("n" + k).innerText == "") continue;
			var Lin = i * 5 + j;
			if (document.getElementById("1l" + Lin).style.backgroundColor == "black") s ++;
			if (document.getElementById("1l" + (Lin + 5)).style.backgroundColor == "black") s ++;
			Lin = i * 6 + j;
			if (document.getElementById("2l" + Lin).style.backgroundColor == "black") s ++;
			if (document.getElementById("2l" + (Lin + 1)).style.backgroundColor == "black") s ++;
			if (s > document.getElementById("n" + k).innerText) {
				document.getElementById("n" + k).style.color = "red";
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
		for (var i = 0; i < 5; i ++) {
			for (var j = 1; j <= 5; j ++) {
				var k = i * 5 + j, s = 0;
				if (document.getElementById("n" + k).innerText == "") continue;
				var Lin = i * 5 + j;
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
		var dx = [-1, 1, 0, 0], dy = [0, 0, -1, 1];
		var e = [
			[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], 
			[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], 
			[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], 
			[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], 
			[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], 
			[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], 
			[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], 
		];
		var a = [
			[0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], 
			[0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], 
		], vis = [
			[0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], 
			[0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], 
		];
		for (var i = 0; i < 6; i ++) { // 判断经过每个点的边数是否满足要求
			for (var j = 1; j <= 6; j ++) {
				var k = i * 5 + j, s = 0;
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

		for (var k = 1; k <= 36; k ++) {
			var i = Math.ceil(k / 6), j = k % 6;
			if (a[i][j] == 1) {
				vis[i][j] = 1;
				var sti = i, stj = j;
				while (true) {
					var Flag = 0;
					for (var l = 0; l < 4; l ++) {
						if (e[(i - 1) * 6 + j][l] == 0) continue;
						var x = i + dx[l], y = j + dy[l];
						if (x < 1 || y < 1 || x > 6 || y > 6) continue;
						if (a[x][y] == 1 && vis[x][y] == 0) {
							vis[x][y] = 1;
							i = x;
							j = y;
							Flag = 1;
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
	var x = document.getElementById("msg");
	x.style.color = (b ? "green" : "red");
	x.innerHTML = (b ? "AC!" : "WA!");
}

function setPuz() {
	var x = document.body.clientWidth / 2 - 12;
	var y = 270;
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
		for (var i = 1; i <= 30; i ++) {
			document.getElementById("1l" + i).style.backgroundColor = "white";
			document.getElementById("2l" + i).style.backgroundColor = "white";
		}
		checkNum();
	}
	document.getElementById("msg").style.position = "absolute";
	document.getElementById("msg").style.left = (x + 15) + "px";
	document.getElementById("msg").style.top = (y - 165) + "px";
	for (var i = 0; i < 5; i ++) {
		for (var j = 1; j <= 5; j ++) {
			var k = "n" + (i * 5 + j);
			document.getElementById(k).style.position = "absolute";
			document.getElementById(k).style.left = (x + (j - 3) * 60) + "px";
			document.getElementById(k).style.top = (y + (i - 2) * 60) + "px";
		}
	}
	for (var i = 0; i < 6; i ++) {
		for (var j = 1; j <= 6; j ++) {
			var k = "p" + (i * 6 + j);
			document.getElementById(k).style.position = "absolute";
			document.getElementById(k).style.left = (x - 10 + (j - 3) * 60) + "px";
			document.getElementById(k).style.top = (y - 11 + (i - 2) * 60) + "px";
		}
	}
	for (var i = 0; i < 6; i ++) {
		for (var j = 1; j <= 5; j ++) {
			var k = "1l" + (i * 5 + j);
			document.getElementById(k).style.position = "absolute";
			document.getElementById(k).style.left = (x - 2 + (j - 3) * 60) + "px";
			document.getElementById(k).style.top = (y - 9 + (i - 2) * 60) + "px";
		}
	}
	for (var i = 0; i < 5; i ++) {
		for (var j = 1; j <= 6; j ++) {
			var k = "2l" + (i * 6 + j);
			document.getElementById(k).style.position = "absolute";
			document.getElementById(k).style.left = (x - 7 + (j - 3) * 60) + "px";
			document.getElementById(k).style.top = (y - 3 + (i - 2) * 60) + "px";
		}
	}
}

function setPoint() {
	var x = document.getElementsByClassName("p");
	for (var i = 0; i < x.length; i ++) {
		x[i].style.backgroundColor = "black";
	}
}
