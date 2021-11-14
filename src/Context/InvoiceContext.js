import React, { createContext, useState, useEffect } from 'react'
import invoiceMockData from "../mockdata/data.json"

export const InvoiceContext = createContext()

const invoiceDataLocal = JSON.parse(localStorage.getItem("invoices"))

export function InvoiceProvider({ children }) {

    const [ invoices, setInvoice ] = useState(invoiceDataLocal || invoiceMockData)

    useEffect(() => {
        localStorage.setItem("invoices", JSON.stringify(invoices))
        document.title = `Invoices (${invoices.length})`
    }, [invoices])

    return (
        <InvoiceContext.Provider value={[invoices, setInvoice]}>
            {children}
        </InvoiceContext.Provider>
    )
}

InvoiceContext.displayName = "Invoice"