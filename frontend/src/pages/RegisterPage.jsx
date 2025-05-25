import React, { useEffect, useState } from "react";
import { Form, Button, Card, Container, Row, Col } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";
import { API_BASE_URL, API_BASE_URL_SEM_APIS } from "../utils/contants";
import { toast } from "react-toastify";

const RegisterPage = () => {
    const navigate = useNavigate();
    const { user, setUser, validaLogado } = useUser();
    const [cpf, setCpf] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoadingRequest, setIsLoadingRequest] = useState(false);

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
    const handleCpfChange = (e) => {
        const rawValue = e.target.value;
        const numericValue = rawValue.replace(/\D/g, "");

        let maskedValue = "";
        if (numericValue.length > 0) {
            maskedValue += numericValue.substring(0, 3);
            if (numericValue.length > 3) {
                maskedValue += "." + numericValue.substring(3, 6);
                if (numericValue.length > 6) {
                    maskedValue += "." + numericValue.substring(6, 9);
                    if (numericValue.length > 9) {
                        maskedValue += "-" + numericValue.substring(9, 11);
                    }
                }
            }
        }

        setCpf(maskedValue);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleRegistration = async (e) => {
        try {
            e.preventDefault();
            console.log("Tentativa de cadastro com:", { cpf, email, password });
            // *** Sua lógica de chamada à API de cadastro virá aqui ***
            const c = Number(cpf.replaceAll(".", "").replaceAll("-", ""));

            const resultCad = await fetch(`${API_BASE_URL}/usuario`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    cpf: c,
                    email,
                    senha: password,
                    nivel: 2,
                }),
            });
            if (!resultCad.ok) {
                throw new Error("Erro ao criar usuario");
            }

            const resultLogin = await fetch(
                `${API_BASE_URL_SEM_APIS}/authenticate`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        username: email,
                        password: password,
                    }),
                }
            );
            if (!resultLogin.ok) {
                throw new Error("Credenciais inálidas");
            }
            const userToken = await resultLogin.json();
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

        // Lembre-se de tratar a resposta (sucesso/erro) e possivelmente redirecionar após o sucesso
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
                                <h2 className="text-center mb-4">Cadastro</h2>
                                <Form onSubmit={handleRegistration}>
                                    <Form.Group
                                        controlId="formBasicCpf"
                                        className="mb-3"
                                    >
                                        <Form.Label>CPF</Form.Label>
                                        <Form.Control
                                            type="text"
                                            className="form-control"
                                            placeholder="Digite seu CPF"
                                            value={cpf}
                                            onChange={handleCpfChange}
                                            maxLength={14}
                                        />
                                    </Form.Group>

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
                                        Cadastrar
                                    </Button>
                                </Form>
                                <div className="text-center mt-3">
                                    <p>
                                        Já possui uma conta?{" "}
                                        <NavLink to="/login">Login</NavLink>
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

export default RegisterPage;
