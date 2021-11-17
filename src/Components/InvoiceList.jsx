import React, { useContext } from 'react'
import { InvoiceContext } from '../Context/InvoiceContext'
import Invoice from './Invoice'
import styled from 'styled-components'
import {GlobalStyles} from '../Components/Styles/GlobalStyles'
import BackgroundImg from '../assets/illustration-empty.svg'

const InvoiceWrapper = styled.div ` 
    padding: 32px 24px;

    @media screen and (min-width: 768px) {
		padding: 56px 48px;
	}
    @media screen and (min-width: 1024px) {
		padding: 72px 48px;
        margin: 0 auto;
	}
`

const NoInvoiceWrapper = styled.div ` 
    height: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 32px 24px;

    img {
        margin-bottom: 40px;
    }
    h2 {
        margin-bottom: 20px;
    }
    p {
        color: #888EB0;
        text-align: center;
    }
    p > span {
        font-weight: 700;
    }
`

export default function InvoiceList({filters}) {
    const [invoices, setInvoices] = useContext(InvoiceContext)

    return (
        <>
            <InvoiceWrapper>
                {/* TODO: kad filter ne vrati nijedan invoice onda se ne prikazuje slika  */}
                {
                    invoices.length !== 0 ?
                    invoices.map(invoice => {
                        if(filters.length === 0) return <Invoice {...invoice} key={invoice.id} />
                        else if(filters.includes(invoice.status)) return <Invoice {...invoice} key={invoice.id} />
                        return null
                    })
                    : (<NoInvoiceWrapper>
                        <img src={BackgroundImg} alt="ilustration-empty" />
                        <h2>There is nothing here</h2>
                        <p>Create an invoice by clicking the <br /> <span>New</span> button and get started</p>
                    </NoInvoiceWrapper>)
                }
            </InvoiceWrapper>
        </>
    )
}
