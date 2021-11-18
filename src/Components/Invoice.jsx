import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
// import {GlobalStyles} from '../Components/Styles/GlobalStyles'
import ArrowRight from '../assets/icon-arrow-right.svg'


const InvoiceSection = styled.section ` 
    padding: 24px;
    background-color: #fff;
    box-shadow: 0px 10px 10px -10px rgba(72, 84, 159, 0.100397);
    border-radius: 8px;
    display: flex;
    flex-wrap: wrap;
    max-width: 340px;
    margin: 0 auto 16px;
	
	justify-content: space-between;

    @media screen and (min-width: 768px) {
        max-width: 672px;
        align-items: center;
        padding: 16px 24px;

        display: grid;
        grid-template-columns: 0.5fr 1fr 1fr 1fr 1fr 10px;
        gap: 20px;
    }

	@media screen and (min-width: 1024px) {
		max-width: 730px;
	}
`
const IdWrapper = styled.div ` 
	display: flex;
	align-items: center;
	margin-bottom: 10px;

    @media screen and (min-width: 768px) {
        margin-bottom: 0;
        order: -2;
    }
`
const ClientId = styled.span ` 
    font-weight: 700;
    text-transform: uppercase;
	margin-right: 125px;
	color: #0C0E16;

    @media screen and (min-width: 768px) {
        margin: 0;
    }
`
const PaymentDue = styled.span ` 
	margin-right: 200px;
	position: relative;
	top: 14px;

    @media screen and (min-width: 768px) {
        margin: 0;
        position: initial;
        top: 0;
        order: -1;
    }
`

const TotalDue = styled.span ` 
	font-weight: bold;
	font-size: 16px;
	line-height: 24px;
	letter-spacing: -0.8px;
	color: #0C0E16;
	align-self: flex-end;

    @media screen and (min-width: 768px) {
        align-self: center;
        text-align: right;
        margin-right: 20px;
    }
`

export const PaymentStatusCont = styled.div ` 
	padding: 12px 12px;
	border-radius: 6px;
    max-width: 104px;
	display: flex;
	align-items: center;
	gap: 8px;
	justify-content: center;
	background-color: rgba(51, 214, 159, 0.06);

	${props => {
		switch (props.status) {
			case "draft":
				return "background-color: rgba(55, 59, 83, 0.06);";
			case "pending":
				return "background-color: rgba(255, 143, 0, 0.06);";
			case "paid":
				return "background-color: rgba(51, 214, 159, 0.06);";
		}
	}}
`
export const PaymentStatus = styled.span `
    color: #33D69F;
    text-transform: capitalize;
    font-weight: 700;

	${props => {
		switch (props.status) {
			case "draft":
				return "color: rgba(55, 59, 83, 1);";
			case "pending":
				return "color: rgba(255, 143, 0, 1);";
			case "paid":
				return "color: rgba(51, 214, 159, 1);";
			}
		}}
	
`

export const PaymentStatusDot = styled.div ` 
		height: 8px;
        width: 8px;
        border-radius: 50%;
        background-color: #33D69F;
		display: inline-block;

		${props => {
		switch (props.status) {
			case "draft":
				return "background-color: rgba(55, 59, 83, 1);";
			case "pending":
				return "background-color: rgba(255, 143, 0, 1);";
			case "paid":
				return "background-color: rgba(51, 214, 159, 1);";
			}
		}}
`

const ArrowDiv = styled.div ` 
    display: none;

    @media screen and (min-width: 768px) {
        display: inline-block;
    }
`


export default function Invoice({ id, total, status, clientName, paymentDue }) {
    return (
        <Link to={"invoices/" + id}>
            <InvoiceSection>
                <IdWrapper>
                    <span>#</span>
                    <ClientId>{id}</ClientId>
                </IdWrapper>
                <span>{clientName}</span>

                <PaymentDue>{paymentDue}</PaymentDue>
				<TotalDue>£ {total}</TotalDue>

				<PaymentStatusCont status={status}>
					<PaymentStatusDot status={status} />
                    <PaymentStatus status={status} >
                        {status} 
                    </PaymentStatus>
                </PaymentStatusCont>

                <ArrowDiv>
                    <img src={ArrowRight} alt="arrow-right" />
                </ArrowDiv>
                
            </InvoiceSection>
        </Link>
    )
}
