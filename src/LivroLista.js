import React, { useState, useEffect } from 'react';
import { ControleLivros } from './controle/ControleLivros';
import { ControleEditora } from './controle/ControleEditora';

// a) Instanciar controladores
const controleLivro = new ControleLivros();
const controleEditora = new ControleEditora();

const LivroLista = () => {
    // h) Definir estado para livros e carregado
    const [livros, setLivros] = useState([]);
    const [carregado, setCarregado] = useState(false);

    // i) useEffect para carregar os livros quando "carregado" mudar
    useEffect(() => {
        if (!carregado) {
            setLivros(controleLivro.getLivros());
            setCarregado(true);
        }
    }, [carregado]);

    // j) Função para excluir livro
    const excluir = (codigo) => {
        controleLivro.excluir(codigo);
        setCarregado(false); // Força o recarregamento dos livros
    };

    // Função auxiliar para criar as linhas de tabela
    const LinhaLivro = (props) => {
        const { livro, excluir } = props;
        const nomeEditora = controleEditora.getNomeEditora(livro.codEditora);

        return (
            <tr>
                <td>{livro.titulo}</td>
                <td>{nomeEditora}</td>
                <td>{livro.resumo}</td>
                <td>
                    <ul>
                        {livro.autores.map((autor, index) => (
                            <li key={index}>{autor}</li>
                        ))}
                    </ul>
                </td>
                <td>
                    <button className="btn btn-danger" onClick={() => excluir(livro.codigo)}>
                        Excluir
                    </button>
                </td>
            </tr>
        );
    };

    // k) Retornar a tabela de livros
    return (
        <main className="container">
            <h1>Lista de Livros</h1>
            <table className="table table-secondary table-striped">
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Editora</th>
                        <th>Resumo</th>
                        <th>Autores</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {livros.map((livro) => (
                        <LinhaLivro
                            key={livro.codigo}
                            livro={livro}
                            excluir={excluir}
                        />
                    ))}
                </tbody>
            </table>
        </main>
    );
};

export default LivroLista;

// import React, { useState, useEffect } from 'react';
// import { ControleLivros } from './controle/ControleLivros';
// import { ControleEditora } from './controle/ControleEditora';

// // a) Instanciar o controlador de livros e editoras
// const controleLivro = new ControleLivros();
// const controleEditora = new ControleEditora();

// // b) Definir o componente auxiliar LinhaLivro
// const LinhaLivro = (props) => {
//     const { livro, excluir } = props;
  
//     // c) Atributo nomeEditora, invocando getNomeEditora
//     const nomeEditora = controleEditora.getNomeEditora(livro.codEditora);

//     return (
//         // d) Retornar linha de tabela com valores do livro
//         <tr>
//             <td>{livro.titulo}</td>
//             <td>{livro.resumo}</td>
//             <td>{nomeEditora}</td>
//             <td>
//                 {/* f) Exibir autores como lista HTML */}
//                 <ul>
//                     {livro.autores.map((autor, index) => (
//                         <li key={index}>{autor}</li>
//                     ))}
//                 </ul>
//             </td>
//             <td>
//                 {/* e) Botão de exclusão */}
//                 <button onClick={() => excluir(livro.codigo)} className="btn btn-danger">Excluir</button>
//             </td>
//         </tr>
//     );
// };

// // g) Definir o componente LivroLista
// const LivroLista = () => {
//     // h) Definir as propriedades livros e carregado com useState
//     const [livros, setLivros] = useState([]);
//     const [carregado, setCarregado] = useState(false);

//     // i) Hook useEffect para carregar os livros e alterar carregado
//     useEffect(() => {
//         if (!carregado) {
//             setLivros(controleLivro.getLivros());
//             setCarregado(true);
//         }
//     }, [carregado]);

//     // j) Método excluir estilo arrow function
//     const excluir = (codigo) => {
//         controleLivro.excluir(codigo);
//         setCarregado(false); // Forçar o redesenho após a exclusão
//     };

//     // k) Retornar a área principal (main) com a tabela de livros
//     return (
//         <main className="container">
//             <h1>Lista de Livros</h1>
//             <table className="table table-secondary table-striped">
//                 <thead>
//                     <tr>
//                         <th>Título</th>
//                         <th>Sinopse</th>
//                         <th>Editora</th>
//                         <th>Autores</th>
//                         <th>Ações</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {/* l) Gerar linhas da tabela usando map */}
//                     {livros.map((livro) => (
//                         <LinhaLivro 
//                             key={livro.codigo} 
//                             livro={livro} 
//                             excluir={excluir} 
//                         />
//                     ))}
//                 </tbody>
//             </table>
//         </main>
//     );
// };

// export default LivroLista;
