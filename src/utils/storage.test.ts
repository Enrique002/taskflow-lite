import { describe, it, expect, beforeEach } from 'vitest';
import {
  loadTasksFromStorage,
  saveTasksToStorage,
  clearTasksFromStorage,
} from './storage';
import { Task } from '../types/task';

describe('storage utility', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('debe devolver un array vacío si localStorage no contiene datos', () => {
    const tasks = loadTasksFromStorage();
    expect(tasks).toEqual([]);
  });

  it('debe guardar y cargar las tareas correctamente', () => {
    const mockTasks: Task[] = [
      {
        id: '1',
        title: 'Tarea 1',
        description: 'Desc 1',
        priority: 'alta',
        dueDate: '2025-05-01',
        completed: false,
        createdAt: '2025-01-01T00:00:00.000Z',
      },
    ];

    saveTasksToStorage(mockTasks);
    const loaded = loadTasksFromStorage();
    expect(loaded).toEqual(mockTasks);
  });

  it('debe limpiar localStorage cuando se invoca clearTasksFromStorage', () => {
    const mockTasks: Task[] = [
      {
        id: '1',
        title: 'Tarea 1',
        description: '',
        priority: 'baja',
        dueDate: '2025-05-01',
        completed: false,
        createdAt: '2025-01-01T00:00:00.000Z',
      },
    ];

    saveTasksToStorage(mockTasks);
    clearTasksFromStorage();
    const loaded = loadTasksFromStorage();
    expect(loaded).toEqual([]);
  });
});
