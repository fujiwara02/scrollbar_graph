import React, { useState, useRef, useEffect } from 'react';
import BarComponent from './Home_graph.js';

import outputs from './outputs.js';
import ReactPlayer from 'react-player';
import Sam from './D13(1).mp4';
import './Home.css';
import {useCallback} from  'react'
import {useNavigate} from 'react-router-dom';
import targets_word from './targets_word.js';

import image from '../images/image.jpg';



const App = () => {
  const [scrollValue, setScrollValue] = useState(0);
  const [x_data, setX_data] = useState(0);
  const [videoDuration, setVideoDuration] = useState(null);
  const [playground, setPlayground] = useState(Sam);
  const playerRef = useRef(null);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false); // ビデオの再生状態を制御
  const [barComponentKey, setBarComponentKey] = useState(0);
  const [x, setX] = useState(0);
  const [valueFromButtons, setValueFromButtons] = useState('');
  const [xDataFromChild, setXDataFromChild] = useState(0);
  const [yDataFromChild, setYDataFromChild] = useState(0);
  const [stopTime, setStopTime] = useState(0);

  const [x_second, setX_second] = useState(0);
  const [y_second, setY_second] = useState(0);

  const [second, setsecond] = useState(0);


  const handleDuration = (duration) => {
    setVideoDuration(duration);
 
  };

  const handleXDataChange = (newValue, videoDuration) => {
   
    setXDataFromChild(newValue);
    playerRef.current.seekTo(8.022 * newValue / 729.28125, 'seconds');//最大座標(729.28125)
    setX_second(videoDuration * newValue / 729.28125)
    console.log(videoDuration)

    
    
  };

  const handleYDataChange = (newValue) => {   
    setYDataFromChild(newValue);
    setY_second(8.022 * newValue / 729.28125)

  };

  const handleButtonClicked = (value) => {
    setValueFromButtons(value);
    playerRef.current.seekTo(videoDuration * value / 729.28125, 'seconds'); //最大座標(729.28125)


  };

 

  const handleXChange = (newValue) => {
    setX(newValue);
    
  }

  const handleSpeedChange = (event) => {
    const newPlaybackRate = parseFloat(event.target.value);
    setPlaybackRate(newPlaybackRate);
    playerRef.current.seekTo(videoDuration * (x_data - 29) / (788 - 29), 'seconds');
  };

  const handleAutoPlayToggle = () => {
    // 自動再生の状態を切り替える
    setIsPlaying((isPlaying) => !isPlaying);
  };

  let navigate = useNavigate();

  const logoClick = useCallback((e) => {
    navigate('/');
  });

  useEffect(() => {
    // X秒後に動画を停止
    if (stopTime !== null) {
      const timer = setTimeout(() => {//X秒後に実行するタイマーを設定
        playerRef.current.seekTo(8.022 * yDataFromChild / 729 , 'seconds');
        setIsPlaying(false);
        //playerRef.current.pause();
        
      }, stopTime * 1000 / playbackRate); // 秒をミリ秒に変換

      return () => clearTimeout(timer);
    }
  }, [stopTime]);
 
  // 開始ボタンがクリックされたときにX秒後に動画を停止する
  const handleStartButtonClick = (seconds) => {
    
    setStopTime(seconds);
    setIsPlaying(true); // 自動再生を開始
  };



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
          
          
        />
        
         <div className="scrollable-list">

         <a onClick= {logoClick} >
            <img src={image}  width={140} height={80} alt="Logo" />
         </a>
         <a className="white-title31">『私』『父』『車』『買う』『しました』 2023/ 09/ 29</a> <br></br>

         <a onClick= {logoClick} >
            <img src={image}  width={140} height={80} alt="Logo" />
         </a>
         <a className="white-title22">『私』『あなた』『好き』 2023/ 09/ 29</a><br></br>

        <a onClick= {logoClick} >
            <img src={image}  width={140} height={80} alt="Logo" />
        </a>
        <a className="white-title22">『私』『兄』『仕事』『行く』 2023/ 09/ 29</a> <br></br>

        <a onClick= {logoClick} >
            <img src={image}  width={140} height={80} alt="Logo" />
        </a>
        <a className="white-title22">『父』『映画』『見る』『好き』 2023/ 09/ 29</a><br></br>

        <a onClick= {logoClick} >
            <img src={image}  width={140} height={80} alt="Logo" />
        </a>
        <a className="white-title22">『弟』『海』『遊ぶ』『行く』 2023/ 09/ 29</a><br></br>

        <a onClick= {logoClick} >
            <img src={image}  width={140} height={80} alt="Logo" />
        </a>
        <a className="white-title22">『兄』『趣味』『サッカー』 2023/ 09/ 29</a><br></br>

        <a onClick= {logoClick} >
            <img src={image}  width={140} height={80} alt="Logo" />
        </a>
        <a className="white-title22">『母』『仕事』『行く』 2023/ 09/ 29</a><br></br>

        <a onClick= {logoClick} >
            <img src={image}  width={140} height={80} alt="Logo" />
        </a>
        <a className="white-title22">『私』『山』『行く』 2023/ 09/ 29</a><br></br>

        <a onClick= {logoClick} >
            <img src={image}  width={140} height={80} alt="Logo" />
        </a>
        <a className="white-title22">『あなた』『サッカー』『見る』 2023/ 09/ 29</a><br></br>

        <a onClick= {logoClick} >
            <img src={image}  width={140} height={80} alt="Logo" />
        </a>
        <a className="white-title22">『あなた』『山』『遊ぶ』『しました』 2023/ 09/ 29</a>
  
      </div> 
      </div>

      <div className="title31">
      <BarComponent
        onXDataChange={(newValue) => handleXDataChange(newValue, videoDuration)} // 新しい引数を渡す
        onYDataChange={handleYDataChange}
        //scrollValue={scrollValue} // 再生位置
        //playbackRate={playbackRate} // 動画の再生速度
        ///onXChange={handleXChange} // クリックイベントを処理するコールバックを渡す
      />
      
   

      <div className="scrollable-list1">

      <a className="title22">
         {/* onClick={handleAutoPlayToggle */}
      <button onClick={() => handleStartButtonClick(8.022 * (yDataFromChild - xDataFromChild) / 729)}>{isPlaying ? '再生中' : '再生▷'}</button>
      
      <a className="title20">再生速度</a>0.25倍
      <input //動画の再生速度を変更
        type="range" //スクロールバー
        min="0.25"
        max="1.00"
        step="0.1"
        value={playbackRate} //動画のスピード
        onChange={handleSpeedChange}
      />1倍
      <br></br>

     {/*<a className="title27">start位置: {x_second.toFixed(3)+ ' 秒' } </a>

      <a className="title28">end位置 :{y_second.toFixed(3)+ ' 秒' }</a>
      
  <a className="title29">ビデオの長さ: {videoDuration ? videoDuration.toFixed(3) + ' 秒' : '読み込み中...'}</a>*/}


      </a>
       <br></br>

      <a className="title24">
      
      <a className="green-square"></a><a className="white-title21">{targets_word[0]}</a>
      <a className="blue-square"></a><a className="white-title21">{targets_word[1]}</a>
      <a className="yellow-square"></a><a className="white-title21">{targets_word[2]}</a>
      <a className="orange-square"></a><a className="white-title21">{targets_word[3]}</a>
      <a className="red-square"></a><a className="white-title21">{targets_word[4]}</a>
      </a>

      <br></br>
      
      </div> 
     
      
      </div>
      
    </>
  );
};

export default App;