import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
} from "react-bootstrap";
import useUser from "../hooks/useUser";
import { API_BASE_URL } from "../utils/contants";

const CidadaoPage = () => {
    const navigate = useNavigate();
    const { user, validaLogado } = useUser();

    const [denuncias, setDenuncias] = useState([]);
    const [loadingDenuncias, setLoadingDenuncias] = useState(true);
    const [errorDenuncias, setErrorDenuncias] = useState(null);

    useEffect(() => {
        async function checkAuth() {
            const validUserPerfil = await validaLogado();
            if (!validUserPerfil || validUserPerfil.nivel !== 2) {
                console.log(
                    "Usuário sem permissão para esta página de cidadão, redirecionando."
                );
                navigate(validUserPerfil ? "/admin" : "/login", {
                    replace: true,
                });
            }
        }
        checkAuth();
    }, [navigate, validaLogado]);

    useEffect(() => {
        async function fetchDenuncias() {
            if (!user || !user.id) {
                setLoadingDenuncias(false);
                setErrorDenuncias(
                    "Informações do usuário não disponíveis para buscar denúncias."
                );
                return;
            }

            setLoadingDenuncias(true);
            setErrorDenuncias(null);

            try {
                const response = await fetch(
                    `${API_BASE_URL}/denuncia/usuario/${user.id}`,
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
        if (user && user.id && loadingDenuncias) {
            fetchDenuncias();
        }
    }, [user, API_BASE_URL]);

    const handleCreateDenunciaClick = () => {
        navigate("/cidadao-cadastro-denuncia");
    };

    if (!user || loadingDenuncias) {
        return (
            <Container
                className="d-flex justify-content-center align-items-center"
                style={{ minHeight: "100vh" }}
            >
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">
                        Carregando denúncias...
                    </span>
                </Spinner>
            </Container>
        );
    }

    if (errorDenuncias) {
        return (
            <Container
                className="d-flex justify-content-center align-items-center"
                style={{ minHeight: "100vh" }}
            >
                <Alert variant="danger">{errorDenuncias}</Alert>
            </Container>
        );
    }

    return (
        <Container className="mt-4">
            <Row className="align-items-center mb-3">
                <Col>
                    <h1>Denúncias do Cidadão</h1>
                </Col>
                <Col xs="auto">
                    <Button
                        variant="warning"
                        onClick={handleCreateDenunciaClick}
                    >
                        <i className="feather icon-alert-triangle me-2"></i>
                        Criar Denúncia
                    </Button>
                </Col>
            </Row>

            {denuncias.length === 0 ? (
                <Alert variant="info">
                    Você ainda não fez nenhuma denúncia.
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
                                    <Card.Text>
                                        <strong>Feedback:</strong>
                                        {denuncia.feedback
                                            ? " " + denuncia.feedback.texto
                                            : " Ainda sem feedback"}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </ListGroupItem>
                    ))}
                </ListGroup>
            )}
        </Container>
    );
};

export default CidadaoPage;
