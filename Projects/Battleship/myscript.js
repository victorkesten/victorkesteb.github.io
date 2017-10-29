"use strict";
var x = 300;
var y = 300;
var collumns = 9;
var rows = collumns;
var squareSize = x/collumns;
var squareXoffset = x/collumns;
var squareYoffset = y/collumns;

//Player 1
//coords of placedships.
var placedShips1 = [];
//All hit squares. Both hits and misses
var hitSquares1 = [];
//All hits. No misses
var rightSquares1 = [];
var hits1 = 0;
var shots1 = 0;
var shipsSunk1 = 0;

//Player 2
var placedShips2 = [];
var hitSquares2 = [];
var rightSquares2 = [];
var hits2 = 0;
var shots2 = 0;
var shipsSunk2 = 0;

//Turn based integer.
var turn = 1;

//All ships. List length 5
var shipLengths = [5,4,3,3,2];

var shipLengths1 = [5,4,3,3,2];
var shipLengths2 = [5,4,3,3,2];

//Board setup variable
var shipCheck = 0;
var placedShips = []


function createGrid(){
    var i = 0;
    var str = "";
    while(i < 9){
        var j = 0;
        while(j < 9){
            str += '<div class="square" id=' + i + '' + j + ' onclick="showPosition('+i+','+j+')"></div>';
            j++;
        }
        i++;
    }
    document.getElementById("grid").innerHTML = str;
    //Player 1 setup
    setUpBoard();
    //Player 2 setup
    setUpBoard();
    console.log(placedShips1);
    console.log(placedShips2);
}



function setUpBoard(){
    var i = 0;
    while(i < 5){ // 5 is #ofShips
        var checkPos = true;
        while(checkPos){
            var dir = Math.floor((Math.random() * 2) + 1);
            var x = Math.floor((Math.random() * 8));
            var y = Math.floor((Math.random() * 8));
            if(dir == 1){
                if(shipLengths[i]<=assignRow(x,y)){
                    for(var j = 0; j < shipLengths[i]; j++){
                        addShip((x+j)+""+y);
                    }
                    checkPos = false;
                }
            }else {
                if(shipLengths[i]<=assignCollumn(x,y)){
                    for(var j = 0; j < shipLengths[i]; j++){
                        var temp = temp = x +""+(y+j);
                        placedShips.push(temp);
                    }
                    checkPos = false;
                }   
            }   
        }
        i++;
    }
    if(shipCheck == 0){
        placedShips1 = placedShips;
        shipCheck++;
    } else {
        placedShips2 = placedShips;
    }
    placedShips = [];
}

function assignCollumn(x,y){
    var counter = 0;
    var contain = false;
    for(var i = y; i < collumns; i++){
        var temp = x+""+(y+(i-y));
        for(var j = 0; j < placedShips.length; j++){
            if(temp == placedShips[j]){
                contain = true;
                }
            }
            if(!contain){
                counter++;
            } else {
            return counter;
                }
        }

        return counter;
    }

function assignRow(x, y){
    var counter = 0;
    var contain = false;
    for(var i = x; i < rows; i++){
        var tempPos = (x+(i-x))+""+y;
        for(var j = 0; j < placedShips.length; j++){
            if(tempPos == placedShips[j]){
                contain = true;
            }
        }
        if(!contain){
            counter++;
        } else {
            return counter;
            }
        }
        return counter;
    }


function addShip(shipPos){
    placedShips.push(shipPos);
}

function restart(){
    placedShips1 = [];
    placedShips2 = [];
    shipCheck = 0;
    placedShips = []
    hitSquares1 = [];
    rightSquares1 = [];
    hits1 = 0;
    shots1 = 0;
    shipsSunk1 = 0;
    shipsSunk2 = 0;
    shipLengths1 = [5,4,3,3,2];
    shipLengths2 = [5,4,3,3,2];


    hitSquares2 = [];
    rightSquares2 = [];
    hits2 = 0;
    shots2 = 0;

    turn = 1;

    createGrid();
    document.getElementById("pTurn").innerHTML = "Player 1's Turn";
    document.getElementById("shots1").innerHTML = "Shots: " + shots1;
    document.getElementById("hits1").innerHTML = "Hits: " + hits1;
    document.getElementById("shots2").innerHTML = "Shots: " + shots2;
    document.getElementById("hits2").innerHTML = "Hits: " + hits2;
    document.getElementById("sunk1").innerHTML = "Ships sunk: " + shipsSunk1;
    document.getElementById("sunk2").innerHTML = "Ships sunk: " + shipsSunk2;


}


function debug(){
   console.log(hitSquares1);
   console.log(shipLengths1);
   console.log(shipsSunk1);
   console.log(rightSquares1);
}

