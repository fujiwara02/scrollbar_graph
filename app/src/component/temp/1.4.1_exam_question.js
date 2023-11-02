import "../App.css";
import styles from './Exam.module.css'
import React, {useCallback} from 'react'
import { useNavigate } from 'react-router-dom';
import logo from '../images/ShuwaLogo.png'
import contentsList from './ContentsList';
import exam_ZokuseiList from './exam_ZokuseiList';

const wordslist = contentsList();

const zokuseilist = exam_ZokuseiList();
let word = Object.keys(zokuseilist)


//問題のkeyを格納する配列
const keys = [];

var i = 0;
//問題のkeyを格納する
for (var { key, value } in wordslist) {
  keys[i] = key;
  i++
}

let question = Math.floor(Math.random() * i);/*answer*/ 

console.log(question)

/* 無属性以外の中から連続する3つを選ぶ */
let question1 = Math.floor(Math.random() * (i-15));/*　ダミー */
let question2 = question1 + 1 
let question3 = question1 + 2



for (let j = 0; j < 15; j++) {
    
    console.log(question1)
    console.log(question2)
    console.log(question3)

    /* 3つの属性がすべて同じでなければやり直し */
    if(zokuseilist[word[question1]] !== zokuseilist[word[question3]]){

        question1 = Math.floor(Math.random() * (i-15));/*　ダミー */
        question2 = question1 + 1 
        question3 = question1 + 2
    }

    /* 3つの属性が正解の属性と同じならやり直し */
    if(zokuseilist[word[question]] === zokuseilist[word[question1]]){

        question1 = Math.floor(Math.random() * (i-15));/*　ダミー */
        question2 = question1 + 1 
        question3 = question1 + 2
    }
}



/* 正解の動画の場所 */
let start = Math.floor(Math.random() * 4);

/* if(start===0) */ 
let screen = question ;
let screen1 = question1 ;
let screen2 = question2 ;
let screen3 = question3 ;

if(start===1){
  screen = question3 ;
  screen1 = question ;
  screen2 = question1 ;
  screen3 = question2 ;
}
if(start===2){
  screen = question2 ;
  screen1 = question3 ;
  screen2 = question ;
  screen3 = question1 ;
}
if(start===3){
  screen = question1 ;
  screen1 = question2 ;
  screen2 = question3 ;
  screen3 = question ;
}



let correct = (wordslist[word[screen]] + '.mp4')
let correct1 = (wordslist[word[screen1]] + '.mp4')
let correct2 = (wordslist[word[screen2]] + '.mp4')
let correct3 = (wordslist[word[screen3]]+ '.mp4')


let ansUrl = 'https://ds6ub7gqprtfn.cloudfront.net/' + correct
let ansUrl1 = 'https://ds6ub7gqprtfn.cloudfront.net/' + correct1
let ansUrl2 = 'https://ds6ub7gqprtfn.cloudfront.net/' + correct2
let ansUrl3 = 'https://ds6ub7gqprtfn.cloudfront.net/' + correct3



export default function EXAM_QUESTION() {

  let navigate = useNavigate();


  const logoClick = useCallback((f) => {
    navigate("/")
  });

  const QuestionClick = useCallback((g) => {
    navigate("/0_exam")
  });

  const RecordClick = useCallback((h) => {
    navigate("/1.4.2_exam_question_record/" + question)
  });

  const ConfirmClick = useCallback((h) => {
    navigate("/exam_confirm1/" 
    +word[screen]+ "/" 
    +word[screen1]+ "/" 
    +word[screen2]+ "/" 
    +word[screen3]
    +"/1.4.1_exam_question");
   

  });

  

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
        下記の4つの手話のうち、性質が異なるものを選んで表現してください</a>
        <br></br>


    <a>
        <a className={styles.title9}>
        <video
             src={ansUrl}
             width={480}
             height={266}
             controls muted autoPlay
            />
        </a>

      
        <video
             src={ansUrl1}
             width={480}
             height={266}
             controls muted autoPlay

        /> 
     

        <br></br>
        <a className={styles.title9}>
        <video
             src={ansUrl2}
             width={480}
             height={266}
             controls muted autoPlay
            /> 
        </a>

     
        <video
             src={ansUrl3}
             width={480}
             height={266}
             controls muted autoPlay
            /> 
        
    </a>
    
        
      <button onClick={QuestionClick} className={styles.learnContent}>
        問題選択に戻る
      </button>


      <button onClick={() => { RecordClick() }} className={styles.checkAnswer} >
        録画画面へ進む
      </button>
      <br></br><br></br><br></br><br></br><br></br><br></br>
</div>
    </>
  )
}