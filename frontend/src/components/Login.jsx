import React, { useState } from "react";
import { Link } from "react-router";
import { showToast } from "../utils/toast";
import { axiosInstance } from "../utils/axiosConfig";
import useAuthStore from "../store/authStore";

const Login = () => {
  const [email, setEmail] = useState("ising@gmail.com");
  const [password, setPassword] = useState("11111111");
  const [isLoading, setIsLoading] = useState(false);

  const {user, setUser} = useAuthStore()

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return showToast("error", "All field are required.");
    }

    try {
      setIsLoading(true);

      const {data} = await axiosInstance.post("/auth/login", {
        email,
        password,
      });

      const {data:user}=data
  
      
      showToast("success", "Login Successfully.");
      setTimeout(()=>{
        setUser(user);
      }, 1500)
      // setUser(user)

    } catch (error) {
      showToast("error", error.message);
      console.log(error);
      
    }finally{
      setIsLoading(false)
    }
  };

  return (
    <div>
      <form className="needs-validation" onSubmit={handleSubmit}>
        <h3 className="mb-4 text-center">Login to Your Account</h3>
        <div className="mb-3">
          <label for="loginEmail" className="form-label">
            Email address
          </label>
          <input
            type="text"
            className="form-control"
            id="loginEmail"
            placeholder="name@example.com"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
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
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
            />

            <div className="invalid-feedback">Please enter your password.</div>
          </div>
        </div>

        <div className="d-grid gap-2">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>
        </div>
        <div className="text-center mt-3">
          <Link to={"/register"} className="text-decoration-none">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
