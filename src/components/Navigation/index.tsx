import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import CurrentUserContext from "../Context/CurrentUserContext";

const Navigation = () => {
    const [{authenticated, admin}] = useContext(CurrentUserContext);

    return (
        <div>
            <ul>
                {authenticated &&
                <React.Fragment>
                    <li>
                        <Link to={ROUTES.LANDING}>Landing</Link>
                    </li>
                    <li>
                        <Link to={ROUTES.HOME}>Home</Link>
                    </li>
                    <li>
                        <Link to={ROUTES.ACCOUNT}>Account</Link>
                    </li>
                    <li>
                        <SignOutButton/>
                    </li>
                </React.Fragment>
                }
                {!authenticated &&
                <React.Fragment>
                    <li>
                        <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
                    </li>
                    <li>
                        <Link to={ROUTES.SIGN_IN}>Sign In</Link>
                    </li>
                </React.Fragment>
                }
                {admin &&
                <React.Fragment>
                    <li>
                        I am an admin!
                    </li>
                </React.Fragment>
                }
            </ul>
        </div>
    );
};

export default Navigation;