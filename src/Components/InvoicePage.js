import React, { useEffect, useContext } from 'react'
import { useParams } from 'react-router'
import { useState } from 'react/cjs/react.development'
import { InvoiceContext } from '../Context/InvoiceContext'

export default function InvoicePage() {
    const { id } = useParams()
    const [invoices, setInvoices] = useContext(InvoiceContext)
    const [invoice, setInvoice] = useState(null)

    useEffect(() => {
        const foundInv = invoices.find(inv => inv.id === id)
        // TODO mock ucitavanja, obrisati kasnije
        setTimeout(() => setInvoice(foundInv), 2000)

    }, [])

    return (
        <div className="invoice-page">
            <h2>Invoice page</h2>
            {invoice ?
                <h3>{invoice.id}</h3>
                : <div>loading...</div>}
        </div>
    )
}
