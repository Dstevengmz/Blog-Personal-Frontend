import { Container } from 'react-bootstrap';
import AppNavbar from './AppNavbar';
import AppFooter from './AppFooter';

 function Layout({ children }) {
  return (
    <div className="d-flex flex-column min-vh-100">
      <AppNavbar />
      <main style={{ paddingTop: 72 }}>
        <Container className="py-4">
          {children}
        </Container>
      </main>
      <AppFooter />
    </div>
  );
}
export default Layout;
