import React, { useEffect, useContext } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { useState } from 'react/cjs/react.development'
import { InvoiceContext } from '../Context/InvoiceContext'
import ConfirmationModal from './ConfirmationModal'
import { Button } from './Styles/Components.style'
import GoBackLink from './GoBackLink'
import styled from 'styled-components'
import {PaymentStatusCont, PaymentStatus, PaymentStatusDot} from '../Components/Invoice'
import Form from './Form'
// import { url } from 'inspector'

const InvoiceCont = styled.div ` 
        padding: 32px 0;
         background-color: ${props => props.theme.color.body.bg};

        @media screen and (min-width: 768px) {
            padding: 48px 24px;
            max-width: 688px;
            margin: 0 auto;
        }
        @media screen and (min-width: 1024px) {
            padding: 64px 24px;
            max-width: 730px;
        }

    `
    const InvoiceMain = styled.div ` 
        padding: 24px;
        background-color: #fff;
        border-radius: 8px;

        span {
            display: block;
        }
    `
    const InvoiceMainHeader = styled.div ` 
        display: flex;
        flex-direction: column;
        gap: 30px;
        margin-bottom: 30px;
        @media screen and (min-width: 768px) {
            flex-direction: row;
            justify-content: space-between;
        }

        div:first-child>h3 {
            display: flex;
            align-items: center;
            margin-bottom: 4px;
        }
        div:first-child>h3>span {
            display: inline-block;
        }

        div:last-child span {
            margin-bottom: 4px;
        }
        div:last-child {
            @media screen and (min-width: 768px) {
                text-align: right;
            }
        }
    `

    const InvoiceMainMiddle = styled.div ` 
        display: flex;
        flex-direction: column;

        @media screen and (min-width: 768px) {
            flex-direction: row;
            justify-content: flex-start;
            gap: 100px;
        }
    

        & > div:first-child {
            display: flex;
            gap: 40px;
            @media screen and (min-width: 768px) {
                gap: 100px;
            }

           & > div:first-child span {
               margin-bottom: 12px;
           }
           & > div:first-child h3 {
               margin-bottom: 30px;
           }
        }

        & div:last-child span:first-child {
            margin-bottom: 12px;
        }
        & div:last-child > h3 {
            margin-bottom: 10px;
        }
        & div:last-child span:not(:first-child) {
            margin-bottom: 5px;
        }
    `

    const InvoiceTotal = styled.div ` 
        border-radius: 8px;
        background-color: #F9FAFE;
        overflow: hidden;
    `

    const InvoiceTotalHeading = styled.div ` 
        display: flex;
        flex-direction: column;
        gap: 15px;
        padding: 24px;
    `
    const InvoiceTotalHeadingTitle = styled.div ` 
        display: none;
        grid-template-columns: 3fr 1fr 1fr 1fr;

        @media screen and (min-width: 768px) {
            display: grid;
        }

        span {
            font-size: 11px;
            @media screen and (min-width: 768px) {
                text-align: right;
            }
        }
        span:first-child {
            @media screen and (min-width: 768px) {
                text-align: left;
            }
        }
        span:nth-child(2) {
            @media screen and (min-width: 768px) {
                text-align: center;
            }
        }
    `
    const InvoiceTotalHeadingInvoice = styled.div ` 
        display: grid;
        grid-template-columns: 1fr 1fr;
        align-items: center;
        /* margin-bottom: 20px; */

        @media screen and (min-width: 768px) {
            grid-template-columns: 3fr 1fr 1fr 1fr;
        }

        div h4 {
            font-size: 12px;
            line-height: 15px;
            letter-spacing: -0.25px;
            color: #0C0E16;
            margin-bottom: 6px;
        }

        &>span {
            color: #0C0E16;
            font-weight: 700;
            text-align: right;
        }
        &>span:not(:last-child) {
            display: none;
            @media screen and (min-width: 768px) {
                display: inline-block;
                color: #7E88C3;
            }
        }
        span:nth-child(2) {
            @media screen and (min-width: 768px) {
            text-align: center;
            }
        }
    `
    const InvoiceTotalHeadingInvoiceMobileQNT = styled.div ` 
        display: flex;
        align-items: center;
        gap: 3px;

        span {
            font-weight: 700;
        }

        @media screen and (min-width: 768px) {
            display: none;
        }
    `


    const InvoiceTotalFooter = styled.div ` 
        padding: 24px;
        background-color: #373B53;
        color: #fff;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        align-items: center;

        h2 {
            text-align: right;
        }
        span {
            color: #fff;
            font-weight: 300;
        }
    `

    const ButtonsContainer = styled.div `  
    
        background-color: #fff;
        padding: 20px 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        order: 1;
        @media screen and (min-width: 768px) {
            order: 0;
            /* display: inline-block; */
            /* width: 250px; */
            border-radius: 0 8px 8px 0;
        }
    `
    const InvoiceMainWrapper = styled.div ` 
        padding: 0 24px;
        margin-bottom: 56px;
        @media screen and (min-width: 768px) {
            padding: 0;
            width: 100%;
            margin-top: 24px;
        }
    `
    const InvoiceHelperContainer = styled.div ` 
        display: flex;
        flex-direction: column;

        @media screen and (min-width: 768px) {
            flex-wrap: wrap;
            flex-direction: row;
            margin-top: 32px;
            
        }
    `
    const StatusHelperContainer = styled.div ` 
        padding: 0 24px;
        margin-bottom: 16px;
        margin-top: 32px;
        @media screen and (min-width: 768px) {
            /* display: inline-block; */
            /* width: 250px; */
            margin-bottom: 0;
            margin-top: 0;
            padding: 0;
            flex-grow: 1;
            display: inline-grid;
        }
    `
    const StatusContainer = styled.div ` 
        padding: 24px;
        /* background-color: #fff; */
         background-color: ${props => props.theme.color.body.bg};
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-radius: 8px;

        @media screen and (min-width: 768px) {
            gap: 16px;
            border-radius: 8px 0 0 8px;
            justify-content: flex-start;
            /* padding-right: 166px; */
        }
        
    `
