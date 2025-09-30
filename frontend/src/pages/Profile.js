import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../services/api';

const Profile = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  
  const { user, loadUser } = useAuth();

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear messages when user starts typing
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Basic validation
    if (!formData.name.trim() || !formData.email.trim()) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    try {
      await authAPI.updateProfile(formData);
      setSuccess('Profile updated successfully!');
      setIsEditing(false);
      
      // Reload user data to get updated info
      await loadUser();
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    // Reset form to original user data
    setFormData({
      name: user?.name || '',
      email: user?.email || ''
    });
    setIsEditing(false);
    setError('');
    setSuccess('');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow fade-in">
            <Card.Header className="bg-primary text-white">
              <h4 className="mb-0">
                <i className="bi bi-person-circle me-2"></i>
                My Profile
              </h4>
            </Card.Header>
            <Card.Body className="p-4">
              {/* Profile Picture Placeholder */}
              <div className="text-center mb-4">
                <div 
                  className="rounded-circle bg-primary text-white d-inline-flex align-items-center justify-content-center"
                  style={{ width: '80px', height: '80px', fontSize: '2rem' }}
                >
                  {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <h5 className="mt-2 mb-0">{user?.name}</h5>
                <p className="text-muted mb-0">{user?.email}</p>
                <small className="text-muted">
                  {user?.role === 'admin' ? (
                    <><i className="bi bi-shield-check me-1"></i>Administrator</>
                  ) : (
                    <><i className="bi bi-person me-1"></i>User</>
                  )}
                </small>
              </div>

              {error && (
                <Alert variant="danger" dismissible onClose={() => setError('')}>
                  <i className="bi bi-exclamation-triangle me-2"></i>
                  {error}
                </Alert>
              )}
              
              {success && (
                <Alert variant="success" dismissible onClose={() => setSuccess('')}>
                  <i className="bi bi-check-circle me-2"></i>
                  {success}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <i className="bi bi-person me-2"></i>
                    Full Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={!isEditing || loading}
                    placeholder="Enter your full name"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>
                    <i className="bi bi-envelope me-2"></i>
                    Email Address
                  </Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={!isEditing || loading}
                    placeholder="Enter your email"
                    required
                  />
                </Form.Group>

                {/* Account Information */}
                <Card className="bg-light mb-3">
                  <Card.Body className="py-2">
                    <h6 className="mb-2">
                      <i className="bi bi-info-circle me-2"></i>
                      Account Information
                    </h6>
                    <div className="small text-muted">
                      <div className="mb-1">
                        <strong>Account created:</strong> {user?.createdAt ? formatDate(user.createdAt) : 'N/A'}
                      </div>
                      <div className="mb-1">
                        <strong>Last updated:</strong> {user?.updatedAt ? formatDate(user.updatedAt) : 'N/A'}
                      </div>
                      <div>
                        <strong>Account status:</strong>{' '}
                        <span className={`badge ${user?.isActive ? 'bg-success' : 'bg-danger'}`}>
                          {user?.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </div>
                  </Card.Body>
                </Card>

                {/* Action Buttons */}
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  {!isEditing ? (
                    <Button
                      variant="primary"
                      onClick={() => setIsEditing(true)}
                      className="btn-custom"
                    >
                      <i className="bi bi-pencil me-2"></i>
                      Edit Profile
                    </Button>
                  ) : (
                    <>
                      <Button
                        variant="outline-secondary"
                        onClick={handleCancel}
                        disabled={loading}
                      >
                        <i className="bi bi-x-circle me-2"></i>
                        Cancel
                      </Button>
                      <Button
                        variant="primary"
                        type="submit"
                        disabled={loading}
                        className="btn-custom"
                      >
                        {loading ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                            Saving...
                          </>
                        ) : (
                          <>
                            <i className="bi bi-check-circle me-2"></i>
                            Save Changes
                          </>
                        )}
                      </Button>
                    </>
                  )}
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;