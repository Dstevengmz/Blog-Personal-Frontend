import { Container, Row, Col } from 'react-bootstrap';
import { FaGithub, FaLinkedin, FaInstagram  } from 'react-icons/fa'; 

function AppFooter() {
  return (
    <footer className="bg-dark text-white py-4 mt-auto">
      <Container className="text-center">
        <Row>
          <Col>
            <small>
              © {new Date().getFullYear()} Mi Blog Darwin — Construido con React & NodeJs 
            </small>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <div>
              <a href="https://github.com/dstevengmz" target="_blank" rel="noopener noreferrer" className="text-white mx-2">
                <FaGithub size={20} />
              </a>
              <a href="https://www.linkedin.com/in/dstevengmz" target="_blank" rel="noopener noreferrer" className="text-white mx-2">
                <FaLinkedin size={20} />
              </a>
              <a href="https://www.instagram.com/dstevengmz1/" target="_blank" rel="noopener noreferrer" className="text-white mx-2">
                <FaInstagram  size={20} />
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default AppFooter;
