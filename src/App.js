import { useEffect, useState } from "react";
//import 'bootstrap/dist/css/bootstrap.css';
import './App.scss';

function App() {
  const drumPads = [
    {
      keyCode: 81,
      text: "Q",
      src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
    },
    {
      keyCode: 87,
      text: "W",
      src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"
    },
    {
      keyCode: 69,
      text: "E",
      src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"
    },
    {
      keyCode: 65,
      text: "A",
      src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"
    },
    {
      keyCode: 83,
      text: "S",
      src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
    },
    {
      keyCode: 68,
      text: "D",
      src: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"
    },
    {
      keyCode: 90,
      text: "Z",
      src: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"
    },
    {
      keyCode: 88,
      text: "X",
      src: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
    },
    {
      keyCode: 67,
      text: "C",
      src: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
    }
  ];

  const [activeKey, setActiveKey] = useState("");
  const [volume, setVolume] = useState(1);
  const [power, setPower] = useState(true);

  useEffect(() => {
    document.addEventListener('keydown', (event) => {
      playSound(event.key.toUpperCase());
    })
  });

  const onOff = () => {
    setPower(!power);
  };

  const setKeyVolume = () => {
    const audioes = drumPads.map(drumPad => document.getElementById(drumPad.text));
    audioes.forEach(audio => {
      if(audio) {
        audio.volume = volume;
      }     
    })
  }
  
  function playSound(selector) {
    const audio = document.getElementById(selector);
    console.log(audio);
    if(power){
      audio.play();
      setActiveKey(selector);
    } else {
      audio.pause();
    };
  };

  return (
    <div className="App" >
      <div id="drum-machine">
        <div className="drum-pads">
          {setKeyVolume()}
          {drumPads.map((drumPad) => (
            <div
              key={drumPad.src}
              onClick={() => {
                playSound(drumPad.text);
              }}
              className="drum-pad"
              id={drumPad.src}
            >
              {drumPad.text}
              <audio
                className="clip"
                id={drumPad.text}
                src={drumPad.src}
              ></audio>
            </div>
          ))}
        </div>
        <div className="controls">
          <h3>Power</h3>
          <div className="power">
            <label >
              <input
                type="checkbox"
                id="checkbox"
                className="toggle"
                defaultChecked
                onChange={onOff}
              />
              <span className="slider">{power ? 'OFF' : 'ON'}</span>
            </label>
          </div>
          <div id="display">Display: {activeKey}</div>
          <h3>Volume: %{Math.round(volume * 100)}</h3>
          <input
            className="sound"
            type="range"
            step="0.01"
            onChange={(e) => setVolume(e.target.value)}
            value={volume}
            max="1"
            min="0" 
          />
        </div>
      </div>
    </div>
  );
}

export default App;