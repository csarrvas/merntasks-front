import { useContext, useEffect, useState } from 'react';
import ProyectoContext from '../../context/proyectos/proyectoContext';
import TareaContext from '../../context/tareas/tareaContext';

const FormTarea = () => {

  //Extraer si un proyecto está activo
  const proyectoContext = useContext(ProyectoContext);
  const { proyecto } = proyectoContext;

  //Obtener el state de tareas
  const tareaContext = useContext(TareaContext);
  const { errortarea, tareaseleccionada, obtenerTareas, agregarTarea, validarTarea, actualizarTarea } = tareaContext;

  //Effect que detecta si hay una tarea seleccionada
  useEffect(() => {
    if(tareaseleccionada) {
      guardarTarea(tareaseleccionada);
    } else {
      guardarTarea({
        nombre: ''
      });
    }
    // eslint-disable-next-line
  }, [tareaseleccionada]);

  //State del formulario
  const [tarea, guardarTarea] = useState({
    nombre: ''
  });

  //Extraer el nombre del proyecto
  const { nombre } = tarea;

  //Si no hay proyecto seleccionado
  if(!proyecto) return null;

  //Array destructuring para extraer el proyecto actual
  const [proyectoActual] = proyecto;

  //Leer los valores del formulario
  const handleChange = e => {
    guardarTarea({
      ...tarea,
      [e.target.name]: e.target.value
    });
  }

  const onSubmit = e => {
    e.preventDefault();

    //Validar
    if(!nombre.trim()) {
      validarTarea();
      return;
    }

    //Si es edición o si es nueva tarea
    if(tareaseleccionada) {
      //Actualizar tarea existente
      actualizarTarea(tarea);

    } else {
      //Agregar la nueva tarea al state de tareas
      tarea.proyecto = proyectoActual._id;
      agregarTarea(tarea);
    }

    //Obtener y filtrar las tareas del proyecto actual
    obtenerTareas(proyectoActual._id);

    //Reiniciar el form
    guardarTarea({
      nombre: ''
    });
  }

  return (
    <div className="formulario">
      <form
        onSubmit={onSubmit}
      >
        <div className="contenedor-input">
          <input
            type="text"
            className="input-text"
            placeholder="Nombre Tarea..."
            name="nombre"
            value={nombre}
            onChange={handleChange}
          />
        </div>
        <div className="contenedor-input">
          <input
            type="submit"
            className="btn btn-primario btn-submit btn-block"
            value={tareaseleccionada ? 'Editar Tarea' : 'Agregar Tarea'}
          />
        </div>
      </form>
      {errortarea
        ? <p className="mensaje error">El nombre de la tarea es obligatorio</p>
        : null
      }
    </div>
  );
}
 
export default FormTarea;