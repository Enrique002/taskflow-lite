import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('TaskFlow Lite App Integration', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('debe mostrar el estado vacío inicial cuando no hay tareas', () => {
    render(<App />);
    expect(screen.getByText(/No hay tareas creadas/i)).toBeInTheDocument();
  });

  it('debe cargar datos de demostración al hacer clic en "Cargar demostración"', () => {
    render(<App />);
    const demoButton = screen.getByRole('button', { name: /Cargar demostración/i });
    fireEvent.click(demoButton);

    expect(screen.getByText('Diseñar interfaz responsive de TaskFlow Lite')).toBeInTheDocument();
    expect(screen.getByText('Implementar almacenamiento en localStorage')).toBeInTheDocument();
  });

  it('debe abrir el modal, validar título vacío y crear una tarea nueva', () => {
    render(<App />);
    const newBtn = screen.getByRole('button', { name: /Nueva Tarea/i });
    fireEvent.click(newBtn);

    expect(screen.getByRole('dialog')).toBeInTheDocument();

    // Intentar enviar sin título
    const submitBtn = screen.getByRole('button', { name: /Crear Tarea/i });
    fireEvent.click(submitBtn);
    expect(screen.getByText(/El título de la tarea es obligatorio/i)).toBeInTheDocument();

    // Escribir título y enviar
    const titleInput = screen.getByPlaceholderText(/Ej. Revisar propuesta de diseño/i);
    fireEvent.change(titleInput, { target: { value: 'Aprender Vitest y RTL' } });
    fireEvent.click(submitBtn);

    expect(screen.getByText('Aprender Vitest y RTL')).toBeInTheDocument();
  });
});
