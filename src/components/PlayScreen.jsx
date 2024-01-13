import React, { useEffect, useRef, useState } from 'react'
import styles from './playScreen.module.css'
import cross from '../assets/cross.svg'
import circle from '../assets/circle.svg'
import reset from '../assets/reset.svg'
import { WinModal } from './WinModal'
import { QuitModal } from './QuitModal'
import { Quote } from './Quote'

export const PlayScreen = (props) => {
  let data = ["", "", "", "", "", "", "", "", ""];
  let availableSquares = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  let lock = false;
  
  
  const [userChoice,setUserChoice] = useState(()=>{
    const data = JSON.parse(localStorage.getItem("choice"))
    return data
  }); 
  const [comChoice,setComChoice] = useState(()=>{
    if((userChoice).includes("circle")){
      return "/src/assets/cross.svg"
    }
    return "/src/assets/circle.svg"
  })
  let turn = userChoice;
 
  const [yourScore, setYourScore] = useState(() => {
    if (localStorage.getItem("scores")) {
      const localScores = JSON.parse(localStorage.getItem("scores"));
      return localScores.your_score || 0;
    }
    return 0;
  });
  const [cpuScore, setCpuScore] = useState(() => {
    if (localStorage.getItem("scores")) {
      const localScores = JSON.parse(localStorage.getItem("scores"));
      return localScores.cpu_score || 0;
    }
    return 0;
  });
  const [ties, setTies] = useState(() => {
    if (localStorage.getItem("scores")) {
      const localScores = JSON.parse(localStorage.getItem("scores"));
      return localScores.Ties || 0;
    }
    return 0;
  });

  let scores = {
    your_score: yourScore,
    cpu_score: cpuScore,
    Ties: ties
  }

  let sq0 = useRef(null);
  let sq1 = useRef(null);
  let sq2 = useRef(null);
  let sq3 = useRef(null);
  let sq4 = useRef(null);
  let sq5 = useRef(null);
  let sq6 = useRef(null);
  let sq7 = useRef(null);
  let sq8 = useRef(null);


  const ref_arr = [sq0, sq1, sq2, sq3, sq4, sq5, sq6, sq7, sq8]

  const [winModal, showWinModal] = useState(false);
  const [quitModal, showQuitModal] = useState(false);

  // Play Funtion runs on each turn
  const play = (num) => {
    if (lock) {
      return;
    }
    // setTurn(userChoice)
    turn = comChoice;
    if (data[num] === "") {
      data[num] = userChoice.includes("circle") ? 'o':'x' ;
      ref_arr[num].current.innerHTML =userChoice.includes("circle") ? `<img src=${circle} alt=""/>` : `<img src=${cross} alt=""/>`
      availableSquares = availableSquares.filter((square) => square != num)
      checkWin();

    if(lock===false){  // To avoid calling checkWin() fucntion twice after user wins
      lock = true;
        turn = comChoice;
        setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * availableSquares.length);
        const randomSquare = availableSquares[randomIndex];
        data[randomSquare] = comChoice.includes("circle") ? 'o' : 'x';
        ref_arr[randomSquare].current.innerHTML = comChoice.includes("circle") ?`<img src=${circle} alt=""/>` : `<img src=${cross} alt=""/>` 
        availableSquares = availableSquares.filter((square) => square !== randomSquare)
        checkWin();
        lock = false;
        turn = userChoice;
      }, 1000);
     }
     
   
    }
  }
  

  // Checks Who win

  const checkWin = () => {
    if (data[0] === data[1] && data[1] === data[2] && data[2] !== "") {
      won(data[0]);
    } else if (data[3] === data[4] && data[4] === data[5] && data[5] !== "") {
      won(data[3]);
    } else if (data[6] === data[7] && data[7] === data[8] && data[8] !== "") {
      won(data[6]);
    } else if (data[0] === data[3] && data[3] === data[6] && data[6] !== "") {
      won(data[0]);
    } else if (data[1] === data[4] && data[4] === data[7] && data[7] !== "") {
      won(data[1]);
    } else if (data[2] === data[5] && data[5] === data[8] && data[8] !== "") {
      won(data[2]);
    } else if (data[0] === data[4] && data[4] === data[8] && data[8] !== "") {
      won(data[0]);
    } else if (data[2] === data[4] && data[4] === data[6] && data[6] !== "") {
      won(data[2]);
    } else if (availableSquares.length === 0) {
      won();
    }
  }

  // After someone won
  const [winnerLogo,setWinnerLogo]=useState(null)
  const [winnerHeading,setWinnerHeading] = useState(null)
  const [winnerPara,setWinnerPara] = useState("TAKES THE ROUND")

  function won(winner) {
    lock = true;
    showWinModal(true)
    if (winner === "x" ) {
      
      if(userChoice.includes("cross")){
        setYourScore((prev) => prev + 1)
        setWinnerLogo(cross)
        setWinnerHeading("YOU WON!")
      }else{
        setCpuScore((prev) => prev + 1)
        setWinnerLogo(cross)
        setWinnerHeading("CPU WINS!")
      }
      
    } else if (winner === "o") {
      if(userChoice.includes("circle")){
        setYourScore((prev) => prev + 1)
        setWinnerLogo(circle)
        setWinnerHeading("YOU WON!")
      }else{
        setCpuScore((prev) => prev + 1)
        setWinnerLogo(circle)
        setWinnerHeading("CPU WIN!")
      }
    } else {
      setTies((prev) => prev + 1)
      setWinnerLogo()
      setWinnerHeading("TIE!")
      setWinnerPara("Please Try Again!")
    }

  }
  useEffect(() => {
    localStorage.setItem("scores", JSON.stringify({ your_score: yourScore, cpu_score: cpuScore, Ties: ties }));
  }, [yourScore, cpuScore, ties])

  
  // Onclick of winModal Next Round button
  const handleNextRound = (modalStatus) => {
    showWinModal(modalStatus)
    data = ["", "", "", "", "", "", "", "", ""];
    availableSquares = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    lock = false;
    ref_arr.forEach(element => {
      element.current.innerHTML = "";
    });
  }

  // Onclick of winModal Quit button
  const handleQuit = (modalStatus) => {
    showWinModal(false)
    data = ["", "", "", "", "", "", "", "", ""];
    availableSquares = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    lock = false;
    ref_arr.forEach(element => {
      element.current.innerHTML = "";
    });
  }

 // Onclick of QuitModal PlayAgain button
  const handlePlayAgain = () => {
    showQuitModal(false)
    data = ["", "", "", "", "", "", "", "", ""];
    availableSquares = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    lock = false;
    ref_arr.forEach(element => {
      element.current.innerHTML = "";
    });
  }

    // Onclick of QuitModal Quit button
  const handleQuitModal = (data) => {
    showQuitModal(data)
    data = ["", "", "", "", "", "", "", "", ""];
    availableSquares = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    lock = false;
    ref_arr.forEach(element => {
      element.current.innerHTML = "";
    });
  }
 
  return (
    <>
      <div className={styles.home}>
        <Quote />
        <div className={styles.main}>
          <div className={styles.play_area}>
            <div className={styles.brand}><img src={cross} alt="" /> <img src={circle} alt="" /></div>
            <div className={styles.turn_btn}><img src={turn} alt=""/>TURN</div>
            <div onClick={() => { showQuitModal(true) }} className={styles.reset_btn}><img src={reset} alt="" /></div>
            <p ref={sq0} onClick={() => { play(0) }} className={styles.box}></p>
            <p ref={sq1} onClick={() => { play(1) }} className={styles.box}></p>
            <p ref={sq2} onClick={() => { play(2) }} className={styles.box}></p>
            <p ref={sq3} onClick={() => { play(3) }} className={styles.box}></p>
            <p ref={sq4} onClick={() => { play(4) }} className={styles.box}></p>
            <p ref={sq5} onClick={() => { play(5) }} className={styles.box}></p>
            <p ref={sq6} onClick={() => { play(6) }} className={styles.box}></p>
            <p ref={sq7} onClick={() => { play(7) }} className={styles.box}></p>
            <p ref={sq8} onClick={() => { play(8) }} className={styles.box}></p>
            {quitModal && <QuitModal playAgain={handlePlayAgain} quit={handleQuitModal} />}
            {winModal && <WinModal next={handleNextRound} quit={handleQuit} winnerLogo={winnerLogo} winnerHeading={winnerHeading} winnerPara={winnerPara}/>}
            <div className={styles.x_score}>
              <span>X(You)</span>
              <span>{yourScore}</span>

            </div>
            <div className={styles.ties}>
              <span>TIES</span>
              <span>{ties}</span>
            </div>
            <div className={styles.y_score}>
              <span>Y(CPU)</span>
              <span>{cpuScore}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
