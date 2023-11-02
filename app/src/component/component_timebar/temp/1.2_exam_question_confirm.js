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

    const {ans} = useParams();
    let correct = (wordslist[ans] + '.mp4')  
    let ansUrl = 'https://ds6ub7gqprtfn.cloudfront.net/' + correct


  let navigate = useNavigate();

  const BackClick = useCallback((g) => {
    navigate("/1.2_exam_question")
  });



  return (
    <>
<div className={styles.backgroundcolor}>

<br></br><br></br><br></br><br></br><br></br><br></br>

        <a className={styles.title19}>
        <video
             src={ansUrl}
             width={700}
             height={390}
             controls muted autoPlay
            />
        </a>
        <br></br><br></br>
        
        <a className={styles.title20}>{wordslist[ans]}</a>
    

      <button onClick={BackClick} className={styles.learnContent}>
        前のページに戻る
      </button>

      <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
</div>
    </>
  )
}