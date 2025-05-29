import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import { API_BASE_URL } from '../utils/contants';
import { Link, useNavigate } from 'react-router-dom';
import useUser from '../hooks/useUser';

export default function TipoProblemaPage() {
  const navigate = useNavigate();
  const { user, validaLogado } = useUser();
  const [tipos, setTipos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditando, setIsEditando] = useState(false);
  const [tipoAtual, setTipoAtual] = useState({ id: null, nome: '' });
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [tipoParaExcluir, setTipoParaExcluir] = useState(null);

  useEffect(() => {
      async function init() {
          const validUserPerfil = await validaLogado();
          if (!validUserPerfil) {
              navigate("/login", { replace: true });
              return;
          }
          if (validUserPerfil.nivel === 2) {
              navigate("/cidadao", { replace: true });
              return;
          }
      }
      init();
  }, [navigate]);

  // Carregar os tipos
  useEffect(() => {
    carregarTipos();
  }, []);

  const carregarTipos = () => {
    fetch(`${API_BASE_URL}/tipo`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
      .then(res => res.json())
      .then(data => setTipos(data));
  };

  const abrirModalNovo = () => {
    setTipoAtual({ id: null, nome: '' });
    setIsEditando(false);
    setShowModal(true);
  };

  const abrirModalEditar = (tipo) => {
    setTipoAtual(tipo);
    setIsEditando(true);
    setShowModal(true);
  };

  const salvarTipo = () => {
    const metodo = isEditando ? 'PUT' : 'POST';
    const url = isEditando ? `${API_BASE_URL}/tipo/${tipoAtual.id}` : `${API_BASE_URL}/tipo`;

    fetch(url, {
      method: metodo,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({ nome: tipoAtual.nome })
    }).then(() => {
      setShowModal(false);
      carregarTipos();
    });
  };

  const confirmarExclusao = () => {
    fetch(`${API_BASE_URL}/tipo/${tipoParaExcluir.id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      }
    }).then(() => {
      setShowConfirmDelete(false);
      carregarTipos();
    });
  };

  return (
    <div className="container mt-4">
      <h2>Tipos de Problemas</h2>
      <Button className="mb-3" onClick={abrirModalNovo}>Novo Tipo</Button>
      
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {tipos.map(tipo => (
            <tr key={tipo.id}>
              <td>{tipo.id}</td>
              <td>{tipo.nome}</td>
              <td>
                <Button variant="warning" size="sm" onClick={() => abrirModalEditar(tipo)}>Editar</Button>{' '}
                <Button variant="danger" size="sm" onClick={() => { setTipoParaExcluir(tipo); setShowConfirmDelete(true); }}>
                  Excluir
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Link to="/">Voltar</Link>

      {/* Modal de criação/edição */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditando ? 'Editar Tipo' : 'Novo Tipo'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              value={tipoAtual.nome}
              onChange={e => setTipoAtual({ ...tipoAtual, nome: e.target.value })}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Button>
          <Button variant="primary" onClick={salvarTipo}>{isEditando ? 'Salvar Alterações' : 'Criar'}</Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de confirmação de exclusão */}
      <Modal show={showConfirmDelete} onHide={() => setShowConfirmDelete(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tem certeza que deseja excluir o tipo "{tipoParaExcluir?.nome}"?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmDelete(false)}>Cancelar</Button>
          <Button variant="danger" onClick={confirmarExclusao}>Excluir</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
