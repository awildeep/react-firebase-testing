import React from 'react';
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom';
import Navigation from './components/Navigation';
import LandingPage from './components/Landing';
import SignUpPage from './components/SignUp';
import SignInPage from './components/SignIn';
import PasswordForgetPage from './components/PasswordForget';
import HomePage from './components/Home';
import AccountPage from './components/Account';
import AdminPage from './components/Admin';
import * as ROUTES from './constants/routes';
import Firebase, { FirebaseContext } from './components/Firebase';
import CurrentUserProvider from "./components/Context/CurrentUserProvider";

function App() {
    const initialState = {
        authenticated: false,
        authUser: {},
        currentUser: { },
        admin: false
    };

    const reducer = (state: any, action: any) => {
        switch (action.type) {
            case 'setAdmin':
                return {
                    ...state,
                    admin: action.value,
                };
            case 'setAuthenticated':
                return {
                    ...state,
                    authenticated: action.authenticated,
                };
            case 'setAuthUser':
                return {
                    ...state,
                    authenticated: true,
                    authUser: action.newAuthUser
                };
            case 'unsetuthUser':
                return {
                    ...state,
                    authenticated: false,
                    authUser: {},
                    currentUser: {}
                };
            case 'setCurrentUser':
                return {
                    ...state,
                    currentUser: action.newCurrentUser
                };
            case 'unsetCurrentUser':
                return {
                    ...state,
                    authenticated: false,
                    authUser: {},
                    currentUser: {}
                };
            default:
                return state;
        }
    };

  return (
      <CurrentUserProvider reducer={reducer} initialState={initialState}>
          <FirebaseContext.Provider value={
              {
                  firebase: new Firebase()
              }
          }>
              <Router>
                  <Navigation/>
                  <hr />

                  <Route exact path={ROUTES.LANDING} component={LandingPage} />
                  <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
                  <Route path={ROUTES.SIGN_IN} component={SignInPage} />
                  <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
                  <Route path={ROUTES.HOME} component={HomePage} />
                  <Route path={ROUTES.ACCOUNT} component={AccountPage} />
                  <Route path={ROUTES.ADMIN} component={AdminPage} />
              </Router>
          </FirebaseContext.Provider>
      </CurrentUserProvider>

  );
}

export default App;
