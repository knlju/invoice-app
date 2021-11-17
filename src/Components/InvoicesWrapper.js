import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import InvoiceList from './InvoiceList'
import { InvoiceContext } from '../Context/InvoiceContext'
import { Button } from './Styles/Components.style'


const InvoicesWrapper = props => {
    const [filters, setFilters] = useState([])
    const [invoices, setInvoices] = useContext(InvoiceContext)

    const handleFilterChange = filter => {
        const newFilters = [...filters]
        if(filters.includes(filter)){
            newFilters.splice(filters.indexOf(filter), 1)
        } else {
            newFilters.push(filter)
        }
        setFilters(newFilters)
    }

    return (
        <>
            <div>
                <div>
                    <h1>Invoices</h1>
                    <div>There are {invoices.length} invoices</div>
                </div>
                <div>
                    <div>
                        <div>Filter by status</div>
                        <div>
                            <label htmlFor="draft">
                                <input type="checkbox" name="draft" id="draft" value={filters.includes("draft")} onChange={e => handleFilterChange("draft")} /> Draft
                            </label>
                            <label htmlFor="pending">
                                <input type="checkbox" name="pending" id="pending" value={filters.includes("pending")} onChange={e => handleFilterChange("pending")} /> Pending
                            </label>
                            <label htmlFor="paid">
                                <input type="checkbox" name="paid" id="paid" value={filters.includes("paid")} onChange={e => handleFilterChange("paid")} /> Paid 
                            </label>
                        </div>
                    </div>
                    <div>
                        <Button type="purple">
                            {/* TODO add plus */}
                            New Invoice
                        </Button>
                    </div>
                </div>
            </div>
            <InvoiceList invoices={invoices} filters={filters} />
        </>
    )
}

InvoicesWrapper.propTypes = {

}

export default InvoicesWrapper
