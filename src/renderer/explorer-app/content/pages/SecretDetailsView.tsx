import * as React from 'react'
import * as m from 'react-materialize'
import * as dateformat from 'dateformat'

import Gopass, { HistoryEntry } from '../../../secrets/Gopass'
import PaginatedTable from '../../common/PaginatedTable'
import { passwordSecretRegex } from '../../side-navigation/SecretIcons'
import { ratePassword, PasswordRatingResult } from '../../../password-health/PasswordRules'
import PasswordRatingComponent from '../../../password-health/PasswordRatingComponent'
import LoadingScreenView from '../../common/LoadingScreenView'

interface SecretDetailsState {
    secretValue: string
    historyEntries: HistoryEntry[]
    isPassword: boolean
    passwordRating: PasswordRatingResult | undefined
    loading: boolean
}

interface SecretDetailsViewProps {
    secretName: string
    freshlyAdded: boolean
    copySecretToClipboard?: (secretName: string) => void
}

export default class SecretDetailsView extends React.Component<SecretDetailsViewProps, SecretDetailsState> {
    constructor(props: SecretDetailsViewProps) {
        super(props)
        this.state = {
            secretValue: '',
            historyEntries: [],
            passwordRating: undefined,
            isPassword: false,
            loading: true
        }
    }

    public async componentDidMount() {
        await this.createState(this.props.secretName)
    }

    public async componentWillReceiveProps(props: { secretName: string }) {
        await this.createState(props.secretName)
    }

    public render() {
        const { secretName, freshlyAdded } = this.props
        const { secretValue, isPassword, passwordRating, loading } = this.state

        return (
            loading ?
                <LoadingScreenView /> :
                (
                    <>
                        <h4>Secret { freshlyAdded && <m.Icon small>fiber_new</m.Icon> }</h4>
                        <m.Card
                            title={ secretName }
                            actions={ [
                                <a key='copy-clipboard' className='link' onClick={ () => this.props.copySecretToClipboard!(secretName) }>Copy to clipboard</a>
                            ] }
                        >
                            { secretValue }
                        </m.Card>

                        {
                            isPassword && passwordRating &&
                                <>
                                    <h4 className='m-top'>Password Strength</h4>
                                    <PasswordRatingComponent passwordRating={ passwordRating } />
                                </>
                        }

                        <h4 className='m-top'>History</h4>
                        { this.renderHistoryTable() }
                    </>
                )
        )
    }

    private renderHistoryTable() {
        const rows = this.state.historyEntries.map(entry => ({
            ...entry,
            id: entry.hash,
            timestamp: dateformat(new Date(entry.timestamp), 'yyyy-mm-dd HH:MM')
        }))
        const columns = [
            { fieldName: 'timestamp', label: 'Time' },
            { fieldName: 'author', label: 'Author' },
            { fieldName: 'message', label: 'Message' }
        ]

        return (
            <PaginatedTable
                columns={ columns }
                rows={ rows }
            />
        )
    }

    private async createState(secretName: string) {
        const [ secretValue, historyEntries ] = await Promise.all([
            Gopass.show(secretName),
            Gopass.history(secretName)
        ])
        const isPassword = passwordSecretRegex.test(secretName)

        this.setState({
            secretValue,
            historyEntries,
            isPassword,
            passwordRating: isPassword ? ratePassword(secretValue) : undefined,
            loading: false
        })
    }
}
