import React from 'react'
import { Modal, Group, Button, Grid, Text } from '@mantine/core'

/* eslint-disable react/prop-types */
export default function Eliminar({ trigger: Trigger, handler, plan }) {
  const [open, setOpen] = React.useState(false)
  function submitForm() {
    handler(plan)
    setOpen(false)
  }
  return (
    <>
      <div onClick={() => setOpen(true)}>{Trigger}</div>
      <Modal
        size='xl'
        centered
        opened={open}
        onClose={() => setOpen(false)}
        title={`Eliminar riesgo ${plan}`}
        gutter='xl'
      >
        <Grid>
          <Grid.Col span={12}>
            <Text size='xl'>
              ¿Está seguro que desea eliminar el siguiente elemento?
            </Text>
          </Grid.Col>
          <Grid.Col span={12}>
            <Group position='right'>
              <Button variant='contained' color='red' onClick={submitForm}>
                Confirmar
              </Button>
              <Button variant='outline' onClick={() => setOpen(false)}>
                Cancelar
              </Button>
            </Group>
          </Grid.Col>
        </Grid>
      </Modal>
    </>
  )
}
