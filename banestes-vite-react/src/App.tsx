import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import '../public/style/App.css'

function App() {
  const [dados, setDados] = useState<Record<string, string>[]>([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [colaboradorDetalhado, setColaboradorDetalhado] = useState<Record<string, string> | null>(null);
  const [termoBusca, setTermoBusca] = useState('');
  const itensPorPagina = 10;

  useEffect(() => {
    Papa.parse<Record<string, string>>(
      'https://docs.google.com/spreadsheets/d/1PBN_HQOi5ZpKDd63mouxttFvvCwtmY97Tb5if5_cdBA/gviz/tq?tqx=out:csv&sheet=clientes',
      {
        download: true,
        header: true,
        complete: (results) => {
          setDados(results.data);
        },
      }
    );
  }, []);

  const dadosFiltrados = dados.filter((colaborador) =>
    Object.values(colaborador).some((valor) =>
      valor.toLowerCase().includes(termoBusca.toLowerCase())
    )
  );

  const itensVisiveis = dadosFiltrados.slice(
    (paginaAtual - 1) * itensPorPagina,
    paginaAtual * itensPorPagina
  );

  const totalPaginas = Math.ceil(dadosFiltrados.length / itensPorPagina);

  return (
    <div>
      {/* Barra de pesquisa */}
      <input
        type="text"
        placeholder="Buscar colaborador..."
        value={termoBusca}
        onChange={(e) => {
          setTermoBusca(e.target.value);
          setPaginaAtual(1);
        }}
        className="barra-pesquisa"
      />

      {/* Lista de colaboradores */}
      <div id="conteudo-principal">
        <ul>
          {itensVisiveis.map((colaborador, i) => (
            <li key={i}>
              <p><strong>ID:</strong> {colaborador.id}</p>
              <p><strong>Nome:</strong> {colaborador.nome}</p>
              <p><strong>Email:</strong> {colaborador.email}</p>
              <button onClick={() => setColaboradorDetalhado(colaborador)}>Detalhar</button>
            </li>
          ))}
        </ul>

        {/* Paginação */}
        <div className="paginacao">
          <button onClick={() => setPaginaAtual((prev) => Math.max(prev - 1, 1))} disabled={paginaAtual === 1}>
            Anterior
          </button>

          {Array.from({ length: totalPaginas }, (_, i) => (
            <button key={i} onClick={() => setPaginaAtual(i + 1)} disabled={paginaAtual === i + 1}>
              {i + 1}
            </button>
          ))}

          <button onClick={() => setPaginaAtual((prev) => Math.min(prev + 1, totalPaginas))} disabled={paginaAtual === totalPaginas}>
            Próxima
          </button>
        </div>
      </div>

      {/* Modal de detalhes */}
      {colaboradorDetalhado && (
        <div className="modal-overlay">
          <div className="modal-container">
          <button onClick={() => setColaboradorDetalhado(null)} className="btn-fechar">X</button>
            <div className="modal-header">
              <h3>Detalhes do Colaborador</h3>
            </div>
            <div className="modal-body">
              {Object.entries(colaboradorDetalhado).map(([chave, valor]) => (
                <p key={chave}>
                  <strong>{chave}:</strong> {valor}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;