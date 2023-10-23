import { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function NavbarComp(props) {
  const {albums, setAlbums} = props;
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  const handleAdd = () => {
    // Open the add modal
    setShowAddModal(true);
  };

  const handleCloseAddModal = () => {
    // Close the add modal
    setShowAddModal(false);
  };

  const handleSaveNewAlbum = () => {
    // Make a POST request to add the new album to the server
    const newAlbum = {
      title: newTitle
    };

    // Dummy POST request
    fetch('https://jsonplaceholder.typicode.com/albums', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newAlbum),
    })
      .then(response => response.json())
      .then(data => {
        // Update the local state with the new album
        setAlbums([...albums, data]);
        setShowAddModal(false);
      })
      .catch(error => console.error('Error adding album:', error));
  };


  return (
    <>
    <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">Albums</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Button variant="success" onClick={handleAdd}>
            Add Album
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>

      {/* Add Modal */}
      <Modal show={showAddModal} onHide={handleCloseAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Album</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="newAlbumTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveNewAlbum}>
            Save Album
          </Button>
        </Modal.Footer>
    </Modal>
  </>
  );
}

export default NavbarComp;