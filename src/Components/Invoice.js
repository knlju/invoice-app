import React from 'react'
import { Link } from 'react-router-dom'
import "../Styles/Invoice.css"

export default function Invoice({ id, description, status }) {
    return (
        <Link to={"invoices/" + id}>
            <section className="invoice">
                <div>{id}</div>
                <div>{description}</div>
                <div>{status}</div>
            </section>
        </Link>
    )
}
