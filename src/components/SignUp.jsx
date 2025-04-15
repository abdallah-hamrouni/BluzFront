import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Axios for API requests

const Signup = () => {
  const [name, setName] = useState(''); // Name field
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState(''); // Phone field
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      // Make a POST request to the API route
      const response = await axios.post('https://bluz-backend.onrender.com/api/auth/register', {
        name,
        email,
        password,
        phone,
      });

      if (response.status === 201) {
        navigate('/login');
      }
    } catch (error) {
      setError('Failed to create an account. Please try again.');
    }
  };

  return (
    <div>
      <div className="wrapper" style={{ backgroundImage: 'url("assets/images/bg-registration-form-2.jpg")' }}>
        <div className="inner yo">
          <form onSubmit={handleSignup}>
            <h3>Registration Form</h3>

            {/* Name Field */}
            <div className="form-wrapper">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* Email Field */}
            <div className="form-wrapper">
              <label>Email</label>
              <input
                type="text"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password Field */}
            <div className="form-wrapper">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Confirm Password Field */}
            <div className="form-wrapper">
              <label>Confirm Password</label>
              <input
                type="password"
                className="form-control"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            {/* Phone Field */}
            <div className="form-wrapper">
              <label>Phone</label>
              <input
                type="text"
                className="form-control"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Error display */}

            <div className="checkbox">
              <label>
                <input type="checkbox" required /> I accept the Terms of Use & Privacy Policy.
                <span className="checkmark" />
              </label>
            </div>
            <p>Already have an account? <Link to="/login">Login Now</Link></p>
            <button type="submit" className="my-button">Register Now</button>
            
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
