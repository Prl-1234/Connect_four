var mm=prompt("Enter first player's name");
var pm=prompt("Enter second player's name");
var playercolor='green';
var player=mm;
var table = $('table tr');

function colorchanger(rowindex,columnindex,playercolor){
	return table.eq(rowindex).find('td').eq(columnindex).find('button').css("background-color", playercolor);
}

function returncolor(rowindex,columnindex){
	return table.eq(rowindex).find('td').eq(columnindex).find('button').css('background-color');
}

function checkbottom(columnindex){
	var colorreport=returncolor(5,columnindex);
	for(var row=5;row>-1;row--){
		colorreport=returncolor(row,columnindex);
		if(colorreport === 'rgb(128, 128, 128)'){
			break;
		}
	}
	return row;
}

function colormatchcheck(one,two,three,four){
	return (one===two && one===three && one===four && one!=='rgb(128, 128, 128)' && one!==undefined);
}

function horizontalwincheck(){
	for(var row=0;row<6;row++){
		for(var col=0;col<4;col++){
			if(colormatchcheck(returncolor(row,col),returncolor(row,col+1),returncolor(row,col+2),returncolor(row,col+3))){
				return true;
			}
			else{
				continue;
			}
		}
	}
}

function verticalwincheck(){
	for(var col=0;col<7;col++){
		for(var row=0;row<3;row++){
			if(colormatchcheck(returncolor(row,col),returncolor(row+1,col),returncolor(row+2,col),returncolor(row+3,col))){
				console.log(row+ " "+col);
				return true;
			}
			else{
				continue;
			}
		}
	}
	return false;
}

function diagonalwincheck(){
	for(var col=0;col<5;col++){
		for(var row=0;row<7;row++){
			if(colormatchcheck(returncolor(row,col),returncolor(row+1,col+1),returncolor(row+2,col+2),returncolor(row+3,col+3))){
				return true;
			}
			else if(colormatchcheck(returncolor(row,col),returncolor(row-1,col+1),returncolor(row-2,col+2),returncolor(row-3,col+3))){
				return true;
			}
			else{
				continue;
			}
		}
	}
}

$('h2').text(player+" pick a column to drop");
var i=0;
$('.board button').on('click',function(){
	if(i!=2){
		var col=$(this).closest('td').index();
		var bottomavail=checkbottom(col);
		colorchanger(bottomavail,col,playercolor);
		if(verticalwincheck()||horizontalwincheck()||diagonalwincheck()){
			$('h2').text( player +', You have won!');
			$('h5').text('Refresh to Restart');
			$('h1').fadeOut('fast');
			$('h4').fadeOut('fast');			
			i = 2;
			
		}
		
	else if(i==0){
		i=1;
		player=pm;
		$('h2').text("Turn of: " + player);
		playercolor='blue';
	}
	else if(i==1){
		i=0;
		player=mm;
		$('h2').text("Turn of: " + player);
		playercolor='green';
	}
	}
})