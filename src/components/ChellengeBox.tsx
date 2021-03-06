import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/ChellengeBox.module.css'

export function ChellengeBox(){
  const {activeChallenge,resetChallenge, completeChallenge} = useContext(ChallengesContext)
  const { resetCountDown} = useContext(CountdownContext)
  function handleChallengeSucceeded(){
    completeChallenge()
    resetCountDown()
  }
  function handleChallengeFailed(){
    resetChallenge()
    resetCountDown()
  }
  return(
    <div className={styles.ChellengeBoxContainer}>
     {activeChallenge? (
       
       <div className={styles.challengeActive}>

      <header>Ganhe {activeChallenge.amount} xp</header>
      <main>
        <img src={`icons/${activeChallenge.type}.svg`}/>
        <strong>Novo desafio</strong>
        <p>{activeChallenge.description}</p>
      </main>
      <footer>
        <button type="button" className={styles.challengeFailedButton} onClick={handleChallengeFailed}>Falhei</button>
        <button type="button" className={styles.challengeSucceededButton} onClick={handleChallengeSucceeded} >Completei</button>
      </footer>

       </div>
     ): (
        <div className={styles.ChellengeNotActive}>
        <strong>Finzalize um ciclo para receber um desafios</strong>
        <p>
          <img src="icons/levelUp.svg" alt="Level Up"/>
          Avance de level completando desafios.
        </p>
      </div>
     )}

    </div>
  )
}