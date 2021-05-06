import { Container, Navbar } from 'react-bootstrap';
import { useWindowDimensions } from '../hooks';

export default function Footer() {
  const dimensions = useWindowDimensions();

  // TODO magic number, attempting to make the navbar non-fixed on smaller
  // screens here. This is what I came up with but it's mostly a hack.
  return (
    <Navbar
      expand='lg'
      bg='theme-secondary-dark'
      variant='dark'
      as='footer'
      className='mt-3'
      fixed={dimensions.height >= 955 ? 'bottom' : undefined}
    >
      <Container className='align-items-center justify-content-center'>
        <p className='theme-text-secondary text-center'>Some text and stuff</p>
      </Container>
    </Navbar>
  );
}
