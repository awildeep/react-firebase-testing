import React, { useEffect} from 'react';
import {Redirect} from "react-router";
import * as ROUTES from '../../constants/routes';
import {auth} from '../Firebase/firebase';

const withAuthorization = (condition: any) => (Component: any) => {
    const WithAuthorizationComp = (props: any) => {
        useEffect(() => {
            // Update the document title using the browser API
            const listener = auth.onAuthStateChanged(
                (authUser:any) => {
                    if (!condition(authUser)) {
                        //to sign-in
                        return (<Redirect to={ROUTES.SIGN_IN}/>)
                    }
                });
            return function cleanup() {
                listener();
            };
        });

        return <Component {...props} />;
    };

    return WithAuthorizationComp;
};

export default withAuthorization;