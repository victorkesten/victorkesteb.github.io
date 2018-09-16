"use strict";
var snake = [[7,6],[7,7],[7,8],[7,9]];
var direction1 = 1;  // 0 = left; // 1 = right // 2 = up // 3 = down
var apple = [[5,5]];
var score = 0;
var game = false;
var pp = true;
var lose = false;
var reload = false;
var keyLock = false;

var timesplayed = 0;
var scoreSum = 0;

document.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;
     if (e.keyCode == '38') {
        up();
        console.log("up");
        // up arrow
    }
    else if (e.keyCode == '40') {
        console.log("down");
        down();
        // down arrow
    }
    else if (e.keyCode == '37') {
        console.log("left");
        left();
       // left arrow
    }
    else if (e.keyCode == '39') {
        console.log("right");
        right();
       // right arrow
    }
    else if (e.keyCode == '83'){
        console.log("save");
        save();
        //s 
    }
    else if (e.keyCode == '80'){
        console.log("pause")
        pause();
        //p 
    } else if (e.keyCode == '32'){
        console.log("start");
        pause();
        // space_bar
    }

}

function down(){
    if(direction1 != 2 && game == true && !keyLock){
       direction1 = 3;
       keyLock = true;     
    }
}

function left(){
    if(direction1 != 1 && game == true && !keyLock){
        direction1 = 0;
        keyLock = true;     

    }
}

function right(){
    if(direction1 != 0 && game == true && !keyLock){
        direction1 = 1;
        keyLock = true;     

    }
}

function up(){
    if(direction1 != 3 && game == true && !keyLock){
       direction1 = 2;    
        keyLock = true;     
    }
}

function start(){
    if(lose != true){
        game = true;
    } 
}

function restart(){
    if(reload){
        reload = false;
        timesplayed = 0; 
        scoreSum = 0;
    } else {
        apple = [[5,5]];
        snake = [[7,6],[7,7],[7,8],[7,9]];
        score = 0;
        direction1 = 1;  
        lose = false;
        document.getElementById("session1").innerHTML = "Session Highscore: " + score;
    }

    var i = 0;
    while(i < 15){
        var j = 0;
        while(j < 15){
            document.getElementById(i+','+j).style.background = "orange";
            j++;
        }
        i++;
    }
    i = 0;
    while( i < snake.length){
        document.getElementById(snake[i][0]+','+snake[i][1]).style.background = "red";
        i++;
    }
    document.getElementById(apple[0][0]+','+apple[0][1]).style.background = "green";
   // game = true; 
}


function save(){
    console.log("Try SavE"  + lose);
    if(!lose){
        console.log("Save Succes!");
        document.cookie="snake="+snake+"; expires=Wednesday,31-Dec-2017 21:00:00 GMT; path=/";
        document.cookie="apple="+apple+"; expires=Wednesday,31-Dec-2017 21:00:00 GMT; path=/";
        document.cookie="direction="+direction1+"; expires=Wednesday,31-Dec-2017 21:00:00 GMT; path=/"
        //document.cookie="score="+score+"; expires=Wednesday,31-Dec-2017 21:00:00 GMT; path=/"
        document.cookie="saveReload=1; expires=Wednesday,31-Dec-2017 21:00:00 GMT; path=/"
        document.cookie="cookieSave=1; expires=Wednesday,31-Dec-2017 21:00:00 GMT; path=/"
        document.cookie="sessionHighscore="+score+"; expires=Wednesday,31-Dec-2017 21:00:00 GMT; path=/";
        location.reload();
        //loadGame();
    }
}

function submitHS(){
    if(pp && lose){
        document.cookie="sessionHighscore="+score+"; expires=Wednesday,31-Dec-2017 21:00:00 GMT; path=/";
        document.cookie="submitHS=1; expires=Wednesday,31-Dec-2017 21:00:00 GMT; path=/";
        timesplayed = 0; 
        scoreSum = 0;
        location.reload();  
    }
}

