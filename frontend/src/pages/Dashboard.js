import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { taskAPI } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentTasks, setRecentTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const { user } = useAuth();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError('');
      
      const [statsResponse, tasksResponse] = await Promise.all([
        taskAPI.getStats(),
        taskAPI.getTasks({ limit: 5 })
      ]);
      
      setStats(statsResponse.data.data);
      setRecentTasks(tasksResponse.data.data);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to load dashboard data');
    } finally {
      setLoading(false);
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

  if (loading) {
    return <LoadingSpinner message="Loading dashboard..." />;
  }

  return (
    <Container className="mt-4">
      {/* Welcome Section */}
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="h2 mb-1">
                Welcome back, {user?.name}! 👋
              </h1>
              <p className="text-muted mb-0">
                Here's what's happening with your tasks today.
              </p>
            </div>
            <div className="d-none d-md-block">
              <Link to="/create-task">
                <Button variant="primary" className="btn-custom">
                  <i className="bi bi-plus-circle me-2"></i>
                  New Task
                </Button>
              </Link>
            </div>
          </div>
        </Col>
      </Row>

      {error && (
        <Alert variant="danger" className="mb-4">
          <i className="bi bi-exclamation-triangle me-2"></i>
          {error}
          <Button
            variant="link"
            className="p-0 ms-2"
            onClick={fetchDashboardData}
          >
            Try again
          </Button>
        </Alert>
      )}

      {/* Stats Cards */}
      {stats && (
        <Row className="mb-4">
          <Col md={3} sm={6} className="mb-3">
            <Card className="stats-card text-white h-100">
              <Card.Body className="d-flex align-items-center">
                <div className="flex-grow-1">
                  <div className="stats-number">{stats.totalTasks}</div>
                  <div className="stats-label">Total Tasks</div>
                </div>
                <div className="ms-3">
                  <i className="bi bi-list-task" style={{ fontSize: '2rem' }}></i>
                </div>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={3} sm={6} className="mb-3">
            <Card className="bg-warning text-dark h-100">
              <Card.Body className="d-flex align-items-center">
                <div className="flex-grow-1">
                  <div className="stats-number">{stats.overdueTasks}</div>
                  <div className="stats-label">Overdue</div>
                </div>
                <div className="ms-3">
                  <i className="bi bi-exclamation-triangle" style={{ fontSize: '2rem' }}></i>
                </div>
              </Card.Body>
            </Card>
          </Col>
          
          {stats.statusBreakdown.map((item) => (
            <Col md={3} sm={6} className="mb-3" key={item._id}>
              <Card className={`bg-${getStatusColor(item._id)} text-white h-100`}>
                <Card.Body className="d-flex align-items-center">
                  <div className="flex-grow-1">
                    <div className="stats-number">{item.count}</div>
                    <div className="stats-label text-capitalize">{item._id.replace('-', ' ')}</div>
                  </div>
                  <div className="ms-3">
                    <i 
                      className={`bi ${
                        item._id === 'completed' ? 'bi-check-circle' : 
                        item._id === 'in-progress' ? 'bi-arrow-clockwise' : 
                        'bi-clock'
                      }`} 
                      style={{ fontSize: '2rem' }}
                    ></i>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* Recent Tasks */}
      <Row>
        <Col>
          <Card className="fade-in">
            <Card.Header className="bg-white border-bottom">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">
                  <i className="bi bi-clock-history me-2"></i>
                  Recent Tasks
                </h5>
                <Link to="/tasks" className="text-decoration-none">
                  View All
                  <i className="bi bi-arrow-right ms-1"></i>
                </Link>
              </div>
            </Card.Header>
            <Card.Body className="p-0">
              {recentTasks.length > 0 ? (
                <div className="list-group list-group-flush">
                  {recentTasks.map((task) => (
                    <div key={task.id} className="list-group-item list-group-item-action">
                      <div className="d-flex w-100 justify-content-between align-items-start">
                        <div className="flex-grow-1">
                          <h6 className="mb-1">{task.title}</h6>
                          {task.description && (
                            <p className="mb-1 text-muted">{task.description}</p>
                          )}
                          <small className="text-muted">
                            Created {formatDate(task.createdAt)}
                            {task.dueDate && (
                              <> • Due {formatDate(task.dueDate)}</>
                            )}
                          </small>
                        </div>
                        <div className="d-flex flex-column align-items-end">
                          <span className={`badge bg-${getStatusColor(task.status)} mb-1`}>
                            {task.status.replace('-', ' ')}
                          </span>
                          <span className={`badge bg-${getPriorityColor(task.priority)}`}>
                            {task.priority} priority
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-5">
                  <i className="bi bi-inbox text-muted mb-3" style={{ fontSize: '3rem' }}></i>
                  <h5 className="text-muted">No tasks yet</h5>
                  <p className="text-muted mb-3">Create your first task to get started!</p>
                  <Link to="/create-task">
                    <Button variant="primary" className="btn-custom">
                      <i className="bi bi-plus-circle me-2"></i>
                      Create Task
                    </Button>
                  </Link>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Mobile Create Button */}
      <div className="d-md-none">
        <div className="fixed-bottom p-3">
          <Link to="/create-task" className="w-100">
            <Button variant="primary" className="w-100 btn-custom">
              <i className="bi bi-plus-circle me-2"></i>
              New Task
            </Button>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default Dashboard;