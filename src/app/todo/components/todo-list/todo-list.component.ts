import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

import { Todo } from '../../models/todo.model';

@Component({
    selector: 'app-todo-list',
    templateUrl: './todo-list.component.html',
    styleUrl: './todo-list.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
/**
 * Präsentations-Komponente für die Liste von Todos.
 * Zeigt an, bearbeitet Entwürfe und gibt Benutzeraktionen als Events weiter.
 */
export class TodoListComponent {
    /** Todos, die aktuell angezeigt werden sollen. */
    readonly todos = input.required<Todo[]>();

    /** ID des Todos im Bearbeitungsmodus (oder null). */
    readonly editingId = input.required<number | null>();

    /** Aktueller Textentwurf beim Bearbeiten. */
    readonly editDraft = input.required<string>();

    /**Checkbox-Status wurde geändert. */
    readonly toggleDone = output<{ id: number; done: boolean }>();

    /**Bearbeitung für ein Todo starten. */
    readonly startEdit = output<Todo>();

    /**Entwurfstext wurde geändert. */
    readonly editDraftChange = output<string>();

    /**Entwurf für eine bestimmte ID speichern. */
    readonly saveEdit = output<number>();

    /**Bearbeitung abbrechen. */
    readonly cancelEdit = output<void>();

    /**Einzelnes Todo löschen. */
    readonly deleteTodo = output<number>();

    /** Liest den aktuellen Text aus dem Input und gibt ihn weiter. */
    onDraftInput(event: Event): void {
        const value = (event.target as HTMLInputElement).value;
        this.editDraftChange.emit(value);
    }

    /** Liest den Checkbox-Status und meldet den neuen Done-Wert. */
    onToggleDone(id: number, event: Event): void {
        const checked = (event.target as HTMLInputElement).checked;
        this.toggleDone.emit({ id, done: checked });
    }
}