export default function InvoicePage() {
    const { id } = useParams()
    const [invoices, setInvoices] = useContext(InvoiceContext)
    const [invoice, setInvoice] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)
    const [formOpen, setFormOpen] = useState(false)

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

    const {status} = invoice || {};

    return (
            
        <InvoiceCont>
            { formOpen && <Form invoice={invoice} /> }
            <GoBackLink />
            <InvoiceHelperContainer>

            <StatusHelperContainer>
                <StatusContainer>
                    <span>Status</span>
                    <PaymentStatusCont status={status}>
                        <PaymentStatusDot status={status} />
                        <PaymentStatus status={status} >
                            {status} 
                        </PaymentStatus>
                </PaymentStatusCont>
                </StatusContainer>
            </StatusHelperContainer>

            <ButtonsContainer>
                <Button type="edit" onClick={() => setFormOpen(true)}>
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
            </ButtonsContainer>

            {modalOpen && <ConfirmationModal invoiceId={id} deleteInvoice={deleteInvoice} setModalOpen={setModalOpen} />}


            {invoice ?
                <InvoiceMainWrapper>
                <InvoiceMain>
                    <InvoiceMainHeader>
                        <div>
                            <h3> <span>#</span> {invoice.id} </h3>
                            <span>{invoice.description}</span>
                        </div>
                        <div>
                            <span>{invoice.senderAddress.street}</span>
                            <span>{invoice.senderAddress.city}</span>
                            <span>{invoice.senderAddress.postCode}</span>
                            <span>{invoice.senderAddress.country}</span>
                        </div>  
                    </InvoiceMainHeader>
                    <InvoiceMainMiddle>
                        <div className="dateAndBill">
                            <div className="dates">
                                    <span>Invoice Date</span>
                                    <h3>{invoice.createdAt}</h3>
                                    <span>Payment Due</span>
                                    <h3>{invoice.paymentDue}</h3>
                            </div>
                            <div className="billTo">
                                <span>Bill To</span>
                                <h3>{invoice.clientName}</h3>
                                <span>{invoice.clientAddress.street}</span>
                                <span>{invoice.clientAddress.city}</span>
                                <span>{invoice.clientAddress.postCode}</span>
                                <span>{invoice.clientAddress.country}</span>
                            </div>
                        </div>
                        <div className="mail-to">
                            <span>Sent to</span>
                            <h3>{invoice.clientEmail}</h3>
                        </div>
                    </InvoiceMainMiddle>
                    
                    <InvoiceTotal>
                        <InvoiceTotalHeading>
                           <InvoiceTotalHeadingTitle>
                               <span>Item Name</span>
                               <span>QTY.</span>
                               <span>Price</span>
                               <span>Total</span>
                           </InvoiceTotalHeadingTitle>

                            {
                                invoice.items.map((item, i) =>  (
                                    <InvoiceTotalHeadingInvoice key={i}>
                                        <div>
                                            <h4>{item.name}</h4>
                                            <InvoiceTotalHeadingInvoiceMobileQNT>
                                                <span>{item.quantity}</span>
                                                <span>x</span>
                                                <span>£ {item.price}</span>
                                            </InvoiceTotalHeadingInvoiceMobileQNT>
                                        </div>
                                        <span>{item.quantity}</span>
                                        <span>£ {item.price}</span>
                                        <span>£ {item.total}</span>
                                    </InvoiceTotalHeadingInvoice>
                                    ) 
                                ) 
                            }
                        </InvoiceTotalHeading>
                        <InvoiceTotalFooter>
                            <span>Grand Total</span>
                            <h2>£ {invoice.total}</h2>
                        </InvoiceTotalFooter>
                    </InvoiceTotal>

                </InvoiceMain>
                </InvoiceMainWrapper>
                


                : <div>loading...</div>}

            </InvoiceHelperContainer>
        </InvoiceCont>
    )
}
