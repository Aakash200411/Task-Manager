import React, { useState, useEffect } from 'react';

const TaskForm = ({ task, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        priority: 'medium',
        deadline: ''
    });
    const [validationError, setValidationError] = useState('');

    useEffect(() => {
        if (task) {
            setFormData({
                title: task.title,
                description: task.description || '',
                priority: task.priority,
                deadline: task.deadline
                    ? new Date(task.deadline).toISOString().split('T')[0]
                    : ''
            });
        }
    }, [task]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setValidationError('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.title.trim()) {
            setValidationError('Title is required');
            return;
        }
        onSubmit(formData);
    };

    return (
        <div className="card mb-4">
            <div className="card-body">
                <h5 className="card-title mb-3">{task ? 'Edit Task' : 'Add Task'}</h5>
                {validationError && (
                    <div className="alert alert-danger" role="alert">
                        {validationError}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">
                            Title
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">
                            Description
                        </label>
                        <textarea
                            className="form-control"
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="priority" className="form-label">
                            Priority
                        </label>
                        <select
                            className="form-select"
                            id="priority"
                            name="priority"
                            value={formData.priority}
                            onChange={handleChange}
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="deadline" className="form-label">
                            Deadline
                        </label>
                        <input
                            type="date"
                            className="form-control"
                            id="deadline"
                            name="deadline"
                            value={formData.deadline}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="d-flex justify-content-end">
                        <button
                            type="button"
                            className="btn btn-secondary me-2"
                            onClick={onCancel}
                        >
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary">
                            {task ? 'Update Task' : 'Add Task'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TaskForm; 