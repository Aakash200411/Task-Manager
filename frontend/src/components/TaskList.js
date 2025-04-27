import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchTasks,
    createTask,
    editTask,
    deleteTask,
    setFilter,
    setSearch
} from '../store/slices/taskSlice';
import TaskForm from './TaskForm';
import TaskItem from './TaskItem';

const TaskList = () => {
    const [showForm, setShowForm] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const {
        tasks = [],
        loading = false,
        error = null,
        filter = 'all',
        search = ''
    } = useSelector((state) => state.tasks || {});
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

    const handleCreateTask = (taskData) => {
        dispatch(createTask(taskData));
        setShowForm(false);
    };

    const handleEditTask = (taskId, taskData) => {
        dispatch(editTask({ id: taskId, taskData }));
        setEditingTask(null);
    };

    const handleDeleteTask = (taskId) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            dispatch(deleteTask(taskId));
        }
    };

    // Filtering and search logic (no category)
    const filteredTasks = tasks.filter(task => {
        let matchesFilter =
            filter === 'all' ||
            (filter === 'completed' && task.completed) ||
            (filter === 'pending' && !task.completed);
        let matchesSearch =
            !search ||
            task.title.toLowerCase().includes(search.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    return (
        <div className="container mt-4">
            <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-2">
                <h2>My Tasks</h2>
                <div className="d-flex gap-2 flex-wrap">
                    <select
                        className="form-select"
                        style={{ width: 150 }}
                        value={filter}
                        onChange={e => dispatch(setFilter(e.target.value))}
                    >
                        <option value="all">All</option>
                        <option value="completed">Completed</option>
                        <option value="pending">Pending</option>
                    </select>
                    <input
                        type="text"
                        className="form-control"
                        style={{ width: 200 }}
                        placeholder="Search by title"
                        value={search}
                        onChange={e => dispatch(setSearch(e.target.value))}
                    />
                    <button
                        className="btn btn-primary"
                        onClick={() => setShowForm(true)}
                    >
                        Add Task
                    </button>
                </div>
            </div>

            {loading && <div className="text-center mt-5"><div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div></div>}
            {error && <div className="alert alert-danger">{error}</div>}

            {showForm && (
                <TaskForm
                    onSubmit={handleCreateTask}
                    onCancel={() => setShowForm(false)}
                />
            )}

            {editingTask && (
                <TaskForm
                    task={editingTask}
                    onSubmit={taskData => handleEditTask(editingTask._id, taskData)}
                    onCancel={() => setEditingTask(null)}
                />
            )}

            <div className="row">
                {(filteredTasks || []).map(task => (
                    <div key={task._id} className="col-md-4 mb-4">
                        <TaskItem
                            task={task}
                            onEdit={() => setEditingTask(task)}
                            onDelete={() => handleDeleteTask(task._id)}
                        />
                    </div>
                ))}
                {filteredTasks.length === 0 && !loading && (
                    <div className="text-center text-muted">No tasks found.</div>
                )}
            </div>
        </div>
    );
};

export default TaskList; 