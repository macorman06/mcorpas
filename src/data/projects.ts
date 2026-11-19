import { Project } from '../types/project.types';

/**
 * Order here is the display order.
 * Personal projects marked `aiAssisted` were built largely with AI coding tools:
 * their texts describe the product, the decisions and the results, not internals.
 */
export const projects: Project[] = [
  {
    id: 'tfg',
    title: 'TFG — Generación de rotaciones sostenibles para aeronaves',
    kind: 'engineering',
    year: '2025/2026',
    status: { es: 'Terminado · 9,5', en: 'Completed · 9.5/10' },
    summary: {
      es: 'Modelo de optimización que asigna cada vuelo a un avión concreto y construye sus rotaciones, priorizando los aviones que menos consumen.',
      en: 'Optimization model that assigns each flight to a specific aircraft and builds its rotations, favouring the most fuel-efficient tails.',
    },
    facts: [
      {
        es: 'Integra Aircraft Routing y Tail Assignment en una sola formulación MILP, resuelta con Gurobi.',
        en: 'Integrates Aircraft Routing and Tail Assignment in a single MILP formulation, solved with Gurobi.',
      },
      {
        es: 'Validado con datos operativos reales y anonimizados de una aerolínea europea de bajo coste: hasta 667 vuelos y 125 aviones.',
        en: 'Validated with anonymized real operational data from a European low-cost airline: up to 667 flights and 125 aircraft.',
      },
      {
        es: 'Cuatro casos de estudio, resueltos en entre 19 y 357 segundos según la configuración.',
        en: 'Four case studies, solved in 19 to 357 seconds depending on configuration.',
      },
      {
        es: 'Grado en Ingeniería Aeroespacial en Aeronavegación, URJC, curso 2025/2026. Calificación: 9,5.',
        en: 'BSc Aerospace Engineering (Air Navigation), URJC, academic year 2025/2026. Grade: 9.5/10.',
      },
    ],
    role: {
      es: 'Autor: formulación del modelo, implementación en Python, casos de estudio y memoria.',
      en: 'Author: model formulation, Python implementation, case studies and thesis.',
    },
    stack: ['Python', 'Gurobi', 'MILP', 'LaTeX'],
    links: { pdf: '/projects/tfg/Generacion_rotaciones_sostenibles_aeronaves_Marcos_Corpas.pdf' },
  },
  {
    id: 'heres',
    title: 'HERES',
    kind: 'personal',
    status: { es: 'En producción', en: 'In production' },
    summary: {
      es: 'Plataforma web y móvil del centro juvenil salesiano de Parla: actividades, materiales, encuestas, anuncios, chat y tesorería.',
      en: 'Web and mobile platform for the Salesian youth centre in Parla: activities, materials, surveys, announcements, chat and treasury.',
    },
    facts: [
      {
        es: 'Nace de mi voluntariado como monitor: una herramienta propia para que los grupos se organicen.',
        en: 'Born from my volunteering as a youth leader: a tool of our own for the groups to organise themselves.',
      },
      {
        es: 'La usan monitores y grupos reales; gestiona roles y permisos por usuario.',
        en: 'Used by real leaders and groups, with per-user roles and permissions.',
      },
    ],
    role: {
      es: 'Idea, definición de funcionalidades, pruebas con los grupos y puesta en producción. Código desarrollado con asistencia de IA.',
      en: 'Idea, feature definition, testing with the groups and production rollout. Code written with AI assistance.',
    },
    aiAssisted: true,
    stack: ['FastAPI', 'PostgreSQL', 'Angular', 'Capacitor'],
  },
  {
    id: 'atlas',
    title: 'Atlas',
    kind: 'personal',
    status: { es: 'En uso · en desarrollo', en: 'In daily use · ongoing' },
    summary: {
      es: 'Asistente personal por Telegram que guarda mis proyectos, tareas, notas e ideas, y resume los enlaces que le envío.',
      en: 'Personal assistant on Telegram that keeps my projects, tasks, notes and ideas, and digests the links I send it.',
    },
    facts: [
      {
        es: 'Autoalojado: recibe en una Raspberry Pi y procesa con IA local en mi PC. Nada sale a servicios externos.',
        en: 'Self-hosted: a Raspberry Pi receives, my PC processes with a local model. Nothing goes to external services.',
      },
      {
        es: 'El modelo solo propone acciones; los permisos y los efectos los decide un backend determinista.',
        en: 'The model only proposes actions; permissions and side effects are decided by a deterministic backend.',
      },
      {
        es: 'Probé una interfaz de voz y la aparqué: la síntesis no sonaba natural.',
        en: 'I tried a voice interface and shelved it: the synthesis did not sound natural.',
      },
    ],
    role: {
      es: 'Producto, decisiones de arquitectura y privacidad, despliegue y uso diario. Código desarrollado con asistencia de IA.',
      en: 'Product, architecture and privacy decisions, deployment and daily use. Code written with AI assistance.',
    },
    aiAssisted: true,
    stack: ['Python', 'PostgreSQL', 'Ollama', 'Telegram', 'Raspberry Pi'],
  },
  {
    id: 'catan',
    title: 'Catán IA',
    kind: 'personal',
    status: { es: 'En pausa', en: 'Paused' },
    summary: {
      es: 'Laboratorio para entrenar y evaluar agentes que juegan a Catán a cuatro jugadores, con negociación de recursos.',
      en: 'Lab to train and evaluate agents that play four-player Catan, including resource trading.',
    },
    facts: [
      {
        es: 'Motor de reglas, bots de referencia, visor de partidas y juego humano en local.',
        en: 'Rules engine, baseline bots, game viewer and local human play.',
      },
      {
        es: 'Experimentos con una red neuronal evaluados contra criterios fijados de antemano; proyecto en pausa.',
        en: 'Neural-network experiments judged against criteria set in advance; project on hold.',
      },
    ],
    role: {
      es: 'Diseño de los experimentos y de los criterios de evaluación. Implementación con asistencia de IA.',
      en: 'Experiment and evaluation design. Implementation with AI assistance.',
    },
    aiAssisted: true,
    stack: ['Python', 'Machine learning'],
  },
  {
    id: 'fueltrip',
    title: 'Fuel Trip Optimizer',
    kind: 'personal',
    status: { es: 'Prototipo', en: 'Prototype' },
    summary: {
      es: 'Prototipo que compara paradas de repostaje en una ruta en coche, con precios oficiales de gasolineras y la ruta de Google Directions.',
      en: 'Prototype that compares refuelling stops on a car route, using official fuel-station prices and the Google Directions route.',
    },
    facts: [
      {
        es: 'API en Python/FastAPI; selecciona gasolineras en el corredor de la ruta y las agrupa en clusters.',
        en: 'Python/FastAPI API; picks stations along the route corridor and groups them into clusters.',
      },
      {
        es: 'Exporta resultados a CSV y mapas Folium. Aún sin pruebas automáticas.',
        en: 'Exports results to CSV and Folium maps. No automated tests yet.',
      },
      {
        es: 'Ampliación prevista (no implementada): incluir la carga de vehículo eléctrico.',
        en: 'Planned extension (not implemented): add electric-vehicle charging.',
      },
    ],
    role: {
      es: 'Idea y planteamiento del problema. Código con asistencia de IA.',
      en: 'Idea and problem framing. Code written with AI assistance.',
    },
    aiAssisted: true,
    stack: ['Python', 'FastAPI', 'Google Directions', 'Folium'],
  },
  {
    id: 'bicimad',
    title: 'BiciMad',
    kind: 'personal',
    status: { es: 'Solo idea', en: 'Idea only' },
    summary: {
      es: 'Idea de herramienta para sacar más partido a las bicis públicas de Madrid. Todavía no hay implementación.',
      en: "Idea for a tool to get more out of Madrid's public bikes. Nothing is implemented yet.",
    },
    facts: [
      {
        es: 'Sin código ni prototipo: está aquí para ser transparente sobre qué es idea y qué es trabajo hecho.',
        en: 'No code or prototype: listed here to be clear about what is an idea and what is finished work.',
      },
    ],
    role: {
      es: 'Concepto.',
      en: 'Concept.',
    },
    stack: [],
  },
  {
    id: 'jesper',
    title: 'Jesper3DMakes',
    kind: 'personal',
    year: '2020',
    status: { es: 'Activo', en: 'Active' },
    summary: {
      es: 'Taller propio de diseño e impresión 3D: lámparas LED y objetos de decoración, con fines benéficos.',
      en: 'My own 3D design and printing workshop: LED lamps and decor, for charity.',
    },
    facts: [
      {
        es: 'Cada pieza se diseña desde cero en Fusion 360 y se imprime y monta a mano.',
        en: 'Each piece is designed from scratch in Fusion 360, then printed and assembled by hand.',
      },
    ],
    role: {
      es: 'Diseño, impresión, acabado y venta.',
      en: 'Design, printing, finishing and sales.',
    },
    stack: ['Fusion 360', '3D printing'],
    cover: '/projects/jesper/jesper_lamp_render.jpg',
    coverAlt: {
      es: 'Render de una lámpara LED diseñada e impresa en 3D en Jesper3DMakes',
      en: 'Render of an LED lamp designed and 3D-printed at Jesper3DMakes',
    },
    images: ['/projects/jesper/jesper_lamp_extra1.jpg', '/projects/jesper/jesper_lamp_extra2.jpg', '/projects/jesper/jesper_lamp_extra3.jpg'],
    links: { instagram: 'https://www.instagram.com/jesper3d.makes/' },
  },
];
