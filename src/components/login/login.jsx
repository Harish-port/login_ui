import React from "react";
import loginImg from "../../login.svg";
import { Redirect } from "react-router-dom";
import { login } from "./UserFunctions";
import "./style.scss";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
      isRedirect: false
    };
  }
  handleClose = () => {
    this.setState({
      open:false
    })
  };
  handleClickOpen = () => {
    this.setState({
      open:true
    })
  };
  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  
  onSubmit = e => {
    // e.preventDefault();
    // const user = {
    //   email: this.state.email,
    //   password: this.state.password
    // };
    // login(user).then(res => {
    //   if (res && !res.error) {
    //     console.log(res,"responsedsss");
    //     toast.success("User Logged in Successfully");
    //     this.setState({ isRedirect: true });
    //   } else {
    //     console.log("err");
    //   }
    // });
    e.preventDefault();
    axios
    .post("http://localhost:4000/users/login", {
      email: this.state.email,
      password: this.state.password 
    })
    .then(response => {
      console.log(response.data);
      if (typeof response.data === "string") {
        localStorage.setItem("usertoken", response.data);
        toast.info("user logged in successfully");
        this.setState({isRedirect:true});
      } else {
        console.log("password incorrect");
      }
    })
    .catch(e => console.log(e, "<<<"));
  };
  
  render() {
    const { errors } = this.state;
    return (
      <div>
        <ToastContainer />
        <form
          className="base-container-login"
          ref={this.props.containerRef}
          onSubmit={this.onSubmit}
        >
          <div className="project-title">Trill Up</div>
          <div className="header-login">Login</div>
          <div className="content">
            <div className="image">
              <img className="login-img" alt="loginimage" src={loginImg}/>
            </div>
            <div className="form-login">
              <div className="form-group-login">
                <label className="label-sub" htmlFor="email">
                  Email Address
                </label>
                <input
                  className="login-input"
                  type="email"
                  id="email"
                  placeholder="Enter email"
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                />
              </div>
              <div className="form-group-login">
                <label className="label-sub" htmlFor="password">
                  Password
                </label>
                <input
                  className="login-input"
                  type="password"
                  id="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.onChange}
                  error={errors.password}
                />
              </div>
            </div>
          </div>
          <div>
          <h5 variant="outlined" color="primary" onClick={this.handleClickOpen}>
            Open form dialog
          </h5>
          <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <form onSubmit={this.onSubmit}>
            <DialogTitle id="form-dialog-title">Forgot Your Password? Dont Worry </DialogTitle>
            <DialogContent>
              <DialogContentText>
               We will send you a link to create a new password.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Email Address"
                type="email"
                value={this.state.forgotEmail}
                onChange={this.handleEmail}
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Submit
              </Button>
            </DialogActions>
          </form>
          </Dialog>
        </div>
          <div className="footer">
            <button type="submit" className="auth-btn">
              Login
            </button>
          </div>
        </form>
        {this.state.isRedirect ? <Redirect push to="/slidebar" /> : null}
      </div>
    );
  }
}

export default Login;
