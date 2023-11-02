import React, { useState, useRef, useEffect } from 'react';
import BarComponent from './Home_graph.js';

import ReactPlayer from 'react-player';
import Sam from './D13(1).mp4';
import './Home.css';
import {useCallback} from  'react'
import {useNavigate} from 'react-router-dom';
import targets_word from './targets_word.js';

import image from '../images/image.jpg';



const App = () => {
 
  const [videoDuration, setVideoDuration] = useState(0);
  const [playground, setPlayground] = useState(Sam);
  const playerRef = useRef(null);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false); // ビデオの再生状態を制御
  const [stopTime, setStopTime] = useState(0);
  const [x_second, setX_second] = useState(0);
  const [y_second, setY_second] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);


  const handleDuration = (duration) => {
    setVideoDuration(duration);
 
  };

  const handleXDataChange = (newValue, long) => {
    playerRef.current.seekTo(long * newValue / 729.28125, 'seconds');//最大座標(729.28125)
    setX_second(long * newValue / 729.28125)
    
  };

  const handleYDataChange = (newValue, long) => {   
    setY_second(long * newValue / 729.28125)

  };


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
          width="807px"
          height="595px"
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
        onMovieStop = {onMovieStop}
        
        //scrollValue={scrollValue} // 再生位置
        //playbackRate={playbackRate} // 動画の再生速度
        ///onXChange={handleXChange} // クリックイベントを処理するコールバックを渡す
      />

      <div >
       
      <p className="title22">Current Time: {currentTime.toFixed(3)} seconds</p>
      
      
      </div> 

      </div>
      
    </>
  );
};

export default App;