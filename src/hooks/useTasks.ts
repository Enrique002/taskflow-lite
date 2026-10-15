import { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Task,
  TaskFormData,
  TaskPriority,
  TaskSortOption,
  TaskStats,
  TaskStatusFilter,
} from '../types/task';
import {
  loadTasksFromStorage,
  saveTasksToStorage,
} from '../utils/storage';
import { isTaskOverdue } from '../utils/dateUtils';
import { DEMO_TASKS } from '../constants/demoTasks';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(() => loadTasksFromStorage());
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<TaskStatusFilter>('todas');
  const [priorityFilter, setPriorityFilter] = useState<TaskPriority | 'todas'>('todas');
  const [sortOption, setSortOption] = useState<TaskSortOption>('createdAt-desc');

  // Guardar en localStorage cada vez que la lista de tareas cambia
  useEffect(() => {
    saveTasksToStorage(tasks);
  }, [tasks]);

  // Añadir una nueva tarea
  const addTask = useCallback((formData: TaskFormData) => {
    const newTask: Task = {
      ...formData,
      id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString() + Math.random().toString(36).substring(2, 9),
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTasks((prev) => [newTask, ...prev]);
  }, []);

  // Editar una tarea existente
  const editTask = useCallback((id: string, formData: TaskFormData) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              ...formData,
              updatedAt: new Date().toISOString(),
            }
          : task
      )
    );
  }, []);

  // Eliminar una tarea por ID
  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }, []);

  // Alternar el estado de completado de una tarea
  const toggleTaskComplete = useCallback((id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
              updatedAt: new Date().toISOString(),
            }
          : task
      )
    );
  }, []);

  // Cargar conjunto de tareas de demostración
  const loadDemoData = useCallback(() => {
    setTasks(DEMO_TASKS);
  }, []);

  // Eliminar todas las tareas
  const clearAllTasks = useCallback(() => {
    setTasks([]);
  }, []);

  // Cálculo de estadísticas
  const stats: TaskStats = useMemo(() => {
    const total = tasks.length;
    let pending = 0;
    let completed = 0;
    let overdue = 0;

    tasks.forEach((task) => {
      if (task.completed) {
        completed += 1;
      } else {
        pending += 1;
        if (isTaskOverdue(task.dueDate, task.completed)) {
          overdue += 1;
        }
      }
    });

    return { total, pending, completed, overdue };
  }, [tasks]);

  // Lista filtrada y ordenada
  const filteredTasks = useMemo(() => {
    return tasks
      .filter((task) => {
        // Filtro por Estado
        if (statusFilter === 'pendientes' && task.completed) return false;
        if (statusFilter === 'completadas' && !task.completed) return false;

        // Filtro por Prioridad
        if (priorityFilter !== 'todas' && task.priority !== priorityFilter) {
          return false;
        }

        // Búsqueda por texto (Título o Descripción)
        if (searchQuery.trim() !== '') {
          const query = searchQuery.toLowerCase().trim();
          const matchesTitle = task.title.toLowerCase().includes(query);
          const matchesDescription = task.description.toLowerCase().includes(query);
          if (!matchesTitle && !matchesDescription) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortOption === 'createdAt-desc') {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
        if (sortOption === 'createdAt-asc') {
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        }
        if (sortOption === 'dueDate-asc') {
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return a.dueDate.localeCompare(b.dueDate);
        }
        if (sortOption === 'dueDate-desc') {
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return b.dueDate.localeCompare(a.dueDate);
        }
        return 0;
      });
  }, [tasks, statusFilter, priorityFilter, searchQuery, sortOption]);

  return {
    tasks,
    filteredTasks,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
    sortOption,
    setSortOption,
    stats,
    addTask,
    editTask,
    deleteTask,
    toggleTaskComplete,
    loadDemoData,
    clearAllTasks,
  };
}
