/**
 * Navbar react component. To add new NavItems to the NavItem simply add
 * the NavItem component with the correct properties. The routing is handled in
 * the root app.tsx file
 */
import { LinkContainer } from 'react-router-bootstrap';
import { Container, Nav, Navbar } from 'react-bootstrap';

export default function Navigation() {
  return (
    <Navbar
      collapseOnSelect
      expand='lg'
      bg='theme-secondary-dark'
      variant='dark'
    >
      <Container>
        <LinkContainer to='/'>
          <Navbar.Brand>Battleship</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='ml-auto'>
            <LinkContainer to='/'>
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/about'>
              <Nav.Link>About</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
