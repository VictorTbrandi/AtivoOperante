import React, { useEffect, useState } from "react";
import { Form, Button, Card, Container, Row, Col } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { API_BASE_URL, API_BASE_URL_SEM_APIS } from "../utils/contants";
import useUser from "../hooks/useUser";
import { toast } from "react-toastify";
import { ColorRing } from "react-loader-spinner";

const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoadingRequest, setIsLoadingRequest] = useState(false);
    const { user, setUser, validaLogado } = useUser();

    useEffect(() => {
        async function init() {
            const validUserPerfil = await validaLogado();
            if (validUserPerfil) {
                navigate(validUserPerfil.nivel === 1 ? "/admin" : "/cidadao", {
                    replace: true,
                });
            }
        }
        init();
    }, [navigate]);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleLogin = async (e) => {
        try {
            e.preventDefault();
            setIsLoadingRequest(true);
            console.log("Tentativa de login com:", { email, password });
            const result = await fetch(
                `${API_BASE_URL_SEM_APIS}/authenticate`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username: email, password }),
                }
            );
            if (!result.ok) {
                throw new Error("Credenciais inálidas");
            }
            const userToken = await result.json();
            console.log("USER", userToken);
            localStorage.setItem("token", userToken.jwt);
            setUser(userToken.user);
            setIsLoadingRequest(false);
            navigate(userToken.user.nivel === 1 ? "/admin" : "/cidadao", {
                replace: true,
            });
        } catch (error) {
            toast.error(error.message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "light",
            });
            setIsLoadingRequest(false);
        }
    };

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "100vh" }}
        >
            {isLoadingRequest ? (
                <ColorRing
                    visible={true}
                    height="200"
                    width="200"
                    ariaLabel="color-ring-loading"
                    wrapperStyle={{}}
                    wrapperClass="color-ring-wrapper"
                    colors={[
                        "black",
                        "black",
                        "black",
                        "black",
                        "black",
                        "black",
                    ]}
                />
            ) : (
                <Row>
                    <Col md={12}>
                        <Card style={{ width: "20rem" }}>
                            <Card.Body>
                                <h2 className="text-center mb-4">Login</h2>
                                <Form onSubmit={handleLogin}>
                                    <Form.Group
                                        controlId="formBasicEmail"
                                        className="mb-3"
                                    >
                                        <Form.Label>
                                            Endereço de Email
                                        </Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="Digite seu email"
                                            value={email}
                                            onChange={handleEmailChange}
                                        />
                                    </Form.Group>

                                    <Form.Group
                                        controlId="formBasicPassword"
                                        className="mb-3"
                                    >
                                        <Form.Label>Senha</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Senha"
                                            value={password}
                                            onChange={handlePasswordChange}
                                        />
                                    </Form.Group>

                                    <Button
                                        variant="primary"
                                        type="submit"
                                        className="w-100 mt-3"
                                    >
                                        Entrar
                                    </Button>
                                </Form>
                                <div className="text-center mt-3">
                                    <p>
                                        Não tem uma conta?{" "}
                                        <NavLink to="/register">
                                            Cadastre-se
                                        </NavLink>
                                    </p>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            )}
        </Container>
    );
};

export default LoginPage;
