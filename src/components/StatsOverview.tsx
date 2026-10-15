import React from 'react';
import { TaskStats } from '../types/task';
import { ListTodo, Clock, CheckCircle2, AlertTriangle } from 'lucide-react';

interface StatsOverviewProps {
  stats: TaskStats;
}

export const StatsOverview: React.FC<StatsOverviewProps> = ({ stats }) => {
  return (
    <section className="stats-grid" aria-label="Resumen de estadísticas de tareas">
      <div className="stat-card">
        <div className="stat-icon-wrapper total" aria-hidden="true">
          <ListTodo size={24} />
        </div>
        <div className="stat-info">
          <span className="stat-value">{stats.total}</span>
          <span className="stat-label">Total de Tareas</span>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon-wrapper pending" aria-hidden="true">
          <Clock size={24} />
        </div>
        <div className="stat-info">
          <span className="stat-value">{stats.pending}</span>
          <span className="stat-label">Pendientes</span>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon-wrapper completed" aria-hidden="true">
          <CheckCircle2 size={24} />
        </div>
        <div className="stat-info">
          <span className="stat-value">{stats.completed}</span>
          <span className="stat-label">Completadas</span>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon-wrapper overdue" aria-hidden="true">
          <AlertTriangle size={24} />
        </div>
        <div className="stat-info">
          <span className="stat-value">{stats.overdue}</span>
          <span className="stat-label">Vencidas</span>
        </div>
      </div>
    </section>
  );
};
