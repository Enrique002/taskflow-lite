import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useTasks } from './useTasks';

describe('useTasks Hook', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('debe inicializarse con un array vacío si no hay datos almacenados', () => {
    const { result } = renderHook(() => useTasks());
    expect(result.current.tasks).toEqual([]);
    expect(result.current.stats.total).toBe(0);
  });

  it('debe permitir añadir una nueva tarea', () => {
    const { result } = renderHook(() => useTasks());

    act(() => {
      result.current.addTask({
        title: 'Nueva Tarea de Prueba',
        description: 'Descripción de prueba',
        priority: 'alta',
        dueDate: '2025-12-31',
      });
    });

    expect(result.current.tasks.length).toBe(1);
    expect(result.current.tasks[0].title).toBe('Nueva Tarea de Prueba');
    expect(result.current.tasks[0].completed).toBe(false);
    expect(result.current.stats.total).toBe(1);
    expect(result.current.stats.pending).toBe(1);
  });

  it('debe alternar el estado de completado de una tarea', () => {
    const { result } = renderHook(() => useTasks());

    act(() => {
      result.current.addTask({
        title: 'Tarea para completar',
        description: '',
        priority: 'media',
        dueDate: '2025-12-31',
      });
    });

    const taskId = result.current.tasks[0].id;

    act(() => {
      result.current.toggleTaskComplete(taskId);
    });

    expect(result.current.tasks[0].completed).toBe(true);
    expect(result.current.stats.completed).toBe(1);
    expect(result.current.stats.pending).toBe(0);

    act(() => {
      result.current.toggleTaskComplete(taskId);
    });

    expect(result.current.tasks[0].completed).toBe(false);
  });

  it('debe permitir editar una tarea existente', () => {
    const { result } = renderHook(() => useTasks());

    act(() => {
      result.current.addTask({
        title: 'Título Original',
        description: 'Descripción original',
        priority: 'baja',
        dueDate: '2025-12-31',
      });
    });

    const taskId = result.current.tasks[0].id;

    act(() => {
      result.current.editTask(taskId, {
        title: 'Título Editado',
        description: 'Descripción editada',
        priority: 'alta',
        dueDate: '2025-10-10',
      });
    });

    expect(result.current.tasks[0].title).toBe('Título Editado');
    expect(result.current.tasks[0].priority).toBe('alta');
  });

  it('debe permitir eliminar una tarea', () => {
    const { result } = renderHook(() => useTasks());

    act(() => {
      result.current.addTask({
        title: 'Tarea a eliminar',
        description: '',
        priority: 'baja',
        dueDate: '2025-12-31',
      });
    });

    expect(result.current.tasks.length).toBe(1);
    const taskId = result.current.tasks[0].id;

    act(() => {
      result.current.deleteTask(taskId);
    });

    expect(result.current.tasks.length).toBe(0);
  });

  it('debe filtrar correctamente por texto de búsqueda', () => {
    const { result } = renderHook(() => useTasks());

    act(() => {
      result.current.addTask({
        title: 'Comprar leche',
        description: 'En el supermercado',
        priority: 'baja',
        dueDate: '2025-12-31',
      });
      result.current.addTask({
        title: 'Estudiar TypeScript',
        description: 'Aprender tipos avanzados',
        priority: 'alta',
        dueDate: '2025-12-31',
      });
    });

    act(() => {
      result.current.setSearchQuery('leche');
    });

    expect(result.current.filteredTasks.length).toBe(1);
    expect(result.current.filteredTasks[0].title).toBe('Comprar leche');

    act(() => {
      result.current.setSearchQuery('avanzados');
    });

    expect(result.current.filteredTasks.length).toBe(1);
    expect(result.current.filteredTasks[0].title).toBe('Estudiar TypeScript');
  });

  it('debe cargar datos de demostración al invocar loadDemoData', () => {
    const { result } = renderHook(() => useTasks());

    act(() => {
      result.current.loadDemoData();
    });

    expect(result.current.tasks.length).toBeGreaterThan(0);
    expect(result.current.stats.total).toBe(4);
  });
});
