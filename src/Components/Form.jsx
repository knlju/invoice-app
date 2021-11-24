import React, { useContext, useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Button } from './Styles/Components.style'
import { InvoiceContext } from '../Context/InvoiceContext'
import TrashIcon from '../assets/icon-delete.svg'
import Select from '../Components/Select.style'

// import ScrollLock from 'react-scrolllock'

const FormItem = ({id, name, quantity, price, total, setItemValue}) => {

    const handlePriceChange = e => {
        const { name, value } = e.target
        setItemValue(name, value, id)
        setItemValue("total", parseFloat(e.target.value) * quantity, id)
    }

    const handleQuantityChange = e => {
        const { name, value } = e.target
        setItemValue(name, value, id)
        setItemValue("total", price * parseInt(value), id)
    }

    return (
        <>
            <input type="text" name="name" value={name} onChange={setItemValue} />
            <input type="number" name="quantity" value={quantity} onChange={handleQuantityChange} />
            <input type="number" name="price" value={price} onChange={handlePriceChange} />
            <input type="number" name="total" value={total} readOnly />
        </>
    )
}

const getId = (function () {
    let count = 0
    return function () {
        return count++;
    }
})()

const getDateFromDifference = (date, difference) => {
    const newDate = new Date(date)
    newDate.setDate(date.getDate() + parseInt(difference))
    return new Date(newDate).toUTCString()
}

const emptyInvoice = {
    senderAddress: {
        street: "",
        city: "",
        postCode: "",
        country: ""
    },
    clientName: "",
    clientEmail: "",
    clientAddress: {
        street: "",
        city: "",
        postCode: "",
        country: ""
    },
    createdAt: new Date().toUTCString(),
    paymentTerms: "30",
    paymentDue: getDateFromDifference(new Date(), 30),
    description: "",
    status: "draft",
    items: [
        {
            name: "New Item", 
            quantity: 0, 
            price: 0, 
            total: 0, 
            id: getId()
        }
    ],
    total: 0
}

const newErrList = {
    senderAddress: {
        street: false,
        city: false,
        postCode: false,
        country: false
    },
    clientName: false,
    clientEmail: false,
    clientAddress: {
        street: false,
        city: false,
        postCode: false,
        country: false
    },
    description: false,
    items: []
}

