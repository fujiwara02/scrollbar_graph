import React, { useState, useRef, useEffect } from 'react';
import BarComponent from './Home_graph.js';

import ReactPlayer from 'react-player';
import Sam from './D13(1).mp4';
import './Home.css';
import {useCallback} from  'react'
import {useNavigate} from 'react-router-dom';
import targets_word from './targets_word.js';

import image from '../images/image.jpg';

import myArray0 from './outputs0.js';
import myArray1 from './outputs1.js'; 
import myArray2 from './outputs2.js'; 
import myArray3 from './outputs3.js'; 
import myArray4 from './outputs4.js'; 
import myArray5 from './outputs_allzero.js'; 



const App = () => {
 
  const [videoDuration, setVideoDuration] = useState(0);
  const [playground, setPlayground] = useState(Sam);
  const playerRef = useRef(null);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false); // ビデオの再生状態を制御
  const [stopTime, setStopTime] = useState(0);
  const [x_second, setX_second] = useState(0);
  const [y_second, setY_second] = useState(0);
  const [s_second, setS_second] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const num = Math.floor((myArray0.length) *  s_second / videoDuration);
  const convertedNum = parseFloat(myArray0[num]); // 指数表記の数値を通常の数値に変換
  const roundedNum = convertedNum.toFixed(3); // 3桁で四捨五入

  const num1 = Math.floor((myArray1.length) *  s_second / videoDuration);
  const convertedNum1 = parseFloat(myArray1[num1]); // 指数表記の数値を通常の数値に変換
  const roundedNum1 = convertedNum1.toFixed(3); // 3桁で四捨五入

  const num2 = Math.floor((myArray2.length) *  s_second / videoDuration);
  const convertedNum2 = parseFloat(myArray2[num2]); // 指数表記の数値を通常の数値に変換
  const roundedNum2 = convertedNum2.toFixed(3); // 3桁で四捨五入

  const num3 = Math.floor((myArray3.length) *  s_second / videoDuration);
  const convertedNum3 = parseFloat(myArray3[num3]); // 指数表記の数値を通常の数値に変換
  const roundedNum3 = convertedNum3.toFixed(3); // 3桁で四捨五入

  const num4 = Math.floor((myArray4.length) *  s_second / videoDuration);
  const convertedNum4 = parseFloat(myArray4[num4]); // 指数表記の数値を通常の数値に変換
  const roundedNum4 = convertedNum4.toFixed(3); // 3桁で四捨五入

  

  //const roundedNumber = myArray0[num].toFixed(0);

  const handleDuration = (duration) => {
    setVideoDuration(duration);
 
  };

  const handleXDataChange = (newValue, long) => { //左のバー
    playerRef.current.seekTo(long * newValue / 729.28125, 'seconds');//最大座標(729.28125)
    setX_second(long * newValue / 729.28125)
    
  };

  const handleYDataChange = (newValue, long) => { //右のバー
    setY_second(long * newValue / 729.28125)

  };

  const handleSDataChange = (newValue, long) => { //真ん中のバー
    setS_second(long * newValue / 729.28125)

  }

  const handleCDataChange = (newValue, long) => {//最初から再生  

    setPlaybackRate(newValue);
    const randomNumber = Math.random();// 0以上1未満の乱数を生成(useEffect)
    playerRef.current.seekTo(0, 'seconds');//最初から再生
    setStopTime(long + randomNumber/10000);//8.022秒後に自動再生をfalseに
    setIsPlaying(true);// 自動再生を開始
    //setPlaybackRate(1);

  };

  const handleZDataChange = (newValue, y, z, long) => {//最初から再生  

    setPlaybackRate(newValue);
    const randomNumber = Math.random();// 0以上1未満の乱数を生成(useEffect)
    playerRef.current.seekTo(long * y / 729.28125 , 'seconds');//開始地点
    //setStopTime((long * (z - y) / 729.28125) + (randomNumber / 10000));//何秒後に自動再生をfalseに
    setIsPlaying(true);// 自動再生を開始
    //setPlaybackRate(1);
    //console.log(y);
    //console.log(z);

  };

  const onMovieStop = () => {//動画を停止させる  
    setIsPlaying(false);// 自動再生を開始
    //console.log(isPlaying);

  };

  const handleProgress = (progress) => {
    setCurrentTime(progress.playedSeconds);
  };



  let navigate = useNavigate();

  const logoClick = useCallback((e) => {
    navigate('/');
  });


  useEffect(() => {//stopTimeが変化したときに呼び出される
    // X秒後に動画を停止
    if (stopTime !== null) {
      const timer = setTimeout(() => {//X秒後に実行するタイマーを設定
        
        setIsPlaying(false);
        //playerRef.current.pause();
        
      }, stopTime * 1000 / playbackRate); // 秒をミリ秒に変換

      return () => clearTimeout(timer);
    }
  }, [stopTime]);
 

  return (
    <>

      <div className="title30">
        
        <ReactPlayer
          ref={playerRef}
          url={playground}
          playing={isPlaying} // isPlayingを使用してビデオの再生を制御
          controls={true}
          width="780px"
          height="575px"
          playsinline
          playbackRate={playbackRate}
          onDuration={handleDuration}
          onProgress={handleProgress} // 現在の秒数
          
        />
        
         <div className="scrollable-list">

         <a onClick= {logoClick} >
            <img src={image}  width={140} height={80} alt="Logo" />
         </a>
         <a className="white-title22">『私』『父』『車』『買う』『しました』</a> <br></br>

         <a onClick= {logoClick} >
            <img src={image}  width={140} height={80} alt="Logo" />
         </a>
         <a className="white-title22">『私』『あなた』『好き』</a><br></br>

        <a onClick= {logoClick} >
            <img src={image}  width={140} height={80} alt="Logo" />
        </a>
        <a className="white-title22">『私』『兄』『仕事』『行く』</a> <br></br>

        <a onClick= {logoClick} >
            <img src={image}  width={140} height={80} alt="Logo" />
        </a>
        <a className="white-title22">『父』『映画』『見る』『好き』</a><br></br>

        <a onClick= {logoClick} >
            <img src={image}  width={140} height={80} alt="Logo" />
        </a>
        <a className="white-title22">『弟』『海』『遊ぶ』『行く』</a><br></br>

        <a onClick= {logoClick} >
            <img src={image}  width={140} height={80} alt="Logo" />
        </a>
        <a className="white-title22">『兄』『趣味』『サッカー』</a><br></br>

        <a onClick= {logoClick} >
            <img src={image}  width={140} height={80} alt="Logo" />
        </a>
        <a className="white-title22">『母』『仕事』『行く』</a><br></br>

        <a onClick= {logoClick} >
            <img src={image}  width={140} height={80} alt="Logo" />
        </a>
        <a className="white-title22">『私』『山』『行く』</a><br></br>

        <a onClick= {logoClick} >
            <img src={image}  width={140} height={80} alt="Logo" />
        </a>
        <a className="white-title22">『あなた』『サッカー』『見る』</a><br></br>

        <a onClick= {logoClick} >
            <img src={image}  width={140} height={80} alt="Logo" />
        </a>
        <a className="white-title22">『あなた』『山』『遊ぶ』『しました』</a>
  
      </div> 
      </div>

      <div className="title31">

     
      <BarComponent
        onXDataChange={handleXDataChange} // 新しい引数を渡す
        onYDataChange={handleYDataChange}
        onCDataChange={handleCDataChange}
        onZDataChange={handleZDataChange}
        onSDataChange={handleSDataChange}
        onMovieStop = {onMovieStop}
        
        //scrollValue={scrollValue} // 再生位置
        //playbackRate={playbackRate} // 動画の再生速度
        ///onXChange={handleXChange} // クリックイベントを処理するコールバックを渡す
      />

      <div >
  
      <a className="title33">バー間秒数: {y_second ? 
            (y_second - x_second).toFixed(3) + ' 秒' 
            : (videoDuration - x_second).toFixed(3) + ' 秒'}</a>

      {/*<a className="title22">現在の時間: {currentTime.toFixed(3)} seconds</a>*/}<br></br>

      
      <a className="green-square"></a><a className="white-title21">{targets_word[0]} : {roundedNum}</a>
      <a className="blue-square"></a><a className="white-title21">{targets_word[1]} : {roundedNum1}</a><br></br>
      <a className="yellow-square"></a><a className="white-title21">{targets_word[2]} : {roundedNum2}</a>
      <a className="orange-square"></a><a className="white-title21">{targets_word[3]} : {roundedNum3}</a><br></br>
      <a className="red-square"></a><a className="white-title21">{targets_word[4]} : {roundedNum4}</a>
      
      </div> 

      </div>
      
    </>
  );
};

export default App;