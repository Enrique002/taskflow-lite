/**
 * Niveles de prioridad para las tareas. 
 */
export type TaskPriority = 'baja' | 'media' | 'alta';

/**
 * Estados de filtrado por completado.
 */
export type TaskStatusFilter = 'todas' | 'pendientes' | 'completadas';

/**
 * Criterios de ordenación.
 */
export type TaskSortOption = 'createdAt-desc' | 'createdAt-asc' | 'dueDate-asc' | 'dueDate-desc';

/**
 * Estructura de una Tarea en TaskFlow Lite.
 */
export interface Task {
  id: string;
  title: string;
  description: string;
  priority: TaskPriority;
  dueDate: string; // Formato YYYY-MM-DD
  completed: boolean;
  createdAt: string; // Formato ISO 8601 string
  updatedAt?: string;
}

/**
 * Datos necesarios para crear o editar una tarea (omitimos campos auto-generados).
 */
export type TaskFormData = Omit<Task, 'id' | 'completed' | 'createdAt' | 'updatedAt'>;

/**
 * Estadísticas de las tareas.
 */
export interface TaskStats {
  total: number;
  pending: number;
  completed: number;
  overdue: number;
}