// TODO finish
const Form = ({invoice = emptyInvoice, setFormOpen, onFormSave = () => {}}) => {
    const getInvoiceItemsMapped = () => {
        const invoiceCopy = {...invoice}
        invoiceCopy.items = invoiceCopy.items.map(item => {return {...item, id: getId()}})
        return invoiceCopy.items
    }    

    const [ formData, setFormData ] = useState({
        id: invoice?.id || getId() + "",
        createdAt: invoice.createdAt,
        paymentDue: invoice.paymentDue,
        description: invoice.description,
        paymentTerms: invoice.paymentTerms,
        clientName: invoice.clientName,
        clientEmail: invoice.clientEmail,
        status: invoice.status,
    })
    const [ clientAddress, setClientAddress ] = useState({...invoice.clientAddress})
    const [ senderAddress, setSenderAddress ] = useState({...invoice.senderAddress})
    const [ items, setItems ] = useState(getInvoiceItemsMapped())
    const { invoices, setInvoices } = useContext(InvoiceContext)
    const [ totalState, setTotalState ] = useState(invoice.total)
    const [ errList, setErrList ] = useState({...newErrList, items: items.map(item => false)})

    useEffect(()=>{
        calculateTotal()
    }, [items])

    const handleSAChange = e => {
        const { name, value } = e.target
        setSenderAddress(prevItems => {return {...prevItems, [name]: value}})
    }

    const handleCAChange = e => {
        const { name, value } = e.target
        setClientAddress(prevItems => {return {...prevItems, [name]: value}})
    }

    const handleFormDataChange = e => {
        const { name, value } = e.target
        setFormData(prevItems => {return {...prevItems, [name]: value}})
    }

    const handlePaymentDueChange = e => {
        const diff = e.target.value
        const newDate = getDateFromDifference(new Date(formData.createdAt), diff)
        setFormData(prevData => {return {
            ...prevData,
            paymentDue: newDate.toString(),
            paymentTerms: diff
        }})
    }

    const setItemValue = (name, value, id) => {
        setItems(prevItems => {
            const newItems = prevItems.map(item => {
                if(item.id === id) return {...item, [name]: value}
                else return item
            })
            return newItems
        })
    }

    const addItem = () => {
        setItems(prevItems => 
            [...prevItems, 
                {name: "New Item", quantity: 0, price: 0, total: 0, id: getId()}
            ]
        )
    }

    const deleteItem = id => {
        setItems(prevItems => {
            const newItems = [...prevItems]
            newItems.splice(prevItems.findIndex(item => item.id === id), 1)
            return newItems
        })
    }

    const validateForm = () => {
        // TODO good luck
        let isValid = true
        if(senderAddress.street.trim() === "") {
            isValid = false
            setErrList(prevErrs => {
                return {
                    ...prevErrs,
                    senderAddress: {
                        ...prevErrs.senderAddress,
                        street: true
                    }
                }
            })
        }
        return isValid
    }

    const addInvoice = () => {
        if(!validateForm()) return
        const status = "pending"
        const newInvoice = {
            ...formData,
            clientAddress,
            senderAddress,
            status,
            items,
            total: totalState
        }
        const newInvoices = [...invoices, newInvoice]
        setInvoices(newInvoices)
        setFormOpen(false)
    }

    const saveChanges = () => {
        if(!validateForm()) return
        const newInvoice = {
            ...formData,
            clientAddress,
            senderAddress,
            items,
            total: totalState
        }
        const newInvoices = invoices.map(inv => inv.id === formData.id ? newInvoice : inv)
        setInvoices(newInvoices)
        onFormSave(newInvoice)
        setFormOpen(false)
    }

    const saveAsDraft = () => {
        const status = "draft"
        const newInvoice = {
            ...formData,
            clientAddress,
            senderAddress,
            status,
            items,
            total: totalState
        }
        const newInvoices = [...invoices, newInvoice]
        setInvoices(newInvoices)
        setFormOpen(false)
    }

    const btns = invoice === emptyInvoice ? (
        // TODO add flex etc
        <>
            <Button type="edit" onClick={e => setFormOpen(false)}>
                Discard
            </Button>
            <Button type="draft" onClick={saveAsDraft}>
                Save as Draft
            </Button>
            <Button type="purple" onClick={addInvoice}>
                Save & Send
            </Button>
        </>
    ) : (
        <>
            <Button type="draft" onClick={e => setFormOpen(false)}>
                Cancel
            </Button>
            <Button type="purple" onClick={saveChanges}>
                Save Changes
            </Button>
        </>
    )

    const calculateTotal = () => setTotalState(items.reduce((total, item) => total +  parseFloat(item.total), 0))

    return ReactDOM.createPortal(
        <>
        <FormBackgroundOverlay>
        <FormWrapper>
            <FormMainWrapper>
            <div>
                <Link to="/">
                    <div>{"<"} Go back</div>
                </Link>
                <h2>{ invoice.id ? `Edit ${invoice.id}` : "New Invoice" }</h2>
                <form action="">
                    <h4>Bill From</h4>
                    <div>
                        <label htmlFor="street-address-from">Street Address</label>
                        <input type="text" value={senderAddress.street} onChange={e => handleSAChange(e)} name="street" id="street-address-from" />
                    </div>
                    <div className="formBillPlace">
                        <div className="formBillPlaceCityPost">
                            <div>
                                <label htmlFor="city">City</label>
                                <input type="text" name="city" value={senderAddress.city} onChange={e => handleSAChange(e)} />
                            </div>
                            <div>
                                <label htmlFor="post-code">Post Code</label>
                                <input type="text" name="postCode" value={senderAddress.postCode} onChange={e => handleSAChange(e)} />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="country">Country</label>
                            <input type="text" name="country" value={senderAddress.country} onChange={e => handleSAChange(e)}  />
                        </div>
                    </div>
                    <h4>Bill To</h4>
                    <div>
                        <label htmlFor="clietns-name">Client’s Name</label>
                        <input type="text" name="clientName" value={formData.clientName} onChange={e => handleFormDataChange(e)} />
                        <label htmlFor="client-email">Client’s Email</label>
                        <input type="text" name="clientEmail" value={formData.clientEmail} onChange={e => handleFormDataChange(e)} />
                        <label htmlFor="street-address">Street Address</label>
                        <input type="text" name="street" value={clientAddress.street} onChange={e => handleCAChange(e)} />
                    </div>
                    <div className="formBillPlace">
                        <div className="formBillPlaceCityPost">
                            <div>
                                <label htmlFor="client-city">City</label>
                                <input type="text" name="city" value={clientAddress.city} onChange={e => handleCAChange(e)} />
                            </div>
                            <div>
                                <label htmlFor="client-post-code">Post Code</label>
                                {/* <span>Can't be empty</span> */}
                                <input type="text" name="postCode" value={clientAddress.postCode} onChange={e => handleCAChange(e)} />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="country">Street Address</label>
                            <input type="text" name="country" value={clientAddress.country} onChange={e => handleCAChange(e)} />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="client-city">Invoice Date</label>
                        <input type="date" name="createdAt" value={formData.createdAt}
                         onChange={e => handleCAChange(e)} 
                         />
                        <label>
                            Payment Terms
                            <select name="paymentDue" value={formData.paymentTerms} onChange={e => handlePaymentDueChange(e)}>
                                <option value="1">Net 1 day</option>
                                <option value="7">Net 7 day</option>
                                <option value="14">Net 14 day</option>
                                <option value="30">Net 30 day</option>
                            </select>
                        </label>


                         <Select label="Payment Terms" name="paymentTerms" options={dropdownOptions}/>


                    </div>
                    <div>
                        <label htmlFor="client-city">Project Description</label>
                        <input type="text" name="description" value={formData.description} onChange={e => handleFormDataChange(e)} />
                    </div>
                </form>
            </div>
            <div>

                <h3>Item List</h3>
                {items && items.map(item => (
                    <div className="formAddNewItem" key={item.id}>
                        <FormItem key={item.id} {...item} setItemValue={setItemValue} />
                        <Button className="formTrashBtn" onClick={() => deleteItem(item.id)}>
                            <img src={TrashIcon} alt="delete-icon" />
                        </Button>
                    </div>
                ))}
            </div>
            <div>
                <label htmlFor="">
                    <input type="total" value={totalState} readOnly />
                </label>
            </div>
            <Button onClick={addItem} type="new-item">Add Item</Button>
            </FormMainWrapper>
            
            <FormButtonWrapper>
                {btns}
            </FormButtonWrapper>
        </FormWrapper> 
        </FormBackgroundOverlay>
        </>
        , document.getElementById("portal"))
}
const FormBackgroundOverlay = styled.div `
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
    z-index: 4;
    background: linear-gradient(rgba(0, 0, 0, .5), rgba(0, 0, 0, .5));

`
const FormWrapper = styled.div ` 
    position: fixed;
    min-height: 100vh;
    width: 100%;
    top: 72px;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: ${props => props.theme.color.form.bg};
    z-index: 5;
    overflow: auto;
    
    @media screen and (min-width: 768px) {
            max-width: 616px;
            right: auto;
            top: 0;
        }

`
const FormButtonWrapper = styled.div ` 
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 21px 24px;
    gap: 8px;
    background-color: ${props => props.theme.color.invoiceItem.bg};
`

