import React, {useContext, useState} from 'react';
import FirebaseContext from "../Firebase/context";
import { Redirect } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

const SignUpForm = function () {
    const {firebase} = useContext(FirebaseContext);
    const [redirectTo, setRedirectTo] = useState('');
    const [username, setUsername] = useState('');
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [passwordOne, setPasswordOne] = useState('');
    const [passwordTwo, setPasswordTwo] = useState('');
    const [error, setError] = useState('');

    const onSubmit = (event: any) => {
        firebase
            .doCreateUserWithEmailAndPassword(email, passwordOne)
            .then((authUser:any) => {
                firebase
                    .user(authUser.user.uid)
                    .set({
                        uid: authUser.user.uid,
                        nickname,
                        username,
                        email,
                        roles: [
                            ROLES.USER
                        ],
                        pendingApproval: true
                    });


                setRedirectTo(ROUTES.HOME);

            })
            .catch((error:any) => {
                setError (error.message);
            });

        event.preventDefault();
    };

    if(redirectTo !== '') {
        return (<Redirect to={redirectTo}/>);
    }

    const isInvalid =
        passwordOne !== passwordTwo ||
        passwordOne === '' ||
        email === '' ||
        username === '';

    return (
        <form onSubmit={onSubmit}>
            <input
                name="nickname"
                value={nickname}
                onChange={(evt)=>setNickname(evt.target.value)}
                type="text"
                placeholder="nickname"
            />
            <input
                name="username"
                value={username}
                onChange={(evt)=>setUsername(evt.target.value)}
                type="text"
                placeholder="Username"
            />
            <input
                name="email"
                value={email}
                onChange={(evt)=>setEmail(evt.target.value)}
                type="text"
                placeholder="Email Address"
            />
            <input
                name="passwordOne"
                value={passwordOne}
                onChange={(evt)=>setPasswordOne(evt.target.value)}
                type="password"
                placeholder="Password"
            />
            <input
                name="passwordTwo"
                value={passwordTwo}
                onChange={(evt)=>setPasswordTwo(evt.target.value)}
                type="password"
                placeholder="Confirm Password"
            />
            <button type="submit" disabled={isInvalid}>Sign Up</button>

            {error && <p>{error}</p>}
        </form>
    );
};

export default SignUpForm;