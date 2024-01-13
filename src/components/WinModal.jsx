import React from 'react'
import circle from '../assets/circle.svg'
import styles from './winModal.module.css'
import { useNavigate } from 'react-router-dom'
export const WinModal = (props) => {
    const navigate = useNavigate();
    const nextRound = () => {
        props.next(false);
    }
    const quit = ()=> {
        props.quit()
        navigate('/')
    }
  return (
    <>
    <div className={styles.win_modal}>
            <h1>{props.winnerHeading}</h1>
            <p><img src={props.winnerLogo} alt="" /> &nbsp;&nbsp;&nbsp;{props.winnerPara}</p>
            <button onClick={quit} className={styles.win_quit_btn}>QUIT</button>
            <button onClick={nextRound} className={styles.next_round_btn}>NEXT ROUND</button>
        </div>
    </>
  )
}
