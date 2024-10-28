import { createSlice } from "@reduxjs/toolkit";

interface Todo {
    id: string; 
    title: string;
    status: string;
    priority: string;
}

const getInitialTodo = () => {
    const localTodoList = window.localStorage.getItem('todoList');
    if (localTodoList) {
        return JSON.parse(localTodoList);
    }
    window.localStorage.setItem('todoList', JSON.stringify([]));
    return [];
};

const initialValue = {
    filterStatus: 'all',
    todoList: getInitialTodo(),
};

export const todoSlice = createSlice({
    name: 'todo',
    initialState: initialValue,
    reducers: {
        addTodo: (state, action) => {
            state.todoList.push(action.payload);
            const todoList = window.localStorage.getItem('todoList');
            if (todoList) {
                const todoListArr = JSON.parse(todoList);
                todoListArr.push({
                    ...action.payload,
                });
                window.localStorage.setItem('todoList', JSON.stringify(todoListArr));
            } else {
                window.localStorage.setItem(
                    'todoList',
                    JSON.stringify([
                        {
                            ...action.payload,
                        },
                    ])
                );
            }
        },
        updateTodo: (state, action) => {
            const todoList = window.localStorage.getItem('todoList');
            if (todoList) {
                const todoListArr: Todo[] = JSON.parse(todoList);
                todoListArr.forEach((todo) => {
                    if (todo.id === action.payload.id) {
                        todo.status = action.payload.status;
                        todo.title = action.payload.title;
                        todo.priority = action.payload.priority;
                    }
                });
                window.localStorage.setItem('todoList', JSON.stringify(todoListArr));
                state.todoList = [...todoListArr];
            }
        },
        moveTodo: (state, action) => {
            const { fromIndex, toIndex } = action.payload;
            const movedTask = state.todoList[fromIndex];
            const todoList = window.localStorage.getItem('todoList');
            if (todoList) {
                const todoListArr = JSON.parse(todoList);
                todoListArr.splice(fromIndex, 1);
                todoListArr.splice(toIndex, 0, movedTask);    
                window.localStorage.setItem('todoList', JSON.stringify(todoListArr));
                state.todoList = [...todoListArr];
            }
        },
        deleteTodo: (state, action) => {
            const todoList = window.localStorage.getItem('todoList');
            if (todoList) {
                const todoListArr: Todo[] = JSON.parse(todoList);
                todoListArr.forEach((todo, index) => {
                    if (todo.id === action.payload) {
                        todoListArr.splice(index, 1);
                    }
                });
                window.localStorage.setItem('todoList', JSON.stringify(todoListArr));
                state.todoList = todoListArr;
            }
        },
        updateFilterStatus: (state, action) => {
            state.filterStatus = action.payload;
        },
    },
});

export const { addTodo, updateTodo, deleteTodo, updateFilterStatus, moveTodo  } =
    todoSlice.actions;
export default todoSlice.reducer;