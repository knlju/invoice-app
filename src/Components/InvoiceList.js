import React, { useContext } from 'react'
import { InvoiceContext } from '../Context/InvoiceContext'
import Invoice from './Invoice'

export default function InvoiceList() {
    const [invoices, setInvoices] = useContext(InvoiceContext)

    return (
        <>
            <div className="invoice-list">
                {invoices.map(invoice => <Invoice {...invoice} key={invoice.id} />)}
            </div>
        </>
    )
}
