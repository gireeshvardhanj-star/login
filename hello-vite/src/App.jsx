import { useState } from 'react';
import './App.css';

function App() {
  const [mode, setMode] = useState('signup'); // 'signup' | 'signin'
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  function handleModeChange(nextMode) {
    setMode(nextMode);
    setSubmitted(false);
    setErrors({});
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    setErrors(prev => ({
      ...prev,
      [name]: '',
      general: '',
    }));
    setSubmitted(false);
  }

  function validateSignup() {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    return newErrors;
  }

  function validateSignin() {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    return newErrors;
  }

  function handleSubmit(e) {
    e.preventDefault();

    const validationErrors =
      mode === 'signup' ? validateSignup() : validateSignin();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSubmitted(false);
      return;
    }

    setSubmitted(true);
    setErrors({});

    if (mode === 'signup') {
      console.log('Signup data:', formData);
      // TODO: call signup API here
    } else {
      console.log('Signin data:', {
        email: formData.email,
        password: formData.password,
      });
      // TODO: call login API here
    }
  }

  const isSignup = mode === 'signup';

  return (
    <div className="app">
      <div className="signup-container">
        <div className="signup-header">
          <h1>{isSignup ? 'Create Account' : 'Welcome back'}</h1>
          <p>
            {isSignup
              ? 'Join us and explore awesome features.'
              : 'Sign in to continue to your account.'}
          </p>
        </div>

        {/* Toggle buttons */}
        <div className="mode-toggle">
          <button
            type="button"
            className={isSignup ? 'toggle-btn active' : 'toggle-btn'}
            onClick={() => handleModeChange('signup')}
          >
            Sign up
          </button>
          <button
            type="button"
            className={!isSignup ? 'toggle-btn active' : 'toggle-btn'}
            onClick={() => handleModeChange('signin')}
          >
            Sign in
          </button>
        </div>

        <form className="signup-form" onSubmit={handleSubmit} noValidate>
          {isSignup && (
            <div className="form-group">
              <label htmlFor="fullName">Full name</label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
              />
              {errors.fullName && (
                <span className="error-text">{errors.fullName}</span>
              )}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <span className="error-text">{errors.email}</span>
            )}
          </div>

          <div className={isSignup ? 'form-group two-column' : 'form-group'}>
            <div>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder={
                  isSignup ? 'Create a password' : 'Enter your password'
                }
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <span className="error-text">{errors.password}</span>
              )}
            </div>

            {isSignup && (
              <div>
                <label htmlFor="confirmPassword">Confirm password</label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Re-enter password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                {errors.confirmPassword && (
                  <span className="error-text">
                    {errors.confirmPassword}
                  </span>
                )}
              </div>
            )}
          </div>

          {errors.general && (
            <div className="error-banner">{errors.general}</div>
          )}

          {submitted && (
            <div className="success-banner">
              {isSignup
                ? 'Signup successful! You can now log in.'
                : 'Login successful! Redirecting...'}
            </div>
          )}

          <button type="submit" className="primary-button">
            {isSignup ? 'Sign up' : 'Sign in'}
          </button>

          <p className="bottom-text">
            {isSignup ? (
              <>
                Already have an account?{' '}
                <button
                  type="button"
                  className="link-like"
                  onClick={() => handleModeChange('signin')}
                >
                  Log in
                </button>
              </>
            ) : (
              <>
                Don&apos;t have an account?{' '}
                <button
                  type="button"
                  className="link-like"
                  onClick={() => handleModeChange('signup')}
                >
                  Create one
                </button>
              </>
            )}
          </p>
        </form>
      </div>
    </div>
  );
}

export default App;
