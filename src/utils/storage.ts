import { Task } from '../types/task';

const STORAGE_KEY = 'taskflow_lite_tasks';

/**
 * Carga las tareas guardadas en localStorage.
 * Si ocurre un error o no existen datos, devuelve un array vacío.
 */
export function loadTasksFromStorage(): Task[] {
  try {
    const item = localStorage.getItem(STORAGE_KEY);
    if (!item) return [];
    const parsed = JSON.parse(item);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return [];
  } catch (error) {
    console.error('Error al cargar las tareas desde localStorage:', error);
    return [];
  }
}

/**
 * Guarda el listado actual de tareas en localStorage.
 */
export function saveTasksToStorage(tasks: Task[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('Error al guardar las tareas en localStorage:', error);
  }
}

/**
 * Limpia los datos de tareas almacenados en localStorage.
 */
export function clearTasksFromStorage(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error al limpiar localStorage:', error);
  }
}
