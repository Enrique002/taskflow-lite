/**
 * Formatea una cadena de fecha YYYY-MM-DD o ISO a un formato legible en español.
 * Ejemplo: "2025-05-10" -> "10 de mayo de 2025"
 */
export function formatDateToSpanish(dateString: string): string {
  if (!dateString) return 'Sin fecha';

  try {
    // Si la cadena es formato YYYY-MM-DD, descomponemos para evitar desfases de zona horaria
    const parts = dateString.split('-');
    if (parts.length === 3) {
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      const date = new Date(year, month, day);
      return new Intl.DateTimeFormat('es-ES', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }).format(date);
    }

    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Fecha inválida';
    return new Intl.DateTimeFormat('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).format(date);
  } catch {
    return dateString;
  }
}

/**
 * Obtiene la fecha de hoy en formato YYYY-MM-DD para inicializar inputs de tipo date.
 */
export function getTodayDateString(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Determina si una tarea está vencida (su fecha límite es estrictamente anterior a hoy y no está completada).
 */
export function isTaskOverdue(dueDateString: string, completed: boolean): boolean {
  if (completed || !dueDateString) return false;

  const todayStr = getTodayDateString();
  return dueDateString < todayStr;
}
