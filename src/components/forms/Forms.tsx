import { Close } from '@mui/icons-material'
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { addTodo, updateTodo } from '../../slices/todoSlices';
import { format } from 'date-fns'

interface TodoItem {      
    title: string;
    status: string;
    priority: string;
}

interface FormsProps {
    type: string;
    modal: boolean;
    setModal: (value: boolean) => void;
    todo?: TodoItem;
}

const Forms = ({ type, modal, setModal, todo }: FormsProps) => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [status, setStatus] = useState('pending');
    const [err, setErr] = useState({
        taskError: '',
        statusError: '',
    })
    const [priority, setPriority] = useState('low');

    useEffect(() => {
        if (type === 'update' && todo) {
            setTitle(todo.title);
            setStatus(todo.status);
            setPriority(todo.priority || 'low');
        } else {
            setTitle('');
            setStatus('pending');
            setPriority('low');
        }
    }, [type, todo, modal]);

    const handleSubmit = (e: React.MouseEvent) => {
        e.preventDefault();
        if (title === '') {
            toast.error('Please enter a title');
            setErr(prev=>({
                ...prev,
                taskError: 'Enter a title'
            }))
            return;
        }
        if (title && status) {
            if (type === 'add') {
                dispatch(
                    addTodo({
                        id: Date.now(),
                        title,
                        status,
                        priority,
                        time: format(new Date(), 'p, MM/dd/yyyy'),
                    })
                );
                toast.success('Task added successfully');
            }
            if (type === 'update') {
                if (todo && (todo.title !== title || todo.status !== status || todo.priority !== priority)) {
                    dispatch(updateTodo({ ...todo, title, status, priority }));
                    toast.success('Task Updated successfully');
                } else {
                    toast.error('No changes made');
                    return;
                }
            }
            setModal(false);
        }
    };

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'task') {
            if (value === '') {
                setErr(prev => ({
                    ...prev,
                    taskError: 'Enter a Title'
                }))
            } else if (value.length < 4) {
                setErr(prev => ({
                    ...prev,
                    taskError: 'Should not be less then 4'
                }))
            } else {
                setErr(prev => ({
                    ...prev,
                    taskError: ''
                }))
                console.log(value)
            }
        }
    }

    return (
        <div className={`fixed w-full h-screen left-0 top-0 items-center justify-center bg-slate-300 bg-opacity-35 ${modal ? 'flex' : 'hidden'}`}>
            <form className="bg-white p-5 rounded min-w-[400px] relative pt-7">
                <div className='absolute top-2 right-2 bg-red-600 text-white rounded-full cursor-pointer h-6 flex items-center justify-center w-6' onClick={() => setModal(false)}>
                    <Close fontSize='small' />
                </div>
                <div className="mb-5">
                    <label htmlFor="task" className="block mb-2 text-sm font-medium text-gray-900 ">Task</label>
                    <input onChange={(e) => {
                        handleChange(e)
                        setTitle(e.target.value)
                    }} value={title} type="text" name='task' id="task" className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${err.taskError && 'border-red-500'}`} placeholder="name@flowbite.com" required />
                    <span className='text-red-500 text-sm'>{err.taskError}</span>
                </div>
                <div className='mb-5'>
                    <label htmlFor="priority" className="block mb-2 text-sm font-medium text-gray-900">Priority</label>
                    <select
                        name='priority'
                        id='priority'
                        onChange={(e) => setPriority(e.target.value)}
                        value={priority}
                        className="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                    >
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                    </select>
                </div>
                <div className='mb-5'>
                    <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900 ">Status</label>
                    <select
                        name='status'
                        id='status'
                        onChange={(e) => setStatus(e.target.value)} value={status}
                        className="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                    >
                        <option disabled>--Select value--</option>
                        <option value="pending">pending</option>
                        <option value="complete">Completed</option>
                    </select>
                </div>
                <button type="submit" onClick={handleSubmit} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>
        </div>
    )
}

export default Forms
