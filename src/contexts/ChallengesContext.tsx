import {createContext, useState, ReactNode, useEffect} from 'react'
import challenges from '../../challenges.json'
import Cookies from 'js-cookie'
import {LevelUpModal} from '../components/LevelUpModal'

interface ChallengesProviderProps{
  children: ReactNode
  level: number 
  currentExperience:number 
  challengesCompleted: number
}
interface Challenge {
  type: 'body' | 'eye'
  description: string
  amount: number
}
interface ChallengesContextData {
  level: number
  levelUp: () => void
  currentExperience:number
  challengesCompleted: number
  experienceToNextLevel:number
  activeChallenge: Challenge
  startNewChallenge:() => void
  resetChallenge:() => void
  completeChallenge:() =>void
  closeLevelUpModal: () => void

}
export const ChallengesContext = createContext({} as ChallengesContextData)

export function ChallengesProvider({children, ...rest}:ChallengesProviderProps){
  const [level,setLevel] = useState(rest.level ?? 1)
  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0)
  const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0)
  const[activeChallenge,setActiveChallenge]=useState(null)

  const[isLevelUpModalOpen,setIsLevelUpModal] = useState(false)
  useEffect(()=>{
    Notification.requestPermission()
  }, [])

  useEffect(()=>{
    Cookies.set('level',String(level))
    Cookies.set('currentExperience',String(currentExperience))
    Cookies.set('challengesCompleted',String(challengesCompleted))

  }, [level,currentExperience,challengesCompleted])

  
  const experienceToNextLevel = Math.pow((level+1) * 4,2)
  function levelUp(){
    setLevel(level+1)
    setIsLevelUpModal(true)
  }

  function closeLevelUpModal(){
    setIsLevelUpModal(false)
  }

  function startNewChallenge(){
   const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
   const challenge = challenges[randomChallengeIndex]
    setActiveChallenge(challenge)
   
   // new Audio('/notifiacation.mp3').play()
   
    if(Notification.permission === 'granted'){
      new Notification('Novo desafio', {
        body:`Valendo ${challenge.amount} xp`
      })
    }
  }
  function resetChallenge(){
    setActiveChallenge(null)
  }

  function completeChallenge(){
   if(!activeChallenge){
     return
   }
   const {amount} = activeChallenge
   let finalExperrience = currentExperience + amount
   if(finalExperrience >= experienceToNextLevel){
    finalExperrience = finalExperrience - experienceToNextLevel 
    levelUp()
   }

   setCurrentExperience(finalExperrience)
   setActiveChallenge(null)
   setChallengesCompleted(challengesCompleted+1)
   
  }

  return (
    <ChallengesContext.Provider value={{
    level,
    levelUp,
    currentExperience,
    challengesCompleted,
    startNewChallenge,
    activeChallenge,
    resetChallenge,
    experienceToNextLevel,
    completeChallenge,
    closeLevelUpModal,
    }}>
      {children}
    {isLevelUpModalOpen && <LevelUpModal/>}
    </ChallengesContext.Provider>
  );
}