import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from './Components/NavbarComp';
import AlbumsShow from './Components/AlbumsShow';
import { useState } from 'react';

function App() {
  const [albums, setAlbums] = useState([]);
  return (
    <>
      <Navbar albums={albums} setAlbums={setAlbums} />
      <AlbumsShow albums={albums} setAlbums={setAlbums} />
    </>
  );
}

export default App;
