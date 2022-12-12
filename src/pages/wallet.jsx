import React, { useEffect } from "react";
import { useState } from "react";
import { useCallback } from "react";
import { Card } from "react-bootstrap";
import { NavbarComponent } from "../components/navbar.component";
import { getPayments } from "../services/axios";

export function Wallet(){
    const [payments, setPayments] = useState();
    const id = localStorage.getItem("user")

    const onFetchPayments = useCallback(async () => {
        const response = await getPayments(id)
        setPayments(response.data)
        Object.values(response.data.completedPayments).map((completedPayment)=>{
            completedPayment.map((payment)=> {
                console.log(payment)
            })
        })
    }, [])

    useEffect(() => {
        onFetchPayments();
    }, [])


    return(
        <>
            <NavbarComponent/>
            {payments && (
                <Card key={payments.totalAmountCompleted}>
                    <Card.Body>
                        <Card.Title>
                            <p>Dinero Disponible</p>
                        </Card.Title>
                        <Card.Text>
                            <h1>{payments.totalAmountCompleted}</h1>
                        </Card.Text>
                    </Card.Body>
                </Card>
            )}
            {
                payments && payments.completedPayments && (
                    Object.values(payments.completedPayments).map((item)=>(
                        item.map((payment)=>(
                            <span>{payment.groupId.category}</span>
                        ))
                    ))
                )
            } 
        </>
    )
}