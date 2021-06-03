import React, { useContext, useState } from "react";
import { useHistory } from "react-router";

import { Container, Content, Link } from "./styles";

import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Form } from "../../components";
import { UserContext } from "../../context/userContext";
import { createUser } from "../../services/user";

function Signup() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");
  const { setUser } = useContext(UserContext);
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();

    const data = {
      name,
      username,
      password,
      confirmPassword,
      imageUrl,
    };

    createUser(data).then((response) => {
      const { user, error } = response;

      if (!error) {
        setUser(user);
        history.push("/chat");
      }

      setName("");
      setUsername("");
      setPassword("");
      setConfirmPassword("");
      setImageUrl("");
      setError(error);
    });
  }
  return (
    <Container>
      <Link onClick={() => history.goBack()}>
        <ArrowBackIcon />
      </Link>

      <Content>
        <Form onSubmit={handleSubmit} method="POST">
          <Form.Title>Sign Up</Form.Title>
          {error ? <Form.Error>{error}</Form.Error> : null}

          <div>
            <Form.Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="* Name"
              required
            />

            <Form.Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="* Username"
              required
            />
            <Form.InputWrapper>
              <Form.Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="* Password"
                required
              />
              <Form.Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="* Confirm Password"
                required
              />
            </Form.InputWrapper>

            <Form.Input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Image URl (optional)"
            />
          </div>

          <Form.Submit type="submit">Sign Up</Form.Submit>

          <Form.Description>
            Already user?
            <Form.Link to="/signin">Sign In</Form.Link>
          </Form.Description>
        </Form>
      </Content>
    </Container>
  );
}

export default Signup;
