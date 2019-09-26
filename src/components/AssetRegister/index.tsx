import React, { useState, useEffect } from 'react'

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import classNames from 'classnames'

import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'

import Layout from '../Layout'


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      flexDirection: 'column',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 400,
    },
    dense: {
      marginTop: theme.spacing(2),
    },
    menu: {
      width: 200,
    },
    rightIcon: {
      marginLeft: theme.spacing(1),
    },
    submitButton: {
      width: 200,
    },
  }),
)

const AssetRegister: React.FC = () => {

  const classes = useStyles();

  const [docHash, setDocHash] = useState('')
  const [docOwner, setDocOwner] = useState('')

  const [docHashHelperText, setDocHashHelperText] = useState('')
  const [docOwnerHelperText, setDocOwnerHelperText] = useState('')

  const [formValid, setFormValid] = useState(false)

  useEffect(() => {
    if (docHash.length > 64) {
      setDocHash(docHash.substring(0, 64))
    }
    setDocHashHelperText(`${docHash.length}/64 characters`)
    // eslint-disable-next-line
  }, [docHash])

  useEffect(() => {
    if (docOwner.length > 80) {
      setDocOwner(docHash.substring(0, 80))
    }
    setDocOwnerHelperText(`Name, E-mail, public key.... (${docOwner.length}/80 max)`)
    // eslint-disable-next-line
  }, [docOwner])

   useEffect(() => {
     validateForm()
    // eslint-disable-next-line
  }, [docHash, docOwner])

  const validateForm = () => {
    setFormValid((docOwner.length > 0 && docHash.length == 64))
  } 
  
  return (
    <Layout selected="register">
      <div>
        <Typography variant="h2" component="h2">
          Register a new asset
        </Typography>
        <form className={classNames(classes.container, classes.dense)} noValidate autoComplete="off">
          <TextField
            label="Document hash"
            className={classes.textField}
            value={docHash}
            onChange={(event) => setDocHash(event.target.value)}
            margin="normal"
            variant="outlined"
            helperText={docHashHelperText}
          />
          <TextField
            label="Document owner"
            className={classes.textField}
            value={docOwner}
            onChange={(event) => setDocOwner(event.target.value)}
            margin="normal"
            variant="outlined"
            helperText={docOwnerHelperText}
          />
          <Button
            variant="contained"
            color="default"
            disabled={!formValid}
            className={classNames(classes.submitButton, classes.dense)}>
            Register
            <CloudUploadIcon className={classes.rightIcon} />
          </Button>
        </form>
      </div>
    </Layout>
  )
}

export default AssetRegister