import { useContext } from 'react';
import ProyectoContext from '../../context/proyectos/proyectoContext';
import TareaContext from '../../context/tareas/tareaContext';

const Proyecto = ({ proyecto }) => {

  //Obtener el state de proyectos
  const proyectoContext = useContext(ProyectoContext);
  const { proyectoActual } = proyectoContext;

  //Obtener el state de tareas
  const tareaContext = useContext(TareaContext);
  const { obtenerTareas } = tareaContext;

  //Función para agregar el proyecto actual
  const seleccionarProyecto = id => {
    proyectoActual(id); //Fijar un proyecto actual
    obtenerTareas(id);
  }

  return (
    <li>
      <button
        type="button"
        className="btn btn-blank"
        onClick={ () => seleccionarProyecto(proyecto._id) }
      >{proyecto.nombre}</button>
    </li>
  );
}

export default Proyecto;