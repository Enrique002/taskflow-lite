import React from 'react';
import { TaskPriority, TaskSortOption, TaskStatusFilter } from '../types/task';
import { Search, X } from 'lucide-react';

interface TaskFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: TaskStatusFilter;
  onStatusFilterChange: (status: TaskStatusFilter) => void;
  priorityFilter: TaskPriority | 'todas';
  onPriorityFilterChange: (priority: TaskPriority | 'todas') => void;
  sortOption: TaskSortOption;
  onSortOptionChange: (sort: TaskSortOption) => void;
}

export const TaskFilters: React.FC<TaskFiltersProps> = ({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  priorityFilter,
  onPriorityFilterChange,
  sortOption,
  onSortOptionChange,
}) => {
  return (
    <section className="filters-section" aria-label="Filtros y ordenación de tareas">
      <div className="search-input-wrapper">
        <Search className="search-icon" aria-hidden="true" />
        <input
          type="text"
          className="search-input"
          placeholder="Buscar tareas por título o descripción..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          aria-label="Buscar tareas por título o descripción"
        />
        {searchQuery && (
          <button
            className="clear-search-btn"
            onClick={() => onSearchChange('')}
            title="Limpiar búsqueda"
            aria-label="Limpiar campo de búsqueda"
          >
            <X size={16} />
          </button>
        )}
      </div>

      <div className="filter-controls">
        <div className="filter-group">
          <label htmlFor="status-filter" className="filter-label">
            Estado:
          </label>
          <select
            id="status-filter"
            className="select-input"
            value={statusFilter}
            onChange={(e) => onStatusFilterChange(e.target.value as TaskStatusFilter)}
          >
            <option value="todas">Todas</option>
            <option value="pendientes">Pendientes</option>
            <option value="completadas">Completadas</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="priority-filter" className="filter-label">
            Prioridad:
          </label>
          <select
            id="priority-filter"
            className="select-input"
            value={priorityFilter}
            onChange={(e) =>
              onPriorityFilterChange(e.target.value as TaskPriority | 'todas')
            }
          >
            <option value="todas">Todas las prioridades</option>
            <option value="alta">Alta</option>
            <option value="media">Media</option>
            <option value="baja">Baja</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="sort-option" className="filter-label">
            Ordenar por:
          </label>
          <select
            id="sort-option"
            className="select-input"
            value={sortOption}
            onChange={(e) => onSortOptionChange(e.target.value as TaskSortOption)}
          >
            <option value="createdAt-desc">Más recientes primero</option>
            <option value="createdAt-asc">Más antiguas primero</option>
            <option value="dueDate-asc">Fecha límite (más cercana primero)</option>
            <option value="dueDate-desc">Fecha límite (más lejana primero)</option>
          </select>
        </div>
      </div>
    </section>
  );
};
