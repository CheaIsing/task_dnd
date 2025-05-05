import React from "react";
import { Link } from "react-router";

const Register = () => {
  return (
    <div>
      <form className="needs-validation" novalidate>
        <h3 className="mb-4 text-center">Register to Your Account</h3>
        <div className="mb-3">
          <label for="loginEmail" className="form-label">
            Name
          </label>
          <input
            type="email"
            className="form-control"
            id="loginEmail"
            placeholder="eg. jonh doe"
            required
          />
          <div className="invalid-feedback">
            Please enter a valid email address.
          </div>
        </div>
        <div className="mb-3">
          <label for="loginEmail" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="loginEmail"
            placeholder="name@example.com"
            required
          />
          <div className="invalid-feedback">
            Please enter a valid email address.
          </div>
        </div>
        <div className="mb-3">
          <label for="loginPassword" className="form-label">
            Password
          </label>
          <div className="input-group">
            <input
              type="password"
              className="form-control"
              id="loginPassword"
              placeholder="Enter your password"
              required
            />

            <div className="invalid-feedback">Please enter your password.</div>
          </div>
        </div>

        <div className="d-grid gap-2">
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </div>
        <div className="text-center mt-3">
          <Link to={"/login"} className="text-decoration-none">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
