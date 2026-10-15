import { useState } from 'react';
import { useTasks } from './hooks/useTasks';
import { Header } from './components/Header';
import { StatsOverview } from './components/StatsOverview';
import { TaskFilters } from './components/TaskFilters';
import { TaskList } from './components/TaskList';
import { TaskFormModal } from './components/TaskFormModal';
import { ConfirmModal } from './components/ConfirmModal';
import { Task, TaskFormData } from './types/task';

export function App() {
  const {
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
  } = useTasks();

  // Estados para modales
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  const [isClearAllModalOpen, setIsClearAllModalOpen] = useState(false);

  // Manejadores de acciones
  const handleOpenCreateModal = () => {
    setTaskToEdit(null);
    setIsFormModalOpen(true);
  };

  const handleOpenEditModal = (task: Task) => {
    setTaskToEdit(task);
    setIsFormModalOpen(true);
  };

  const handleFormSubmit = (formData: TaskFormData) => {
    if (taskToEdit) {
      editTask(taskToEdit.id, formData);
    } else {
      addTask(formData);
    }
  };

  const handleRequestDeleteTask = (task: Task) => {
    setTaskToDelete(task);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDeleteTask = () => {
    if (taskToDelete) {
      deleteTask(taskToDelete.id);
      setTaskToDelete(null);
    }
    setIsDeleteModalOpen(false);
  };

  const handleConfirmClearAll = () => {
    clearAllTasks();
    setIsClearAllModalOpen(false);
  };

  return (
    <div className="app-container">
      <Header
        onOpenCreateModal={handleOpenCreateModal}
        onLoadDemoData={loadDemoData}
        onClearAll={() => setIsClearAllModalOpen(true)}
        hasTasks={tasks.length > 0}
      />

      <StatsOverview stats={stats} />

      <TaskFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        priorityFilter={priorityFilter}
        onPriorityFilterChange={setPriorityFilter}
        sortOption={sortOption}
        onSortOptionChange={setSortOption}
      />

      <main>
        <TaskList
          tasks={filteredTasks}
          hasAnyTask={tasks.length > 0}
          searchQuery={searchQuery}
          onToggleComplete={toggleTaskComplete}
          onEdit={handleOpenEditModal}
          onDeleteRequest={handleRequestDeleteTask}
          onLoadDemoData={loadDemoData}
        />
      </main>

      {/* Modal para Crear y Editar Tarea */}
      <TaskFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSubmit={handleFormSubmit}
        taskToEdit={taskToEdit}
      />

      {/* Modal para Confirmar Eliminación de Tarea */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title="Eliminar tarea"
        message={
          taskToDelete
            ? `¿Estás seguro de que deseas eliminar la tarea "${taskToDelete.title}"? Esta acción no se puede deshacer.`
            : '¿Deseas eliminar esta tarea?'
        }
        confirmLabel="Eliminar"
        cancelLabel="Cancelar"
        onConfirm={handleConfirmDeleteTask}
        onCancel={() => {
          setIsDeleteModalOpen(false);
          setTaskToDelete(null);
        }}
      />

      {/* Modal para Confirmar Limpieza Total */}
      <ConfirmModal
        isOpen={isClearAllModalOpen}
        title="Limpiar todas las tareas"
        message="¿Estás seguro de que deseas eliminar absolutamente todas las tareas? Se borrarán de forma permanente."
        confirmLabel="Borrar todo"
        cancelLabel="Cancelar"
        onConfirm={handleConfirmClearAll}
        onCancel={() => setIsClearAllModalOpen(false)}
      />
    </div>
  );
}

export default App;
