import React, {ReactNode, useReducer} from 'react';
import CurrentUserContext from './CurrentUserContext';


export interface Props {
    reducer: (state: any, action: any)=>void,
    initialState: any,
    children : ReactNode,
}

function CurrentUserProvider (props: Props) {
    const { children } = props;

    return (
        <CurrentUserContext.Provider
            value={useReducer(props.reducer, props.initialState)}
        >
            {children}
        </CurrentUserContext.Provider>
    );
}

export default CurrentUserProvider;