import React, { useState, useEffect, useRef } from 'react';
import * as am5 from '@amcharts/amcharts5';
import { XYChart } from '@amcharts/amcharts5/xy';
import { Root } from '@amcharts/amcharts5';


import { LinePattern } from '@amcharts/amcharts5';
//import * as am5 from '@amcharts/amcharts5';
import * as am5percent from '@amcharts/amcharts5/percent';
//import { Legend } from '@amcharts/amcharts5/legend'; // Import Legend component
import * as am5xy from '@amcharts/amcharts5/xy';



import myArray from './outputs_all_one.js'; 
import myArray0 from './outputs0.js';
import myArray1 from './outputs1.js'; 
import myArray2 from './outputs2.js'; 
import myArray3 from './outputs3.js'; 
import myArray4 from './outputs4.js'; 
import myArray5 from './outputs_allzero.js'; 

const Chart = ({ onXDataChange, onYDataChange, showMessage }) => {

  const chartRef = useRef(null);
  let count = 0;
  
 
 


  

  useEffect(() => {


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
      stroke: ""
    }));
    
    // myArrayからのall_one(start)データを代入している
    const data = myArray.map((value, index) => ({
      date:  index * 8400 , //50フレーム50秒(1000)　//50フレーム420秒(8400)
      value: value,
      
    }));
    series.data.setAll(data);

    //塗りつぶすのに必要
    series.fills.template.setAll({
      fillOpacity: 0.17,
      visible: true
    });




    // all_one(end)データを追加
    const series6 = chart.series.push(am5xy.LineSeries.new(root, {
      name: "Series", //名前指定
      xAxis: xAxis, //使用するX軸を指定（日付軸）
      yAxis: yAxis, //使用するy軸を指定(値軸)
      valueYField: "value", //valueのデータをx軸にplot
      valueXField: "date", //dataのデータをy軸にplot
      stroke: ""
    }));
    
    // myArrayからのall_one(end)データを代入している
    const data6 = myArray.map((value, index) => ({
      date:  index * 8400 , //50フレーム50秒(1000)　//50フレーム420秒(8400)
      value: value,
      
    }));
    series6.data.setAll(data6);

    //塗りつぶすのに必要
    series6.fills.template.setAll({
      fillOpacity: 0.17,
      visible: true
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
      visible: true,
      opacity: 0.3
    });



    //定義(end)
    const seriesRangeDataItem2 = xAxis.makeDataItem({});
    const seriesRange2 = series6.createAxisRange(seriesRangeDataItem2);

    //片方だけ塗られている状態にする
    seriesRange2.fills.template.setAll({
      visible: true,
      opacity: 0.3
    });



    //最初から塗られている状態にする
    //xAxis.onPrivate("max", function (value) {
    //  seriesRangeDataItem.set("endValue", value);
    //  seriesRangeDataItem.set("value", rangeTime);
    //});



    
    

    //タイムスクロールバーを追加
    const range = xAxis.createAxisRange(xAxis.makeDataItem({}));
    const range2 = xAxis.createAxisRange(xAxis.makeDataItem({}));
  
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


    
    



    //resizeButtonを定義する
    const resizeButton = am5.Button.new(root, {
      themeTags: ["resize", "horizontal"], //ボタンの外観や動作をカスタマイズ
      icon: am5.Graphics.new(root, { //ボタンの機能や目的を示す
        themeTags: ["icon"],
        

      })
    });

    // Second timeline bar button
    const resizeButton2 = am5.Button.new(root, {
      themeTags: ["resize", "horizontal"],
      icon: am5.Graphics.new(root, {
        themeTags: ["icon"],
        
      })
    });


    //タイムスクロールバーをy軸の範囲に固定
    resizeButton.adapters.add("y", function () {
      return 0;
    });

    //タイムスクロールバーをy軸の範囲に固定
    resizeButton2.adapters.add("y", function () {
      return 0;
    });

    // タイムスクロールバーをx軸の範囲に固定
    resizeButton.adapters.add("x", function (x) {

      return Math.max(0, Math.min(chart.plotContainer.width(), x));
    });


    //タイムスクロールバーをx軸の範囲に固定(常に実行している関数)
    resizeButton2.adapters.add("x", function (x) {

      //バーの初期位置を変更する
      if (!resizeButton.isFirstRun) {
        const position1 = xAxis.positionToValue(1);
        range2.set("value", position1);
      }

      return Math.max(0, Math.min(chart.plotContainer.width(), x));
    });
    resizeButton.isFirstRun = false; // 初回実行フラグを設定

   
    
    

    // タイムスクロールバーを移動させるための関数
    resizeButton.events.on("dragged", function () {

      //グラフのx座標
      const x = resizeButton.x(); 
      //console.log(x / 729.28125 * 7)//最大座標(729.28125)

      //setX_data(x);
      onXDataChange(x);
      
      

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

   
    // タイムスクロールバーを移動させるための関数
    resizeButton2.events.on("dragged", function () {

      resizeButton.isFirstRun = true;

      //グラフのx座標
      const y = resizeButton2.x(); 
      ///console.log(y / 729.28125 * 7)//最大座標(729.28125)

      
        // 範囲を制御する変数
        let rangeValue = 0;
  
        function animateRangeExpansion() {
          if (rangeValue < 483) {
            console.log(rangeValue)
            rangeValue += 1;
            const newValue = xAxis.positionToValue(rangeValue/483);
            range2.set("value", newValue);
            requestAnimationFrame(animateRangeExpansion);
          }
        }

      if(y == 0 && count == 0){
        console.log(count)
        count = count + 1;
        console.log(count)
        animateRangeExpansion()
      }

    
    

      //setX_data(x);
      onYDataChange(y);

      //[0~1]の座標
      const position = xAxis.toAxisPosition(y / chart.plotContainer.width());

      //[1696345200000~1700665200000]の座標
      const newValue = xAxis.positionToValue(position);
      //console.log(newValue)
      //バーの位置を変える
      range2.set("value", newValue);

      //end
      seriesRangeDataItem2.set("value", newValue);
      seriesRangeDataItem2.set("endValue", xAxis.getPrivate("min"));

    });

  

    // タイムスクロールバーを動かすマークを表示
    range.set("bullet", am5xy.AxisBullet.new(root, {
      sprite: resizeButton
    }));
    
    // タイムスクロールバーを動かすマークを表示
    range2.set("bullet", am5xy.AxisBullet.new(root, {
      sprite: resizeButton2
    }));

    


    // Clean up when the component unmounts
    return () => {
      chart.dispose();
    };
  }, []);

//<button onClick={() => handleButtonClick(x_data)}>ボタン1</button>
  return (
    <div id="chartdiv" style={{ width: '800px', height: '160px' }}>
      
    </div>
  );
  
};

export default Chart;