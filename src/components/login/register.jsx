import React from "react";
import loginImg from "../../login.svg";
import { register } from "./UserFunctions";
import "./style.scss";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import profileImg from "../../download.png";

export class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      errors: {
        email: "",
        password: "",
        name: "",
      },
    };
  }

  // onChange = e => {
  //   this.setState({ [e.target.id]: e.target.value });
  // };
  onSubmit = e => {
    e.preventDefault();
    const user = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    };
    const { errors } = this.state;
    const emailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    errors.name = user.name === '' ? "user field cant be empty" : "";
    errors.email = !user.email.match(emailformat) ? "Invalid Email" : "";
    errors.password =
      user.password.length < 6
        ? "Password should be more than 6 characters"
        : "";
    console.log(errors);
    if (errors.email === "" && errors.password === "") {
      register(user).then(res => {
        toast.info("User Registered Successfully");
        console.log(res);
      });
    }
  };

  onChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let errors = this.state.errors;
    switch (name) {
      case "name":
        errors.name =
          value.length < 5 ? "name must be atleast 5 characters long!" : "";
        break;
      case "email":
        const validEmailRegex = RegExp(
          /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
        );
        errors.email = validEmailRegex.test(value) ? " " : "Email is not Valid";
        break;
      case "password":
        errors.password =
          value.length < 8 ? "Password must be 8 characters long!" : "";
        break;
      default:
        break;
    }
    this.setState({ errors, [name]: value }, () => {
      console.log(errors);
    });
  };
  // onSubmit = e => {
  //   e.preventDefault();
  //   const user = {
  //     name: this.state.name,
  //     email: this.state.email,
  //     password: this.state.password
  //   };
  //   if (user.name === "" && user.password === "" && user.email === "") {
  //   alert("all fields need");
  //   }else{
  //     register(user).then(res => {
  //       toast.info("User Registered Successfully");
  //       console.log(res);
  //     });
  //   }
  // };

  render() {
    const { errors } = this.state;
    console.log(errors, "<<<<erros");
    return (
      <form noValidate onSubmit={this.onSubmit}>
        <ToastContainer />
        <div className="base-container-login" ref={this.props.containerRef}>
          <div className="header-login">Register</div>
          <div className="content">
            <div className="image">
              <img className="login-img" src={profileImg} alt="login-images" />
            </div>
            <div className="form-login">
              <div className="form-group-login">
                <label className="label-sub" htmlFor="username">
                  Username
                </label>
                <input
                  className="login-input"
                  type="text"
                  id="name"
                  name="name"
                  placeholder="name"
                  value={this.state.name}
                  onChange={this.onChange}
                />
                <div className="error-message">{errors.name}</div>
              </div>
              <div className="form-group-login">
                <label className="label-sub" htmlFor="email">
                  Email
                </label>
                <input
                  className="login-input"
                  type="email"
                  id="email"
                  name="email"
                  placeholder="email"
                  value={this.state.email}
                  onChange={this.onChange}
                />
                <div className="error-message">{errors.email}</div>
              </div>
              <div className="form-group-login">
                <label className="label-sub" htmlFor="password">
                  Password
                </label>
                <input
                  className="login-input"
                  type="password"
                  id="password"
                  name="password"
                  placeholder="password"
                  value={this.state.password}
                  onChange={this.onChange}
                />
                <div className="error-message">{errors.password}</div>
              </div>
            </div>
          </div>
          <div className="footer">
            <button type="submit" className="auth-btn">
              Register
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default Register;
