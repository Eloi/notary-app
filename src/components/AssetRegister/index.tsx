import React, { useState, useEffect } from 'react'

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import classNames from 'classnames'

import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'

import { buildNotaryContract } from '../../lib/web3/contract'
import Layout from '../Layout'
import Snackbar from '../Snackbar'

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
    paper: {
      margin: theme.spacing(3),
      padding: theme.spacing(1),
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

  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState('')

  useEffect(() => {
    const hash = docHash
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '')
      .substring(0, 64)

    if (hash !== docHash) {
      setDocHash(hash)
    }

    setDocHashHelperText(`${docHash.length}/64 hex characters (0-9a-f)`)
    // eslint-disable-next-line
  }, [docHash])

  useEffect(() => {
    if (docOwner.length > 80) {
      setDocOwner(docOwner.substring(0, 80))
    }
    setDocOwnerHelperText(`Name, E-mail, public key.... (${docOwner.length}/80 max)`)
    // eslint-disable-next-line
  }, [docOwner])

  useEffect(() => {
    validateForm()
    // eslint-disable-next-line
  }, [docHash, docOwner])

  const validateForm = () => {
    setFormValid((docOwner.length > 0 && docHash.length === 64))
  }

  const onSubmit = () => {
    const contract = buildNotaryContract("0x0d4f9651b432F709CBB5076e35BAC24B7068B2a5")
    window.contractDebug = contract
    console.log("SUBMIT", contract)
    if (contract) {
      contract.methods.registerDocument(`0x${docHash}`, docOwner)
        .send(contract.options.from)
        .once('transactionHash', (hash: any) => { console.log("hash", hash) })
        .once('receipt', (receipt: any) => { console.log("receipt", receipt) })
        .on('confirmation', (confNumber: any, receipt: any) => { console.log("confNumber, receipt", confNumber, receipt) })
        .on('error', (error: any) => { console.log("error", error) })
        .then((receipt: any) => {
          console.log("RECEIPT OK", receipt)
          setShowSuccess(true)
          setDocHash('')
        })
        .catch((error: any) => {
          console.log("RECEIPT ERROR", error)
          setShowError(`Error: ${error}`)
        })
    }
  }

  return (
    <Layout selected="register">
        <Typography variant="h2" component="h2">
          Register a new asset
        </Typography>
        <Paper className={classes.paper}>
          <form
            className={classNames(classes.container, classes.dense)}
            noValidate
            autoComplete="off"
          >
            <TextField
              label="Document hash"
              className={classes.textField}
              value={docHash}
              onChange={(event) => setDocHash(event.target.value)}
              margin="normal"
              variant="outlined"
              helperText={docHashHelperText}
              required
            />
            <TextField
              label="Document owner"
              className={classes.textField}
              value={docOwner}
              onChange={(event) => setDocOwner(event.target.value)}
              margin="normal"
              variant="outlined"
              helperText={docOwnerHelperText}
              required
            />
            <Button
              onClick={onSubmit}
              variant="contained"
              color="default"
              disabled={!formValid}
              className={classNames(classes.submitButton, classes.dense)}>
              Register
            <CloudUploadIcon className={classes.rightIcon} />
            </Button>
          </form>
        </Paper>
        {showSuccess &&
          <Snackbar
            variant="success"
            message="Asset registered"
            onClose={() => setShowSuccess(false)}
          />
        }
        {showError.length > 0 &&
          <Snackbar
            variant="error"
            message={`Asset not registered, something happened (${showError})`}
            onClose={() => setShowError('')}
          />
        }
    </Layout>
  )
}

export default AssetRegister