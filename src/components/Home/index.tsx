import React, {useContext} from 'react';
import CurrentUserContext from "../Context/CurrentUserContext";
import {Redirect} from "react-router";
import * as ROUTES from '../../constants/routes';
import withAuthorization from "../Session/withAuthorization";
import {conditionIsUser} from "../../constants/roles";

const Home = () => {
    const [{authenticated, currentUser, authUser}] = useContext(CurrentUserContext);
    console.log(currentUser, authUser);

    if (!authenticated) {
        return (<Redirect to={ROUTES.SIGN_IN}/>);
    }


    return (
        <div>
            {authenticated &&
            <React.Fragment>
                {authUser.user.email}
            </React.Fragment>
            }
            Home
        </div>
    );
};

export default withAuthorization(conditionIsUser)(Home);