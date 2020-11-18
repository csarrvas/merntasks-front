import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/autenticacion/authContext';

const Login = ({ history }) => {
  
  //Extraer valores del context
  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;
  
  const authContext = useContext(AuthContext);
  const { mensaje, autenticado, iniciarSesion } = authContext;

  //En caso que el password o usuario no exista
  useEffect(() => {
    if(autenticado) {
      history.push('/proyectos');
    }

    if(mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }
    // eslint-disable-next-line
  }, [mensaje, autenticado, history]);
  
  //State para iniciar sesión
  const [usuario, guardarUsuario] = useState({
    email: '',
    password: ''
  });

  //Extraer de usuario
  const { email, password } = usuario;

  const onChange = e => {
    guardarUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    });
  }

  //Cuando el usuario quiere iniciar sesión
  const onSubmit = e => {
    e.preventDefault();

    //Validar que no haya campos vacíos
    if(!email.trim() || !password.trim()) {
      mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
      return;
    }

    //Pasarlo al action
    iniciarSesion({ email, password });
  }

  return (
    <div className="form-usuario">
      {alerta
        ? <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
        : null
      }
      <div className="contenedor-form sombra-dark">
        <h1>Iniciar sesión</h1>

        <form
          onSubmit={onSubmit}
        >
          <div className="campo-form">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Tu email"
              value={email}
              onChange={onChange}
            />
          </div>

          <div className="campo-form">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Tu password"
              value={password}
              onChange={onChange}
            />
          </div>

          <div className="campo-form">
            <input
              type="submit"
              className="btn btn-primario btn-block"
              value="Iniciar sesión"
            />
          </div>
        </form>

        <Link to="/nueva-cuenta" className="enlace-cuenta">Obtener Cuenta</Link>
      </div>
    </div>
  );
}

export default Login;