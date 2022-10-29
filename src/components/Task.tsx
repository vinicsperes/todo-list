import { Trash } from 'phosphor-react';

import styles from './Task.module.css'

export interface TaskType {
  id: string;
  title: any;
  isComplete: boolean;
  onToggleTask: (id: string) => void;
  onDelete: (id: string) => void;
  onIvalid: () => void;
}


export function Task({id, title, isComplete, onToggleTask, onDelete}: TaskType) {

  function handleToggleTask() {
    onToggleTask(id);
  }

  function handleDeleteTask() {
    onDelete(id);
  }

  let complete;
  if (isComplete) {
    complete = styles.isComplete;  
  } else {
    complete = styles.isCompleteFalse;
  }

  return (
    <div className={styles.task}>
      <input type="checkbox" onChange={handleToggleTask} className={styles.doneBtn}/>
      <p className={complete}>{title}</p>
      <button onClick={handleDeleteTask} className={styles.trash} title='Deletar tarefa'>
        <Trash size={14} />
      </button>
    </div>
  )
}