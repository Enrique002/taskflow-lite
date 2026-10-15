# TaskFlow Lite 📝

**TaskFlow Lite** es una aplicación web moderna, ágil y totalmente responsive para la gestión eficiente de tareas personales y profesionales. Desarrollada como proyecto de demostración para el portfolio de Desarrollo de Aplicaciones Web (DAW), destaca por una arquitectura limpia, tipado estricto con TypeScript, persistencia local y una excelente experiencia de usuario (UX/UI).

---

## Características Principales

- **Gestión Completa de Tareas (CRUD):**
  - Creación de tareas con título, descripción, prioridad y fecha límite.
  - Edición flexible de campos existentes.
  - Marcado rápido de estado (Pendiente / Completada).
  - Eliminación con confirmación modal accesible para evitar borrados accidentales.
- **Filtrado Avanzado y Búsqueda en Tiempo Real:**
  - Búsqueda dinámicamente filtrada por título o descripción.
  - Filtrado por estado (*Todas*, *Pendientes*, *Completadas*).
  - Filtrado por prioridad (*Todas*, *Alta*, *Media*, *Baja*).
- **Ordenación Personalizada:**
  - Orden por fecha de creación (más recientes o más antiguas primero).
  - Orden por fecha límite de entrega (más cercana o más lejana).
- **Métricas y Estadísticas en Vivo:**
  - Panel visual de resumen con conteo total, tareas pendientes, completadas y tareas vencidas.
- **Persistencia Automática:**
  - Guardado en `localStorage` del navegador para conservar datos entre sesiones.
- **Datos de Demostración (Demo Data):**
  - Acción explícita para cargar un conjunto inicial de tareas de prueba sin sobreescribir datos automáticamente sin consentimiento del usuario.
- **Diseño Moderno & Accesible:**
  - Interfaz adaptable (móviles, tabletas y escritorio) construida con CSS moderno (sin frameworks visuales pesados).
  - Distinción clara de prioridades e identificador de tareas vencidas.
  - Navegación e interacciones mediante teclado y etiquetas accesibles (A11y).

---

## Tecnologías Utilizadas

- **React 18** — Librería para construcción de interfaces de usuario.
- **TypeScript (Modo Estricto)** — Tipado estricto para mayor seguridad en el código y mantenibilidad.
- **Vite** — Tooling y empaquetador ultrarrápido de desarrollo.
- **CSS Moderno** — Variables CSS, Flexbox, CSS Grid y animaciones suaves.
- **Lucide React** — Conjunto de iconos vectoriales coherentes y ligeros.
- **Vitest & React Testing Library** — Suite de pruebas unitarias e integración con simulación de DOM jsdom.

---

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado en tu sistema:

- **Node.js**: Versión 18.0.0 o superior.
- **npm**: Versión 9.0.0 o superior (incluido habitualmente con Node.js).

---

## Instalación y Configuración

Sigue estos pasos para ejecutar el proyecto de forma local:

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/tu-usuario/taskflow-lite.git
   cd taskflow-lite
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   Abre [http://localhost:5173](http://localhost:5173) en tu navegador para ver la aplicación.

---

## Comandos Disponibles

| Comando | Descripción |
| :--- | :--- |
| `npm run dev` | Inicia el servidor de desarrollo Vite. |
| `npm run build` | Comprueba tipos con `tsc` y genera el bundle optimizado para producción en `dist/`. |
| `npm run preview` | Previsualiza localmente la versión de producción generada. |
| `npm run test` | Ejecuta la suite de pruebas unitarias e integración con Vitest. |
| `npm run test:watch` | Ejecuta las pruebas en modo observador (watch mode). |

---

## Estructura del Proyecto

```text
taskflow-lite/
├── public/
│   └── favicon.svg           # Icono de la aplicación
├── src/
│   ├── components/           # Componentes modulares de UI
│   │   ├── ConfirmModal.tsx  # Modal genérico de confirmación
│   │   ├── Header.tsx        # Encabezado principal y acciones de la app
│   │   ├── StatsOverview.tsx # Tarjetas de estadísticas en vivo
│   │   ├── TaskFilters.tsx   # Barra de búsqueda, filtros y ordenación
│   │   ├── TaskFormModal.tsx # Formulario accesible para crear/editar
│   │   ├── TaskItem.tsx      # Tarjeta individual de tarea
│   │   └── TaskList.tsx      # Renderizado de lista y estados vacíos
│   ├── constants/
│   │   └── demoTasks.ts      # Datos iniciales para la opción de demostración
│   ├── hooks/
│   │   ├── useTasks.ts       # Hook personalizado para lógica de negocio y estado
│   │   └── useTasks.test.ts  # Pruebas unitarias para useTasks
│   ├── types/
│   │   └── task.ts           # Definiciones de tipos e interfaces TypeScript
│   ├── utils/
│   │   ├── dateUtils.ts      # Formateo de fechas en español y cálculo de vencimiento
│   │   ├── storage.ts        # Métodos para abstraer el uso de localStorage
│   │   └── storage.test.ts   # Pruebas para la utilidad de almacenamiento
│   ├── App.tsx               # Componente principal de la aplicación
│   ├── App.test.tsx          # Pruebas de integración de la aplicación
│   ├── index.css             # Estilos globales y variables CSS
│   ├── main.tsx              # Punto de entrada React DOM
│   └── setupTests.ts         # Configuración global para React Testing Library
├── index.html                # Documento HTML base
├── package.json              # Configuración de dependencias y scripts
├── tsconfig.json             # Configuración del compilador de TypeScript
├── vite.config.ts            # Configuración de Vite y Vitest
└── README.md                 # Documentación del proyecto
```

---

## Decisiones Técnicas Relevantes

1. **Desacoplamiento de Lógica y Presentación:**
   Toda la lógica de gestión de estado, cálculo de métricas, filtrado, búsqueda y ordenación está encapsulada dentro del hook personalizado `useTasks`. Esto facilita la reutilización y permite probar la lógica de negocio de forma aislada.

2. **CSS Moderno sin Frameworks Adicionales:**
   Se prefirió construir una hoja de estilos limpia basada en variables CSS (`:root`) en lugar de incluir librerías pesadas (Tailwind, Bootstrap). Esto demuestra dominio de sintaxis CSS nativa (Grid, Flexbox, transiciones y modo responsive).

3. **Manejo Consistente de Fechas en Español:**
   Las fechas son procesadas para evitar desfases por zona horaria UTC/local mediante formateo nativo con `Intl.DateTimeFormat('es-ES')`.

4. **Confirmación en Operaciones Destructivas:**
   Tanto el borrado individual como la eliminación total de tareas cuentan con un diálogo modal de confirmación, cumpliendo con buenas prácticas de accesibilidad y experiencia de usuario.

---

## Posibles Mejoras Futuras

- [ ] Soporte para etiquetas o categorías de tareas (Ej. Trabajo, Personal, Estudio).
- [ ] Implementación de Modo Oscuro (Dark Mode).
- [ ] Exportación e importación de datos en formato JSON.
- [ ] Drag and drop para reordenar tareas manualmente.

---

## Licencia

Este proyecto está bajo la Licencia MIT. Libre para fines educativos y de desarrollo personal.
