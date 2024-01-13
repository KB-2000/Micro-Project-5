import React, { useEffect, useState } from 'react'
import styles from './homeScreen.module.css'
import cross from '../assets/cross.svg'
import circle from '../assets/circle.svg'
import { Quote } from './Quote'
import { useNavigate } from 'react-router-dom'

export const HomeScreen = (props) => {
    const navigate = useNavigate();
    const [choice,setChoice] = useState("none");
    const [toast,setToast] = useState(false);
  
    const showToast = () => {
        setToast(true)
        navigator.clipboard.writeText(location.href)
        setTimeout(()=>{
            setToast(false);
          },2000);
    }
   const choose = (choice)=>{
    props.pick(choice)
    localStorage.setItem("choice",JSON.stringify(choice))
    setChoice(choice)
   }
   
  return (
    <>
     <div className={styles.home}>
          <Quote/>
             <div className={styles.home_screen}>
                    <p><img src={cross} alt="" /> <img src={circle} alt="" /></p>
                    <div className={styles.choice}>
                        <h1>PICK PLAYER</h1>
                        <div className={styles.choice_img}>
                            <img onClick={()=>{choose(circle)}} className={choice.includes("circle") ? styles.back_color : ""} src={circle} alt="" />
                            <img onClick={()=>{choose(cross)}} className={choice.includes("cross") ? styles.back_color : ""} src={cross} alt="" />
                        </div>
                  
                    </div>
                    <button onClick={()=>{choice==="none"?alert("Please Select Player"):navigate("/playscreen")}} className={styles.btn}>NEW GAME (VS CPU)</button><br />
                    <button className={styles.newgame_btn}>NEW GAME (VS HUMAN) coming soon</button><br />
                    <button onClick={showToast} className={styles.invite_btn}>Invite your friend</button>
                </div>
        </div>
        { <p className={`${styles.toast} ${toast ? styles.active : ''}`}>Invite link copied</p>}
    </>
  )
}
