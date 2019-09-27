import React, { useState, useEffect } from 'react'

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import classNames from 'classnames'

import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import SearchIcon from '@material-ui/icons/Search'

import Layout from '../Layout'
import Snackbar from '../Snackbar'
import { AssetState } from '../../types/redux'

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
    root: {
      width: '100%',
      marginTop: theme.spacing(3),
      overflowX: 'auto',
    },
    table: {
    },
  }),
)

interface DispatchProps {
  fetchAsset: (docHash: string) => void,
  contractClear: () => void

}

interface StateProps {
  asset: AssetState | null,
  assetError: string,
  isLoading: boolean
}

interface Props extends StateProps, DispatchProps {
}

const Assets: React.FC<Props> = (props) => {
  const { isLoading, asset, assetError } = props

  const classes = useStyles();

  const [docHash, setDocHash] = useState('')
  const [docHashHelperText, setDocHashHelperText] = useState('')
  const [formValid, setFormValid] = useState(false)
  const [showLoading, setShowLoading] = useState(false)
  const [showError, setShowError] = useState('')


  useEffect(() => {
    props.contractClear()
    // eslint-disable-next-line
  }, [])

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
    validateForm()
    // eslint-disable-next-line
  }, [docHash])


  useEffect(() => {
    setShowLoading(isLoading)
    // eslint-disable-next-line
  }, [isLoading])


  useEffect(() => {
    setShowError(assetError)
    // eslint-disable-next-line
  }, [assetError])

  const validateForm = () => {
    setFormValid((docHash.length === 64))
  }

  const onSubmit = () => {
    console.log("SUBMIT fetchAsset", docHash)
    props.fetchAsset(docHash)
  }

  const renderAssets = (assets: AssetState[]) => {
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Hash</TableCell>
              <TableCell align="right">Owner</TableCell>
              <TableCell align="right">Timestamp</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {assets.map(a => (
              <TableRow key={a.hash}>
                <TableCell>
                  {a.hash}
                </TableCell>
                <TableCell align="right">
                  {a.owner}
                </TableCell>
                <TableCell align="right">
                  {(new Date(a.timestamp*1000)).toString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    )
  }

  return (
    <Layout selected="assets">
      <div>
        <Typography variant="h2" component="h2">
          Asset info
        </Typography>
        <form
          className={classNames(classes.container, classes.dense)}
          noValidate
          autoComplete="off"
        >
          <TextField
            label="Document Hash"
            className={classes.textField}
            value={docHash}
            onChange={(event) => setDocHash(event.target.value)}
            margin="normal"
            variant="outlined"
            helperText={docHashHelperText}
            required
          />
          <Button
            onClick={onSubmit}
            variant="contained"
            color="default"
            disabled={!formValid || showLoading}
            className={classNames(classes.submitButton, classes.dense)}>
            Search
            <SearchIcon className={classes.rightIcon} />
          </Button>
        </form>
      </div>
      {!isLoading && asset &&
        renderAssets([asset])
      }
      {showLoading &&
        <Snackbar
          variant="warning"
          message={`Loading ${docHash}...`}
          onClose={() => setShowLoading(false)}
        />
      }
      {showError && showError.length > 0 &&
        <Snackbar
          variant="error"
          message={`Search failed: (${showError})`}
          onClose={() => setShowError('')}
        />
      }
    </Layout>
  )
}

export default Assets