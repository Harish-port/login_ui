import axios from "axios";
export const register = newUser => {
  return axios
    .post("http://localhost:4000/users/register", {
      name: newUser.name,
      email: newUser.email,
      password: newUser.password
    })
    .then(response => {
      console.log("Registered");
    });
};

export const login = user => {
  return axios
    .post("http://localhost:4000/users/login", {
      email: user.email,
      password: user.password 
    })
    .then(response => {
      console.log(response.data);
      if (typeof response.data === "string") {
        localStorage.setItem("usertoken", response.data);
      } else {
        console.log("password incorrect");
      }
    })
    .catch(e => console.log(e, "<<<"));
};


