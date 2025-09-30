import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert, Badge, Modal } from 'react-bootstrap';
import { taskAPI } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    page: 1,
    limit: 10
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchTasks();
  }, [filters]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await taskAPI.getTasks(filters);
      setTasks(response.data.data);
      setTotalPages(response.data.pages);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value,
      page: 1 // Reset to first page when filtering
    }));
  };

  const handleStatusUpdate = async (taskId, newStatus) => {
    try {
      await taskAPI.updateTask(taskId, { status: newStatus });
      fetchTasks(); // Refresh the list
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update task');
    }
  };

  const handleDeleteClick = (task) => {
    setTaskToDelete(task);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await taskAPI.deleteTask(taskToDelete.id);
      setShowDeleteModal(false);
      setTaskToDelete(null);
      fetchTasks(); // Refresh the list
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to delete task');
      setShowDeleteModal(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'secondary';
      case 'in-progress': return 'primary';
      case 'completed': return 'success';
      default: return 'secondary';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'low': return 'success';
      case 'medium': return 'warning';
      case 'high': return 'danger';
      default: return 'secondary';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const isOverdue = (dueDate, status) => {
    if (!dueDate || status === 'completed') return false;
    return new Date(dueDate) < new Date();
  };

  if (loading && tasks.length === 0) {
    return <LoadingSpinner message="Loading tasks..." />;
  }

  return (
    <Container className="mt-4">
      {/* Header */}
      <Row className="mb-4">
        <Col>
          <h1 className="h2 mb-3">My Tasks</h1>
          
          {/* Filters */}
          <Card className="mb-4">
            <Card.Body>
              <Row>
                <Col md={4} className="mb-2">
                  <Form.Select
                    name="status"
                    value={filters.status}
                    onChange={handleFilterChange}
                  >
                    <option value="">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </Form.Select>
                </Col>
                <Col md={4} className="mb-2">
                  <Form.Select
                    name="priority"
                    value={filters.priority}
                    onChange={handleFilterChange}
                  >
                    <option value="">All Priorities</option>
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                  </Form.Select>
                </Col>
                <Col md={4} className="mb-2">
                  <Button 
                    variant="outline-secondary" 
                    onClick={() => setFilters({ ...filters, status: '', priority: '', page: 1 })}
                  >
                    <i className="bi bi-arrow-clockwise me-2"></i>
                    Clear Filters
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {error && (
        <Alert variant="danger" className="mb-4">
          <i className="bi bi-exclamation-triangle me-2"></i>
          {error}
          <Button
            variant="link"
            className="p-0 ms-2"
            onClick={fetchTasks}
          >
            Try again
          </Button>
        </Alert>
      )}

      {/* Tasks */}
      <Row>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <Col md={6} lg={4} key={task.id} className="mb-4">
              <Card className={`task-card h-100 priority-${task.priority}`}>
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h5 className="card-title mb-0">{task.title}</h5>
                    <div className="dropdown">
                      <Button
                        variant="link"
                        className="text-muted p-0"
                        data-bs-toggle="dropdown"
                      >
                        <i className="bi bi-three-dots-vertical"></i>
                      </Button>
                      <ul className="dropdown-menu">
                        <li>
                          <button 
                            className="dropdown-item"
                            onClick={() => handleStatusUpdate(task.id, 'pending')}
                            disabled={task.status === 'pending'}
                          >
                            <i className="bi bi-clock me-2"></i>
                            Mark Pending
                          </button>
                        </li>
                        <li>
                          <button 
                            className="dropdown-item"
                            onClick={() => handleStatusUpdate(task.id, 'in-progress')}
                            disabled={task.status === 'in-progress'}
                          >
                            <i className="bi bi-arrow-clockwise me-2"></i>
                            Mark In Progress
                          </button>
                        </li>
                        <li>
                          <button 
                            className="dropdown-item"
                            onClick={() => handleStatusUpdate(task.id, 'completed')}
                            disabled={task.status === 'completed'}
                          >
                            <i className="bi bi-check-circle me-2"></i>
                            Mark Completed
                          </button>
                        </li>
                        <li><hr className="dropdown-divider" /></li>
                        <li>
                          <button 
                            className="dropdown-item text-danger"
                            onClick={() => handleDeleteClick(task)}
                          >
                            <i className="bi bi-trash me-2"></i>
                            Delete Task
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  {task.description && (
                    <p className="card-text text-muted mb-3">{task.description}</p>
                  )}
                  
                  <div className="mb-3">
                    <Badge bg={getStatusColor(task.status)} className="me-2">
                      {task.status.replace('-', ' ')}
                    </Badge>
                    <Badge bg={getPriorityColor(task.priority)}>
                      {task.priority} priority
                    </Badge>
                    {isOverdue(task.dueDate, task.status) && (
                      <Badge bg="danger" className="ms-2">
                        <i className="bi bi-exclamation-triangle me-1"></i>
                        Overdue
                      </Badge>
                    )}
                  </div>
                  
                  <div className="text-muted small">
                    <div>Created: {formatDate(task.createdAt)}</div>
                    {task.dueDate && (
                      <div>Due: {formatDate(task.dueDate)}</div>
                    )}
                    {task.tags && task.tags.length > 0 && (
                      <div className="mt-2">
                        {task.tags.map((tag, index) => (
                          <Badge key={index} bg="light" text="dark" className="me-1">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <div className="text-center py-5">
              <i className="bi bi-inbox text-muted mb-3" style={{ fontSize: '4rem' }}></i>
              <h3 className="text-muted">No tasks found</h3>
              <p className="text-muted mb-4">
                {filters.status || filters.priority 
                  ? 'Try adjusting your filters or create a new task.'
                  : 'Create your first task to get started!'
                }
              </p>
              <Button 
                variant="primary" 
                as="a" 
                href="/create-task"
                className="btn-custom"
              >
                <i className="bi bi-plus-circle me-2"></i>
                Create Task
              </Button>
            </div>
          </Col>
        )}
      </Row>

      {/* Pagination */}
      {totalPages > 1 && (
        <Row className="mt-4">
          <Col className="d-flex justify-content-center">
            <nav>
              <ul className="pagination">
                <li className={`page-item ${filters.page === 1 ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => setFilters(prev => ({ ...prev, page: prev.page - 1 }))}
                    disabled={filters.page === 1}
                  >
                    Previous
                  </button>
                </li>
                {[...Array(totalPages)].map((_, index) => (
                  <li 
                    key={index + 1} 
                    className={`page-item ${filters.page === index + 1 ? 'active' : ''}`}
                  >
                    <button
                      className="page-link"
                      onClick={() => setFilters(prev => ({ ...prev, page: index + 1 }))}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
                <li className={`page-item ${filters.page === totalPages ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => setFilters(prev => ({ ...prev, page: prev.page + 1 }))}
                    disabled={filters.page === totalPages}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </Col>
        </Row>
      )}

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete "{taskToDelete?.title}"? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirm}>
            <i className="bi bi-trash me-2"></i>
            Delete Task
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default TaskList;