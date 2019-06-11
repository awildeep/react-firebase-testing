import React from 'react';

export interface FirebaseContextInterface {
    firebase: any
}

const FirebaseContext = React.createContext<FirebaseContextInterface>({
    firebase: {}
});

export default FirebaseContext;