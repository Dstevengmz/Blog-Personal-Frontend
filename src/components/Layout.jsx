import AppNavbar from './AppNavbar';
import AppFooter from './AppFooter';

 function Layout({ children }) {
  return (
    <div className="d-flex flex-column min-vh-100">
  <AppNavbar />
  <main className="pt-fixed-nav flex-grow-1 d-flex flex-column">
  {children}
      </main>
      <AppFooter />
    </div>
  );
}
export default Layout;
