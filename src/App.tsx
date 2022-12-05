import './App.module.css'
import './global.css'

import { v4 as uuidv4 } from 'uuid';
import { PlusCircle } from 'phosphor-react';
import { ChangeEvent, InvalidEvent, useEffect, useState } from 'react';

import styles from './App.module.css';
import { Task, TaskType } from './components/Task';

interface AppProps {
  content: string
}

export default function App({content}: AppProps) {
  const [tasks, setTasks] = useState<TaskType[]>(() => {
    const saved = localStorage.getItem('@todo-list:tasks-state-1.0.0') as any;
    const initialValue = JSON.parse(saved);
    return initialValue || [];
  });

  useEffect(() => {
    console.log(tasks)
    const stateJSON = JSON.stringify(tasks)

    localStorage.setItem('@todo-list:tasks-state-1.0.0', stateJSON)
  }, [tasks]);

  const numberOfCompletedTasks = tasks.filter(task => task.isComplete === true).length;

  function handleNewTask(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    
    const updateTask = [
      ...tasks,
      {
        id: uuidv4(),
        title: event.target.task.value,
        isComplete: false
      }
    ];

    event.target.task.value = '';
    
    setTasks(updateTask);
  }
  
  function toggleTask(id: string) {
    const tasksWithToggle = tasks.map(task => {
      if (task.id === id) {
        return {...task, isComplete: !task.isComplete}
      }
      return task;
    })

    setTasks(tasksWithToggle)
  }

  function deleteTask(id: string) {
    const tasksWithoutDeletedOne = tasks.filter(task => {
      return task.id != id;
    })
    setTasks(tasksWithoutDeletedOne);
  }

  function handleNewTaskInvalid(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity('Este campo é obrigatório!');
  }

  return (
    <>
      <header>
        <img src="./src/assets/Logo.svg" alt="Logo de foguete" />
      </header>
      <div className={styles.wrapper}>
        <form className={styles.taskForm} onSubmit={handleNewTask}>
          <input 
            type="text" 
            name="task" 
            value={content} 
            placeholder='Adicione uma nova tarefa' 
            onInvalid={handleNewTaskInvalid} 
            required
          />
          <button>Criar <PlusCircle size={20} /></button>
        </form>
          
        <div className={styles.content}>
          <div className={styles.taskCounter}>
            <p>Tarefas Criadas <span>{tasks.length}</span></p>
            <p>Concluídas <span>{numberOfCompletedTasks} de {tasks.length}</span></p> 
          </div>
          {tasks.length == 0 &&
            <div className={styles.noneTask}>
              <img src="./src/assets/Clipboard.svg" alt="Ícone de prancheta" />
              <p><b>Você ainda não tem tarefas cadastradas</b></p>
              <p>Crie Tarefas e organize seus itens a fazer</p>
            </div> 
          }

          <div className={styles.taskList}>
            {tasks.map(task => {
              return <Task
                key={task.id}
                id={task.id}
                title={task.title}
                isComplete={task.isComplete}
                onToggleTask={toggleTask}
                onDelete={deleteTask}
              />
            })}
          </div>
        </div>
      </div>
    </>
  )
}