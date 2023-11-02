import '../App.css';
import {useNavigate} from 'react-router-dom';
import { useParams } from 'react-router-dom';
import contentsList from './ContentsList';
import logo from '../images/ShuwaLogo.png'

function LearnAnswer() {
  const { ans, url } = useParams();
  let navigate = useNavigate();

  var tango = contentsList();
  let correct = (tango[ans] + '.mp4')

  let ansUrl = 'https://ds6ub7gqprtfn.cloudfront.net/' + correct

  console.log(ans)
  console.log(ansUrl)
  
  return (
    <div>
    <div className='ToHomeLogo'>
      <button className='LogoButton' type="button" onClick={() => navigate('/')}><img src={logo} width={100} height={50} alt="Logo" /></button>
    </div>
    <div className='Learn'>
      <h2>解答</h2>
      <h2>{tango[ans]}</h2>
    </div>
    <div className='ansVideo'>
      <video controls autoPlay src={ansUrl}></video>
    </div>
    <div className='yourVideo'>
      <video controls autoPlay src={"blob:http://localhost:3000/" + url} />
    </div>
    <div className='learnContent'>
      <button className='BackButton' type='button' onClick={() => navigate('/learnhome')}>単語選択に戻る</button>
    </div>
    <div className='checkAnswer'>
      <button className='BackHomeButton' type='button' onClick={() => navigate('/')}>ホームに戻る</button>
    </div>
    </div>
  );
}
export default LearnAnswer;