import React, { useEffect, useState } from "react";
import useUser from "../hooks/useUser";
import { Link, useNavigate } from "react-router-dom";
// import { Button, Container, Form, Modal, Row, Table } from "react-bootstrap";
import {
    Container,
    Row,
    Col,
    Button,
    Spinner,
    Alert,
    ListGroup,
    ListGroupItem,
    Card,
    Modal,
    Form
} from "react-bootstrap";
import { API_BASE_URL } from "../utils/contants";

const AdminPage = () => {
    const navigate = useNavigate();
    const { user, validaLogado } = useUser();
    const [denunciaSelecionada, setDenunciaSelecionada] = useState(null);
    const [mostrarModalExcluir, setMostrarModalExcluir] = useState(false);
    const [mostrarModalFeedback, setMostrarModalFeedback] = useState(false);
    const [feedbackTexto, setFeedbackTexto] = useState('');

    const [denuncias, setDenuncias] = useState([]);
    const [loadingDenuncias, setLoadingDenuncias] = useState(true);
    const [errorDenuncias, setErrorDenuncias] = useState(null);

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

    useEffect(() => {
        async function fetchDenuncias() {
            setLoadingDenuncias(true);
            setErrorDenuncias(null);

            try {
                const response = await fetch(
                    `${API_BASE_URL}/denuncia`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "token"
                            )}`,
                        },
                    }
                );

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(
                        `Erro ao buscar denúncias: ${response.status} ${response.statusText} - ${errorText}`
                    );
                }

                const data = await response.json();
                setDenuncias(data.reverse());
            } catch (err) {
                console.error("Erro ao buscar denúncias:", err);
                setErrorDenuncias(
                    `Falha ao carregar denúncias: ${err.message}`
                );
            } finally {
                setLoadingDenuncias(false);
            }
        }
        fetchDenuncias();
    }, [user, API_BASE_URL]);

    // Abrir modais
    const abrirModalExcluir = (denuncia) => {
        setDenunciaSelecionada(denuncia);
        setMostrarModalExcluir(true);
    };

    const abrirModalFeedback = (denuncia) => {
        setDenunciaSelecionada(denuncia);
        setFeedbackTexto('');
        setMostrarModalFeedback(true);
    };

    const sair = () => {
        localStorage.setItem("token", "");
        navigate("/");
    }

    // Confirmar exclusão
    const confirmarExclusao = () => {
        fetch(`${API_BASE_URL}/denuncia/${denunciaSelecionada.id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem(
                    "token"
                )}`,
            },
        }).then(() => {
            setDenuncias(denuncias.filter(d => d.id !== denunciaSelecionada.id));
            setMostrarModalExcluir(false);
        });
    };

    // Enviar feedback
    const enviarFeedback = () => {
        fetch(`${API_BASE_URL}/denuncia/add-feedback/${denunciaSelecionada.id}/${feedbackTexto}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
        },
        }).then(() => {
            setMostrarModalFeedback(false);
            window.location.reload();
        });
    };

    return (
        <Container className="mt-4">
            <Row className="align-items-center mb-3">
                <Col>
                    <h1>Denúncias do Cidadão - Admin</h1>
                </Col>
                <Col xs="auto">
                    <Button
                        variant="warning"
                    >
                        <Link to="/orgao">
                            <i className="feather icon-alert-triangle me-2"></i>
                            Criar Órgão
                        </Link>
                    </Button>{" "}
                    <Button
                        variant="warning"
                    >
                        <Link to="/tipo">
                            <i className="feather icon-alert-triangle me-2"></i>
                            Criar Tipo
                        </Link>
                    </Button>{" "}
                    <Button
                        variant="danger"
                        onClick={sair}
                    >
                        <i className="feather icon-alert-triangle me-2"></i>
                        Sair
                    </Button>
                </Col>
            </Row>

            {denuncias.length === 0 ? (
                <Alert variant="info">
                    Ningúem fez denúncias.
                </Alert>
            ) : (
                <ListGroup>
                    {denuncias.map((denuncia) => (
                        <ListGroupItem key={denuncia.id} className="mb-3">
                            <Card>
                                <Card.Body>
                                    <Card.Title>{denuncia.titulo}</Card.Title>
                                    <Card.Text>
                                        <strong>Texto:</strong> {denuncia.texto}
                                    </Card.Text>
                                    <Card.Text>
                                        <strong>Urgência:</strong>{" "}
                                        {denuncia.urgencia}
                                    </Card.Text>
                                    <Card.Text>
                                        <strong>Data:</strong> {denuncia.data}
                                    </Card.Text>
                                    {denuncia.orgaos &&
                                        denuncia.orgaos.nome && (
                                            <Card.Text>
                                                <strong>Órgão:</strong>{" "}
                                                {denuncia.orgaos.nome}
                                            </Card.Text>
                                        )}
                                    {denuncia.tipo && denuncia.tipo.nome && (
                                        <Card.Text>
                                            <strong>Tipo:</strong>{" "}
                                            {denuncia.tipo.nome}
                                        </Card.Text>
                                    )}
                                    <strong>Feedback:</strong>
                                    {denuncia.feedback
                                    ? " " + denuncia.feedback.texto
                                    : " Ainda sem feedback"}
                                </Card.Body>
                            </Card>
                            <Card.Text>
                                <Button variant="danger" size="sm" onClick={() => abrirModalExcluir(denuncia)}>Excluir</Button>{' '}
                                {denuncia.feedback ? "" : <Button variant="info" size="sm" onClick={() => abrirModalFeedback(denuncia)}>Feedback</Button> }
                            </Card.Text>
                        </ListGroupItem>
                    ))}
                </ListGroup>
            )}
            {/* Modal de confirmação de exclusão */}
            <Modal show={mostrarModalExcluir} onHide={() => setMostrarModalExcluir(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Exclusão</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Tem certeza que deseja excluir a denúncia "{denunciaSelecionada?.titulo}"?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setMostrarModalExcluir(false)}>Cancelar</Button>
                    <Button variant="danger" onClick={confirmarExclusao}>Excluir</Button>
                </Modal.Footer>
            </Modal>

            {/* Modal de envio de feedback */}
            <Modal show={mostrarModalFeedback} onHide={() => setMostrarModalFeedback(false)}>
                <Modal.Header closeButton>
                <Modal.Title>Enviar Feedback</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form.Group>
                    <Form.Label>Mensagem de Feedback</Form.Label>
                    <Form.Control
                    as="textarea"
                    rows={4}
                    value={feedbackTexto}
                    onChange={e => setFeedbackTexto(e.target.value)}
                    />
                </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={() => setMostrarModalFeedback(false)}>Cancelar</Button>
                <Button variant="primary" onClick={enviarFeedback}>Enviar</Button>
                </Modal.Footer>
            </Modal>
        </Container>
  );
};

export default AdminPage;
