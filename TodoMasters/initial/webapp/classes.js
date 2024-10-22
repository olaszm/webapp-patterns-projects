import { observerMixin } from "./mixin.js"

export class TodoItem {
    constructor(text) {
        this.text = text
    }

    equals(other) { // Value object pattern
        return this.text === other.text
    }
}

export class TodoList {
    #data = new Set()

    get items() { return this.#data}
    constructor() {
        if(TodoList.instance) {
            throw new Error("Use TodoList.getInstance() to access the list")
        }
    }

    static instance = null;
    
    static {
        this.instance = new TodoList()
    }

    static getInstance() {
        return this.instance
    }

    // List bevhaviour

    add(item) {
        const todoExists = Array.from(this.#data).find(t => t.equals(item))
        if(todoExists) return
        this.#data.add(item)
        this.notify()
    }

    delete(itemText) {
        const todoExists = Array.from(this.#data).find(t => t.text === itemText )
        if(todoExists) {
            this.#data.delete(todoExists)
            this.notify()
        }
    }

    find(text) {
        return Array.from(this.#data).find(t => t.text === text )
    }

    replaceList(list) {
        this.#data = list
        this.notify()
    }
}


// Apply the mixin to the class
Object.assign(TodoList.prototype, observerMixin)