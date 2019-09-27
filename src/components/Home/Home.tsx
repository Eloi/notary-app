import React, { useState, useEffect } from 'react'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import classNames from 'classnames'

import Paper from '@material-ui/core/Paper'
import Chip from '@material-ui/core/Chip'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import SaveIcon from '@material-ui/icons/Save'

import { AddressState } from '../../types/redux'

import Layout from '../Layout'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginTop: 50,
            padding: theme.spacing(3, 2),
        },
        p: {
            padding: theme.spacing(3, 2),
        },
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

interface StateProps {
    address: AddressState,
    contractAddress: AddressState
}

interface DispatchProps {
    setContractAddress: (contractAddress: string) => void,
}

interface Props extends StateProps, DispatchProps { }

const Home: React.FC<Props> = (props) => {
    const classes = useStyles()
    const { address, contractAddress } = props
    const [formValid, setFormValid] = useState(false)
    const [contractAddressField, setContractAddressField] = useState('')
    const [contractAddressFieldHelperText, setContractAddressFieldHelperText] = useState('')

    useEffect(() => {
        setContractAddressField(contractAddress || '')
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        const hash = contractAddressField
            .toLowerCase()
            .replace(/[^a-fx0-9]/g, '')
            .substring(0, 42)

        if (hash !== contractAddressField) {
            setContractAddressField(hash)
        }

        setContractAddressFieldHelperText(`0x + hex characters (0-9a-f) ${contractAddressField.length}/42  `)
        // eslint-disable-next-line
    }, [contractAddressField])

    useEffect(() => {
        validateForm()
        // eslint-disable-next-line
    }, [contractAddressField])

    const validateForm = () => {
        setFormValid((contractAddressField.length === 42 &&
            contractAddressField.startsWith('0x') &&
            contractAddressField !== contractAddress))
    }

    const onSubmit = () => {
        props.setContractAddress(contractAddressField)
    }

    return (
        <Layout selected="welcome">

            <Typography variant="h2" component="h2">
                Welcome!
            </Typography>
            <Paper className={classes.root}>
                <Typography variant="h5" component="h3">
                    Checklist
                </Typography>
                <div className={classes.p}>
                    {(address &&
                        <Chip color="primary" label={`From account configured (${address})`} />
                    ) ||
                        <Chip color="secondary" label={`From account missing. Please configure and enable metamask`} />
                    }
                </div>
                <div className={classes.p}>
                    {(contractAddress &&
                        <Chip color="primary" label={`Contract address configured (${contractAddress})`} />
                    ) ||
                        <Chip color="secondary" label={`Contract address missing. Please configure it in the form below`} />
                    }
                </div>
            </Paper>
            <Paper className={classes.root}>
                <Typography variant="h5" component="h3">
                    Settings
                </Typography>
                <form
                    className={classNames(classes.container, classes.dense)}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        label="Contract Address"
                        className={classes.textField}
                        value={contractAddressField}
                        onChange={(event) => setContractAddressField(event.target.value)}
                        margin="normal"
                        variant="outlined"
                        helperText={contractAddressFieldHelperText}
                        required
                    />
                    <Button
                        onClick={onSubmit}
                        variant="contained"
                        color="default"
                        disabled={!formValid}
                        className={classNames(classes.submitButton, classes.dense)}>
                        Save contract address
                    <SaveIcon className={classes.rightIcon} />
                    </Button>
                </form>
            </Paper>
        </Layout>
    )
}

export default Home