import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
    selector: 'app-todo-header',
    imports: [DatePipe],
    templateUrl: './todo-header.component.html',
    styleUrl: './todo-header.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
/**
 * Header-Bereich der Todo-App.
 * Zeigt Datum und einfache Statistik an.
 */
export class TodoHeaderComponent {
    /** Aktuelles Datum aus der Parent-Komponente. */
    readonly today = input.required<Date>();

    /** Gesamte Anzahl aller Todos. */
    readonly totalTasks = input.required<number>();

    /** Anzahl der aktuell sichtbaren Todos (nach Filter/Suche). */
    readonly visibleTasks = input.required<number>();
}
