import React, { useState } from 'react'
import "./css/LoginSignUp.css"
import API from "../config";

const LoginSignup = () => {
  const [state, setstate] = useState("Login")
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  })
  
  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const login = async () => {
    console.log("login", formData);

    try {
      const response = await fetch(`${API}/login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

const text = await response.text();
console.log("SERVER RESPONSE:", text);

const responsedata = text ? JSON.parse(text) : {};      console.log("LOGIN RESPONSE 👉", responsedata);

      if (responsedata.success) {
        localStorage.setItem("auth-token", responsedata.token);
        window.location.replace("/");
      } else {
        alert(responsedata.error || "Invalid email or password");
      }
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  const signup = async () => {
    console.log("sign up", formData)
    let responsedata;
    await fetch(`${API}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    }).then((response) => response.json()).then((data) => { responsedata = data })

    if (responsedata.success) {
      localStorage.setItem("auth-token", responsedata.token);
      window.location.replace("/");
    }
    else {
      alert(responsedata.error)
    }
  }

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <div className="loginsignup-left">
          <div className="left-content">
            <div className="logo">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#844B36" strokeWidth="1.5"/>
                <path d="M2 17L12 22L22 17" stroke="#844B36" strokeWidth="1.5"/>
                <path d="M2 12L12 17L22 12" stroke="#844B36" strokeWidth="1.5"/>
              </svg>
              <span>SHOP</span>
            </div>
            <h2>Welcome back</h2>
            <p>Sign in to access your account and manage your orders</p>
          </div>
        </div>
        <div className="loginsignup-right">
          <div className="right-content">
            <div className="form-header">
              <h3>{state === "Login" ? "Sign In" : "Create Account"}</h3>
              <p>{state === "Login" ? "Enter your credentials to access your account" : "Fill in your details to get started"}</p>
            </div>

            <div className="form-body">
              {state === "Sign Up" && (
                <div className="form-group">
                  <label>Full name</label>
                  <input 
                    type="text" 
                    name="username" 
                    value={formData.username} 
                    onChange={changeHandler} 
                    placeholder="John Doe"
                  />
                </div>
              )}
              
              <div className="form-group">
                <label>Email address</label>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={changeHandler} 
                  placeholder="john@example.com"
                />
              </div>
              
              <div className="form-group">
                <label>Password</label>
                <input 
                  type="password" 
                  name="password" 
                  value={formData.password} 
                  onChange={changeHandler} 
                  placeholder="••••••••"
                />
              </div>

              {state === "Login" && (
                <div className="forgot-password">
                  <a href="/">Forgot password?</a>
                </div>
              )}

              <button className="submit-btn" onClick={() => { state === "Login" ? login() : signup() }}>
                {state === "Login" ? "Sign in" : "Create account"}
              </button>

              <div className="form-switch">
                {state === "Sign Up" ? (
                  <p>
                    Already have an account? 
                    <button onClick={() => { setstate("Login") }}>Sign in</button>
                  </p>
                ) : (
                  <p>
                    Don't have an account? 
                    <button onClick={() => { setstate("Sign Up") }}>Create one</button>
                  </p>
                )}
              </div>

              <div className="terms">
                <p>By continuing, you agree to our <a href="/">Terms</a> and <a href="/">Privacy Policy</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginSignup