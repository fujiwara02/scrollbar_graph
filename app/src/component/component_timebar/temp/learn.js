import '../App.css';
import {useNavigate} from 'react-router-dom';
import contentsList from './ContentsList';
import logo from '../images/ShuwaLogo.png'

//問題が増えた時のためにstate等で動的にbuttonを生成したかったが時間がないので静的にやります。
function Learn() {
  let navigate = useNavigate();
  var i = 0;

  //対応している単語リスト
  var tango = contentsList();

  //問題のkeyを格納する配列
  const keys = [];

  //問題のkeyを格納する
  for(var key in tango){
    keys[i] = key;
    i++
  }


  return (
    <div>
    <div className='ToHomeLogo'>
      <button className='LogoButton' type="button" onClick={() => navigate('/')}><img src={logo} width={100} height={50} alt="Logo" /></button>
    </div>
    <div  className='Learn'>
      <h1>学習する単語を選んでください</h1>
    </div>
    <div className="ContentButton">
      {/* {this.state.tango.forEach( (tango, i) => {
        return (
          <div LearnButton>
          <button className='Learn' type='button' onClick={() => useNavigate('/tango')}> {tango.title}</button>
          </div>
        )
      })} */
      }
      <button className='LearnButton' type='button' onClick={() => navigate('/learncontent/' + keys[0])}>{tango[keys[0]]}</button>
      <button className='LearnButton' type='button' onClick={() => navigate('/learncontent/' + keys[1])}>{tango[keys[1]]}</button>
      <button className='LearnButton' type='button' onClick={() => navigate('/learncontent/' + keys[2])}>{tango[keys[2]]}</button>
      <button className='LearnButton' type='button' onClick={() => navigate('/learncontent/' + keys[3])}>{tango[keys[3]]}</button>
      <button className='LearnButton' type='button' onClick={() => navigate('/learncontent/' + keys[4])}>{tango[keys[4]]}</button>
      <button className='LearnButton' type='button' onClick={() => navigate('/learncontent/' + keys[5])}>{tango[keys[5]]}</button>
      <button className='LearnButton' type='button' onClick={() => navigate('/learncontent/' + keys[6])}>{tango[keys[6]]}</button>
      <button className='LearnButton' type='button' onClick={() => navigate('/learncontent/' + keys[7])}>{tango[keys[7]]}</button>
      <button className='LearnButton' type='button' onClick={() => navigate('/learncontent/' + keys[8])}>{tango[keys[8]]}</button>
      <button className='LearnButton' type='button' onClick={() => navigate('/learncontent/' + keys[9])}>{tango[keys[9]]}</button>
      <button className='LearnButton' type='button' onClick={() => navigate('/learncontent/' + keys[10])}>{tango[keys[10]]}</button>
      <button className='LearnButton' type='button' onClick={() => navigate('/learncontent/' + keys[15])}>{tango[keys[15]]}</button>
      <button className='LearnButton' type='button' onClick={() => navigate('/learncontent/' + keys[12])}>{tango[keys[12]]}</button>
      <button className='LearnButton' type='button' onClick={() => navigate('/learncontent/' + keys[18])}>{tango[keys[18]]}</button>
    </div>
  </div>
  );
}
export default Learn;