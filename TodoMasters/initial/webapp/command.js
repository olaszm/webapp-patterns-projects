import {TodoList, TodoItem} from './classes.js'
import { TodoHistory } from './memento.js';

export class Command {
    name;
    args;
    constructor(name, args) {
        this.name = name;
        this.args = args;
    }
}

export const Commands = {
    ADD: 'add',
    DELETE: 'delete',
    UNDO: 'undo'
}

export const CommandExecutor = {
    execute(command) {
        const todoList = TodoList.getInstance();
        switch (command.name) {
            case Commands.ADD: {
                const [text] = command.args
                todoList.add(new TodoItem(text))
                break;
            }
            case Commands.DELETE: {
                const [text] = command.args
                console.log('Delete text', text)
                todoList.delete(text)
                break;
            }
            case Commands.UNDO: {
                const prevItem = TodoHistory.pop()
                if(prevItem) {
                    todoList.replaceList(prevItem)
                }
                break;
            }
            default:
                break;
        }
    }
}