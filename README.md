# TodoApp

Eine kleine Todo-Anwendung mit Angular 21. Die App zeigt, wie lokaler UI-Zustand mit `signal()` und abgeleitete Werte mit `computed()` verwaltet werden können.

## Funktionen

- Todos hinzufügen
- Todos als erledigt markieren
- Nach `Alle`, `Offen` und `Erledigt` filtern
- Einzelne Todos oder die ganze Liste löschen
- Fortschritt in Prozent anzeigen

## Technologie

- Angular 21
- Standalone Components
- Signals (`signal`, `computed`)
- Template mit `@for` und `@empty`
- Formularbindung mit `ngModel`

## Projektstruktur

```text
src/app/
├── app.ts
├── app.html
└── todo/
    ├── todo-app.component.ts
    ├── todo-app.component.html
    └── todo-app.component.css
```

## Installation und Start

```bash
npm install
npm start
```

Danach ist die App unter `http://localhost:4200` erreichbar.

## Wichtige Logik

Die Hauptlogik liegt in `src/app/todo/todo-app.component.ts`:

```ts
readonly todos = signal<Todo[]>([]);
readonly activeFilter = signal<TodoFilter>('all');
readonly filteredTodos = computed(() => { ... });
```

- `todos` speichert alle Aufgaben.
- `activeFilter` speichert den aktuell gewählten Filter.
- `filteredTodos` berechnet automatisch die sichtbaren Einträge.

## Kurz erklärt

- Neue Todos werden über `addTodo()` angelegt.
- Der Status eines Todos wird über die Checkbox geändert.
- `deleteTodo()` entfernt einen Eintrag.
- `deleteAllTodos()` leert die komplette Liste.
- `progressPercent()` berechnet den Fortschritt für die Anzeige.

## Tests

```bash
npm test
```

## Repository

GitHub: https://github.com/jessiber/Todo-App.git


