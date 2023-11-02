import styles from './Exam.module.css'
import React, {useCallback} from  'react'
import {useNavigate} from 'react-router-dom';
import logo from '../images/ShuwaLogo.png';



export default function EXAM() {

  

  let navigate = useNavigate();

  const logoClick = useCallback((e) => {
    navigate('/');
  });

  const dif_Click = useCallback((e) => {
    navigate('/0_exam_dif');
  });

  const NextClick1 = useCallback((e) => {
    navigate("/1.1.1_exam_question")
  });

  const NextClick2 = useCallback((f) => {
    navigate("/1.2_exam_question")
  });

  const NextClick3 = useCallback((f) => {
    navigate("/1.3_exam_question")
  });

  const NextClick4 = useCallback((f) => {
    navigate("/1.4.1_exam_question")
  });

  return (
    <>
    
     
 
      <div className={styles.backgroundcolor}>

      
      <botton onClick= {logoClick} className={styles.ToHomeLogo}>
        <img src={logo}  width={70} height={40} alt="Logo" />
        
      </botton>

      <botton onClick= {dif_Click} className={styles.title4}>問題選択</botton>
      
      <a className={styles.title100}>
        <botton>
          <h2 onClick={NextClick1} className={styles.left_Botton}>難易度★☆☆</h2> 
          <a className={styles.title101}>⇒ 4つの動画の中から正解を選択する</a>
        </botton><br></br>
        
        <botton>
          <h2 onClick={NextClick2} className={styles.middle1_Botton}>難易度★★☆</h2> 
          <a className={styles.title101}>⇒ 提示された単語を手話で表現する</a>
        </botton><br></br>

        
        <botton>
          <h2 onClick={NextClick3} className={styles.middle2_Botton}>難易度★★☆</h2>   
          <a className={styles.title101}>⇒ 空欄に入る単語を手話で表現する</a>
        </botton><br></br>
        
        <botton>
          <h2 onClick={NextClick4} className={styles.right_Botton}>難易度★★★</h2> 
          <a className={styles.title101}>⇒ 4つの動画から性質の異なるものを選択する</a>
        </botton>
        </a>

      <br></br><br></br><br></br><br></br><br></br>
      </div>
      
     
    </>
  )
}