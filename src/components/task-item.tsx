import type { Task } from "./task-list";

import styles from "./task-item.module.css";
import { TaskState } from "vitest";

export function TaskItem({ task, onTaskStateChange, onDeleteTask }: {
  task: Task,
  onTaskStateChange: (id: string, state: Task['state']) => void,
  onDeleteTask: (id: string) => void
}) {
  const handleCheckboxTaskChange = () => {
    onTaskStateChange(task.id, task.state === "COMPLETED" ? "ACTIVE" : "COMPLETED");
  }
  const handleDeleteButtonClick = () => {
    onDeleteTask(task.id);
  }
  return (
    <div className={styles.container}>
      <div className={styles.checkbox}>
        <div className={styles.round}>
          <input
            type="checkbox"
            id={`task-${task.id}`}
            data-testid={`task-${task.id}`}
            checked={task.state === "COMPLETED"}
            onChange={handleCheckboxTaskChange}
          />
          <label htmlFor={`task-${task.id}`}></label>
        </div>
      </div>
      <span className={task.state === "COMPLETED" ? styles.titleCompleted : styles.title}>{task.title}</span>
      <div className={styles.actions}>
        <button
          data-testid={`delete-${task.id}`}
          className={styles.deleteButton}
          onClick={handleDeleteButtonClick}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
