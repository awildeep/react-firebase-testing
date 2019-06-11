import React, {useContext, useState} from 'react';
import FirebaseContext from "../Firebase/context";

const PasswordChange = () =>
{
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [error, setError] = useState('');
    const {firebase} = useContext(FirebaseContext);

    const onSubmit = (event:any) => {

        firebase
            .doPasswordUpdate(password)
            .then(() => {

            })
            .catch((error:any) => {
                setError( error.message);
            });

        event.preventDefault();
    };

    const isInvalid =
        password !== passwordConfirm || password === '';


    return (
        <div>
            Change Password

            <form onSubmit={onSubmit}>
                <input
                    name="password"
                    value={password}
                    onChange={(evt)=>{setPassword(evt.target.value)}}
                    type="password"
                    placeholder="New Password"
                />
                <input
                    name="passwordConfirm"
                    value={passwordConfirm}
                    onChange={(evt)=>{setPasswordConfirm(evt.target.value)}}
                    type="password"
                    placeholder="Confirm New Password"
                />
                <button disabled={isInvalid} type="submit">
                    Reset My Password
                </button>

                {error && <p>{error}</p>}
            </form>
        </div>
    );

};

export default PasswordChange;