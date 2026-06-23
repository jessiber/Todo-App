import { DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
    selector: 'app-todo-progress',
    imports: [DecimalPipe],
    templateUrl: './todo-progress.component.html',
    styleUrl: './todo-progress.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
/**
 * Fortschrittsanzeige für erledigte Todos.
 * Zeigt absolute Zahlen und den prozentualen Fortschritt.
 */
export class TodoProgressComponent {
    /** Anzahl erledigter Tasks. */
    readonly doneTasks = input.required<number>();

    /** Gesamte Anzahl Tasks. */
    readonly totalTasks = input.required<number>();

    /** Fortschritt in Prozent (0-100). */
    readonly progressPercent = input.required<number>();
}
