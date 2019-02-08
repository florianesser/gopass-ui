import * as React from 'react'
import * as m from 'react-materialize'
import { Route, match } from 'react-router-dom'

import SecretDetails from './pages/SecretDetails'
import Settings from './pages/Settings'
import Home from './pages/Home'
import MainNavigation from './navigation/MainNavigation'
import GoBackNavigation from './navigation/GoBackNavigation'
import Notification from '../../notifications/Notification'
import PasswordHealthOverview from './pages/PasswordHealthOverview'
import AddSecretPage from './pages/AddSecretPage'

/* tslint:disable:jsx-no-lambda */
export default class MainContent extends React.Component {
    public render() {
        return (
            <div className='main-content'>
                <Notification />
                <m.Row>
                    <m.Col s={ 12 }>
                        <Route
                            path='/'
                            exact
                            render={ () => (
                                <>
                                    <MainNavigation />
                                    <Home />
                                </>
                            ) }
                        />
                        <Route
                            path='/secrets/:encodedSecretName/view'
                            component={ (props: { match: match<{ encodedSecretName: string }>, location: { search?: string } }) => {
                                const chosenSecretName = atob(props.match.params.encodedSecretName)
                                const freshlyAdded = props.location.search ? props.location.search === '?added' : false

                                return (
                                    <>
                                        <MainNavigation />
                                        <SecretDetails
                                            secretName={ chosenSecretName }
                                            freshlyAdded={ freshlyAdded }
                                        />
                                    </>
                                )
                            } }
                        />
                        <Route
                            path='/settings'
                            exact
                            render={ () => (
                                <>
                                    <GoBackNavigation />
                                    <Settings />
                                </>
                            ) }
                        />
                        <Route
                            path='/password-health'
                            exact
                            render={ () => (
                                <>
                                    <GoBackNavigation />
                                    <PasswordHealthOverview />
                                </>
                            ) }
                        />
                        <Route
                            path='/add-secret'
                            exact
                            render={ () => (
                                <>
                                    <GoBackNavigation />
                                    <AddSecretPage />
                                </>
                            ) }
                        />
                    </m.Col>
                </m.Row>
            </div>
        )
    }
}
