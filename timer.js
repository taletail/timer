var timer;
var limit_time;
var start_time;
var warn_times;

var canvas = document.getElementById("a_canvas");
var context = canvas.getContext("2d");

// セットボタンを押した時に実行
function setTime(){
　　warn_times = [];

  limit_time = sumSec("min", "sec");
  warn_times.push(sumSec("min_warn1", "sec_warn1"));
  warn_times.push(sumSec("min_warn2", "sec_warn2"));
  warn_times.push(sumSec("min_warn3", "sec_warn3"));
  warn_times.push(sumSec("min_warn4", "sec_warn4"));
  warn_times.push(sumSec("min_warn5", "sec_warn5"));
    
  start_time = new Date();
    
  // タイマーが2重に動かないように，動いていたら止める
  if(timer){
    stop();
  }
  
  timer = setInterval('countdown()', 1000);
}
  
function stop(){
  clearInterval(timer); // 繰り返し処理を中止する
}
  
// 分と秒を秒に変換
function sumSec(id1,id2){
  var min = document.getElementById(id1).value;
  var sec = document.getElementById(id2).value;
    
  min = checkString(min);
  sec = checkString(sec);
  sum = parseInt(min, 10) * 60 + parseInt(sec, 10);
  if(sum == 0){
    return -5;
  }
  return sum;
}
  
// 数字以外の文字と空文字を0に変換
function checkString(str){
  if(str.match(/[^0-9]/) || str === ""){
    return 0;
  }
  return str;
}
  
// カウントダウン
function countdown(){
  now = new Date();
  diff_time = now - start_time;
    
  count = parseInt(limit_time - diff_time / 1000);
  
  c_min = parseInt(count / 60, 10);
  c_sec = parseInt(count % 60, 10);
    
  showTime(c_min, c_sec);
    
  // タイムアップ
  if(count <= 0){
    endSound();
    stop();
  }
    
  // 警告音
  for(var i=0; i < warn_times.length; i++){
    if(count == warn_times[i]){
      warningSound("warningsound" + (i+1));
    }
  }
}

// 時刻表示
function showTime(min, sec){
  // ゼロパディング
  var text = ("0" + min).slice(-2) + ":" + ("0" + sec).slice(-2);
    
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.font = "300px 'ＭＳ ゴシック'";
  context.fillStyle = "#ffffff";
  context.fillText(text, 10, 300);
}
  
// タイムアップ音
function endSound(){
　 document.getElementById("endsound").currentTime = 0;
  document.getElementById("endsound").play();
}
  
// 途中経過音
function warningSound(id){
　 document.getElementById(id).currentTime = 0;
  document.getElementById(id).play();
}