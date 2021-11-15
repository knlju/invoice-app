import React, { useEffect, useContext } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { useState } from 'react/cjs/react.development'
import { InvoiceContext } from '../Context/InvoiceContext'
import ConfirmationModal from './ConfirmationModal'




export default function InvoicePage() {
    const { id } = useParams()
    const [invoices, setInvoices] = useContext(InvoiceContext)
    const [invoice, setInvoice] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)

    const deleteInvoice = () => {
        const newInvoices = [...invoices]
        newInvoices.splice(newInvoices.findIndex(inv => inv.id === id), 1)
        setInvoices(newInvoices)
    }

    useEffect(() => {
        const foundInv = invoices.find(inv => inv.id === id)
        // TODO mock ucitavanja, obrisati kasnije
        setTimeout(() => setInvoice(foundInv), 2000)
    }, [])

    return (
        <div className="invoice-page">
            <div>
                <button onClick={() => setModalOpen(true)}>
                    delete invoice
                </button>
            </div>

            {modalOpen && <ConfirmationModal deleteInvoice={deleteInvoice} setModalOpen={setModalOpen} />}

            <h2>Invoice page</h2>
            {invoice ?
                <h3>{invoice.id}</h3>
                : <div>loading...</div>}
        </div>
    )
}
