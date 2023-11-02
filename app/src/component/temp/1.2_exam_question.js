import "../App.css";
import styles from './Exam.module.css'
import React, { useState, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import logo from '../images/ShuwaLogo.png'
import VideoPreview from '../movie/VideoPreview';
import { useReactMediaRecorder } from "react-media-recorder";
import contentsList from './ContentsList';
import recordButton from '../images/record.png'
import stopButton from '../images/stop.png'


let isRecord = false;
let isRecognition = false;
let isFinished = false;
let formData = null;
let res_list = [];
let res_list_num = [];

const wordslist = contentsList();

//問題のkeyを格納する配列
const keys = [];

var i = 0;
//問題のkeyを格納する
for (var { key, value } in wordslist) {
  keys[i] = key;
  i++
}

let question = Math.floor(Math.random() * i);

export default function EXAM_QUESTION() {

  let navigate = useNavigate();


  // 録画機能
  const {
    previewStream,
    status,
    startRecording,
    stopRecording,
    mediaBlobUrl,
    error
  } = useReactMediaRecorder({
    video: true, audio: true, blobPropertyBag: {
      type: "video/webm",
      //type: "video/mp4"
    }
  });

  // パラメーター監視用
  function showStatusRecord() {
    console.log(`error:${error}`);

    console.log(`status:${status}`);

    console.log(`isRecord: ${isRecord}`);

    console.log(`blob url: ${mediaBlobUrl}`);

    console.log(`isFinished: ${isFinished}`);
  }

  // フラグ管理用
  if ((status === "recording")) {
    isRecord = (status === "recording");
  }
  else {
    isRecord = (status === "recording");
  }

  function clickRecordButton() {
    console.log(`isRecord:${isRecord}`);
    if (isRecord) {
      stopRecording();
      console.log("stop");
      isRecognition = true;
      console.log(isRecognition)
    }
    else {
      startRecording();
      console.log("start");
    }
  }

  const logoClick = useCallback((f) => {
    navigate("/")
  });

  const QuestionClick = useCallback((g) => {
    navigate("/0_exam")
  });

  const ConfirmClick = useCallback((h) => {
    navigate("/1.2_exam_question_confirm/" 
    +Object.keys(wordslist)[question]);
   

  });

  const AnswerClick = useCallback((g) => {
    console.log(isFinished)
    if (isFinished) {
      var list = res_list.slice(0, 3);
      var urlsplit = mediaBlobUrl.split('/')
      var url = urlsplit[urlsplit.length - 1];
      var list_count = [0, 0, 0]
      var count = 0;

      console.log(res_list)



      var wkeys = Object.keys(wordslist);
      for (var key in wkeys) {
        console.log(`key:${key},word:${wordslist[wkeys[key]]}`)
        if (wordslist[wkeys[key]] == list[0]) {
          list_count[0] = count;
        }
        if (wordslist[wkeys[key]] == list[1]) {
          list_count[1] = count;
        }
        if (wordslist[wkeys[key]] == list[2]) {
          list_count[2] = count;
        }
        count++;
      }

      navigate("/2_exam_answer/" + wkeys[question] + "/" + url + "/" + list_count[0] + "/" + list_count[1] + "/" + list_count[2]);
    }
    else if (isRecognition) {
      savePostRecord();
    }
  });

  const savePostRecord = async () => {
    console.log(mediaBlobUrl);
    const movieBlob = await fetch(mediaBlobUrl).then((r) => r.blob());
    //const movieFile = new File([movieBlob])
    formData = new FormData();

    formData.append("file", movieBlob);

    console.log(`formData:${formData}`);
    /*
    const postURL = "http://127.0.0.0:5000"
    await fetch(postURL + "/post", {
      method: "POST",
      headers: {
      },
      body: formData
    })
      .then((response) => {
        (response.json()).then((args) => {
          res_list = args["list"];
          console.log(res_list);
        })
        
        isRecognition = false;
        isFinished = true;
        
      })
      */
      isRecognition = false;
      isFinished = true;
      
  }


  return (
    <>

<div className={styles.backgroundcolor}>
      <botton onClick={logoClick} className={styles.ToHomeLogo}>
        <img src={logo} width={70} height={40} alt="Logo" />

      </botton>

      <botton onClick={ConfirmClick} className={styles.title14}>
        確認⇒
      </botton>



      <a className={styles.title1}>
        次の言葉を手話で表現してください</a>

      <a className={styles.title5}>{wordslist[Object.keys(wordslist)[question]]}</a>


      <main1 className={styles.main1}>

        {
          //<Rokuga_Movie/>
          <div className='recordElement' >
            <VideoPreview className="" stream={previewStream} url={mediaBlobUrl} />
            {/*<Rokuga_Botton clickFunc={clickRecordButton} />*/}
            <div className='reButtonParent'>
              <div className={'reButton'}>
                <button className='RecordButton' onClick={() => {
                  clickRecordButton();
                  //isRecord = !isRecord;
     
                }}>
                  {
                    isRecord ?
                      <img className="RecordButtonImage" src={stopButton} width={40} height={40} /> :
                      <img className="RecordButtonImage" src={recordButton} width={40} height={40} />
                  }
                </button>
              </div>
            </div>
          </div>
        }

      </main1>

      <button onClick={QuestionClick} className={styles.learnContent}>
        問題選択に戻る
      </button>


      <button onClick={() => {
        AnswerClick();
      }} className={styles.checkAnswer} >
        {
          isRecord ?
            "録画中" : // isRecord
            isRecognition ? "判別開始" : // !isRecord && isRecognition
              isFinished ? "結果へ" :  // !isRecord && !isRecognition && isFinished
                "録画を開始してください"    // !isRecord && !isRecognition && !isFinished
        }
      </button>
      {/*
      <button onClick={() => {
        console.log(`${isRecord},${isRecognition},${isFinished}`);
      }}>
        test
      </button>
       */}

<br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
</div>
    </>
  )
}