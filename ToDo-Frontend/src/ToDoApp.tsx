import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import './ToDoApp.css';

interface ToDo {
    id: number;
    title: string;
    isDone: boolean;
    subtasks?: ToDo[];
}

const ToDoApp = () => {
    const [tasks, setTasks] = useState<ToDo[]>([]);
    const [newTask, setNewTask] = useState<string>('');
    const [subtaskInputs, setSubtaskInputs] = useState<{ [key: number]: string }>({});


    useEffect(() => {
        axios.get('http://localhost:8081/alltasks')
            .then(response => {
                setTasks(response.data);
            })
            .catch(error => {
                console.error('Error fetching todos:', error);
            });
    }, []);

    const handleSubtaskInputChange = (taskId: number, value: string) => {
        setSubtaskInputs(prev => ({ ...prev, [taskId]: value }));
    };

    const handleAddSubtask = (taskId: number) => {
        const updatedTasks = tasks.map(task => {
            if (task.id === taskId) {
                const currentSubtasks = task.subtasks ?? [];  // fallback to empty array
                const newSubtask = {
                    id: currentSubtasks.length + 1,
                    title: subtaskInputs[taskId] || '',
                    isDone: false
                };
                return {
                    ...task,
                    subtasks: [...currentSubtasks, newSubtask]
                };
            }
            return task;
        });

        setTasks(updatedTasks);
        setSubtaskInputs(prev => ({ ...prev, [taskId]: '' })); // Clear input
    };

    const handleSubtaskDelete = (taskId: number, subtaskId: number) => {
        const updatedTasks = tasks.map(task => {
            if (task.id === taskId) {
                const filteredSubtasks = task.subtasks?.filter(sub => sub.id !== subtaskId) ?? [];
                return { ...task, subtasks: filteredSubtasks };
            }
            return task;
        });
        setTasks(updatedTasks);
    };

    const handleSubtaskToggle = (taskId: number, subtaskId: number) => {
        const updatedTasks = tasks.map(task => {
            if (task.id === taskId) {
                const updatedSubtasks = task.subtasks?.map(sub => {
                    if (sub.id === subtaskId) {
                        return { ...sub, isDone: !sub.isDone };
                    }
                    return sub;
                }) ?? [];
                return { ...task, subtasks: updatedSubtasks };
            }
            return task;
        });
        setTasks(updatedTasks);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        const taskToSend = {
            id: tasks.length + 1,
            title: newTask,
            isDone: false,
            subtasks: []  // new task starts empty — okay
        };

        axios.post('http://localhost:8081/ToDo/addtask', taskToSend)
            .then(() => {
                // 👇 Add the new task locally instead of refetching all
                setTasks(prevTasks => [...prevTasks, taskToSend]);
                setNewTask('');
            })
            .catch(error => {
                console.error('Error adding task:', error);
            });
    }

    const handleDelete = (id: number) => {
        axios.delete(`http://localhost:8081/ToDo/deletetask/${id}`)
            .then(() => {
                const updatedTasks = tasks.filter(task => task.id !== id);
                setTasks(updatedTasks);
            })
            .catch(error => {
                console.error('Error deleting task:', error);
            });
    }

    return (
        <div>
            <h1>ToDo</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={newTask}
                    onChange={e => setNewTask(e.target.value)}
                />
                <button type="submit">ADD</button>
            </form>

            <ul>
                {tasks.map((task) => (
                    <li key={task.id} className="task-item">
                        <div className="task-title">
                            <b>{task.title}</b>
                            <button onClick={() => handleDelete(task.id)}>Remove</button>

                        </div>

                        {/* Subtask input and button */}
                        <div className="task-actions">
                            <input
                                type="text"
                                value={subtaskInputs[task.id] || ''}
                                onChange={(e) => handleSubtaskInputChange(task.id, e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        handleAddSubtask(task.id);
                                    }
                                }}
                                placeholder="Add a subtask and press Enter"
                            />
                        </div>

                        {/* Subtask list */}
                        {task.subtasks && (
                            <ul className="subtask-list">
                                {task.subtasks.map((sub) => (
                                    <li key={sub.id} className="subtask-item">
                                        <span className="subtask-title">{sub.title}</span>

                                        <button
                                            onClick={() => handleSubtaskToggle(task.id, sub.id)}
                                            className="subtask-toggle"
                                        >
                                            {sub.isDone ? "UnDone" : "Done"}
                                        </button>

                                        <button
                                            onClick={() => handleSubtaskDelete(task.id, sub.id)}
                                            className="subtask-delete"
                                        >
                                            Delete
                                        </button>
                                    </li>
                                ))}
                            </ul>

                        )}
                    </li>
                ))}
            </ul>
        </div>
    );

}

export default ToDoApp;