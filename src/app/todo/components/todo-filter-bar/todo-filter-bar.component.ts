import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TodoFilter } from '../../models/todo.model';

@Component({
    selector: 'app-todo-filter-bar',
    imports: [FormsModule],
    templateUrl: './todo-filter-bar.component.html',
    styleUrl: './todo-filter-bar.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
/**
 * Filter-Bar mit Filter, Sammelaktionen und Suchfeld.
 * Die Komponente selbst ist "dumm" und gibt Events aus.
 */
export class TodoFilterBarComponent {
    /** Aktuell gewählter Filter (all/open/done). */
    readonly activeFilter = input.required<TodoFilter>();

    /** Aktueller Text in der Suche. */
    readonly searchTerm = input.required<string>();

    /** Event: Filter wurde gewechselt. */
    readonly filterChange = output<TodoFilter>();

    /** Event: Alle Todos auf erledigt setzen. */
    readonly markAllDone = output<void>();

    /** Event: Alle Todos auf offen zurücksetzen. */
    readonly markAllOpen = output<void>();

    /** Event: Alle Todos löschen. */
    readonly clearAll = output<void>();

    /** Event: Nur erledigte Todos löschen. */
    readonly clearDone = output<void>();

    /** Event: Suchbegriff wurde geändert. */
    readonly searchTermChange = output<string>();

    /** Leitet einen neuen Filterwert an die Parent-Komponente weiter. */
    setFilter(filter: TodoFilter): void {
        this.filterChange.emit(filter);
    }

    /** Leitet den neuen Suchtext an die Parent-Komponente weiter. */
    setSearchTerm(term: string): void {
        this.searchTermChange.emit(term);
    }
}
