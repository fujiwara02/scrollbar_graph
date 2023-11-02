import "../App.css";
import styles from './Exam.module.css'
import React, {useCallback} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import contentsList from './ContentsList';



const wordslist = contentsList();

//問題のkeyを格納する配列
const keys = [];

var i = 0;
//問題のkeyを格納する
for (var { key, value } in wordslist) {
  keys[i] = key;
  i++
}


export default function EXAM_QUESTION() {

    const {ans1,ans2,ans3,ans4,url} = useParams();

    let correct = (wordslist[ans1] + '.mp4')/*answer*/ 
    let correct1 = (wordslist[ans2] + '.mp4')
    let correct2 = (wordslist[ans3] + '.mp4')
    let correct3 = (wordslist[ans4] + '.mp4')
    
    let ansUrl = 'https://ds6ub7gqprtfn.cloudfront.net/' + correct/*answer*/ 
    let ansUrl1 = 'https://ds6ub7gqprtfn.cloudfront.net/' + correct1
    let ansUrl2 = 'https://ds6ub7gqprtfn.cloudfront.net/' + correct2
    let ansUrl3 = 'https://ds6ub7gqprtfn.cloudfront.net/' + correct3


  let navigate = useNavigate();

  const BackClick = useCallback((g) => {
    navigate("/" + url)
  });



  return (
    <>
<div className={styles.backgroundcolor}>

<br></br><br></br>
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
        <a className={styles.title15}>{wordslist[ans1]}</a>
        <a className={styles.title16}>{wordslist[ans2]}</a>
        <br></br>

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
        <br></br>
        <a className={styles.title15}>{wordslist[ans3]}</a>
        <a className={styles.title16}>{wordslist[ans4]}</a>


    </a>
    
        
      <button onClick={BackClick} className={styles.learnContent}>
        前のページに戻る
      </button>

      <br></br><br></br><br></br><br></br><br></br><br></br>
</div>
    </>
  )
}