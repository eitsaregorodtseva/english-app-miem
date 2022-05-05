import React from "react";
import { Redirect, Route } from "react-router";
import { useHistory } from "react-router-dom";

export const PrivateRoute = ({ component: Component, ...rest }) => {
    let history = useHistory();

    return (
        <Route
            {...rest}
            render={props =>
                localStorage.token ? 
                    (<Component {...props} />) :
                    (
                        <Redirect to={{
                            pathname: "/unauthorized",
                            state: { from: props.location }
                        }}
                        />)
            }
        />
    )
}