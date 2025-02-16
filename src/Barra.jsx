import { Container, Nav, Navbar } from "react-bootstrap";

export default function Barra() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">TODO</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/super">Super</Nav.Link>
            <Nav.Link href="/general">General</Nav.Link>
            <Nav.Link href="https://calculadora-gastos-nueva.vercel.app/calculadora">Calculadora</Nav.Link>
            <Nav.Link href="https://exercise-app-hazel.vercel.app/">Ejercicios</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
