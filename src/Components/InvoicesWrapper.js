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
    margin-left: 18px;

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
    /* padding: 0 24px; */
    margin: 32px auto 0 auto;
    width: 100%;
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
        margin-left: 4px;
    }

`

const InvoicesFilterContainer = styled.div ` 
    display: flex;
    align-items: center;
    justify-content: center;

    position: relative;

    &>div:first-child {
        display: flex;
        align-items: center;
        /* gap: 16px; */

        span {
            font-weight: 700;
            color: #0C0E16;
        }
        span:last-child {
            margin-left: 16px;
        }
    }
`

const FilterArrowDown = styled.span ` 
    background-image: url(${FilterArrow});
    display: block; 
    background-repeat: no-repeat;
    background-position: center center;
    width: 12px;
    height: 4px;

    ${({rotateArrow}) => {
        return rotateArrow && 'transform: rotate(180deg);';
    }}
`

const CheckboxModal = styled.div ` 
    position: absolute;
    top: 25px;
    left: -105px;
    background-color: #fff;
    border-radius: 8px;
    padding: 24px;
    width: 190px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    box-shadow: 0px 10px 20px rgba(72, 84, 159, 0.25);
    z-index: 1;

    @media screen and (min-width: 1024px) {
         left: -50px;
    }

    label {
        display: flex;
        gap: 10px;
        align-items: baseline;
        font-weight: 700;
        font-size: 12px;
        line-height: 15px;
        letter-spacing: -0.25px;
        color: #1E2139;
        cursor: pointer;
    }

    input {
        position:relative;
        top: 2px;
    }
`
const NewInvoiceWrapper = styled.div ` 

    display: flex;
    flex-direction: column;
    margin: 0 auto;
    width: 100%;
    max-width: 327px;
    @media screen and (min-width: 768px) {
        max-width: 672px;
    }
    @media screen and (min-width: 1024px) {
        max-width: 730px;
    }
`

const InvoicesWrapper = props => {
    const [filters, setFilters] = useState([])
    const [invoices, setInvoices] = useContext(InvoiceContext)
    const [showFilterModal, setShowFilterModal] = useState(false)

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
            <NewInvoiceWrapper>
            <NewInvoiceHeader>
                <div>
                    <h2>Invoices</h2>
                    <span> <InvoicesLengthMob> There are</InvoicesLengthMob> {invoices.length} invoices</span>
                </div>
                <NewInvoiceHeaderFilter>
                    <InvoicesFilterContainer>
                        <div onClick={() => setShowFilterModal(!showFilterModal)}> <span>Filter </span> <InvoicesFilterMob> by status</InvoicesFilterMob>   <FilterArrowDown rotateArrow={showFilterModal}/> </div>
                            {/* TO DO - CUSTOM CHECKBOX */}
                        {showFilterModal && <CheckboxModal>
                            <label htmlFor="draft">
                                <input type="checkbox" name="draft" id="draft" value={filters.includes("draft")} onChange={e => handleFilterChange("draft")} /> Draft
                            </label>
                            <label htmlFor="pending">
                                <input type="checkbox" name="pending" id="pending" value={filters.includes("pending")} onChange={e => handleFilterChange("pending")} /> Pending
                            </label>
                            <label htmlFor="paid">
                                <input type="checkbox" name="paid" id="paid" value={filters.includes("paid")} onChange={e => handleFilterChange("paid")} /> Paid 
                            </label>
                        </CheckboxModal>}

                        
                    </InvoicesFilterContainer>
                    <div>
                        <NewInvoiceBtn type="purple">
                            <IconPlusCont />
                            New<span>Invoice</span> 
                        </NewInvoiceBtn>
                    </div>
                </NewInvoiceHeaderFilter>
            </NewInvoiceHeader>
            <InvoiceList invoices={invoices} filters={filters} />

            </NewInvoiceWrapper>
        </>
    )
}

InvoicesWrapper.propTypes = {

}

export default InvoicesWrapper
