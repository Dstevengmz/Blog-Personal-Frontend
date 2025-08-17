import { Container } from 'react-bootstrap';

  function AppFooter() {
  return (
    <footer className="border-top mt-auto py-4 bg-light">
      <Container className="text-center text-secondary">
        <small>
          © {new Date().getFullYear()} Mi Blog — Construido con React & Express
        </small>
      </Container>
    </footer>
  );
}
export default AppFooter;