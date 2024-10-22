import { Command, CommandExecutor, Commands } from "./webapp/command.js"
import {TodoList} from './webapp/classes.js'

globalThis.DOM = {}

document.addEventListener('DOMContentLoaded', () => {
    const todoList = TodoList.getInstance()
    DOM.todoList = document.getElementById('todo-list')
    DOM.addBtn = document.getElementById('add-btn')
    DOM.todoInput = document.getElementById('todo-input')


    DOM.addBtn.addEventListener('click', (e) => {
        const cmd = new Command(Commands.ADD, [DOM.todoInput.value.trim()])
        CommandExecutor.execute(cmd)
    })

    DOM.todoList.addEventListener('click', (e) => {
        if(e.target.classList.contains('delete-btn')) {
            const txt = e.target.parentElement.dataset.todo
            const cmd = new Command(Commands.DELETE, [txt])
            CommandExecutor.execute(cmd)
        }
    })


    todoList.addObserver(renderList)
})

document.addEventListener('keydown', (e) => {
    if(e.ctrlKey && e.key === 'z') {
        const cmd = new Command(Commands.UNDO)
        CommandExecutor.execute(cmd)
    }
})


function renderList() {
    const todoList = TodoList.getInstance()

    const fragment = new DocumentFragment
    for(let item of todoList.items) {
        const li = document.createElement('li')
        li.textContent = item.text
        li.classList.add('todo-item')
        li.dataset.todo = item.text
        const deleteButton = document.createElement('button')
        deleteButton.textContent = 'delete'
        deleteButton.classList.add('delete-btn')
        li.appendChild(deleteButton)
        fragment.appendChild(li)
    }

    DOM.todoList.innerHTML = ''
    DOM.todoList.appendChild(fragment)
}