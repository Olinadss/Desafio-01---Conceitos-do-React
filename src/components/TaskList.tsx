import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    if (!newTaskTitle) {
      return alert("Você precisa colocar um título para sua task")
    }
    const id = Math.floor(Math.random() * 100)
    const createNewTaskTitle = {
      id,
      title: newTaskTitle,
      isComplete: false,
    };
    const createNewTask = [...tasks, createNewTaskTitle]

    setTasks(createNewTask);
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    const filterTask = tasks.findIndex((task) => task.id === id);
    const listTasks = [...tasks];

    listTasks[filterTask].isComplete = !listTasks[filterTask].isComplete;
    
    setTasks(listTasks)          
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    const filterTask = tasks.findIndex((task) => task.id === id);
    const listTasks = [...tasks];

    listTasks.splice(filterTask, 1)
    
    setTasks(listTasks)
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}