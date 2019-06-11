import React, {useContext, useState} from 'react';
import FirebaseContext from "../Firebase/context";

const PasswordForgetForm = () => {
    const {firebase} = useContext(FirebaseContext);
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const onSubmit = (event: any) => {

        firebase
            .doPasswordReset(email)
            .then(() => {
                //this.setState({ ...INITIAL_STATE });
            })
            .catch((error: any) => {
                setError(error.message);
                //this.setState({ error });
            });

        event.preventDefault();
    };

    const isInvalid = email === '';

    return (
        <form onSubmit={onSubmit}>
            <input
                name="email"
                value={email}
                onChange={(evt)=>{setEmail(evt.target.value)}}
                type="text"
                placeholder="Email Address"
            />
            <button disabled={isInvalid} type="submit">
                Reset My Password
            </button>

            {error && <p>{error}</p>}
        </form>
    );
};

export default PasswordForgetForm;