import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Forms from "../components/forms/Forms";
import { Toaster } from "react-hot-toast";
import Tasks from "../components/Tasks/Tasks";
import { moveTodo, updateFilterStatus } from "../slices/todoSlices";
import DropArea from "../components/dropArea/DropArea";

// Add interfaces for the state types
interface TodoItem {
    id: string;
    title: string;
    status: string;
    priority: string;
    time: string;
}

interface RootState {
    todo: {
        todoList: TodoItem[];
        filterStatus: string;
    }
}

const Home = () => {
    const [modal, setModal] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const todoList = useSelector((state: RootState) => state.todo.todoList);
    const filterStatusData = useSelector((state: RootState) => state.todo.filterStatus);
    const initialFilterStatus = useSelector((state: RootState) => state.todo.filterStatus);
    const [filterStatus, setFilterStatus] = useState<string>(initialFilterStatus);
    const [activeCard, setActiveCard] = useState<string | null>(null);
    const dispatch = useDispatch();

    const sortedTodoList = [...todoList];
    // sortedTodoList.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());

    const filteredTodoList = sortedTodoList.filter((item) => {
        const matchesStatus = filterStatusData === 'all' || item.status === filterStatus;
        const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    const updateFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilterStatus(e.target.value);
        dispatch(updateFilterStatus(e.target.value));
    };

    const onDrop = (position: number) => {
        if (activeCard === null || activeCard === undefined) return;

        const fromIndex = todoList.findIndex(item => item.id === activeCard);
        const toIndex = position;

        if (fromIndex !== -1 && toIndex !== fromIndex) {
            dispatch(moveTodo({ fromIndex, toIndex }));
        }
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    return (
        <div>
            <Toaster position="top-center" />
            <div className="py-8 md:max-w-5xl px-4 mx-auto">
                <h1 className="text-center text-5xl text-main font-bold uppercase">Todo List</h1>
                <div className="app-header mt-5">
                    <button
                        className="bg-indigo-500 app-item-1 text-white text-sm min-w-fit px-5 h-11 rounded"
                        onClick={() => setModal(true)}
                    >
                        Add Task
                    </button>
                    <input
                        type="text"
                        placeholder="Search Tasks"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="min-[480px]:mt-4 border p-2 rounded w-full app-item-2 h-11 outline-none focus:border-blue-600"
                    />
                    <div className="app-item-3">
                        <label className="text-sm mb-2 block">Sort by tasks</label>
                        <select
                            onChange={updateFilter}
                            value={filterStatus}
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 h-11"
                        >
                            <option value="all">All</option>
                            <option value="complete">Completed</option>
                            <option value="pending">Pending</option>
                        </select>
                    </div>
                </div>

                <div className="min-[480px]:mt-5 mt-2">
                    <DropArea onDrop={() => onDrop(0)} />
                    {filteredTodoList.length > 0 ? (
                        filteredTodoList.map((todo: TodoItem, i) => (
                            <React.Fragment key={todo.id}>
                                <Tasks data={todo} setactiveCard={setActiveCard} />
                                <DropArea onDrop={() => onDrop(i + 1)} />
                            </React.Fragment>
                        ))
                    ) : (
                        <div className="text-gray-500 text-lg">No Todos</div>
                    )}
                </div>
                <Forms modal={modal} setModal={setModal} type="add" />
            </div>
        </div>
    );
};

export default Home;