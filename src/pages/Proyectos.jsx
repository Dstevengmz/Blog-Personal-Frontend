import { useEffect, useState } from "react";
import { assetUrl } from "../lib/assetUrl";
import { Container, Row, Col, Card, Button, Badge, Spinner, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { listarProyectos } from "../services/ProyectosService";

function Proyectos() {
	const [items, setItems] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");


	const fetchData = async () => {
		setLoading(true);
		setError("");
		try {
			const data = await listarProyectos();
			setItems(Array.isArray(data) ? data : []);
		} catch (e) {
			setError(e?.response?.data?.error || "No se pudieron cargar los proyectos");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<>
			<div className="bg-light py-4 border-bottom">
				<Container>
					<h1 className="mb-1"> Mis Proyectos</h1>
				</Container>
			</div>

			<Container className="py-4">
				{loading && (
					<div className="d-flex align-items-center gap-2"><Spinner animation="border" size="sm"/> Cargando…</div>
				)}
				{error && <Alert variant="danger" className="mb-3">{error}</Alert>}

				{!loading && !error && items.length === 0 && (
					<Alert variant="secondary">Aún no hay proyectos publicados.</Alert>
				)}

				<Row className="g-4">
					{items.map((p) => {
						const firstImg = p?.imagenes?.[0]?.url;
						const imgSrc = assetUrl(firstImg);
						return (
											<Col key={p.id} md={6} lg={4}>
												<Card as={Link} to={`/proyectos/${p.id}`} className="h-100 shadow-sm text-reset text-decoration-none">
									{imgSrc && <Card.Img variant="top" src={imgSrc} alt={p.titulo} style={{ objectFit: 'cover', maxHeight: 180 }} />}
									<Card.Body className="d-flex flex-column">
										<div className="d-flex align-items-start justify-content-between mb-1">
											<Card.Title className="mb-0">{p.titulo}</Card.Title>
											{p.github && <Badge bg="dark">Repo</Badge>}
										</div>
										{p.descripcion && (
											<Card.Text className="text-secondary" style={{ overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
												{p.descripcion}
											</Card.Text>
										)}
														<div className="mt-auto d-flex gap-2">
											{p.github && (
												<Button as="a" href={p.github} target="_blank" rel="noreferrer" variant="outline-dark" size="sm">
													GitHub
												</Button>
											)}
											{p.demoUrl && (
												<Button as="a" href={p.demoUrl} target="_blank" rel="noreferrer" variant="primary" size="sm">
													Demo
												</Button>
											)}
										</div>
									</Card.Body>
								</Card>
							</Col>
						);
					})}
				</Row>
			</Container>
		</>
	);
}
export default Proyectos;