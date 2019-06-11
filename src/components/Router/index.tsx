import React, {useContext} from 'react';
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom';
import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import * as ROUTES from '../../constants/routes';
import CurrentUserContext from "../Context/CurrentUserContext";

function AppRouter() {
    const [{authenticated}] = useContext(CurrentUserContext);
    return (
        <Router>
            <Navigation/>
            <hr />
            <Route exact path={ROUTES.LANDING} component={LandingPage} />
            <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
            <Route path={ROUTES.SIGN_IN} component={SignInPage} />
            <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
            {authenticated &&
                <React.Fragment>
                    <Route path={ROUTES.HOME} component={HomePage} />
                    <Route path={ROUTES.ACCOUNT} component={AccountPage} />
                    <Route path={ROUTES.ADMIN} component={AdminPage} />
                </React.Fragment>
            }
        </Router>

    );
}

export default AppRouter;
