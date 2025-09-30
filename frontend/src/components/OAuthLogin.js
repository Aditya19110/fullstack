import React from 'react';
import { Button, Alert } from 'react-bootstrap';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../services/firebase';
import { useAuth } from '../context/AuthContext';

const OAuthLogin = ({ loading: parentLoading, error: parentError }) => {
  const { loginWithFirebase, loading: authLoading } = useAuth();
  const [localLoading, setLocalLoading] = React.useState(false);
  const [localError, setLocalError] = React.useState('');

  const handleGoogleLogin = async () => {
    try {
      setLocalLoading(true);
      setLocalError('');
      
      // Sign in with Google
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();
      
      // Send token to your backend
      const response = await loginWithFirebase(idToken);
      console.log('Backend response:', response);
      
      if (!response.success) {
        setLocalError(response.message || 'Login failed');
      } else {
        console.log('OAuth login successful!');
      }
    } catch (error) {
      
      if (error.code === 'auth/popup-closed-by-user') {
        setLocalError('Login cancelled');
      } else if (error.code === 'auth/popup-blocked') {
        setLocalError('Popup blocked. Please allow popups and try again.');
      } else if (error.code === 'auth/internal-error') {
        setLocalError('Firebase configuration error. Google sign-in may not be enabled in Firebase Console.');
      } else if (error.code === 'auth/unauthorized-domain') {
        setLocalError('This domain is not authorized. Please add localhost to Firebase authorized domains.');
      } else {
        setLocalError(`Google login failed: ${error.message || 'Unknown error'}`);
      }
    } finally {
      setLocalLoading(false);
    }
  };

  const isLoading = localLoading || authLoading || parentLoading;
  const displayError = localError || parentError;

  return (
    <div className="oauth-login">
      {displayError && (
        <Alert variant="danger" className="mb-3">
          <i className="bi bi-exclamation-triangle me-2"></i>
          {displayError}
        </Alert>
      )}
      
      <Button
        variant="outline-danger"
        onClick={handleGoogleLogin}
        disabled={isLoading}
        className="w-100 mb-3 btn-oauth"
        style={{
          borderColor: '#db4437',
          color: '#db4437'
        }}
      >
        {isLoading ? (
          <>
            <span className="spinner-border spinner-border-sm me-2" role="status"></span>
            Signing in...
          </>
        ) : (
          <>
            <i className="bi bi-google me-2"></i>
            Continue with Google
          </>
        )}
      </Button>
      
      <div className="text-center mb-3">
        <span className="text-muted">
          <small>or</small>
        </span>
      </div>
    </div>
  );
};

export default OAuthLogin;