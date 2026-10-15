import React from 'react';
import { CheckSquare, Plus, RefreshCw, Trash2 } from 'lucide-react';

interface HeaderProps {
  onOpenCreateModal: () => void;
  onLoadDemoData: () => void;
  onClearAll: () => void;
  hasTasks: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenCreateModal,
  onLoadDemoData,
  onClearAll,
  hasTasks,
}) => {
  return (
    <header className="header-container">
      <div className="brand">
        <CheckSquare className="brand-icon" aria-hidden="true" />
        <div>
          <h1 className="brand-title">TaskFlow Lite</h1>
          <p className="brand-subtitle">Gestión de tareas sencilla, moderna y eficiente</p>
        </div>
      </div>

      <div className="header-actions">
        <button
          className="btn btn-secondary btn-sm"
          onClick={onLoadDemoData}
          title="Cargar tareas de ejemplo en la aplicación"
        >
          <RefreshCw size={16} aria-hidden="true" />
          <span>Cargar demostración</span>
        </button>

        {hasTasks && (
          <button
            className="btn btn-outline-danger btn-sm"
            onClick={onClearAll}
            title="Borrar todas las tareas existentes"
          >
            <Trash2 size={16} aria-hidden="true" />
            <span>Limpiar todo</span>
          </button>
        )}

        <button
          className="btn btn-primary"
          onClick={onOpenCreateModal}
          aria-label="Crear nueva tarea"
        >
          <Plus size={18} aria-hidden="true" />
          <span>Nueva Tarea</span>
        </button>
      </div>
    </header>
  );
};
