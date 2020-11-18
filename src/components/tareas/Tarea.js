import { useContext } from 'react';
import ProyectoContext from '../../context/proyectos/proyectoContext';
import TareaContext from '../../context/tareas/tareaContext';

const Tarea = ({ tarea }) => {

  //Extraer proyecto de state inicial
  const proyectoContext = useContext(ProyectoContext);
  const { proyecto } = proyectoContext;

  //Extraer proyecto
  const [proyectoActual] = proyecto;

  //Obtener el state de tareas
  const tareaContext = useContext(TareaContext);
  const { obtenerTareas, eliminarTarea, actualizarTarea, guardarTareaActual } = tareaContext;

  //Función que se ejecuta cuando el usuario presiona el btn de eliminar tarea
  const tareaEliminar = id => {
    eliminarTarea(id, proyectoActual._id);
    obtenerTareas(proyectoActual._id);
  }

  //Función que modifica el estado de la tarea
  const cambiarEstado = () => {
    if(tarea.estado) {
      tarea.estado = false;
    } else {
      tarea.estado = true;
    }
    actualizarTarea(tarea);
  }

  //Agrega una tarea actual cuando el usuario desea editarla
  const seleccionarTarea = tarea => {
    guardarTareaActual(tarea);
  }
  console.log(tarea);
  return (
    <li className="tarea sombra">
      <p>{tarea.nombre}</p>
      <div className="estado">
        {tarea.estado
          ? <button
              type="button"
              className="completo"
              onClick={cambiarEstado}
            >Completo</button>
          : <button
              type="button"
              className="incompleto"
              onClick={cambiarEstado}
            >Incompleto</button>
        }
      </div>
      <div className="acciones">
        <button
          type="button"
          className="btn btn-primario"
          onClick={() => seleccionarTarea(tarea)}
        >Editar</button>
        <button
          type="button"
          className="btn btn-secundario"
          onClick={() => tareaEliminar(tarea._id)}
          >Eliminar</button>
      </div>
    </li>
  );
}
 
export default Tarea;