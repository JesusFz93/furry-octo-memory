import React, { useEffect, useState } from "react";
import Title from "../components/Title";

import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore/lite";
import { dbConfig } from "../config/firebase";

export const HomePage = () => {
  const [listadoTareas, setListadoTareas] = useState([]);
  //   const [form, setForm] = useState({ nombre: "", nota: "" });
  const [id, setId] = useState("");
  const [nombre, setNombre] = useState("");
  const [nota, setNota] = useState("");
  const [esEditar, setEsEditar] = useState(false);

  const obtenerDatos = async () => {
    try {
      const DB = collection(dbConfig, "tareas");
      const listadoTareas = await getDocs(DB);
      const listadoFinal = listadoTareas.docs.map((item) => ({
        id: item.id,
        ...item.data(),
      }));
      setListadoTareas(listadoFinal);
    } catch (e) {
      console.log("Hubo un error");
      console.log(e);
    }
  };

  useEffect(() => {
    obtenerDatos();
  }, []);

  const submit = (e) => {
    e.preventDefault();

    if (esEditar) {
      actualizarEnBD();
    } else {
      guardarTarea();
    }
  };

  const guardarTarea = async () => {
    const datoAGuardar = {
      nombre,
      nota,
    };

    try {
      const DB = collection(dbConfig, "tareas");
      const item = await addDoc(DB, datoAGuardar);
      setListadoTareas([...listadoTareas, { id: item.id, ...datoAGuardar }]); // este se usa para ahorrar una peticion a la BD despues de guardar

      // obtenerDatos(); //normalmente se hace esta peticion para actualizar la lista despues de agregar
    } catch (e) {
      console.log("Hubo un error");
      console.log(e);
    }
  };

  const handleFormNombre = (texto) => {
    setNombre(texto);
  };

  const handleFormNota = (texto) => {
    setNota(texto);
  };

  const editarTarea = (item) => {
    setEsEditar(true);
    setId(item.id);
    setNombre(item.nombre);
    setNota(item.nota);
  };

  const actualizarEnBD = async () => {
    try {
      const datos = {
        nombre,
        nota,
      };
      const config = doc(dbConfig, "tareas", id);
      await updateDoc(config, datos);
      const resultado = listadoTareas.map((item) =>
        item.id === id ? { id, ...datos } : item
      );
      setListadoTareas(resultado);

      //   obtenerDatos();
    } catch (e) {
      console.log("Hubo un error");
      console.log(e);
    }
  };

  const eliminarTarea = async (item) => {
    try {
      const config = doc(dbConfig, "tareas", item.id);
      await deleteDoc(config);
      const resultadoFiltrado = listadoTareas.filter(
        (tarea) => tarea.id !== item.id
      );
      setListadoTareas(resultadoFiltrado);

      //   obtenerDatos();
    } catch (e) {
      console.log("Hubo un error");
      console.log(e);
    }
  };

  return (
    <>
      <Title />
      <div className="container">
        <main className="row">
          <article className="col-6">
            <h1>Listado de tareas</h1>
            <ul className="list-group">
              {listadoTareas.map((item) => (
                <li className="list-group-item" key={item.id}>
                  {item.nombre} - {item.nota}
                  <div>
                    <button
                      type="button"
                      className="btn btn-warning"
                      onClick={() => editarTarea(item)}
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => eliminarTarea(item)}
                    >
                      Eliminar
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </article>
          <article className="col-6">
            <h1>{esEditar ? "Editar tarea" : "Agregar tarea"}</h1>
            <form onSubmit={submit}>
              <label htmlFor="inputNombre">Agregar nombre</label>
              <input
                id="inputNombre"
                type="text"
                className="form-control"
                onChange={(e) => handleFormNombre(e.target.value)}
                value={nombre}
              />
              <label htmlFor="inputNota">Agregar nota</label>
              <input
                id="inputNota"
                type="text"
                className="form-control"
                onChange={(e) => handleFormNota(e.target.value)}
                value={nota}
              />

              {esEditar ? (
                <button type="submit" className="btn btn-warning">
                  Editar tarea
                </button>
              ) : (
                <button type="submit" className="btn btn-success">
                  Agregar tarea
                </button>
              )}
            </form>
          </article>
        </main>
      </div>
    </>
  );
};
