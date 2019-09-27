import React, { useState, useEffect } from 'react'

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import classNames from 'classnames'

import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import SearchIcon from '@material-ui/icons/Search'

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

const AssetsSearch: React.FC = () => {

  const classes = useStyles();

  const [docOwner, setDocOwner] = useState('')

  const [docOwnerHelperText, setDocOwnerHelperText] = useState('')

  const [formValid, setFormValid] = useState(false)

  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState('')
  
  const [search, setSearch] = useState('')


  useEffect(() => {
    //const contract = buildNotaryContract("0x0d4f9651b432F709CBB5076e35BAC24B7068B2a5")
    //setContract(contract)
    // eslint-disable-next-line
  }, [])


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
  }, [docOwner])

  const validateForm = () => {
    setFormValid((docOwner.length > 0))
  }

  const onSubmit = () => {
    const contract = buildNotaryContract("0x0d4f9651b432F709CBB5076e35BAC24B7068B2a5")
    window.contractDebug = contract
    setSearch('')
    console.log("SUBMIT", contract)
    if (contract) {
      contract.methods.getDocumentHashesByOwner(docOwner)
        .send(contract.options.from)
        .once('transactionHash', (hash : any) => { console.log("hash",hash) })
        .once('receipt', (receipt  : any) => { 
          console.log("receipt",receipt, receipt.transactionHash)
        })
        .on('confirmation', (confNumber : any, receipt : any) => {
          console.log("CONFIRMATION: confNumber, receipt",confNumber, receipt)
          setSearch(search + ' - ' + receipt.transactionHash)
        })
        .on('error', (error : any) => { console.log("error",error) })
        .then((receipt : any) => {
          console.log("RECEIPT OK", receipt, search)
          setShowSuccess(true)
        })
        .catch((error : any) => {
          console.log("RECEIPT ERROR", error)
          setShowError(`Error: ${error}`)
        })
    }
  }

  return (
    <Layout selected="search">
      <div>
        <Typography variant="h2" component="h2">
          Assets
        </Typography>
        <form
          className={classNames(classes.container, classes.dense)}
          noValidate
          autoComplete="off"
        >
          <TextField
            label="Owner"
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
            Search
            <SearchIcon className={classes.rightIcon} />
          </Button>
        </form>
      </div>
      { showSuccess &&
        <Snackbar
          variant="success"
          message={`Search results: ${search}`}
          onClose={() => setShowSuccess(false)}
        />
      }
      { showError.length > 0 &&
        <Snackbar
          variant="error"
          message={`Search failed: (${showError})`}
          onClose={() => setShowError('')}
          />
      }
    </Layout>
  )
}

export default AssetsSearch