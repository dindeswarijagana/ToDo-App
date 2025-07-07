import axios from "axios";
import { useState, } from "react";
import { useEffect } from "react";
import './ToDoApp.css';

interface ToDo {
    id: number;
    title: string;
    isDone: boolean;
}

const ToDoApp = () => {

    const [tasks, setTasks] = useState<ToDo[]>([]);
    const [newTask, setNewTask] = useState<string>('');

    useEffect(() => {
        axios.get('http://localhost:8081/alltasks')
            .then(response => {
                setTasks(response.data);
            })
            .catch(error => {
                console.error('Error fetching todos:', error);
            });
    }, []);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        axios.post('http://localhost:8081/ToDo/addtask', {
            id: tasks.length + 1,        // or let backend handle ID if possible
            title: newTask,
            isDone: false
        })
            .then(() => {
                // After adding, fetch updated tasks
                return axios.get('http://localhost:8081/alltasks');
            })
            .then(response => {
                setTasks(response.data);
                setNewTask('');
            })
            .catch(error => {
                console.error('Error adding task:', error);
            });
    }


    const handleDelete = (id: number) => {
        axios.delete(`http://localhost:8081/ToDo/deletetask/${id}`)
            .then(response => {
                console.log('Delete success:', response.data);
                // Update state locally after successful delete
                const updatedTasks = tasks.filter(task => task.id !== id);
                setTasks(updatedTasks);
            })
            .catch(error => {
                console.error('Error deleting task:', error);
            });
    }



    const handleToggle = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
        axios.put(`http://localhost:8081/ToDo/updatetask/${id}`)
            .then(response => {
                console.log('Toggle success:', response.data);

                const updatedTasks = tasks.map(task => {
                    if (task.id === id) {
                        return { ...task, isDone: !task.isDone };
                    }
                    return task;
                });

                setTasks(updatedTasks);
            })
            .catch(error => {
                console.error('Error toggling task:', error);
            });
    }


    return (
        <div>
            <h1>ToDo</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" value={newTask} onChange={e => { setNewTask(e.target.value) }
                } />
                <button type="submit" value='Add'>ADD</button>
            </form>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        <b>{task.title}</b>
                        <button type="button" data-id={task.id.toString()} value={'Delete'} onClick={() => handleDelete(task.id)}>Delete</button>
                        <button type="button" data-id={task.id.toString()} value={'UnDone'} onClick={(e) => handleToggle(e, task.id)}>  {task.isDone ? 'UnDone' : 'Done'}</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ToDoApp;