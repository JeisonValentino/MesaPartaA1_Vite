import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from '@mui/material'
import { useRef } from 'react'
import { Fragment, useEffect, useState } from 'react'

export default function TablesEdit (props) {
  const { columnas = [], data = [] , CrearLista,EliminarColumnaMarca } = props
  const [validacion, setValidacion] = useState([])
  const [arrayInputs, setArrayInputs] = useState([])
  const eliminarAgregado = id => {
    setValidacion(validacion.filter(p => p.id != id))
    setArrayInputs(arrayInputs.filter(p => p.id != id))
  }

  const onInputChange = (e, id) => {
    const { name, value } = e.target
    setArrayInputs(
      arrayInputs.map(p => (p.id == id ? { ...p, [name]: value } : p))
    )
  }
  const Recolectar = () => {
    let VAL = []
    for (var i = 0; data.length > i; i++) {
      let array = { id: i, chekt: true, estado: 'modificado' }
      VAL.push(array)
    }
    setValidacion(VAL)
  }

  useEffect(() => {
    setArrayInputs(data)
  }, [])

  useEffect(() => {
    Recolectar()
  }, [])

  const editarFuncion = id => {
    const cambiarEstado = validacion.map(dat => {
      if (dat.id === id) {
        return {
          ...dat,
          chekt: !validacion[id].chekt
        }
      }
      return dat
    })
    setValidacion(cambiarEstado)
  }
  function uuidv4 () {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
    )
  }
  const AgregarInputs = () => {
    let array = { id: uuidv4(), chekt: false, estado: 'nuevo' }
    setValidacion([...validacion, array])
    let dataEntity2 = { id: '' }
    dataEntity2.id = uuidv4()
    setArrayInputs([...arrayInputs, dataEntity2])
  }
  return (
    <Fragment>
      <div>
        MARCAS{' '}
        <Button
          type='link'
          onClick={() => {
            AgregarInputs()
          }}
        >
          {' '}
          <FontAwesomeIcon icon={faPlus} />{' '}
        </Button>{' '}
      </div>

      <table>
        <thead>
          <tr>
            {Array.from(columnas).map((valor, id) => {
              return <th key={id}>{valor.titulo}</th>
            })}
            <th style={{ textAlign: 'center' }}> Acciones </th>
          </tr>
        </thead>
        <tbody>
          {arrayInputs.map((valor, id) => {
            return (
              <tr key={id}>
                {Array.from(columnas).map((columnasValor, idColumn) => {
                  return (
                    <td key={idColumn} style={{ textAlign: 'center' }}>
                      {validacion[id]?.chekt === false &&
                      validacion[id].estado === 'modificado' ? (
                        <div>
                          <input
                            name={columnasValor.identidad}
                            style={{ width: '100%' }}
                            onChange={e => {
                              onInputChange(e, valor.id)
                            }}
                            type='text'
                            value={eval(`valor?.${columnasValor.identidad}`)}
                          />
                        </div>
                      ) : (
                        <>
                          {validacion[id]?.chekt === true &&
                          validacion[id]?.estado === 'modificado' ? (
                            <p>{eval(`valor?.${columnasValor.identidad}`)} </p>
                          ) : (
                            <></>
                          )}
                        </>
                      )}

                      {validacion[id]?.chekt === false &&
                      validacion[id].estado === 'nuevo' ? (
                        <div>
                          <input
                            name={columnasValor.identidad}
                            style={{ width: '100%' }}
                            onChange={e => {
                              onInputChange(e, valor.id)
                            }}
                            type='text'
                            value={eval(`valor?.${columnasValor.identidad}`)}
                          />
                        </div>
                      ) : (
                        <> </>
                      )}
                    </td>
                  )
                })}

                <td>
                  {' '}
                  {validacion[id]?.estado === 'modificado' ? (
                    <>
                      <Button
                        type='link'
                        onClick={() => {
                          editarFuncion(id)
                        }}
                      >
                        Editar{' '}
                      </Button>
                      <Button onClick={()=>EliminarColumnaMarca(valor.id)} type='link'>Borrar </Button>
                    </>
                  ) : (
                    <></>
                  )}
                  {validacion[id]?.chekt === false &&
                  validacion[id].estado === 'nuevo' ? (
                    <div>
                      <Button
                        type='link'
                        onClick={() => {
                          eliminarAgregado(validacion[id].id)
                        }}
                      >
                        <FontAwesomeIcon icon={faXmark} />{' '}
                      </Button>
                    </div>
                  ) : (
                    <> </>
                  )}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      {validacion.find(val => val.chekt === false) ? (
        <Button type='link' onClick={()=>CrearLista(arrayInputs)}> Guardar</Button>
      ) : (
        ''
      )}
    </Fragment>
  )
}
