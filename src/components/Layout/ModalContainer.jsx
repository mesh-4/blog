import React from 'react'
import PropTypes from 'prop-types'
import { Modal } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
  content: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: `translate(-50%, -50%)`,
    width: '40vw',
    color: 'black',
    textAlign: 'center',
    backgroundColor: 'white',
    outline: 'none',
    borderRadius: '8px',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      width: '95vw',
    },
    [theme.breakpoints.up('md')]: {
      width: '75vw',
    },
    [theme.breakpoints.up('lg')]: {
      width: '50vw',
    },
  },
}))

export function ModalContainer({ open, onClose, children }) {
  const classes = useStyles()

  return (
    <Modal open={open} onClose={onClose}>
      <div className={classes.content}>{children}</div>
    </Modal>
  )
}

ModalContainer.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
}
