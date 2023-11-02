import React, { useEffect } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

const Chart = () => {
  useEffect(() => {
    // Create root element
    const root = am5.Root.new("chartdiv");

    // Set themes
    root.setThemes([am5themes_Animated.new(root)]);

    // Create chart
    const chart = root.container.children.push(am5xy.XYChart.new(root, {
      panX: false,       // X軸方向のドラッグを無効に
      panY: false,       // Y軸方向のドラッグを無効に
      wheelX: "none",    // マウスホイールによる拡大縮小を無効に
      wheelY: "none",    // マウスホイールによる拡大縮小を無効に
      pinchZoomX: false  // ピンチジェスチャーによる拡大縮小を無効に
    }));
    
    // Generate random data
    let date = new Date();
    date.setHours(0, 0, 0, 0);
    let value = 100;

    function generateData() {
      value = Math.round((Math.random() * 10 - 5) + value);
      am5.time.add(date, "day", 1);
      return {
        date: date.getTime(),
        value: value
      };
    }

    function generateDatas(count) {
      const data = [];
      for (let i = 0; i < count; ++i) {
        data.push(generateData());
      }
      return data;
    }

    // Create axes
    const xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
      baseInterval: {
        timeUnit: "day",
        count: 1
      },
      renderer: am5xy.AxisRendererX.new(root, {})
    }));

    const yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
      renderer: am5xy.AxisRendererY.new(root, {})
    }));

    // Add series
    const series = chart.series.push(am5xy.LineSeries.new(root, {
      name: "Series",
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: "value",
      valueXField: "date",
      tooltip: am5.Tooltip.new(root, {
        labelText: "{valueY}"
      })
    }));

    //塗りつぶすのに必要
    series.fills.template.setAll({
      fillOpacity: 0.2,
      visible: true
    });


    // Set data
    const data = generateDatas(1200);
    series.data.setAll(data);

    let rangeDate = new Date();
    am5.time.add(rangeDate, "day", Math.round(series.dataItems.length / 2));
    let rangeTime = rangeDate.getTime();

    //定義
    const seriesRangeDataItem = xAxis.makeDataItem({});
    const seriesRange = series.createAxisRange(seriesRangeDataItem);

    //片方だけ塗られている状態にする
    seriesRange.fills.template.setAll({
      visible: true,
      opacity: 0.3
    });

    //最初から塗られている状態にする
    xAxis.onPrivate("max", function (value) {
      seriesRangeDataItem.set("endValue", value);
      seriesRangeDataItem.set("value", rangeTime);
    });




    // add axis range
    const range = xAxis.createAxisRange(xAxis.makeDataItem({}));
    const color = root.interfaceColors.get("primaryButton");

    range.set("value", rangeDate.getTime());
    range.get("grid").setAll({
      strokeOpacity: 1,
      stroke: color
    });

    const resizeButton = am5.Button.new(root, {
      themeTags: ["resize", "horizontal"],
      icon: am5.Graphics.new(root, {
        themeTags: ["icon"]
      })
    });

    // restrict from being dragged vertically
    resizeButton.adapters.add("y", function () {
      return 0;
    });

    // restrict from being dragged outside of plot
    resizeButton.adapters.add("x", function (x) {
      return Math.max(0, Math.min(chart.plotContainer.width(), x));
    });



    // change range when x changes
    resizeButton.events.on("dragged", function () {
      const x = resizeButton.x();
      const position = xAxis.toAxisPosition(x / chart.plotContainer.width());

      const newValue = xAxis.positionToValue(position);

      range.set("value", newValue);

      seriesRangeDataItem.set("value", newValue);
      seriesRangeDataItem.set("endValue", xAxis.getPrivate("max"));
    });

    // set bullet for the range
    range.set("bullet", am5xy.AxisBullet.new(root, {
      sprite: resizeButton
    }));

    // Make stuff animate on load
    series.appear(1000);
    chart.appear(1000, 100);

    // Clean up when the component unmounts
    return () => {
      chart.dispose();
    };
  }, []);

  return (
    <div id="chartdiv" style={{ width: '100%', height: '400px' }}></div>
  );
  
};

export default Chart;