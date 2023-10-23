import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Form, Modal, Row } from 'react-bootstrap'

function AlbumsShow(props) {
    const {albums, setAlbums} = props;
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedAlbum, setSelectedAlbum] = useState({});
    const [editedTitle, setEditedTitle] = useState('');

    useEffect(() => {
        // Fetch albums when the component mounts
    fetch('https://jsonplaceholder.typicode.com/albums')
    .then(response => response.json())
    .then(data => setAlbums(data))
    .catch(error => console.error('Error fetching albums:', error));
    }, []);

    const handleEdit = (album) => {
    // Set the selected album and open the edit modal
    setSelectedAlbum(album);
    setEditedTitle(album.title);
    setShowEditModal(true);
  };

  const handleDelete = (album) => {
    // Set the selected album and open the delete modal
    setSelectedAlbum(album);
    setShowDeleteModal(true);
  };

  const handleCloseEditModal = () => {
    // Close the edit modal
    setShowEditModal(false);
  };

  const handleCloseDeleteModal = () => {
    // Close the delete modal
    setShowDeleteModal(false);
  };

  const handleSaveChanges = () => {
    //  PUT request to update the album on the server
    const updatedAlbum = { ...selectedAlbum, title: editedTitle };

    // Dummy PUT request
    fetch(`https://jsonplaceholder.typicode.com/albums/${selectedAlbum.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedAlbum),
    })
      .then(response => response.json())
      .then(data => {
        // Update the local state with the updated album
        setAlbums(albums.map(album => (album.id === data.id ? data : album)));
        setShowEditModal(false);
      })
      .catch(error => console.error('Error updating album:', error));
  };

  const handleDeleteAlbum = () => {
    // DELETE request to delete the album on the server

    // Dummy DELETE request
    fetch(`https://jsonplaceholder.typicode.com/albums/${selectedAlbum.id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          // Update the local state by removing the deleted album
          setAlbums(albums.filter(album => album.id !== selectedAlbum.id));
          setShowDeleteModal(false);
        } else {
          console.error('Error deleting album:', response.statusText);
        }
      })
      .catch(error => console.error('Error deleting album:', error));
  };

  return (
    <Container>
      <h1>Albums</h1>
      <Row>
        {albums.map(album => (
          <Col key={album.id} sm={6} md={4} lg={3}>
            <Card style={{ marginBottom: '15px', minHeight:200 }}>
              <Card.Body>
                <Card.Title>{album.title}</Card.Title>
                <Card.Text>Album ID: {album.id}</Card.Text>
                <Button variant="info" onClick={() => handleEdit(album)}>
                  Edit
                </Button>{' '}
                <Button variant="danger" onClick={() => handleDelete(album)}>
                  Delete
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Album</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="editAlbumTitle">
            <Form.Label>New Title</Form.Label>
            <Form.Control
              type="text"
              value={editedTitle}
              onChange={e => setEditedTitle(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Modal */}
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Album</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete the album "{selectedAlbum.title}"?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteAlbum}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}

export default AlbumsShow
