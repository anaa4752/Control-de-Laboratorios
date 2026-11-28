import { useState } from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import apiFetch from '../services/apiFetch';
import '../css/auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verPassword, setVerPassword] = useState(false);
  const [error, setError] = useState('');
  const { iniciarSesion } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
;
    //Validacion de que todos los campos esten llenos
    if ([email.trim(), password.trim()].includes('')) {
      setError('Todos los campos son obligatorios');
      return;
      
    }

    setError('');
    try {//Llama a la Api para  que nos devuelva el token y el usuario que inicio sesion
      const datos = await apiFetch('/api/auth/login', 'POST', { email: email.trim(), password });
      iniciarSesion(datos.token, datos.user); // para saber quien ingreso y guardar el token en authContext
      alert('Sesión iniciada correctamente');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main className="pagina">
      <form className="tarjeta" onSubmit={(e) => handleSubmit(e)}>
        <h1 className="titulo">Inicio de Sesion</h1>

        <label htmlFor="email">Correo</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Contraseña</label>
        <div className="password">
          <input
            id="password"
            type={verPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="button" className="btn-ver" onClick={() => setVerPassword(!verPassword)}>
            {verPassword ? 'Ocultar' : 'Ver'}
          </button>
        </div>

        {error && <p className="mensaje-error">{error}</p>}

        <button type="submit" className="btn-auth">
          Iniciar sesión
        </button>
        <p className="enlace">¿No tienes cuenta? <Link to="/register">Regístrate</Link></p>
      </form>
    </main>
  );
};

export default Login;