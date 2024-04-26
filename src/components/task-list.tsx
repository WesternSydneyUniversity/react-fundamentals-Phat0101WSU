'use client'

import React, { useState } from 'react';
import { TaskItem } from './task-item';
import styles from './task-list.module.css';

export type Task = {
  id: string;
  title: string;
  state: 'PINNED' | 'COMPLETED' | 'ACTIVE';
};

export type setState = React.Dispatch<React.SetStateAction<Task[]>>;

const countActiveTasks = (tasks: Task[]): number => {
  return tasks.filter((task) => task.state === 'ACTIVE').length;
};

export function TaskList({tasks}: {tasks: Task[]}) {
  const [taskObjs, setTasks] = useState(tasks);
  const [newTask, setNewTask] = useState('');

  const handleAddTask = () => {
    const task: Task = {
      id: Math.random().toString(),
      title: newTask,
      state: 'ACTIVE',
    };
    setTasks([...taskObjs, task]);
    setNewTask('');
  };

  const handleTaskStateChange = (id: string, state: Task['state']) => {
    setTasks(taskObjs.map(task => task.id === id ? { ...task, state } : task));
  };

  const handleDeleteTask = (id: string) => {
    setTasks(taskObjs.filter(task => task.id !== id));
  };

  return (
    <>
      <div>
        <section className={styles.counter}>
          <div className={styles.taskLabel}>
          {countActiveTasks(taskObjs) === 1 ? '1 task' : `${countActiveTasks(taskObjs)} tasks`}
            </div>
        </section>
        <section className={styles.section}>
          {taskObjs.map((task) => (
            <TaskItem key={task.id} task={task} onTaskStateChange={handleTaskStateChange} onDeleteTask={handleDeleteTask} />
          ))}
        </section>
      </div>
      <section className={styles.inputContainer}>
        <input
          type="text"
          placeholder="What needs to be done?"
          className={styles.taskInput}
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button className={styles.taskButton} onClick={handleAddTask}>Add Task</button>
      </section>
    </>
  );
}