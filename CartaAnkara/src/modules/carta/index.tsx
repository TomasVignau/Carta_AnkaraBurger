import { Card, Row, Col, Spin, Divider } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import type { Producto } from "../../types/producto";

const Carta = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://192.168.0.71/backEndProyectoApp/productos/get_productos.php")
      //.get("https://6nfxb8xx-5173.brs.devtunnels.ms/backEndProyectoApp/productos/get_productos.php")
      .then((res) => setProductos(res.data))
      .catch((err) => console.error("Error al traer productos:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <Spin size="large" style={{ display: "block", margin: "80px auto" }} />
    );

  // Agrupar productos por tipo
  const categorias = {
    Hamburguesa: productos.filter(
      (p) => p.tipo.toLowerCase() === "hamburguesa"
    ),
    Bebida: productos.filter((p) => p.tipo.toLowerCase() === "bebida"),
    Otro: productos.filter((p) => p.tipo.toLowerCase() === "otro"),
  };

  return (
    <div
      style={{
        background: "#1C1C1C",
        minHeight: "100vh",
        padding: "40px 60px",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#C7A94B",
          marginBottom: 60,
          fontSize: 40,
          letterSpacing: 2,
          fontWeight: 600,
        }}
      >
        Nuestra Carta
      </h1>

      {Object.entries(categorias).map(([tipo, lista]) =>
        lista.length > 0 ? (
          <div key={tipo} style={{ marginBottom: 70 }}>
            <Divider
              orientation="center"
              style={{
                color: "#C7A94B",
                borderColor: "#C7A94B",
                fontSize: 26,
                marginBottom: 40,
              }}
            >
              {tipo}
            </Divider>

            <Row gutter={[32, 32]} justify="center">
              {lista.map((p) => (
                <Col xs={24} sm={12} md={8} lg={7} key={p.id_Producto}>
                  <Card
                    bordered={false}
                    style={{
                      background: "#000",
                      color: "#fff",
                      borderRadius: 20,
                      boxShadow: "0 4px 15px rgba(0,0,0,0.5)",
                      height: "100%",
                      transition: "transform 0.2s ease",
                    }}
                    cover={
                      p.imagen ? (
                        <div
                          style={{
                            height: 220,
                            overflow: "hidden",
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20,
                          }}
                        >
                          <img
                            src={"/" + p.imagen}
                            alt={p.nombre_Producto}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        </div>
                      ) : null
                    }
                    hoverable
                  >
                    <div style={{ padding: "10px 5px" }}>
                      <h2
                        style={{
                          color: "#C7A94B",
                          fontSize: 20,
                          textAlign: "center",
                          marginBottom: 10,
                          fontWeight: "600",
                        }}
                      >
                        {p.nombre_Producto}
                      </h2>

                      <p
                        style={{
                          color: "#ddd",
                          textAlign: "center",
                          fontSize: 14,
                          marginBottom: 10,
                        }}
                      >
                        {p.descripcion}
                      </p>

                      <p
                        style={{
                          textAlign: "center",
                          color: "#C7A94B",
                          fontSize: 18,
                          fontWeight: "bold",
                          marginTop: 15,
                        }}
                      >
                        ${p.precio_unitario.toFixed(2)}
                      </p>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        ) : null
      )}
    </div>
  );
};

export default Carta;
