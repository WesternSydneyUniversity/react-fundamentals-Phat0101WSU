"use client";

import { TaskItem } from "./task-item";
import styles from "./task-list.module.css";

export type Task = {
  id: string;
  title: string;
  state: "PINNED" | "COMPLETED" | "ACTIVE";
};

const countActiveTasks = (tasks: Task[]): number => {
  return tasks.filter((task) => task.state === "ACTIVE").length;
}
export function TaskList({ tasks, onTaskStateChange, onNewTaskChange, onAddTask, newTask, onDeleteTask }: {
  tasks: Task[],
  onTaskStateChange: (id: string, state: Task['state']) => void,
  onNewTaskChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  onAddTask: () => void, 
  newTask: string,
  onDeleteTask: (id: string) => void
}) {
  const activeTasksCount = countActiveTasks(tasks);
  return (
    <>
      <div>
        <section className={styles.counter}>
          <div className={styles.taskLabel}>{activeTasksCount} active tasks</div>
        </section>
        <section className={styles.section}>
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} onTaskStateChange={onTaskStateChange} onDeleteTask={onDeleteTask}/>
          ))}
        </section>
      </div>
      <section className={styles.inputContainer}>
        <input
          type="text"
          placeholder="What needs to be done?"
          className={styles.taskInput}
          value={newTask}
          onChange={onNewTaskChange}
        />
        <button className={styles.taskButton} onClick={onAddTask}>Add Task</button>
      </section>
    </>
  );
}
