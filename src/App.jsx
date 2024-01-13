import { useEffect, useState } from 'react'
import { HomeScreen } from './components/HomeScreen'
import { Routes,Route } from 'react-router-dom'
import {PlayScreen} from './components/PlayScreen'
function App(props) {
 const [pick,setPick] = useState();
  const pickedPlayer = (choice)=>{
    setPick(choice);
  };
  
  return (
    <>
      <Routes>
        <Route path='/' element={<HomeScreen pick={pickedPlayer}/>}/>
        <Route path='/playscreen' element={<PlayScreen pick={pick}/>}/>
      </Routes>
    </>
  )
}

export default App
