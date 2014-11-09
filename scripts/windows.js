function buildWindows(){
	var width = document.body.offsetWidth;

	var columns = 5;
	var min_window_width = 128;

	while(width/columns < min_window_width && columns > 2){
		columns -= 1;
	}

	var percentage = 100.0 / columns;

	var connection = new XMLHttpRequest();
	connection.open("GET","recipes-index",false);
	connection.send();
	stage = JSON.parse(connection.responseText);


	var randoms = Math.floor(stage.length/4);

	

	var html = "<table width=100%><tr>";

	var k = 0;
	var bigones = [];
	var counter = 0;
	while(bigones.length < randoms && counter < 100000){
		var thisone = Math.floor(Math.random()*(stage.length-randoms));
		if(bigones.indexOf(thisone) < 0){
			bigones.push(thisone);
		}
		counter++;
	}

	if(bigones.length < randoms){
		for(var i = 0; i < stage.length && bigones.length < randoms; i++){
			if(bigones.indexOf(i) < 0){
				bigones.push(i);
			}
		}
	}

	bigones.sort(function s(a,b){return a-b});
	console.log(bigones);
	var window = [];
	for(var i = 0; i < (stage.length+3*randoms)/columns; i++){
		var c = []
		for(var k = 0; k < columns; k++){
			c.push("f");
		}
		window.push(c);
	}


	console.log(window);

	var place = bigones[0];
	for(var i = 0; i < bigones.length; i++){
		if(place < bigones[i]){
			place = bigones[i];
		}

		var done = false;
		while(!done && place < (stage.length+3*randoms)){
			if(window[Math.floor(place/columns)][place % columns] == "f" &&
				place % columns != columns-1 &&
				window[Math.floor(place/columns)][(place % columns)+1] == "f" &&
				!manyIs(window,Math.floor(place/columns))){
				window[Math.floor(place/columns)][place % columns] = "x";
				window[Math.floor(place/columns)][(place % columns) + 1] = "i";
				window[Math.floor(place/columns)+1][place % columns] = "i";
				window[Math.floor(place/columns)+1][(place % columns) + 1] = "i";
				done = true;
			}
			else{
				place++;
			}
		}
	}
	console.log(window);

	var which_single = 0;
	var which_double = 0;
	for(var i = 0; i < window.length; i++){
		for(var j = 0; j < window[i].length; j++){
			while(window[i][j] == "f" && which_single < stage.length){
				if(bigones.indexOf(which_single) < 0){
					html += "<td width="+percentage+"%><img src='images/recipes/"+stage[which_single]+".jpg' width=100%/></td>";
					window[i][j] = "s";
				}
				which_single++;
			}
			while(window[i][j] == "x" && which_double < stage.length){
				if(bigones.indexOf(which_double) >= 0){
					html += "<td colspan=2 rowspan=2 width="+2*percentage+"%><img src='images/recipes/"+stage[which_double]+".jpg' width=100%/></td>";
					window[i][j] = "d";
				}
				which_double++;
			}
		}
		html+="</tr>";
		html+="<tr>";
	}
	html += "<table>";
	document.body.innerHTML = html;
}

function manyIs(window,row){
	var count = 0;
	for(var i = 0; i < window[row].length; i++){
		if(window[row][i] == "i"){
			count++;
		}
	}
	return (count > 1);
}
