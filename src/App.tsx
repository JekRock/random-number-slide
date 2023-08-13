import React, { useEffect, useState } from 'react';
import './App.css';

const DEFAULT_ITERATION_COUNT = 128;
const DEFAULT_ITERATION_DELAY = 30;

function shuffleArray(arr: Array<number>): Array<number> {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // at random index
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function generateRandomNonRepeatingNumbers(min: number, max: number): Array<number> {
  const arr = Array.from({ length: max - min + 1 }, (_, i) => i + min);
  return shuffleArray(arr);
}


function App() {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [backgroundColor, setBackgroundColor] = useState('green');
  const [numberColor, setNumberColor] = useState('yellow');
  const [numberSize, setNumberSize] = useState(3);
  const [number, setNumber] = useState<number | null>(null);
  const [iterationCount, setIterationCount] = useState(DEFAULT_ITERATION_COUNT);
  const [iterationDelay, setIterationDelay] = useState(DEFAULT_ITERATION_DELAY);
  const [nonRepeatingNumbers, setNonRepeatingNumbers] = useState<Array<number>>(() => generateRandomNonRepeatingNumbers(min, max));
  const [showEmoji, setShowEmoji] = useState(false);

  const iterationCountRef = React.useRef(iterationCount);
  iterationCountRef.current = iterationCount;

  const iterationDelayRef = React.useRef(iterationDelay);
  iterationDelayRef.current = iterationDelay;

  useEffect(() => {
    setNonRepeatingNumbers(generateRandomNonRepeatingNumbers(min, max));
    setNumber(null);
  }, [min, max]);


  const generateRandomNumberWithSlowDown = () => {
    setShowEmoji(false);

    if (iterationCountRef.current <= 0) {
      setIterationCount(DEFAULT_ITERATION_COUNT);
      setIterationDelay(DEFAULT_ITERATION_DELAY);
      
      setNumber(nonRepeatingNumbers.pop() ?? null);

      setNonRepeatingNumbers(nonRepeatingNumbers);

      setShowEmoji(true);

      return;
    }

    if (iterationCountRef.current === DEFAULT_ITERATION_COUNT / 2) {
      setIterationDelay(DEFAULT_ITERATION_DELAY * 2);
    }

    if (iterationCountRef.current === DEFAULT_ITERATION_COUNT / 4) {
      setIterationDelay(DEFAULT_ITERATION_DELAY * 4);
    }

    if (iterationCountRef.current === DEFAULT_ITERATION_COUNT / 8) {
      setIterationDelay(DEFAULT_ITERATION_DELAY * 8);
    }

    if (iterationCountRef.current === DEFAULT_ITERATION_COUNT / 16) {
      setIterationDelay(DEFAULT_ITERATION_DELAY * 16);
    }

    if (iterationCountRef.current === DEFAULT_ITERATION_COUNT / 32) {
      setIterationDelay(DEFAULT_ITERATION_DELAY * 32);
    }

    if (iterationCountRef.current === DEFAULT_ITERATION_COUNT / 64) {
      setIterationDelay(DEFAULT_ITERATION_DELAY * 64);
    }

    if (iterationCountRef.current === DEFAULT_ITERATION_COUNT / 128) {
      setIterationDelay(DEFAULT_ITERATION_DELAY * 128);
    }
    
    const newNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    setNumber(newNumber);
    setIterationCount((prev) => prev - 1);

    setTimeout(() => {
      generateRandomNumberWithSlowDown();
    }, iterationDelayRef.current);
  };

  const handleBackgroundColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBackgroundColor(event.target.value);
  };

  const handleNumberColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNumberColor(event.target.value);
  };

  const handleNumberSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNumberSize(Number(event.target.value));
  };

  const handleMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMin(Number(event.target.value));
  };

  const handleMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMax(Number(event.target.value));
  };

  // const appStyle: React.CSSProperties = {
  //   backgroundColor: backgroundColor,
  //   display: 'grid',
  //   placeItems: 'center',
  //   width: '100vw',
  //   height: '100vh',
  //   // overflow: 'hidden',
  //   transition: 'background-color 0.5s',
  //   // cursor: 'none',
  // };

  // const controlsStyle: React.CSSProperties = {
  //   position: 'absolute',
  //   top: 0,
  //   left: 0,
  //   right: 0,
  //   backgroundColor: 'rgba(255, 255, 255, 0.8)',
  //   padding: '10px',
  //   display: 'flex',
  //   justifyContent: 'space-around',
  //   alignItems: 'center',
  //   visibility: number !== null ? 'visible' : 'hidden',
  //   transition: 'visibility 0.5s',
  // };

  const numberStyle: React.CSSProperties = {
    fontSize: numberSize + 'em',
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    color: numberColor,

    backgroundColor: backgroundColor,
    display: 'grid',
    placeItems: 'center',
    width: '100vw',
    height: '100vh',
    // overflow: 'hidden',
    transition: 'background-color 0.5s',
    // cursor: 'none',
  };

  return (
    <div  >
      <div className='control'>
        <label>Фон:</label>
        <input type="color" value={backgroundColor} onChange={handleBackgroundColorChange} />
        <label>Число:</label>
        <input type="color" value={numberColor} onChange={handleNumberColorChange} />
        <label>Розмір:</label>
        <input type="number" value={numberSize} onChange={handleNumberSizeChange} />
        <label>Мін:</label>
        <input type="number" value={min} onChange={handleMinChange} />
        <label>Макс:</label>
        <input type="number" value={max} onChange={handleMaxChange} />
      </div>
      <div id={"number-container"} style={numberStyle} onClick={() => generateRandomNumberWithSlowDown()}>{number !== null ? showEmoji ? `🎉 ${number} 🎉`: number : 'Почнемо!'}</div>
    </div>
  );
}

export default App;