//PLACED SHIPS 1
function showPosition(_x, _y){
    if(turn ==1){
        for(var i = 0; i<placedShips1.length; i++){
            if((_x +''+_y) == placedShips1[i]){
                document.getElementById(_x+''+_y).style.background = "red";
                rightSquares1.push(_x+''+_y);
                hits1++;
                var shipT = 0;
                if(i <=4){
                    shipLengths1[0] = shipLengths1[0]-1;
                    shipT = 0;
                } else if(i > 4 && i <=8){
                    shipLengths1[1] = shipLengths1[1]-1;
                    shipT = 1;
                } else if(i > 8 && i <= 11){
                    shipLengths1[2] = shipLengths1[2]-1;
                    shipT = 2;
                } else if (i > 11 && i <= 14){
                    shipLengths1[3] = shipLengths1[3]-1;
                    shipT = 3;

                } else {
                    shipLengths1[4] = shipLengths1[4]-1;
                    shipT = 4;
                }
                if(shipLengths1[shipT] == 0){
                    shipsSunk1++;
                }
                break;
            } else{
                document.getElementById(_x+''+_y).style.background = "black";
            }  
        }
        hitSquares1.push(_x+''+_y);
        shots1++;
        document.getElementById("shots1").innerHTML = "Shots: " + shots1;
        document.getElementById("hits1").innerHTML = "Hits: " + hits1;
        document.getElementById("sunk1").innerHTML = "Ships sunk: " + shipsSunk1;
        turn++;
    } else {
        for(var i = 0; i<placedShips2.length; i++){
            if((_x +''+_y) == placedShips2[i]){
                document.getElementById(_x+''+_y).style.background = "red";
                rightSquares2.push(_x+''+_y);
                hits2++;
                var shipT = 0;
                if(i <=4){
                    shipLengths2[0] = shipLengths2[0]-1;
                    shipT = 0;
                } else if(i > 4 && i <=8){
                    shipLengths2[1] = shipLengths2[1]-1;
                    shipT = 1;

                } else if(i > 8 && i <= 11){
                    shipLengths2[2] = shipLengths2[2]-1;
                    shipT = 2;
                } else if (i > 11 && i <= 14){
                    shipLengths2[3] = shipLengths2[3]-1;
                    shipT = 3;

                } else {
                    shipLengths2[4] = shipLengths2[4]-1;
                    shipT = 4;
                }
                if(shipLengths2[shipT] == 0){
                    shipsSunk2++;
                }
                break;
            } else{
                document.getElementById(_x+''+_y).style.background = "black";
            }  
        }
        hitSquares2.push(_x+''+_y);
        shots2++;
        document.getElementById("shots2").innerHTML = "Shots: " + shots2;
        document.getElementById("hits2").innerHTML = "Hits: " + hits2;
        document.getElementById("sunk2").innerHTML = "Ships sunk: " + shipsSunk2;

        turn--;
    }
    renderBoard();

    if(hits1 == 17){
        window.alert('Congratulations! Player 1 has won. Press restart to play again. \n Final score: \n Shots: ' + shots1 + ' Hits: ' + hits1);
        
    } else if (hits2 == 17){
        window.alert('Congratulations! Player 2 has won. Press restart to play again. \n Final score: \n Shots: ' + shots2 + ' Hits: ' + hits2);
    }
}
var sex = 3;

function submitHS(){
    document.getElementById("hiddenField").innerHTML = sex;
}

function renderBoard(){
    if(turn == 1){
        document.getElementById("pTurn").innerHTML = "Player 1's Turn";
    } else {
        document.getElementById("pTurn").innerHTML = "Player 2's Turn";      
    }
    var i = 0;
    while(i < 9){
        var j = 0;                  
        while(j < 9){
            if(turn == 1){
                var z = 0;
                var cheK = 0;
                while(z < hitSquares1.length){
                     if (i+''+j == hitSquares1[z]){
                        document.getElementById(i+''+j).style.background = "black";
                        cheK = 0;
                        z = hitSquares1.length;                        
                    } else {
                        cheK = 1;
                    }
                    z++;
                }
                var t = 0;
                while(t < rightSquares1.length){
                    if(i+''+j == rightSquares1[t]){
                        document.getElementById(i+''+j).style.background = "red";                        
                        cheK = 0;
                        t = rightSquares1.length;                        
                    } 
                    t++;
                }
                if(cheK == 1 || z == 0){
                    document.getElementById(i+''+j).style.background = "orange";                        
                }
            } else {
                var z = 0;
                var cheK = 0;
                while(z < hitSquares2.length){
                     if (i+''+j == hitSquares2[z]){
                        document.getElementById(i+''+j).style.background = "black";
                        cheK = 0;
                        z = hitSquares2.length;                        
                    } else {
                        cheK = 1;
                    }
                    z++;
                }
                var t = 0;
                while(t < rightSquares2.length){
                    if(i+''+j == rightSquares2[t]){
                        document.getElementById(i+''+j).style.background = "red";                        
                        cheK = 0;
                        t = rightSquares2.length;                        
                    } 
                    t++;
                }
                if(cheK == 1 || z == 0){
                    document.getElementById(i+''+j).style.background = "orange";                        
                }
            }
            j++;
        }
        i++;
    }
}