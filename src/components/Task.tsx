import { Trash } from 'phosphor-react';

import styles from './Task.module.css'

export function Task() {
  return (
    <div className={styles.task}>
      <input className={styles.doneBtn} type="checkbox"/>
      <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Et magnam tempore </p>
      <button className={styles.trash} title='Deletar tarefa'>
        <Trash size={14} />
      </button>
    </div>
  )
}