function getCookie(cname){
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i < ca.length; i++){
        var c = ca[i];
        while(c.charAt(0)==' '){
            c = c.substring(1);
        }
        if(c.indexOf(name) == 0){
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function pause(){
    if(lose == false){
        if(pp){
            game = false;
            pp =   false;
        } else {
            pp   = true;
            game = true;
        }
    }

}

function fixSnakeCookie(){
    var snakeString = getCookie("snake");
    snake = [];
    var i = 0;
    while((snakeString.length) > i){
        var temp = [];
        var tempString = snakeString.charAt(i);
        if(snakeString.charAt(i+1) == ','){
            temp.push(parseInt(tempString));
            tempString = snakeString[i+2];
            if(snakeString.charAt(i+3) != ','){
                tempString += snakeString[i+3];
                i++;
            }
            temp.push(parseInt(tempString));
        } else {            // 10,2,3,4,5,
            tempString += snakeString[i+1];
            temp.push(parseInt(tempString));
            tempString = snakeString[i+3];
            if(snakeString.charAt(i+4) != ','){
                tempString += snakeString[i+4];
                i++;
            }
            i++;
            temp.push(parseInt(tempString));
        }
        snake.push(temp);
        i+=4;
    }
}

function fixAppleCookie(){
    var appleString = getCookie("apple");
    apple = [];
    var tempString = appleString.split(",");
    tempString[0] = parseInt(tempString[0]);
    tempString[1] = parseInt(tempString[1]);
    //temp.push(parseInt(tempString[2]));
    apple.push(tempString);
}

function fixDirection(){
    direction1 = parseInt(getCookie("direction"));
}

function fixScore(){
    score = parseInt(getCookie("sessionHighscore"));
    document.getElementById("session1").innerHTML = "Session Highscore: " + score;

}

function loadGame(){
    console.log(getCookie("snake"));
    fixSnakeCookie();
    fixAppleCookie();
    fixDirection();
    fixScore();
    reload = true;
    lose = false;
    restart();
}

function createSnake(){
    var i = 0;
    var str = "";
    while(i < 15){
        var j = 0;
        while(j < 15){
            str += '<div class="square" id=' + i + ',' + j + '></div>';
            j++;
        }
        i++;
    }
    document.getElementById("playfield").innerHTML = str;
    var i = 0;
    while( i < snake.length){
        document.getElementById(snake[i][0]+','+snake[i][1]).style.background = "red";
        i++;
    }
    document.getElementById(apple[0][0]+','+apple[0][1]).style.background = "green";
    if(parseInt(getCookie("saveReload")) == 1){
        document.cookie="saveReload=0; expires=Wednesday,31-Dec-2017 21:00:00 GMT; path=/"
        loadGame();
    } else {
       document.getElementById("session1").innerHTML = "Session Highscore: " + score;
    }
    window.setInterval(placeSnake, 177);
}

function placeSnake(){
    var i = 0;
    var a = snake.length;
    var oldCoord = snake[0][0]+','+snake[0][1]; 
    if(game){
        
        while(i < a-1){
            snake[i][0] = snake[i+1][0];
            snake[i][1] = snake[i+1][1];
            i++;
        }

        if(direction1 == 1){
            snake[a-1][1] = snake[a-1][1] + 1;
            if(snake[a-1][1] == 15){
                snake[a-1][1] = 0;
            }
        } else if (direction1 == 0){     
            snake[a-1][1] = snake[a-1][1]-1;
            if (snake[a-1][1] == -1) {
                snake[a-1][1] = 14;
            }
        } else if (direction1 == 3){
            snake[a-1][0] = snake[a-1][0] + 1;
            if(snake[a-1][0] == 15){
                snake[a-1][0] = 0;
            }
        }  else if (direction1 == 2){
            snake[a-1][0] = snake[a-1][0]-1;
            if (snake[a-1][0] == -1) {
                snake[a-1][0] = 14;
            }
        }
        document.getElementById(snake[a-1][0]+','+snake[a-1][1]).style.background = "red";
        document.getElementById(oldCoord).style.background = "orange";

        if(snake[a-1][0] == apple[0][0] && snake[a-1][1] == apple[0][1]){
            snake.unshift([[apple[0][1],apple[0][1]]]);
            var apple1 = [[Math.floor((Math.random() * 14) + 1), Math.floor((Math.random() * 14) + 1)]];
            var j = 0;
            while(j < snake.length){
                if(apple1[0][0] == snake[j][0] && apple1[0][1] == snake[j][1]){
                    j = 0;
                    apple1 = [[Math.floor((Math.random() * 14) + 1), Math.floor((Math.random() * 14) + 1)]];
                } 
                j++;
            }
            apple = apple1
            score++;
            document.getElementById(apple[0][0]+','+apple[0][1]).style.background = "green";
            document.getElementById("session1").innerHTML = "Session Highscore: " + score;
        }
        var j = 0;
        var tempSa = snake[a-1][0] +',' +snake[a-1][1];
        while( j < snake.length-2){
            if((snake[a-1][0] == snake[j][0] && snake[a-1][1] == snake[j][1]) || oldCoord == tempSa){
                game = false;
                lose = true;
                timesplayed += 1; 
                scoreSum += score;
                document.cookie="timesPlayed="+timesplayed+"; expires=Wednesday,31-Dec-2017 21:00:00 GMT; path=/";
                document.cookie="scoreSum="+scoreSum+"; expires=Wednesday,31-Dec-2017 21:00:00 GMT; path=/";
                
                alert("You lose with score: " + score + "\nPress reset or submit your score!");
                break;
            }
            j++;
        }
    }
   keyLock = false;
}

