import "../App.css";
import styles from './Exam.module.css'
import React, { useState, useCallback, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import logo from '../images/ShuwaLogo.png';
import contentsList from './ContentsList';

var wordslist = contentsList();

//問題のkeyを格納する配列
const keys = [];

var i = 0;
//問題のkeyを格納する
for (var { key, value } in wordslist) {
  keys[i] = key;
  i++
}
let wordKeys = Object.keys(wordslist);

export default function EXAM_ANSWER() {
  const { ans, url, list1, list2, list3 } = useParams();
  let navigate = useNavigate();

  let correct = (wordslist[ans] + '.mp4')
  let ansUrl = 'https://ds6ub7gqprtfn.cloudfront.net/' + correct

  let result = (wordKeys[list1] === ans) || (wordKeys[list2] === ans) || (wordKeys[list3] === ans);


  const logoClick = useCallback((f) => {
    navigate("/")
  });

  const QuestionClick = useCallback((g) => {
    navigate("/0_exam")
  });

  const HomeClick = useCallback((h) => {
    navigate("/")
  });



  return (
    <>
    <div className={styles.backgroundcolor}>

      <botton onClick={logoClick} className={styles.ToHomeLogo}>
        <img src={logo} width={70} height={40} alt="Logo" />

      </botton>

      <a className={styles.title13}> Answer ⇒ {wordslist[ans]}</a>


      <a className={styles.title6}>
          { result ? <a className="result_answser_correct">正解</a> : <a className="result_answser_incorrect">不正解</a> }
      </a>


 

      
    <a className={styles.title10}>
    <video src={ansUrl} 
        height={348}
        width={620}
        
        controls muted autoPlay />
    </a>    
        
      <video
        src={"blob:http://localhost:3000/" + url}
        /*src={"blob:http://localhost:3001/" + url}*/

        height={350}
        width={620}
        
        controls muted autoPlay
      /> 
      
 
     
    <br></br><br></br>
    <a className={styles.title11}>
      <a className={styles.title12}>あなたの解答</a>

      模範解答

    </a>
    
      

 

      <button onClick={QuestionClick} className={styles.learnContent}>
        問題選択に戻る
      </button>


      <button onClick={() => { HomeClick() }} className={styles.checkAnswer} >
        ホームへ戻る
      </button>
      <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
      <br></br><br></br>
      </div>
    </>
  )
}