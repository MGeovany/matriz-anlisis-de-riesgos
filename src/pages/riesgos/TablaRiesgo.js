import React from 'react'
import { Table } from '@mantine/core'
import './RiesgosStyles.css'
import './TablaRiesgo.css'
import { IconEye, IconTrash } from '@tabler/icons'
import Form from './Form'
import Eliminar from './Eliminar'
import { Opciones } from '../../API'

/* eslint-disable react/prop-types */
export function TablaRiesgos({ elements = [], onEdit, onDelete }) {
  const [ListaNivelRiesgo, setListaNivelRiesgo] = React.useState([])
  React.useState(() => {
    Opciones()
      .NivelRiesgo()
      .then((data) => setListaNivelRiesgo(data))
      .catch((error) => console.error(error))
  }, [])

  const rows = elements.map((element, index) => (
    <tr key={index}>
      <td>{element.Nombre}</td>
      <td>{`${element.PuntajeImpacto} - ${element.NivelImpacto}`}</td>
      <td>{`${element.PuntajePosibilidad} - ${element.NivelPosibilidad}`}</td>
      <td>{`${element.NivelRiesgo} - ${getNivelRiesgo(
        element.NivelRiesgo
      )}`}</td>
      <td>
        <Form
          trigger={<IconEye cursor='pointer' color='#228be6' />}
          handler={onEdit}
          riesgo={element}
        />
      </td>
      <td>
        <Eliminar
          trigger={<IconTrash cursor='pointer' color='#f05761' />}
          handler={onDelete}
          riesgo={element.Id}
        />
      </td>
    </tr>
  ))

  return (
    <div className='contenedorTabla'>
      <Table highlightOnHover>
        <thead>
          <tr>
            <th>Nombre de Riesgo</th>
            <th>Impacto</th>
            <th>Posibilidad</th>
            <th>Riesgo</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </div>
  )
  function getNivelRiesgo(puntaje) {
    const nivelRiesgo = ListaNivelRiesgo.find((item) => {
      return puntaje >= item.ValorMinimo && puntaje <= item.ValorMaximo
    }) || { Descripcion: 'jeeee! altísimo' }
    return nivelRiesgo.Descripcion
  }
}
