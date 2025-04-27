import React from 'react';
import { useDispatch } from 'react-redux';
import { editTask } from '../store/slices/taskSlice';

const TaskItem = ({ task, onEdit, onDelete }) => {
    const dispatch = useDispatch();

    const handleToggleComplete = () => {
        dispatch(editTask({ id: task._id, taskData: { completed: !task.completed } }));
    };

    const getPriorityClass = () => {
        switch (task.priority) {
            case 'high':
                return 'bg-danger text-white';
            case 'medium':
                return 'bg-warning text-dark';
            case 'low':
                return 'bg-success text-white';
            default:
                return 'bg-secondary text-white';
        }
    };

    return (
        <div className="card h-100">
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-start">
                    <h5 className="card-title">
                        <input
                            type="checkbox"
                            className="form-check-input me-2"
                            checked={task.completed}
                            onChange={handleToggleComplete}
                        />
                        {task.title}
                    </h5>
                    <span
                        className={`badge ${getPriorityClass()} rounded-pill`}
                    >
                        {task.priority}
                    </span>
                </div>
                {task.description && (
                    <p className="card-text mt-2">{task.description}</p>
                )}
                {task.deadline && (
                    <p className="card-text">
                        <small className="text-muted">
                            Deadline: {new Date(task.deadline).toLocaleDateString()}
                        </small>
                    </p>
                )}
                <div className="mt-3">
                    <button
                        className="btn btn-sm btn-outline-primary me-2"
                        onClick={onEdit}
                    >
                        Edit
                    </button>
                    <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={onDelete}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskItem; 