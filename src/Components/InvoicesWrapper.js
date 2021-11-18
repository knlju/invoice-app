import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import InvoiceList from './InvoiceList'
import { InvoiceContext } from '../Context/InvoiceContext'
import { Button } from './Styles/Components.style'
import IconPlus from '../assets/icon-plus.svg'
import styled from 'styled-components'
import FilterArrow from '../assets/icon-arrow-down.svg'


const IconPlusCont = styled.div ` 
    background-color: #fff;
    border-radius: 50%;
    height: 32px;
    width: 32px;
    background-image: url(${IconPlus});
    background-repeat: no-repeat;
    background-position: center center;
    margin-right: 15px;
`

const NewInvoiceBtn = styled(Button) ` 
    display: flex;
    align-items: center;
    padding: 8px 15px 8px 8px;

    span {
        display: none;

        @media screen and (min-width: 768px) {
            display: inline-block;    
            font-weight: 700;
            color: #fff;
            margin-left: 4px;
            position: relative;
            top: -1px;
        }
    }
`
const NewInvoiceHeader = styled.div ` 

    display: flex;
    align-items: center;
    justify-content: space-between;
`

const NewInvoiceHeaderFilter = styled.div ` 
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const InvoicesLengthMob = styled.span ` 
    display: none;
    @media screen and (min-width: 768px) { 
        display: inline-block;
    }

`
const InvoicesFilterMob = styled.span ` 
    display: none;
    @media screen and (min-width: 768px) { 
        display: inline-block;
    }

`

const InvoicesFilterContainer = styled.div ` 
    display: flex;
    align-items: center;
    justify-content: center;
`

const FilterArrowDown = styled.span ` 
    background-image: url(${FilterArrow});
    display: block; 
    background-repeat: no-repeat;
    background-position: center center;
    width: 12px;
    height: 4px;
`

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
            <NewInvoiceHeader>
                <div>
                    <h2>Invoices</h2>
                    <span> <InvoicesLengthMob> There are</InvoicesLengthMob> {invoices.length} invoices</span>
                </div>
                <NewInvoiceHeaderFilter>
                    <InvoicesFilterContainer>
                        <div>Filter <InvoicesFilterMob>by status</InvoicesFilterMob>   <FilterArrowDown /> </div>
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
                    </InvoicesFilterContainer>
                    <div>
                        <NewInvoiceBtn type="purple">
                            {/* TODO add plus */}
                            <IconPlusCont />
                            New<span>Invoice</span> 
                        </NewInvoiceBtn>
                    </div>
                </NewInvoiceHeaderFilter>
            </NewInvoiceHeader>
            <InvoiceList invoices={invoices} filters={filters} />
        </>
    )
}

InvoicesWrapper.propTypes = {

}

export default InvoicesWrapper
