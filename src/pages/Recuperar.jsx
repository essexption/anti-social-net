import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";


export default function Recuperar(){
    const [nickName, setNickName] = useState("");
    const [email, setEmail] = useState("");
    const [contraseña, setContraseña] = useState("")
    const [contraseñaDuplicada, setContraseñaDuplicada] = useState("")
    const [usuarios, setUsuarios] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:3000/user")
            .then(res => res.json())
            .then(data => setUsuarios(data))
            .catch(err => console.error("Error al cargar usuarios:", err));
    }, []);

    const handleRecover = async (e) => {
        e.preventDefault();

        if (!nickName || !email || !contraseña || !contraseñaDuplicada) {
            alert("Completá todos los campos.");
            return;
        }

        const usuario = usuarios.find(u => u.nickname === nickName);
        console.log(usuarios)
        if (!usuario) {
            alert("Ese nick no está registrado.");
            return;
        }
        if (email !== usuario.mail) {
            alert("No está registrado con este correo")
            return
        }
        if (contraseña !== contraseñaDuplicada) {
            alert('Las contraseñas no coinciden')
            return
        }
        
        try {

            const res = await fetch(`http://localhost:3000/user/${usuario._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    nickname: usuario.nickname,
                    mail: usuario.mail,
                    password: contraseña,
                })
            });
            console.log(res)
            if (!res.ok) throw new Error("Error al modificar la contraseña");

            const salida = await res.json();
            console.log(`Su nueva contraseña se modificó con éxito`)
            navigate("/login");

        } catch (error) {
            console.error("Registro falló:", error);
            alert("No se pudo modificar.");
        }
    };

    return (
        <div className="d-flex vh-100">
            <div className="w-100 h-100">
                <img
                    src="https://i.pinimg.com/736x/79/0e/44/790e44391a38a9589e32c846947a01bb.jpg"
                    alt="backGround"
                    className="w-100 h-100 object-fit-cover"
                    style={{ display: "block" }}
                />
            </div>
            <div className='w-100 d-flex flex-column justify-content-center align-items-center gap-3 p-5'>
                <Container className="d-flex flex-column justify-content-center align-items-center">
                    <Form onSubmit={handleRecover}>
                        <h1 className="'text-black mb-4 border-0 border-bottom border-dark p-5">Recuperación</h1>

                        <Form.Group className="mb-3">
                            <Form.Control
                                type="text" value={nickName} onChange={(e) => setNickName(e.target.value)}
                                placeholder="Nombre de usuario" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                                placeholder="Escriba su Email" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Control type="password" value={contraseña} onChange={(e) => setContraseña(e.target.value)}
                                placeholder="Ingrese la nueva contraseña" />
                        </Form.Group>

                         <Form.Group className="mb-3">
                            <Form.Control type="password" value={contraseñaDuplicada} onChange={(e) => setContraseñaDuplicada(e.target.value)}
                                placeholder="Confirme contraseña" />
                        </Form.Group>

                        <button className="btn btn-primary" >Confirmar</button>
                    </Form>
                </Container>

            </div>
        </div>
    );
}

