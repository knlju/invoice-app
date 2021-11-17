import React, { useState } from 'react'
import PropTypes from 'prop-types'
import InvoiceList from './InvoiceList'

const InvoicesWrapper = props => {
    const [filters, setFilters] = useState([])

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
        <div>
            <div>
                <div>Invoices</div>
                <div>There are n invoices</div>
                <div>
                    <div>Filter by</div>
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
            </div>
            <InvoiceList filters={filters} />
        </div>
    )
}

InvoicesWrapper.propTypes = {

}

export default InvoicesWrapper
