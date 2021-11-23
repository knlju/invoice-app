import React, { createContext, useState, useEffect } from 'react'
import invoiceMockData from "../mockdata/data.json"

export const InvoiceContext = createContext()

const invoiceDataLocal = JSON.parse(localStorage.getItem("invoices"))

export function InvoiceProvider({ children }) {

    const [ invoices, setInvoice ] = useState(invoiceDataLocal || invoiceMockData)

    // TODO: add memo

    useEffect(() => {
        localStorage.setItem("invoices", JSON.stringify(invoices))
        document.title = `Invoices (${invoices.length})`
    }, [invoices])

    // TODO: kad budemo hteli da napravimo server

    // const [ invoices, setInvoice ] = useState([])

    // useEffect(()=>{
    //     (async ()=> {
    //         const appData = await fetch("https://invoice-v1-be.herokuapp.com/invoices")
    //         const json = await appData.json()
    //         setInvoice(json)
    //     })()
    // }, [])

    return (
        <InvoiceContext.Provider value={[invoices, setInvoice]}>
            {children}
        </InvoiceContext.Provider>
    )
}

InvoiceContext.displayName = "Invoice"