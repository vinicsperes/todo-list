import './App.module.css'
import './global.css'

import styles from './App.module.css';
import { PlusCircle } from 'phosphor-react';

import { Task } from './components/Task';

import { v4 as uuidv4 } from 'uuid';

const tasks = [
  {
    id: uuidv4(), 
    title: 'Cozinhar 3 ovos',
    isComplete: true,
  },
  {
    title: 'Cozinhar + 5 ovos',
    isComplete: false,
  }
]

function App() {
  return (
    <>
      <header>
        <img src="./src/assets/Logo.svg" alt="Logo de foguete" />
      </header>
      <div className={styles.wrapper}>
        <form className={styles.taskForm}>
          <input placeholder='Adicione uma nova tarefa' type="text" />
          <button>Criar <PlusCircle size={20} /></button>
        </form>
    
        <div className={styles.content}>
          <div className={styles.taskCounter}>
            <p>Tarefas Criadas <span>5</span></p>
            <p>Concluídas <span>2 de 5</span></p> 
          </div>

          {/* <div className={styles.noneTask}>
            <img src="./src/assets/Clipboard.svg" alt="Ícone de prancheta" />
            <p><b>Você ainda não tem tarefas cadastradas</b></p>
            <p>Crie Tarefas e organize seus itens a fazer</p>
          </div> */}

          <div className={styles.taskList}>
            <Task />
            <Task />
            <Task />
          </div>
        </div>
      </div>
    </>
  )
}

export default App
