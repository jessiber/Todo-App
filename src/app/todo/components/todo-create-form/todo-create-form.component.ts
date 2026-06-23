import { ChangeDetectionStrategy, Component, output } from '@angular/core';

@Component({
    selector: 'app-todo-create-form',
    templateUrl: './todo-create-form.component.html',
    styleUrl: './todo-create-form.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
/**
 * Kleines Formular zum Erfassen von neuen Todos.
 * Gibt den Titel per Event an die Parent-Komponente weiter.
 */
export class TodoCreateFormComponent {
    /** Event für ein neues Todo mit dem Titel als String. */
    readonly addTodo = output<string>();

    /**
     * Liest den Input aus, entfernt Leerzeichen und sendet den Wert nur, wenn er gültig ist.
     */
    submit(input: HTMLInputElement): void {
        const title = input.value.trim();

        if (!title) {
            return;
        }

        this.addTodo.emit(title);
        input.value = '';
    }
}
