import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LivroLista from './LivroLista';
import LivroDados from './LivroDados';

// d) No retorno do componente, o BrowserRouter será usado para definir as rotas
function App() {
    return (
        <Router>
            {/* e) Menu de navegação com Bootstrap */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Livros React</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Lista de Livros</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/dados">Adicionar Livro</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* d) Definir as rotas com BrowserRouter */}
            <Routes>
                <Route path="/" element={<LivroLista />} />
                <Route path="/dados" element={<LivroDados />} />
            </Routes>
        </Router>
    );
}

export default App;
