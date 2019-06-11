import React, {useContext, useState} from 'react';
import FirebaseContext from "../Firebase/context";
import { Redirect } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import CurrentUserContext from "../Context/CurrentUserContext";
import {auth} from "../Firebase/firebase";

const SignInForm = function () {
    const [{authenticated, currentUser, authUser}, dispatch] = useContext(CurrentUserContext);
    const {firebase} = useContext(FirebaseContext);
    const [redirectTo, setRedirectTo] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const onSubmit = (event: any) => {
        firebase
            .doSignInWithEmailAndPassword(email, password)
            .then((authUser:any) => {

                //const rootRef =database.ref().orderByChild("uid").equalTo(authUser.user.uid);
                //const rootRef =database.ref();


                dispatch({
                    type: 'setAuthUser',
                    newAuthUser: authUser
                });

                console.log('uid', authUser.user.email);
                console.log(auth.currentUser);
                // const query = rootRef.child('users').orderByChild('uid').equalTo(authUser.user.uid).limitToFirst(1);
                // query.on('value', (user)=>{
                //     console.log('userRef.on',  user);
                //     dispatch({
                //         type: 'setCurrentUser',
                //         newCurrentUser: user
                //     });
                // });

                const query = firebase.users().orderByChild('email').equalTo(authUser.user.email).limitToFirst(1);
                query.once('value').then(
                    function(dataSnapshot:any) {
                        // handle read data.
                        console.log('userRef.on',  dataSnapshot);
                        dispatch({
                            type: 'setCurrentUser',
                            newCurrentUser: dataSnapshot
                        });
                    }
                )




                    console.log('uid2', authUser.user.uid);




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

    const isInvalid = password === '' || email === '';

    return (
        <React.Fragment>
        {authenticated &&
            <p>Welcome {authUser.user.email}</p>
        }
        {!authenticated &&
            <form onSubmit={onSubmit}>
                <input
                    name="email"
                    value={email}
                    onChange={(evt)=>setEmail(evt.target.value)}
                    type="text"
                    placeholder="Email Address"
                />
                <input
                    name="password"
                    value={password}
                    onChange={(evt)=>setPassword(evt.target.value)}
                    type="password"
                    placeholder="Password"
                />

                <button type="submit" disabled={isInvalid}>Sign In</button>

                {error && <p>{error}</p>}
            </form>
        }
        </React.Fragment>

    );
};

export default SignInForm;