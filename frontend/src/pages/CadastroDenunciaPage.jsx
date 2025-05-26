import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    Form,
    Button,
    Card,
    Container,
    Row,
    Col,
    Spinner,
    Alert,
} from "react-bootstrap";
import useUser from "../hooks/useUser";
import { API_BASE_URL } from "../utils/contants";
import { toast } from "react-toastify";

const CadastroDenunciaPage = () => {
    const navigate = useNavigate();
    const { user, validaLogado } = useUser();

    const [titulo, setTitulo] = useState("");
    const [texto, setTexto] = useState("");
    const [urgencia, setUrgencia] = useState("1");
    const [selectedOrgaoId, setSelectedOrgaoId] = useState("");
    const [selectedTipoId, setSelectedTipoId] = useState("");

    const [orgaos, setOrgaos] = useState([]);
    const [tipos, setTipos] = useState([]);

    const [loadingData, setLoadingData] = useState(true);
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const [error, setError] = useState(null);
    useEffect(() => {
        async function init() {
            setLoadingData(true);
            const validUserPerfil = await validaLogado();

            if (!validUserPerfil || validUserPerfil.nivel !== 2) {
                console.log(
                    "Usuário sem permissão para esta página, redirecionando."
                );
                navigate(validUserPerfil ? "/admin" : "/login", {
                    replace: true,
                });
                setLoadingData(false);
                return;
            }

            try {
                const [orgaosRes, tiposRes] = await Promise.all([
                    fetch(`${API_BASE_URL}/orgao`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "token"
                            )}`,
                        },
                    }),
                    fetch(`${API_BASE_URL}/tipo`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "token"
                            )}`,
                        },
                    }),
                ]);

                if (!orgaosRes.ok || !tiposRes.ok) {
                    throw new Error(
                        "Erro ao carregar dados de órgãos ou tipos"
                    );
                }

                const orgaosData = await orgaosRes.json();
                const tiposData = await tiposRes.json();

                setOrgaos(orgaosData);
                setTipos(tiposData);

                if (orgaosData.length > 0) setSelectedOrgaoId(orgaosData[0].id);
                if (tiposData.length > 0) setSelectedTipoId(tiposData[0].id);
            } catch (err) {
                console.error("Erro ao buscar dados:", err);
                setError(
                    "Não foi possível carregar os dados para o formulário."
                );
            } finally {
                setLoadingData(false);
            }
        }
        init();
    }, [navigate]);

    const handleDenunciaSubmit = async (e) => {
        e.preventDefault();
        setLoadingSubmit(true);
        setError(null);

        if (!user || !user.id) {
            console.error("ID do usuário não disponível no contexto.");
            setError("Erro: Informação do usuário não disponível.");
            setLoadingSubmit(false);
            return;
        }

        const denunciaData = {
            titulo: titulo,
            texto: texto,
            urgencia: parseInt(urgencia, 10),
            orgaos: { id: parseInt(selectedOrgaoId, 10) },
            data: new Date().toISOString().split("T")[0],
            tipo: { id: parseInt(selectedTipoId, 10) },
            usuario: { id: user.id },
        };

        console.log("Enviando denúncia:", denunciaData);

        try {
            const response = await fetch(`${API_BASE_URL}/denuncia`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(denunciaData),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(
                    `Erro ao enviar denúncia: ${response.status} ${response.statusText} - ${errorText}`
                );
            }

            const result = await response.json();
            toast.success("Denúncia criada com sucesso", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "light",
            });
            navigate("/cidadao");
            console.log("Denúncia enviada com sucesso:", result);
        } catch (err) {
            console.error("Erro no envio da denúncia:", err);
            setError(`Falha ao enviar denúncia: ${err.message}`);
        } finally {
            setLoadingSubmit(false);
        }
    };

    if (loadingData) {
        return (
            <Container
                className="d-flex justify-content-center align-items-center"
                style={{ minHeight: "100vh" }}
            >
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Carregando...</span>
                </Spinner>
            </Container>
        );
    }

    if (error && !loadingSubmit) {
        return (
            <Container
                className="d-flex justify-content-center align-items-center"
                style={{ minHeight: "100vh" }}
            >
                <Alert variant="danger">{error}</Alert>
            </Container>
        );
    }

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "100vh" }}
        >
            <Row>
                <Col md={12}>
                    <Card style={{ width: "25rem" }}>
                        <Card.Body>
                            <h2 className="text-center mb-4">
                                Cadastrar Denúncia
                            </h2>
                            <Form onSubmit={handleDenunciaSubmit}>
                                <Form.Group
                                    controlId="formDenunciaTitulo"
                                    className="mb-3"
                                >
                                    <Form.Label>Título</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Título da denúncia"
                                        value={titulo}
                                        onChange={(e) =>
                                            setTitulo(e.target.value)
                                        }
                                        required
                                    />
                                </Form.Group>

                                <Form.Group
                                    controlId="formDenunciaTexto"
                                    className="mb-3"
                                >
                                    <Form.Label>Texto da Denúncia</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        placeholder="Descreva a denúncia em detalhes"
                                        value={texto}
                                        onChange={(e) =>
                                            setTexto(e.target.value)
                                        }
                                        required
                                    />
                                </Form.Group>

                                <Form.Group
                                    controlId="formDenunciaUrgencia"
                                    className="mb-3"
                                >
                                    <Form.Label>Urgência</Form.Label>
                                    <Form.Control
                                        as="select"
                                        value={urgencia}
                                        onChange={(e) =>
                                            setUrgencia(e.target.value)
                                        }
                                        required
                                    >
                                        {[1, 2, 3, 4, 5].map((level) => (
                                            <option key={level} value={level}>
                                                {level}
                                            </option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group
                                    controlId="formDenunciaOrgao"
                                    className="mb-3"
                                >
                                    <Form.Label>Órgão Responsável</Form.Label>
                                    <Form.Control
                                        as="select"
                                        value={selectedOrgaoId}
                                        onChange={(e) =>
                                            setSelectedOrgaoId(e.target.value)
                                        }
                                        required
                                        disabled={orgaos.length === 0}
                                    >
                                        {orgaos.length === 0 && (
                                            <option value="">
                                                Carregando Órgãos...
                                            </option>
                                        )}
                                        {orgaos.map((orgao) => (
                                            <option
                                                key={orgao.id}
                                                value={orgao.id}
                                            >
                                                {orgao.nome}
                                            </option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group
                                    controlId="formDenunciaTipo"
                                    className="mb-3"
                                >
                                    <Form.Label>Tipo de Denúncia</Form.Label>
                                    <Form.Control
                                        as="select"
                                        value={selectedTipoId}
                                        onChange={(e) =>
                                            setSelectedTipoId(e.target.value)
                                        }
                                        required
                                        disabled={tipos.length === 0}
                                    >
                                        {tipos.length === 0 && (
                                            <option value="">
                                                Carregando Tipos...
                                            </option>
                                        )}
                                        {tipos.map((tipo) => (
                                            <option
                                                key={tipo.id}
                                                value={tipo.id}
                                            >
                                                {tipo.nome}
                                            </option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>

                                <Row className="mt-3">
                                    <Col className="d-flex justify-content-start">
                                        <Button
                                            variant="danger"
                                            onClick={() => navigate("/cidadao")}
                                        >
                                            Cancelar
                                        </Button>
                                    </Col>
                                    <Col className="d-flex justify-content-end">
                                        <Button
                                            variant="primary"
                                            type="submit"
                                            disabled={loadingSubmit}
                                        >
                                            {loadingSubmit ? (
                                                <Spinner
                                                    animation="border"
                                                    size="sm"
                                                />
                                            ) : (
                                                "Enviar Denúncia"
                                            )}
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                            {error && loadingSubmit === false && (
                                <Alert variant="danger" className="mt-3">
                                    {error}
                                </Alert>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default CadastroDenunciaPage;
