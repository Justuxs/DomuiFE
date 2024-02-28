import React, { SyntheticEvent, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export interface ILoginFormProps {
  login: (email: string, password: string) => void;
  error: string;
}

type UserData = {
  email: string;
  password: string;
};
const LoginForm: React.FunctionComponent<ILoginFormProps> = ({ login, error }) => {
  const [details, setDetails] = useState<UserData>({} as UserData);
  const submitHandler = (e: SyntheticEvent) => {
    e.preventDefault();

    login(details.email, details.password);
  };

  const navigate = () => {
    document.location.href = "/register";
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="form-inner">
        <h2>Login</h2>
        {error ? <div className="error">{error}</div> : ""}
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
        <Button variant="contained" type="submit">
          LOGIN
        </Button>
        <Button className="right_button" variant="contained" type="button" onClick={navigate}>
          Register
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
