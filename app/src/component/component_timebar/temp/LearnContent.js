import '../App.css';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import contentsList from './ContentsList';
import logo from '../images/ShuwaLogo.png'
import recordButton from '../images/record.png'
import stopButton from '../images/stop.png'
import { useReactMediaRecorder } from "react-media-recorder";
import VideoPreview from '../movie/VideoPreview';

function LearnContent() {
  const { id } = useParams();
  let navigate = useNavigate();
  let videoURL = null;
  //const [value, setValue] = useState(true)

  var tango = contentsList();

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

  let answer = (id) => {
    // このURL(パス？)を遷移するURLにくっつけたい
    console.log(mediaBlobUrl);
    if (mediaBlobUrl) {
      var splitURL = mediaBlobUrl.split('/');
      var urlID = splitURL[splitURL.length - 1];
      console.log(splitURL);
      console.log(urlID);
      navigate('/learnanswer/' + id + "/" + urlID);
    }
  }
  let isRecord = false;
  let imageSrc = recordButton;

  isRecord = (status === "recording");

  const record_toggle = () => {
    if (isRecord) {
      stopRecording();
      imageSrc = recordButton;
      console.log("stop")
    }
    else {
      startRecording();
      imageSrc = stopButton;
      console.log("start")
    }
    // isRecord = !isRecord;
  }
  const get_Image_Src = () => {
    return imageSrc;
  }

  var tango = contentsList();

  return (
    <div>
      <div className='ToHomeLogo'>
        <button className='LogoButton' type="button" onClick={() => navigate('/')}><img src={logo} width={100} height={50} alt="Logo" /></button>
      </div>
      <div className='Learn'>
        <h2>次の手話を録画してください</h2>
        <h2>{tango[id]}</h2>
        <div>
          <div>
            <div className='videoPreview'>
              <VideoPreview className="" stream={previewStream} url={mediaBlobUrl} width="40%" />
            </div>
            <div className='reButtonParent'>
              <div className={'reButton'}>
                <button className='RecordButton' onClick={() => {
                  record_toggle();
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
            <div className='learnContent'>
              <button className='BackButton' type='button' onClick={() => navigate('/learnhome')}>単語選択に戻る</button>
            </div>
            <div className='checkAnswer'>
              <button className='BackButton' type='button' onClick={() => answer(id)}>解答を見る</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LearnContent;

//{count % 2 ? <img src={recordButton} width={40} height={40} alt="RecordButton" /> : <img src={stopButton} width={40} height={40} alt="RecordButton" />}