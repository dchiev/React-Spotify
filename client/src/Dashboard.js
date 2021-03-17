import React from "react";
import useAuth from "./useAuth";
import { Container, Form } from "react-bootstrap";
import { useState } from "react";

export default function Dashboard({ code }) {
  const accessToken = useAuth(code);
  const [search, setSearch] = useState("");
  return (
    <Container>
      <Form.Control
        type="search"
        placeholder="Search Songs/Artists"
        value={search}
        onchange={(e) => setSearch(e.target.value)}
      ></Form.Control>
    </Container>
  );
}
