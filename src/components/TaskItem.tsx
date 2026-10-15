import React from 'react';
import { Task } from '../types/task';
import { formatDateToSpanish, isTaskOverdue } from '../utils/dateUtils';
import { Calendar, Edit3, Trash2, AlertCircle } from 'lucide-react';

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onEdit: (task: Task) => void;
  onDeleteRequest: (task: Task) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggleComplete,
  onEdit,
  onDeleteRequest,
}) => {
  const overdue = isTaskOverdue(task.dueDate, task.completed);

  return (
    <article className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-checkbox-wrapper">
        <input
          type="checkbox"
          className="task-checkbox"
          checked={task.completed}
          onChange={() => onToggleComplete(task.id)}
          aria-label={`Marcar tarea "${task.title}" como ${
            task.completed ? 'pendiente' : 'completada'
          }`}
        />
      </div>

      <div className="task-content">
        <div className="task-header">
          <h3 className="task-title">{task.title}</h3>
          <span className={`badge badge-priority-${task.priority}`}>
            {task.priority}
          </span>
        </div>

        {task.description && (
          <p className="task-description">{task.description}</p>
        )}

        <div className="task-footer">
          {task.dueDate && (
            <span className={`task-date ${overdue ? 'overdue' : ''}`}>
              {overdue ? <AlertCircle size={14} /> : <Calendar size={14} />}
              <span>
                {overdue ? 'Vencida: ' : 'Fecha límite: '}
                {formatDateToSpanish(task.dueDate)}
              </span>
            </span>
          )}
        </div>
      </div>

      <div className="task-actions">
        <button
          className="btn-icon-only"
          onClick={() => onEdit(task)}
          title="Editar tarea"
          aria-label={`Editar tarea "${task.title}"`}
        >
          <Edit3 size={18} />
        </button>
        <button
          className="btn-icon-only"
          onClick={() => onDeleteRequest(task)}
          title="Eliminar tarea"
          aria-label={`Eliminar tarea "${task.title}"`}
        >
          <Trash2 size={18} />
        </button>
      </div>
    </article>
  );
};
