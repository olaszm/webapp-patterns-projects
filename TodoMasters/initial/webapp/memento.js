import { TodoList } from "./classes.js"

export const TodoHistory = {
    history: [],
    push(state) {
        this.history.push(new Set([...state]))
    },
    pop() {
        if(this.history.length) {
            this.history.pop()
            return this.history.pop()
        }
        return undefined
    }
}

TodoList.getInstance().addObserver(() => {
    TodoHistory.push(TodoList.getInstance().items)
})

