import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'
import styles from '../styles/components/completedChellenges.module.css'

export function CompletedChallenges(){
  const {challengesCompleted} = useContext(ChallengesContext)
  return(
    <div className={styles.completedChellengesContainer}>
      <span>Dasafios completos</span>
      <span>{challengesCompleted}</span>
    </div>
  )
}