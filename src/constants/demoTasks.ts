import { Task } from '../types/task';
import { getTodayDateString } from '../utils/dateUtils';

/**
 * Calcula fechas relativas en formato YYYY-MM-DD para que las tareas de demostración
 * siempre tengan fechas de vencimiento coherentes (vencidas, de hoy, futuras).
 */
function getOffsetDate(daysOffset: number): string {
  const date = new Date();
  date.setDate(date.getDate() + daysOffset);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export const DEMO_TASKS: Task[] = [
  {
    id: 'demo-1',
    title: 'Diseñar interfaz responsive de TaskFlow Lite',
    description: 'Crear maqueta accesible con CSS moderno y variables para el diseño fluido adaptado a dispositivos móviles.',
    priority: 'alta',
    dueDate: getTodayDateString(),
    completed: false,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'demo-2',
    title: 'Implementar almacenamiento en localStorage',
    description: 'Crear módulos auxiliares y hooks para guardar y cargar las tareas de forma segura sin perder datos.',
    priority: 'alta',
    dueDate: getOffsetDate(-2), // Vencida para demostrar el estado visual de vencimiento
    completed: false,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'demo-3',
    title: 'Escribir suite de pruebas unitarias',
    description: 'Cubrir casos límite, validaciones de formularios y hooks utilizando Vitest y React Testing Library.',
    priority: 'media',
    dueDate: getOffsetDate(3),
    completed: false,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'demo-4',
    title: 'Documentar proyecto en README.md',
    description: 'Incluir requisitos, instrucciones de instalación, decisiones de arquitectura y comandos disponibles.',
    priority: 'baja',
    dueDate: getOffsetDate(7),
    completed: true,
    createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
  },
];
