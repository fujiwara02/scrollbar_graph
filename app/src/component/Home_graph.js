import React, { useState, useEffect, useRef } from 'react';
import * as am5 from '@amcharts/amcharts5';
import './Home.css';
import * as am5xy from '@amcharts/amcharts5/xy';

import myArray from './outputs_all_one.js'; 
import myArray0 from './outputs0.js';
import myArray1 from './outputs1.js'; 
import myArray2 from './outputs2.js'; 
import myArray3 from './outputs3.js'; 
import myArray4 from './outputs4.js'; 
import myArray5 from './outputs_allzero.js'; 

//onXDataChange, onYDataChange, onCDataChange(graph➡home)
const Chart = ({ onXDataChange, onYDataChange, onCDataChange, onZDataChange, onSDataChange, onMovieStop}) => {
  
  const [videoDuration, setVideoDuration] = useState(0);
  const [x_second, setX_second] = useState(0);
  const [y_second, setY_second] = useState(0);
  const [z_second, setZ_second] = useState(0);


  useEffect(() => {

    const videoElement = document.createElement('video');
    let long = 10;
    let start = 0;
    let end = 0;
    let animationActive = false;// アニメーションを制御するフラグ
    let y = 0;
    let z = 0;
    let start1 = 0; //アニメーション時にstartを保存

    videoElement.onloadedmetadata = () => {
      console.log('動画の秒数:', videoElement.duration);
      // ここでduration（秒数）を利用して何かしらの処理を行うことができます
      long = videoElement.duration;
      setVideoDuration(videoElement.duration);
    };

    videoElement.src = require('./D13(1).mp4'); // 動画ファイルのパスを指定

    

    const createButton = () => {
      const button = document.createElement('button');
      button.innerText = '最初から再生';
      button.addEventListener('click', () => handleButtonClick());
      document.getElementById('button-container').appendChild(button);
      return button;
    };

    const createButton1 = () => {
      const button = document.createElement('button');
      button.innerText = '部分再生';
      button.addEventListener('click', () => handleButtonClick1());
      document.getElementById('button-container1').appendChild(button);
      return button;
    };

    const createButton2 = () => {
      const button = document.createElement('button');
      button.innerText = '一時停止';
      button.addEventListener('click', () => handleButtonClick2());
      document.getElementById('button-container2').appendChild(button);
      return button;
    };

    let scrollValue = 100;

   
    const handleScrollChange = (event) => {
      scrollValue = event.target.value;
      
  // スクロールバーの値に基づいてグラフの表示範囲を更新
  // 例: グラフが表示するデータを変更するロジック
  console.log(event.target.value);
    };
    
    // スクロールバーの初期化
    const scrollbar = document.createElement('input');
    scrollbar.type = 'range';
    scrollbar.min = '25';
    scrollbar.max = '100';
    scrollbar.value = scrollValue;
    scrollbar.addEventListener('input', handleScrollChange);
    //console.log(scrollValue)

    // スクロールバーをDOMに追加
    document.getElementById('scrollbar-container').appendChild(scrollbar);



    //　グラフの描画領域を指定
    const root = am5.Root.new("chartdiv");

    //拡大、縮小を可能にする
    const chart = root.container.children.push(am5xy.XYChart.new(root, {
      panX: false,       // X軸方向のドラッグを無効に
      panY: false,       // Y軸方向のドラッグを無効に
      wheelX: "none",    // マウスホイールによる拡大縮小を無効に
      wheelY: "none",    // マウスホイールによる拡大縮小を無効に
      pinchZoomX: false , // ピンチジェスチャーによる拡大縮小を無効に
      
    }));

 
    // 凡例を生成
    const legend = chart.children.push(am5.Legend.new(root, {
      // ここに凡例の設定を追加
      centerX: am5.percent(50),
      x: am5.percent(50),
    }));

    // 凡例データを設定
    legend.data.setAll([{
      name: "Under budget",
      color: am5.color(0x297373)
    }, {
      name: "Over budget",
      color: am5.color(0xff621f)
    }]);


    //x軸をグラフに追加している
    const xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
      baseInterval: {
        timeUnit: "second",
        count: 0
      },
      renderer: am5xy.AxisRendererX.new(root, {})
    }));
    

    

    //y軸をグラフに追加している
    const yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
      renderer: am5xy.AxisRendererY.new(root, {}),
      min: 0, // Set the minimum value for the Y-axis
      max: 1.0, // Set the maximum value for the Y-axis
      
    }));
    


    // all_one(start)データを追加
    const series = chart.series.push(am5xy.LineSeries.new(root, {
      name: "Series", //名前指定
      xAxis: xAxis, //使用するX軸を指定（日付軸）
      yAxis: yAxis, //使用するy軸を指定(値軸)
      valueYField: "value", //valueのデータをx軸にplot
      valueXField: "date", //dataのデータをy軸にplot
      stroke: "",
      fill: am5.color(0x000000) // 赤色に塗りつぶすための設定

    }));
    
    // myArrayからのall_one(start)データを代入している
    const data = myArray.map((value, index) => ({
      date:  index * 8400 , //50フレーム50秒(1000)　//50フレーム420秒(8400)
      value: value,
      
    }));
    series.data.setAll(data);

    //塗りつぶすのに必要
    series.fills.template.setAll({
      fillOpacity: 0.2,
      visible: true,
      
    });




    // all_one(end)データを追加
    const series6 = chart.series.push(am5xy.LineSeries.new(root, {
      name: "Series", //名前指定
      xAxis: xAxis, //使用するX軸を指定（日付軸）
      yAxis: yAxis, //使用するy軸を指定(値軸)
      valueYField: "value", //valueのデータをx軸にplot
      valueXField: "date", //dataのデータをy軸にplot
      stroke: "",
      fill: am5.color(0x000000) // 赤色に塗りつぶすための設定
    }));
    
    // myArrayからのall_one(end)データを代入している
    const data6 = myArray.map((value, index) => ({
      date:  index * 8400 , //50フレーム50秒(1000)　//50フレーム420秒(8400)
      value: value,
      
    }));
    series6.data.setAll(data6);

    //塗りつぶすのに必要
    series6.fills.template.setAll({
      fillOpacity: 0.2,
      visible: true
    });



    // all_one(end)データを追加
    const series7 = chart.series.push(am5xy.LineSeries.new(root, {
      name: "Series", //名前指定
      xAxis: xAxis, //使用するX軸を指定（日付軸）
      yAxis: yAxis, //使用するy軸を指定(値軸)
      valueYField: "value", //valueのデータをx軸にplot
      valueXField: "date", //dataのデータをy軸にplot
      stroke: "",
      fill: am5.color(0x000000) // 赤色に塗りつぶすための設定
    }));
    
    // myArrayからのall_one(end)データを代入している
    const data7 = myArray.map((value, index) => ({
      date:  index * 8400 , //50フレーム50秒(1000)　//50フレーム420秒(8400)
      value: value,
      
    }));
    series7.data.setAll(data7);

    //塗りつぶすのに必要
    series7.fills.template.setAll({
      fillOpacity: 0.2,
      visible: false
    });



    


    // データ0を追加
    const series0 = chart.series.push(am5xy.LineSeries.new(root, {
      name: "Series 0", // 新しいデータシリーズの名前
      xAxis: xAxis,     // 使用するX軸を指定（日付軸）
      yAxis: yAxis,     // 使用するY軸を指定（値軸）
      valueYField: "value0", // 新しいデータシリーズのY軸データフィールド
      valueXField: "date",   // X軸に対応するデータフィールド
      stroke: "rgba(0,128,0, 1)"// 線の色を緑色に設定
      
    }));
    
    // 新しいデータ0を代入（myArray2は新しいデータ配列）
    const data0 = myArray0.map((value, index) => ({
      date:  index * 8400 , //50フレーム50秒(1000)　//50フレーム420秒(8400)
      value0: value // 新しいデータシリーズのY軸データ
    }));
    series0.data.setAll(data0);
    


    // データ1を追加
    const series1 = chart.series.push(am5xy.LineSeries.new(root, {
      name: "Series 1", // 新しいデータシリーズの名前
      xAxis: xAxis,     // 使用するX軸を指定（日付軸）
      yAxis: yAxis,     // 使用するY軸を指定（値軸）
      valueYField: "value1", // 新しいデータシリーズのY軸データフィールド
      valueXField: "date",   // X軸に対応するデータフィールド
      stroke: "rgba(0, 0, 128, 1)" // 線の色を青色に設定
    }));
    
    // 新しいデータ1を代入（myArray2は新しいデータ配列）
    const data1 = myArray1.map((value, index) => ({
      date:  index * 8400 , //50フレーム50秒(1000)　//50フレーム420秒(8400)
      value1: value // 新しいデータシリーズのY軸データ
    }));
    series1.data.setAll(data1);


    // データ2を追加
    const series2 = chart.series.push(am5xy.LineSeries.new(root, {
      name: "Series 2", // 新しいデータシリーズの名前
      xAxis: xAxis,     // 使用するX軸を指定（日付軸）
      yAxis: yAxis,     // 使用するY軸を指定（値軸）
      valueYField: "value2", // 新しいデータシリーズのY軸データフィールド
      valueXField: "date",   // X軸に対応するデータフィールド
      stroke: "rgba(180, 180, 0, 1)" // 線の色を黄色に設定
    }));
    
    // 新しいデータ2を代入（myArray2は新しいデータ配列）
    const data2 = myArray2.map((value, index) => ({
      date:  index * 8400 , //50フレーム50秒(1000)　//50フレーム420秒(8400)
      value2: value // 新しいデータシリーズのY軸データ
    }));
    series2.data.setAll(data2);


    // データ3を追加
    const series3 = chart.series.push(am5xy.LineSeries.new(root, {
      name: "Series 3", // 新しいデータシリーズの名前
      xAxis: xAxis,     // 使用するX軸を指定（日付軸）
      yAxis: yAxis,     // 使用するY軸を指定（値軸）
      valueYField: "value3", // 新しいデータシリーズのY軸データフィールド
      valueXField: "date",   // X軸に対応するデータフィールド
      stroke: "rgba(200, 105, 0, 1)" // 線の色をオレンジ色に設定
    }));
    
    // 新しいデータ3を代入（myArray2は新しいデータ配列）
    const data3 = myArray3.map((value, index) => ({
      date:  index * 8400 , //50フレーム50秒(1000)　//50フレーム420秒(8400)
      value3: value // 新しいデータシリーズのY軸データ
    }));
    series3.data.setAll(data3);



    // データ4を追加
    const series4 = chart.series.push(am5xy.LineSeries.new(root, {
      name: "Series 4", // 新しいデータシリーズの名前
      xAxis: xAxis,     // 使用するX軸を指定（日付軸）
      yAxis: yAxis,     // 使用するY軸を指定（値軸）
      valueYField: "value4", // 新しいデータシリーズのY軸データフィールド
      valueXField: "date",   // X軸に対応するデータフィールド
      stroke: "rgba(180, 0, 0, 1)" // 線の色を赤色に設定
    }));
    
    // 新しいデータ4を代入（myArray2は新しいデータ配列）
    const data4 = myArray4.map((value, index) => ({
      date:  index * 8400 , //50フレーム50秒(1000)　//50フレーム420秒(8400)
      value4: value // 新しいデータシリーズのY軸データ
    }));
    series4.data.setAll(data4);



     // chart.jsに仕様を合わせるため、緑で上書き
     const series5 = chart.series.push(am5xy.LineSeries.new(root, {
      name: "Series 5", // 新しいデータシリーズの名前
      xAxis: xAxis,     // 使用するX軸を指定（日付軸）
      yAxis: yAxis,     // 使用するY軸を指定（値軸）
      valueYField: "value5", // 新しいデータシリーズのY軸データフィールド
      valueXField: "date",   // X軸に対応するデータフィールド
      stroke: "rgba(0, 0, 0, 0.5)", // 線の色を黄色に設定
      
    }));
    
    
    // 新しいデータ4を代入（myArray2は新しいデータ配列）
    const data5 = myArray5.map((value, index) => ({
      date:  index * 8400 , //50フレーム50秒(1000)　//50フレーム420秒(8400)
      value5: value // 新しいデータシリーズのY軸データ
    }));
    series5.data.setAll(data5);



    let rangeDate = new Date();
    am5.time.add(rangeDate, "day", Math.round(series.dataItems.length / 2));
    let rangeTime = rangeDate.getTime();



    //定義(start)
    const seriesRangeDataItem = xAxis.makeDataItem({});
    const seriesRange = series.createAxisRange(seriesRangeDataItem);

    //片方だけ塗られている状態にする
    seriesRange.fills.template.setAll({
      visible: false,
      opacity: 0.35
    });


    //定義(end)
    const seriesRangeDataItem2 = xAxis.makeDataItem({});
    const seriesRange2 = series6.createAxisRange(seriesRangeDataItem2);

    //片方だけ塗られている状態にする
    seriesRange2.fills.template.setAll({
      visible: false,
      opacity: 0.35
    });


    //定義(start)
    const seriesRangeDataItem3 = xAxis.makeDataItem({});
    const seriesRange3 = series7.createAxisRange(seriesRangeDataItem3);

    //片方だけ塗られている状態にする
    seriesRange3.fills.template.setAll({
      visible: false,
      opacity: 0.35
    });


    //最初から塗られている状態にする
    //xAxis.onPrivate("max", function (value) {
    //  seriesRangeDataItem.set("endValue", value);
    //  seriesRangeDataItem.set("value", rangeTime);
    //});



    
    

    //タイムスクロールバーを追加
    const range = xAxis.createAxisRange(xAxis.makeDataItem({}));
    const range2 = xAxis.createAxisRange(xAxis.makeDataItem({}));
    const range3 = xAxis.createAxisRange(xAxis.makeDataItem({}));
  
    //range.set("value", 1700005200000);
    range.get("grid").setAll({
      strokeOpacity: 1, //線の不透明度
      stroke: "rgba(255, 255, 255, 1)", //タイムスクロールバーの色を指定
      strokeWidth:2
    });

    range2.get("grid").setAll({
      strokeOpacity: 1, //線の不透明度
      stroke: "rgba(255, 255, 255, 1)", //タイムスクロールバーの色を指定
      strokeWidth:2
    });

    range3.get("grid").setAll({
      strokeOpacity: 1, //線の不透明度
      stroke: "rgba(255, 255, 255, 1)", //タイムスクロールバーの色を指定
      strokeWidth:1.4
    });


    
    



    //resizeButtonを定義する
    const resizeButton = am5.Button.new(root, {
      themeTags: ["resize", "horizontal"], //ボタンの外観や動作をカスタマイズ
      icon: am5.Graphics.new(root, { //ボタンの機能や目的を示す
        themeTags: ["icon"],
        

      })
    });

    const resizeButton2 = am5.Button.new(root, {
      themeTags: ["resize", "horizontal"],
      icon: am5.Graphics.new(root, {
        themeTags: ["icon"],
        path: '../images/image.jpg'
      })
    });

    const resizeButton3 = am5.Button.new(root, {
      themeTags: ["resize", "horizontal"],
      width: 20,
      height: 20,
      visible: true,
      
    });

 
    



    //タイムスクロールバーをy軸の範囲に固定
    resizeButton.adapters.add("y", function () {
      return 0;
    });

    //タイムスクロールバーをy軸の範囲に固定
    resizeButton2.adapters.add("y", function () {

      return 0;
    });

    //タイムスクロールバーをy軸の範囲に固定
    resizeButton3.adapters.add("y", function () {

      return 0;
    });

    // タイムスクロールバーをx軸の範囲に固定
    resizeButton.adapters.add("x", function (x) {

          
      return Math.max(0, Math.min(chart.plotContainer.width(), x));
    });


    //タイムスクロールバーをx軸の範囲に固定(バーを動かすとき実行される関数)
    resizeButton2.adapters.add("x", function (x) {

      //バーの初期位置を変更する
      if (!resizeButton.isFirstRun) {
        const position1 = xAxis.positionToValue(1);
        range2.set("value", position1);
      }

      return Math.max(0, Math.min(chart.plotContainer.width(), x));
    });

    //タイムスクロールバーをx軸の範囲に固定(バーを動かすとき実行される関数)
    resizeButton3.adapters.add("x", function (x) {

      //バーの初期位置を変更する
      if (!resizeButton.isMiddleRun) {
        const position = xAxis.positionToValue(0.5);
        range3.set("value", position);
      }

      return Math.max(0, Math.min(chart.plotContainer.width(), x));
    });

    resizeButton.isFirstRun = false; // 右バーの初期位置

    resizeButton.isAnimation = true; // アニメーションを停止



   
   

    // タイムスクロールバーを移動させるための関数
    resizeButton.events.on("dragged", function () { //左のバー

      //グラフのx座標
      const x = resizeButton.x(); 
      //console.log(x / 729.28125 * 7)//最大座標(729.28125)

      setX_second(long * x / 729.28125);

      //setX_data(x);
      onXDataChange(x, long);
      
      

      //[0~1]の座標
      const position = xAxis.toAxisPosition(x / chart.plotContainer.width());

      //console.log(position)
      //[1696345200000~1700665200000]の座標
      const newValue = xAxis.positionToValue(position);

      
      //バーの位置を変える
      range.set("value", newValue);

      //start
      seriesRangeDataItem.set("value", newValue);
      seriesRangeDataItem.set("endValue", xAxis.getPrivate("max"));
      

    });

  
    //まとめ
    function handleButtonClick4() {

      resizeButton.isFirstRun = true;
      resizeButton.isMiddleRun = true;

      animationActive = true; // アニメーションを制御するフラグ
      resizeButton.isAnimation = true;//一時停止を再生状態に変える

      let rangeValue = 0;
      let animationStart; 
      let animationDuration = ((long * 1000) * (z - y)) / (729.28125 * (scrollValue / 100)); // 動画時間 * スライド間計算 / 倍速
        

      function animateRangeExpansion(timestamp) {
        if (!animationStart) {
          animationStart = timestamp;
        }

        const progress = timestamp - animationStart;
        const progressPercentage = Math.min(progress / animationDuration, 1);

        rangeValue = Math.min(progressPercentage, 1);
        console.log(rangeValue);
        
        const newValue = xAxis.positionToValue( y / 729.28125 + rangeValue * (z - y) / 729.28125);//加算(start位置)、掛け算(長さ)
        range3.set("value", newValue);
          
        start = start1 + ((end - start1) * rangeValue);

        if(rangeValue == 1){
          onMovieStop();
          animationActive = false;

        }
          

        if (progressPercentage < 1 && animationActive) {
          requestAnimationFrame(animateRangeExpansion);
        }
      }

      onZDataChange(scrollValue / 100, y, z, long); //再生速度、start、end、動画の長さ

      // アニメーション(スクロールバー)を開始
      requestAnimationFrame(animateRangeExpansion);
    }

    //最初から再生
    function handleButtonClick() {

      if(!animationActive){
        y = 0;
        z = 729.28125;

        start = 0;
        end = 1;
        start1 = start; //アニメーション
      
        handleButtonClick4();
      }
      
    }

    //部分再生
    function handleButtonClick1() {
    
      if(!animationActive){
      y = resizeButton.x(); 
      z = resizeButton2.x();

      start = y / 729.28125
      end = z / 729.28125;
      start1 = start; //アニメーション

      handleButtonClick4();   
      }
    }
    

    //一時停止
    function handleButtonClick2() {

      if(resizeButton.isAnimation && animationActive){//一時停止
        //button.innerText = '再開';
        resizeButton.isAnimation = false;//状態の切り替え(この関数のみ)
        animationActive = false; //カウントを終了するためのフラグ
        onMovieStop();
        console.log("clear");
      }
      else if(!resizeButton.isAnimation && !animationActive){//再生
        //button.innerText = '一時停止';

        y = start * 729.28125;
        z = end * 729.28125;
        start1 = start;

        handleButtonClick4();
        console.log("clear1");

      }
      else{
        console.log("clear2");

      }
    }




    // タイムスクロールバーを移動させるための関数
    resizeButton2.events.on("dragged", function () { //右のバー

      //初期位置を設定
      resizeButton.isFirstRun = true;

      //グラフのx座標
      const y = resizeButton2.x(); 
      
      setY_second(long * y / 729.28125);
      
      //[0~1]の座標
      const position = xAxis.toAxisPosition(y / chart.plotContainer.width());

      //[1696345200000~1700665200000]の座標
      const newValue = xAxis.positionToValue(position);
      //console.log(newValue)
      //バーの位置を変える
      range2.set("value", newValue);

      //setX_data(x);
      onYDataChange(y, long);

      //end
      seriesRangeDataItem2.set("value", newValue);
      seriesRangeDataItem2.set("endValue", xAxis.getPrivate("min"));

    });


    // タイムスクロールバーを移動させるための関数 
    resizeButton3.events.on("dragged", function () { //真ん中のバー

      //初期位置を設定
      resizeButton.isMiddleRun = true;

      //グラフのx座標
      const z = resizeButton3.x(); 
      
      //[0~1]の座標
      const position = xAxis.toAxisPosition(z / chart.plotContainer.width());

      //[1696345200000~1700665200000]の座標
      const newValue = xAxis.positionToValue(position);
      //console.log(newValue)
      //バーの位置を変える
      range3.set("value", newValue);

      setZ_second(long * z / 729.28125);

      onSDataChange(z, long);

      //onYDataChange(y, long);

      //end
      seriesRangeDataItem3.set("value", newValue);
      seriesRangeDataItem3.set("endValue", xAxis.getPrivate("min"));

    });
  

    // タイムスクロールバーを動かすマークを表示
    range.set("bullet", am5xy.AxisBullet.new(root, {
      sprite: resizeButton
    }));
    
    // タイムスクロールバーを動かすマークを表示
    range2.set("bullet", am5xy.AxisBullet.new(root, {
      sprite: resizeButton2
    }));

    // タイムスクロールバーを動かすマークを表示
    range3.set("bullet", am5xy.AxisBullet.new(root, {
      sprite: resizeButton3
    }));

   
    const button = createButton();
    const button1 = createButton1();
    const button2 = createButton2();

    // Clean up when the component unmounts
    return () => {
      chart.dispose();
      scrollbar.removeEventListener('input', () => {});
      document.getElementById('scrollbar-container').removeChild(scrollbar);

      button.removeEventListener('click', () => {});
      document.getElementById('button-container').removeChild(button);

      button1.removeEventListener('click', () => {});
      document.getElementById('button-container1').removeChild(button1);

      button1.removeEventListener('click', () => {});
      document.getElementById('button-container2').removeChild(button2);

      videoElement.onloadedmetadata = null;
    };
  }, []);

//<button onClick={() => handleButtonClick(x_data)}>ボタン1</button>
  return (
    
  <div>

      <a className="title32">
      <a id="button-container"></a></a>

      <a className="title34">
      <a id="button-container1"></a></a>

      <a className="title35">
      <a id="button-container2"></a></a>

      <a className="title36">
      0.25倍 <a id="scrollbar-container"></a> 1.00倍</a>


    <div className="title31">

      {/* AmChartsのグラフ */}
      <div id="chartdiv" style={{ width: '800px', height: '160px' }}></div>
    
    </div>
  </div>
  );
  
};

export default Chart;