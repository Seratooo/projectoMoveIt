import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "./ChallengesContext";

interface CountdownCOntextData{
  minutes: number
  seconds: number
  hasFinished: boolean
  isActive: boolean
  startCountDown:() => void
  resetCountDown: () =>void
}
interface CountdownProviderProps{
  children: ReactNode
}

export const CountdownContext = createContext({} as CountdownCOntextData)

export function CountdownProvider({children}: CountdownProviderProps){

  const {startNewChallenge} = useContext(ChallengesContext)

  const[time,setTime] = useState(25*60)
  const[isActive,setIsActive] = useState(false);
  const[hasFinished,setHasFineshed] = useState(false);

  const minutes = Math.floor(time/60);
  const seconds = time % 60;

  let countdownTimeout : NodeJS.Timeout;
  function startCountDown(){
    setIsActive(true);
  }

  function resetCountDown(){
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setTime(25*60);
    setHasFineshed(false)

  }
  useEffect(()=>{
    if(isActive && time > 0){
      countdownTimeout = setTimeout(()=>{
        setTime(time-1);
      },1000)
    }else if(isActive && time ==0){
      setHasFineshed(true);
      setIsActive(false);
      startNewChallenge()
    }
  },[isActive, time])

  return(
    <CountdownContext.Provider value={{
      minutes,
      seconds,
      hasFinished,
      isActive,
      startCountDown,
      resetCountDown,
    }}>
      {children}
    </CountdownContext.Provider>
  )
}