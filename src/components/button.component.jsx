import { Button } from "react-bootstrap";
import React from "react";

export function ButtonComponent({label, onClick}){
    return(
        <Button variant="primary" onClick={onClick}>
            {label}
        </Button>
    );
}