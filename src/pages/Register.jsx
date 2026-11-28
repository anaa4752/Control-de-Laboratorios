import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import apiFetch  from '../services/apiFetch';
import '../css/auth.css';

const Register = () => {
  const [nombre, setNombre] = useState('');
  const [matricula, setMatricula] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validación de formulario
    if ([nombre.trim(), matricula.trim(), email.trim(), password.trim(), confirmar.trim()].includes('')) {
      setError('Todos los campos son obligatorios');
      return;
    }
    if (password !== confirmar) {
      setError('Las contraseñas no coinciden');
      return;
    }

    setError('');
    try {
      // el rol por defecto de un registro nuevo es USER
      await apiFetch('/api/auth/register', 'POST', {
        nombre: nombre.trim(),
        matricula: matricula.trim(),
        email: email.trim(),
        password,
        rol: 'USER',
      });
      alert('Usuario registrado, ya puedes iniciar sesión');
      navigate('/login');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main className="pagina">
      <form 
        className="tarjeta" 
        onSubmit={(e) => handleSubmit(e)}>
        <h1 className="titulo">Crear cuenta</h1>

        <label htmlFor="nombre">Nombre</label>
        <input
            id="nombre" 
            type="text"
            value={nombre} onChange={(e) => setNombre(e.target.value)}
        />

        <label htmlFor="matricula">Matrícula</label>

        <input 
            id="matricula" 
            type="text" 
            value={matricula} onChange={(e) => setMatricula(e.target.value)}
        />

        <label htmlFor="email">Correo</label>

        <input 
            id="email" 
            type="email" 
            value={email} onChange={(e) => setEmail(e.target.value)} 
        />

        <label htmlFor="password">Contraseña</label>

        <input 
            id="password" 
            type="password" 
            value={password} onChange={(e) => setPassword(e.target.value)} 
        />

        <label htmlFor="confirmar">Confirmar contraseña</label>

        <input 
            id="confirmar" 
            type="password" 
            value={confirmar} onChange={(e) => setConfirmar(e.target.value)} 
        />

        {error && <p className="mensaje-error">{error}</p>}

        <button type="submit" className="btn-auth" >
            Registrarse
        </button>
        <p className="enlace">¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link></p>
      </form>
    </main>
  );
};

export default Register;
