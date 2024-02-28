import React, { SyntheticEvent, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export interface IRegisterFormProps {
  register: (name: string, surname: string, email: string, password: string,password_repeat: string) => void;
  error: string;
}
type UserData = {
  name: string;
  surname: string;
  email: string;
  password: string;
  password_repeat: string;
};

const RegisterForm: React.FunctionComponent<IRegisterFormProps> = ({ register, error }) => {
  const [details, setDetails] = useState<UserData>({} as UserData);
  const submitHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    register(details.name, details.surname, details.email, details.password,details.password_repeat);
  };
  const handleLogin = () => {
    document.location.href = "/login";
  };
  return (
    <form onSubmit={submitHandler}>
      <div className="form-inner">
        <h2>Register</h2>
        {error ? <div className="error">{error}</div> : ""}
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <TextField
            type="name"
            name="name"
            id="outlined-basic"
            onChange={(e) => setDetails({ ...details, name: e.target.value })}
            value={details.name}
          />
        </div>
        <div className="form-group">
          <label htmlFor="surname">Surname:</label>
          <TextField
            type="surname"
            name="surname"
            id="outlined-basic"
            onChange={(e) => setDetails({ ...details, surname: e.target.value })}
            value={details.surname}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <TextField
            type="email"
            name="email"
            id="outlined-basic"
            onChange={(e) => setDetails({ ...details, email: e.target.value })}
            value={details.email}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <TextField
            type="password"
            name="password"
            id="outlined-basic"
            onChange={(e) => setDetails({ ...details, password: e.target.value })}
            value={details.password}
          />
        </div>
          <div className="form-group">
            <label htmlFor="password_repeat">Repeat password:</label>
            <TextField
                type="password"
                name="password_repeat"
                id="outlined-basic"
                onChange={(e) => setDetails({ ...details, password_repeat: e.target.value })}
                value={details.password_repeat}
            />
        </div>
        <Button variant="contained" type="submit">
          Register
        </Button>
        <Button className="right_button" variant="contained" type="button" onClick={handleLogin}>
          Login
        </Button>
      </div>
    </form>
  );
};

export default RegisterForm;
