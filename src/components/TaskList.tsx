import React from 'react';
import { Task } from '../types/task';
import { TaskItem } from './TaskItem';
import { Inbox, SearchX } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  hasAnyTask: boolean;
  searchQuery: string;
  onToggleComplete: (id: string) => void;
  onEdit: (task: Task) => void;
  onDeleteRequest: (task: Task) => void;
  onLoadDemoData: () => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  hasAnyTask,
  searchQuery,
  onToggleComplete,
  onEdit,
  onDeleteRequest,
  onLoadDemoData,
}) => {
  // Estado 1: No hay tareas creadas en absoluto
  if (!hasAnyTask) {
    return (
      <div className="empty-state">
        <Inbox className="empty-state-icon" aria-hidden="true" />
        <h2 className="empty-state-title">No hay tareas creadas</h2>
        <p className="empty-state-text">
          Comienza creando tu primera tarea con el botón "Nueva Tarea" o carga datos de demostración para explorar la aplicación.
        </p>
        <button className="btn btn-secondary" onClick={onLoadDemoData}>
          Cargar tareas de ejemplo
        </button>
      </div>
    );
  }

  // Estado 2: Hay tareas, pero los filtros o búsqueda no arrojaron resultados
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <SearchX className="empty-state-icon" aria-hidden="true" />
        <h2 className="empty-state-title">No se encontraron tareas</h2>
        <p className="empty-state-text">
          {searchQuery
            ? `No hay coincidencias para "${searchQuery}". Intenta buscar con otro término o borra el filtro.`
            : 'No hay tareas que coincidan con los filtros seleccionados.'}
        </p>
      </div>
    );
  }

  return (
    <section className="task-list" aria-label="Lista de tareas">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onEdit={onEdit}
          onDeleteRequest={onDeleteRequest}
        />
      ))}
    </section>
  );
};
