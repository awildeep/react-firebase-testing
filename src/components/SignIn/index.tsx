import React from 'react';
import SignInForm from './SignInForm';
import SignUpLink from '../SignUp/SignUpLink';
import {Link} from "react-router-dom";
import * as ROUTES from '../../constants/routes';

const SignIn = () => (
    <div>
        <h1>SignIn</h1>
        <SignInForm />
        <SignUpLink />
        <p>
            <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
        </p>
    </div>
);
export default SignIn;
