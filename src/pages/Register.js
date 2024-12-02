import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { FormattedMessage } from "react-intl";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const API_URL = process.env.REACT_APP_API;
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Regular expression to validate password
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    // Check if the password and confirm password match
    if (password !== confirmPassword) {
      toast.error("Password and confirm password do not match");
    }
    // Check if the password meets the required criteria
    else if (!passwordRegex.test(password)) {
      toast.error(
        "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special symbol."
      );
    } else {
      try {
        setLoading(true); // Set loading to true before making the request
        const response = await axios.post(
          `${API_URL}/api/v1/user/register`,
          {
            userName: userName,
            fullName: fullName,
            email: email,
            password: password,
          }
        );

        if (response && response.status === 201) {
          toast.success(<FormattedMessage id="auth" defaultMessage="auth" />);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        setLoading(false); // Set loading to false after the request is done
      }
    }
  };

  return (
    <div className="login-page">
      <ToastContainer />
      <div className="login-container">
        <h2>Join the Adventure!</h2>
        <p>Create your account and start your journey with us</p>
        <form onSubmit={handleSubmit}>
          <input className='login-input'
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          <input className='login-input'
            type="text"
            placeholder="User Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
          <input className='login-input'
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input className='login-input'
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input className='login-input'
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <div className="login-link">
          <a href="/login">Back to login</a>
        </div>
      </div>
    </div>
  );
};

export default Register;
