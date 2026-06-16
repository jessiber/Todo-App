import { DatePipe, DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

/** Beschreibt einen einzelnen Todo-Eintrag. */
interface Todo {
    id: number;
    title: string;
    done: boolean;
}

/** Legt fest, welche Todos sichtbar sind. */
type TodoFilter = 'all' | 'open' | 'done';

@Component({
    selector: 'app-todo-app',
    imports: [FormsModule, DecimalPipe, DatePipe],
    templateUrl: './todo-app.component.html',
    styleUrl: './todo-app.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush

})

/**
 * Hauptkomponente der Todo-App.
 * Verwaltet Todos, Filter und Fortschrittsanzeige mit Angular Signals.
 */
export class TodoAppComponent {
    readonly today = new Date();
    readonly todos = signal<Todo[]>([]);
    readonly activeFilter = signal<TodoFilter>('all');
    readonly searchTerm = signal('');
    readonly editingId = signal<number | null>(null);
    readonly editDraft = signal('');
    readonly totalTasks = computed(() => this.todos().length);
    readonly doneTasks = computed(() => this.todos().filter((todo) => todo.done).length);

    /** Berechnet den Erledigt-Fortschritt in Prozent. */
    readonly progressPercent = computed(() => {
        const total = this.totalTasks();

        if (total === 0) {
            return 0;
        }

        return (this.doneTasks() / total) * 100;
    });

    /** Liefert die Todos passend zum aktuell gewählten Filter. */
    readonly filteredTodos = computed(() => {
        const currentTodos = this.todos();
        const normalizedSearchTerm = this.searchTerm().trim().toLowerCase();
        const searchedTodos = normalizedSearchTerm
            ? currentTodos.filter((todo) => todo.title.toLowerCase().includes(normalizedSearchTerm))
            : currentTodos;

        switch (this.activeFilter()) {
            case 'open':
                return searchedTodos.filter((todo) => !todo.done);
            case 'done':
                return searchedTodos.filter((todo) => todo.done);
            default:
                return searchedTodos;
        }
    });

    /** Aktualisiert den aktiven Filter. */
    setFilter(filter: TodoFilter): void {
        this.activeFilter.set(filter);
    }

    /** Fügt ein neues Todo hinzu, wenn das Eingabefeld nicht leer ist. */
    addTodo(input: HTMLInputElement): void {
        const title = input.value.trim();

        if (!title) {
            return;
        }

        this.todos.update((currentTodos) => [
            ...currentTodos,
            {
                id: Date.now(),
                title,
                done: false
            }
        ]);

        input.value = '';
    }

    /** Übernimmt Statusänderungen aus dem Template in das Signal. */
    onTodoStatusChange(): void {
        this.todos.set([...this.todos()]);
    }

    /** Entfernt ein Todo anhand seiner ID. */
    deleteTodo(id: number): void {
        this.todos.update((currentTodos) =>
            currentTodos.filter((todo) => todo.id !== id)
        );
    }

    /** Startet den Bearbeiten-Modus für ein Todo. */
    startEdit(todo: Todo): void {
        this.editingId.set(todo.id);
        this.editDraft.set(todo.title);
    }

    /** Speichert den bearbeiteten Todo-Titel. */
    saveEdit(id: number): void {
        const title = this.editDraft().trim();

        if (!title) {
            return;
        }

        this.todos.update((currentTodos) =>
            currentTodos.map((todo) =>
                todo.id === id ? { ...todo, title } : todo
            )
        );

        this.cancelEdit();
    }

    /** Bricht den Bearbeiten-Modus ab. */
    cancelEdit(): void {
        this.editingId.set(null);
        this.editDraft.set('');
    }

    /** Löscht alle Todos. */
    deleteAllTodos(): void {
        this.todos.set([]);
    }

    /** Löscht alle erledigten Todos. */
    deleteAllDoneTodos(): void {
        this.todos.update((currentTodos) =>
            currentTodos.filter((todo) => !todo.done)
        );
    }

    /** Setzt alle Todos auf erledigt. */
    setFilterAllDone(): void {
        this.todos.update((currentTodos) =>
            currentTodos.map((todo) => ({ ...todo, done: true }))
        );
    }

    /** Setzt alle Todos auf nicht erledigt. */
    setFilterNoneDone(): void {
        this.todos.update((currentTodos) =>
            currentTodos.map((todo) => ({ ...todo, done: false }))
        );
    }

    /** Aktualisiert den Suchbegriff für die Filterung der Todos. */
    setSearchTerm(term: string): void {
        this.searchTerm.set(term);
    }


}
