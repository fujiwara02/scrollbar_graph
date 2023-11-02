//部分再生
function handleButtonClick1() {


  //const y = resizeButton.x();
  //const z = resizeButton2.x();

  resizeButton.isFirstRun = true;

  animationActive = true; // アニメーションを制御するフラグ
  let rangeValue = 0;
  let animationStart; 
  let animationDuration = ((long * 1000) * (z - y)) / (729.28125 * (scrollValue / 100)); // 動画時間 * スライド間計算 / 倍速
  end = z / 729.28125;


  function animateRangeExpansion(timestamp) {
    if (!animationStart) {
      animationStart = timestamp;
    }

    const progress = timestamp - animationStart;
    const progressPercentage = Math.min(progress / animationDuration, 1);

    rangeValue = Math.min(progressPercentage, 1);
    
    const newValue = xAxis.positionToValue( y / 729.28125 + rangeValue * (z - y) / 729.28125);//加算(start位置)、掛け算(長さ)
    

    if(rangeValue == 1){
      onMovieStop();

    }
    if(resizeButton.isAnimation){
      range2.set("value", newValue);
      start = rangeValue;
      
    }

    if (progressPercentage < 1 && animationActive) {
      requestAnimationFrame(animateRangeExpansion);
  }
  }

  onZDataChange(scrollValue / 100, y, z, long); //再生速度、start、end、動画の長さ

  // アニメーション(スクロールバー)を開始
  requestAnimationFrame(animateRangeExpansion);
    
}
