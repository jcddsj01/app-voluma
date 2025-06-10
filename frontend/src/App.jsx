import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from "axios";
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import BookList from './components/BookList';
import BookDetail from './components/BookDetail';

function App() {
    const [books, setBooks] = useState([]);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
    const [autorSelecionado, setAutorSelecionado] = useState(null);
    const [editoraSelecionada, setEditoraSelecionada] = useState(null);

    const loadBooks = async () => {
        const res = await axios.get("http://localhost:3000/livros");
        setBooks(res.data);
    };

    useEffect(() => {
        loadBooks();
    }, []);

    const handleCategoriaClick = (categoria) => {
        setCategoriaSelecionada(categoria);
    };

    const handleAutorClick = (autor) => {
        setAutorSelecionado(autor);
    };

    const handleEditoraClick = (editora) => {
        setEditoraSelecionada(editora);
    };

  return (
    <Router>
      <div className='max-w-screen-2xl mx-auto p-6'>
        <Header />
        <div className='flex'>
          <Sidebar
            books={books}
            onCategoriaClick={handleCategoriaClick}
            categoriaSelecionada={categoriaSelecionada}
            onAutorClick={handleAutorClick}
            autorSelecionado={autorSelecionado}
            onEditoraClick={handleEditoraClick}
            editoraSelecionada={editoraSelecionada}
          />
          <main className='flex-1'>
            <Routes>
              <Route
                path="/"
                element={<BookList books={books} categoria={categoriaSelecionada} autor={autorSelecionado} editora={editoraSelecionada} />}
              />
              <Route
                path="/:id"
                element={<BookDetail />}
              />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
