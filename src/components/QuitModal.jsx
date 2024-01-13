import React from 'react'
import styles from './quitModal.module.css'
import { useNavigate } from 'react-router-dom'

export const QuitModal = (props) => {
  const navigate = useNavigate();
    const playAgain = ()=>{
        props.playAgain()
    }
    const quit = ()=>{
      props.quit(false)
      navigate('/')
    }
  return (
    <>
    <div className={styles.quit_modal}>
        <p>Do You Want to Quit ?</p>
        <button onClick={playAgain} className={styles.play_again_btn}>PLAY AGAIN</button>
        <button onClick={quit}className={styles.quit_btn}>QUIT</button>
    </div>
</>
  )
}
