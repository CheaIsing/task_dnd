import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { showToast } from "../utils/toast";
import { axiosInstance } from "../utils/axiosConfig";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = async (e)=>{
    e.preventDefault();

    if(!name || !email || !password){
      return showToast('error', 'All field are required.')
    }

    const formData = {name, email, password}

    try {
      await axiosInstance.post("/auth/register", formData);

      showToast('success', 'Register Successfully.')

      setTimeout(()=>{
        navigate("/")
      }, 1200)
    } catch (error) {
      console.log(error);
      showToast('error', error?.response?.data?.message || error.message)
    }
  }

  return (
    <div>
      <form className="needs-validation" onSubmit={onSubmit}>
        <h3 className="mb-4 text-center">Register to Your Account</h3>
        <div className="mb-3">
          <label for="loginEmail" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="loginEmail"
            placeholder="eg. jonh doe"
            value={name}
            onChange={(e)=>{setName(e.target.value)}}
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
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
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
              value={password}
              onChange={(e)=>{setPassword(e.target.value)}}
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