const FormMainWrapper = styled.div ` 
    padding: 32px 24px 0;
    /* overflow: scroll; */

    h2 {
        color: ${props => props.theme.color.text.heading}; 
        margin: 24px 0;
    }
    h3 {
        font-weight: 700;
        font-size: 18px;
        line-height: 32px;
        letter-spacing: -0.375px;
        color: #777F98;
        margin-bottom: 24px;
    }
    h4 {
        color: #7C5DFA;
        font-weight: 700;
        font-size: 12px;
        line-height: 15px;
        margin-bottom: 24px;
    }

    label {
        font-weight: 500;
        font-size: 12px;
        line-height: 15px;
        color: ${props => props.theme.color.text.formLabel}; 
        letter-spacing: -0.25px;
        display: block;
        margin-bottom: 10px;
    }
    input {
        width: 100%;
        /* border: 1px solid ${props => props.valid ? props.theme.color.form.fieldBorder : '#EC5757'}; */
        border: 1px solid ${props => props.theme.color.form.fieldBorder};
        border-radius: 4px;
        padding: 16px;
        margin-bottom: 24px;
        background: ${props => props.theme.color.form.fieldBg};
        outline: none;
        color: ${props => props.theme.color.text.heading};
        font-weight: bold;
        transition: all 0.3s ease;
        ::placeholder {
            color: ${props => props.theme.color.text.placeholder};
            transition: color .3s;
        }
        :focus {
            border: 1px solid #9277FF;
        }
    }

    .formBillPlace {

        @media screen and (min-width: 768px) {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            gap: 24px;
            width: 100%;
        }
    }

    .formBillPlaceCityPost {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 23px;
        /* @media screen and (min-width: 768px) {

            justify-content: space-between;
            flex: 1;
        } */
    }
    .formTrashBtn {
        background: transparent;
    }
    .formAddNewItem {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
`

const dropdownOptions = [
    {name: 'Net 1 Day', value: 1},
    {name: 'Net 7 Days', value: 7},
    {name: 'Net 14 Days', value: 14},
    {name: 'Net 30 Days', value: 30}
]

export default Form
