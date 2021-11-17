import React, { useEffect, useContext } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { useState } from 'react/cjs/react.development'
import { InvoiceContext } from '../Context/InvoiceContext'
import ConfirmationModal from './ConfirmationModal'
import { Button } from './Styles/Components.style'

export default function InvoicePage() {
    const { id } = useParams()
    const [invoices, setInvoices] = useContext(InvoiceContext)
    const [invoice, setInvoice] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)

    useEffect(() => {
        const foundInv = invoices.find(inv => inv.id === id)
        // // TODO mock ucitavanja, obrisati kasnije
        // setTimeout(() => setInvoice(foundInv), 2000)
        setInvoice(foundInv)
    }, [])

    const deleteInvoice = () => {
        const newInvoices = [...invoices]
        newInvoices.splice(newInvoices.findIndex(inv => inv.id === id), 1)
        setInvoices(newInvoices)
    }

    const markAsPaid = () => {
        const updatedInvoice = {...invoice, status: "paid"}
        const newInvoices = invoices.map(inv => inv.id === id ? updatedInvoice : inv)
        setInvoice(updatedInvoice)
        setInvoices(newInvoices)
    }

    return (
        <div className="invoice-page">
            <div>
                <Link to="/">
                   {"<"} Go back
                </Link>
            </div>
            <div>
                <Button type="edit" onClick={() => alert("ne diraj")}>
                    Edit
                </Button>
                <Button type="delete" onClick={() => setModalOpen(true)}>
                    Delete
                </Button>
                {(invoice && invoice.status !== "paid") && (
                    <Button type="purple" onClick={markAsPaid}>
                        Mark as Paid
                    </Button>
                )}
            </div>

            {modalOpen && <ConfirmationModal invoiceId={id} deleteInvoice={deleteInvoice} setModalOpen={setModalOpen} />}

            <h2>Invoice page</h2>
            {invoice ?
                <h3>{invoice.id}</h3>
                : <div>loading...</div>}
        </div>
    )
}
