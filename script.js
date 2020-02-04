
//app variables
var secs1 = 0; //xx:0x
var secs2 = 0;//xx:x0
var mns1 = 2;//2x:xx
var mns2 = 5;//x5:xx
var break1 = 0;//0x:xx
var break2 = 5;//x5:xx
var breakVal=5;
var beginPoint=1.5; // a fixed var for the begin Point of the Worktime arc
var state="inactive" //state of the clock;
var begin; // variable for setInterval-time function 
var redraw; // variable for setInterval-draw function
var changeRed=0; // a constant that changes every minute of the break and changes the begin point of the break arc
var phase=0; // [0]-start break [1]-end break

$( document ).ready(function() {
drawOuter()
var minutes1 = $("#mns1").text(mns1);
var minutes2 = $("#mns2").text(mns2);
var seconds1 = $("#secs1").text(secs1);
var seconds2 = $("#secs2").text(secs2);
});

//hover effects from one elmnt effecting another
$(".arrow-right").hover(function(){
    $(".pause").css("background-color", "#554348");
    });
$( ".arrow-right" ).mouseleave(function() {
  $( ".pause" ).css("background-color","orange");
});



//changing values for timer from dropdown menu

function setValues(see1, see2) {
  if (state=="inactive"){
  var workMnsArray = see1.split("");
  mns1 = parseInt(workMnsArray[0]);
  mns2 = parseInt(workMnsArray[1]);
  minutes1 = $("#mns1").text(mns1);
  minutes2 = $("#mns2").text(mns2);
  secs1 = 0;
  secs2 = 0;
  seconds1 = $("#secs1").text(secs1);
  seconds2 = $("#secs2").text(secs2);
  var breakMnsArray = see2.split("");
  break1 = parseInt(breakMnsArray[0]);
  break2 = parseInt(breakMnsArray[1]);
   //values to pass for the canvas radius
  endPoint=((2*(parseInt(see1)))/60)+1.5;
  breakVal=parseInt(see2);
  drawOuter()
  }
}


//PLAY/PAUSE functions && PLAY/PAUSE graphic change
function initiate() {
  //if timer is not running
  if (state=="inactive"){
   state="active";
   $( "#pauseId" ).addClass( "pause" );
   $( ".arrow-right" ).css( "margin-left","50%" );
    
  begin=setInterval(frame, 1000);
  redraw=setInterval(function afto(){
    if(beginPoint<endPoint){ 
      beginPoint+=1/30;
      drawOuter()
  }
    else {
      changeRed+=1/9.56;
      drawOuter()
 
    }
  },60000);
  }
  //if timer is running
 else if (state=="active"){
   state="inactive";
   $( "#pauseId" ).removeClass( "pause" );
    $( ".arrow-right" ).css( "margin-left","50%" );
   clearInterval(begin);
   blearInterval(redraw);
 } 
  
}
//timer change
function frame() {
  secs2--;
  //00:00
  if (mns1 == 0 && mns2 == 0 && secs1 == 0 && secs2 == -1) {
    mns1 = break1;
    mns2 = break2;
    secs2 = 0;
    var minutes1 = $("#mns1").text(mns1);
    var minutes2 = $("#mns2").text(mns2);
    if (phase==0){
    //play sound that marks the begining of the break
        var audio = document.createElement('audio');
audio.src = 'http://www.wavsource.com/snds_2017-09-17_1751672946049674/movies/2001/completed.wav'
audio.play();
    phase++;
    }
    else {
    //play sound that marks the end of the break
        var audio = document.createElement('audio');
audio.src = 'http://www.wavsource.com/snds_2017-09-17_1751672946049674/movies/2001/feel_much_better.wav'
audio.play();
    //end of the function  

    restart();
    }
    
    //x0:00
  } else if (mns2 == 0 && secs1 == 0 && secs2 == -1) {
    mns1--;
    secs1 = 5;
    mns2 = 9;
    secs2 = 9;
    $("#mns1").text(mns1);
    $("#mns2").text(mns2);
    $("#secs1").text(secs1);
    //xx:x0
  } else if (secs1 !== 0 && secs2 == -1) {
    secs1--;
    secs2 = 9;
    $("#secs1").text(secs1);
    //xx:00
  } else if (secs1 == 0 && secs2 == -1) {
    mns2--;
    secs1 = 5;
    secs2 = 9;
    $("#secs1").text(secs1);
    $("#mns2").text(mns2);
  }

  $("#secs2").text(secs2);
}



//CANVAS DRAWING

function drawOuter(){
var canvas = document.getElementById("clock");
var context = canvas.getContext("2d");
var context2 = canvas.getContext("2d");
context.clearRect(0, 0, canvas.width, canvas.height);
  
//main white circle
context.beginPath();
var x1 = canvas.width / 2;
var y1 = canvas.height / 2;
var radius1 = 200;
var startAngle1 = 0 * Math.PI;
var endAngle1 = 2 * Math.PI;
var counterClockwise1 = false;
context.arc(x1, y1, radius1, startAngle1, endAngle1, counterClockwise1);
context.lineWidth = 20;
context.strokeStyle = "white";
context.stroke();

//outer orange circle

context.beginPath();
var x2 = canvas.width / 2;
var y2 = canvas.height / 2;
var radius2 = 215;
var startAngle2 = beginPoint * Math.PI;
var endAngle2 = endPoint* Math.PI;
var counterClockwise2 = false;
context.arc(x2, y2, radius2, startAngle2, endAngle2, counterClockwise2);
context.lineWidth = 10;
context.strokeStyle = "orange";
context.stroke();

//break red circle
context.beginPath();
var x3 = canvas.width / 2;
var y3 = canvas.height / 2;
var radius3 = 215;
var startAngle3 = endAngle2+changeRed;
var endAngle3 =endAngle2+((breakVal*6.29)/60);
var counterClockwise3 = false;
context.arc(x3, y3, radius3, startAngle3, endAngle3, counterClockwise3);
context.lineWidth = 10;
context.strokeStyle = "#554348";
context.stroke(); 
}


//restart function
function restart (){
 changeRed=0;
 phase=0;
 clearInterval(begin);
 clearInterval(redraw);
 state="inactive";
 beginPoint=1.5;
 var restart1=document.getElementById('workTime');
 var restart2=document.getElementById('breakTime');
  $( "#pauseId" ).removeClass( "pause" );
   $( ".arrow-right" ).css( "margin-left","50%" );
  console.log(restart1.value,restart2.value);
 setValues(restart1.value,restart2.value);  
}
