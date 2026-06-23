/**
 * Datenmodell für ein einzelnes Todo.
 */
export interface Todo {
    id: number;
    title: string;
    done: boolean;
}

/**
 * Erlaubte Filterwerte im Toolbar- bzw. App-Status.
 */
export type TodoFilter = 'all' | 'open' | 'done';
