import React, { useContext, useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Button } from './Styles/Components.style'
import { InvoiceContext } from '../Context/InvoiceContext'
import TrashIcon from '../assets/icon-delete.svg'
import Select from '../Components/Select.style'

// import ScrollLock from 'react-scrolllock'

const FormItem = ({id, name, quantity, price, total, setItemValue, deleteItem}) => {

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
        <FormNewItemWrapper>
            <div className="formNewItemName">
                <InputWrapper>
                    <label htmlFor="name">Item name</label>
                    <input type="text" name="name" value={name} onChange={setItemValue} />
                </InputWrapper>        
            </div>
            <div className="formNewItemQPT">
                <div>
                    <InputWrapper>
                        <label htmlFor="quantity">Qty.</label>
                        <input type="number" name="quantity" value={quantity} onChange={handleQuantityChange} />
                    </InputWrapper>        
                </div>
                <div>
                    <InputWrapper>
                        <label htmlFor="price">Price</label>
                        <input type="number" name="price" value={price} onChange={handlePriceChange} />
                    </InputWrapper>        
                </div>
                <div>
                    <InputWrapper>
                        <label htmlFor="total">Total</label>
                        {/* <input type="number" name="total" value={total} readOnly /> */}
                        <h3>{total}</h3>
                    </InputWrapper>        
                </div>
                <Button className="formTrashBtn" onClick={() => deleteItem(id)}>
                    <img src={TrashIcon} alt="delete-icon" />
                </Button>
            </div>
        </FormNewItemWrapper>
        </>
    )
}

const FormNewItemWrapper = styled.div `
    display: flex;
    flex-wrap: wrap;

    @media screen and (min-width: 768px) {
        flex-wrap: nowrap;
    }

    .formNewItemName {
        width: 100%;
        @media screen and (min-width: 768px) {
            width: auto;
            margin-right: 16px;
        }
    }
    input[type=text] {
        width: 100%;
    }
    .formNewItemQPT {
        display: grid;
        grid-template-columns: 0.5fr 1fr 1fr 0.5fr;
        gap: 16px;

        h3 {
            font-weight: bold;
            font-size: 12px;
            line-height: 15px;
            letter-spacing: -0.25px;
            color: #888eb0;
            margin-top: 26px;
        }
    }
    .formTrashBtn {
        background: transparent;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
    }

`

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
    const [ errList, setErrList ] = useState(newErrList)
    const [ showNoEmptyFieldsErr, setShowNoEmptyFieldsErr ] = useState(false)
    const [ showItemErr, setShowItemErr ] = useState(false)

    useEffect(()=>{
        calculateTotal()
    }, [items])

    const handleSAChange = e => {
        const { name, value } = e.target
        validateSAField(e)
        setSenderAddress(prevItems => {return {...prevItems, [name]: value}})
    }

    const validateSAField = e => {
        const { name, value } = e.target
        validateFieldNonEmpty(value, isValid => updateErrState(name, isValid, "senderAddress"))
    }

    const handleCAChange = e => {
        const { name, value } = e.target
        validateCAField(e)
        setClientAddress(prevItems => {return {...prevItems, [name]: value}})
    }

    const validateCAField = e => {
        const { name, value } = e.target
        validateFieldNonEmpty(value, isValid => updateErrState(name, isValid, "clientAddress"))
    }

    const handleFormDataChange = e => {
        const { name, value } = e.target
        validateFormField(e)
        setFormData(prevItems => {return {...prevItems, [name]: value}})
    }

    const validateFormField = e => {
        const { name, value } = e.target
        validateFieldNonEmpty(value, isValid => updateErrState(name, isValid))
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

    const updateErrState = (attr, isValid = true, nested = false) => {
        console.log(attr, isValid, nested)
        const newErrList = {...errList}
        console.log("errListCopy", newErrList)
        if(nested) {
            const nestedCopy = {...errList[nested]}
            nestedCopy[attr] = isValid
            newErrList[nested] = nestedCopy
            console.log("errListCopy nested", newErrList)
        } else {
            newErrList[attr] = isValid
            console.log("errListCopy attr only", newErrList)
        }
        setErrList(newErrList)
    }

    const validateFieldNonEmpty = (value, cbUpdateErrState) => {
        if(value.trim() === "") cbUpdateErrState(true)
        else cbUpdateErrState(false)
    }

    const validateForm = () => {
        let isValid = true
        const newErrList = {
            ...errList,
            clientAddress: {...errList.clientAddress},
            senderAddress: {...errList.senderAddress}
        }
        for (const [key, value] of Object.entries(senderAddress)) {
            if(!Object.keys(errList.senderAddress).includes(key)) continue
            if(value.trim() === "") {
                isValid = false
                newErrList.senderAddress[key] = true
            }
        }
        for (const [key, value] of Object.entries(clientAddress)) {
            if(!Object.keys(errList.clientAddress).includes(key)) continue
            if(value.trim() === "") {
                isValid = false
                newErrList.clientAddress[key] = true
            }
        }
        for (const [key, value] of Object.entries(formData)) {
            if(!Object.keys(errList).includes(key)) continue
            if(value.trim() === "") {
                isValid = false
                newErrList[key] = true
            }
        }
        if(items.length === 0) {
            isValid = false
            setShowItemErr(true)
        }
        if(!isValid) setShowNoEmptyFieldsErr(true)
        setErrList(newErrList)
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
    const dateProps = invoice === emptyInvoice ?  {onChange:e => handleFormDataChange(e)} : {readOnly: true}

    return ReactDOM.createPortal(
        <>
        <FormBackgroundOverlay>
        <FormWrapper>
            <FormMainWrapper>
            <div>
                {/* TODO */}
                <div onClick={() => setFormOpen(false)}>
                    <div>{"<"} Go back</div>
                </div>
                <h2>{ invoice.id ? `Edit #${invoice.id}` : "New Invoice" }</h2>
                <form action="">
                    <h4>Bill From</h4>
                    <div>
                        <InputWrapper valid={errList.senderAddress.street}>
                            <label htmlFor="street-address-from">Street Address</label>
                            <span>can't be empty</span>
                            <input type="text" value={senderAddress.street} onBlur={e => validateSAField(e)} onChange={e => handleSAChange(e)} name="street" id="street-address-from" />
                        </InputWrapper>
                    </div>
                    <div className="formBillPlace">
                        <div className="formBillPlaceCityPost">
                            <div>
                                <InputWrapper valid={errList.senderAddress.city}>
                                    <label htmlFor="city">City</label>
                                    <span>can't be empty</span>
                                    <input type="text" name="city" value={senderAddress.city} onBlur={e => validateSAField(e)} onChange={e => handleSAChange(e)} />
                                </InputWrapper>
                            </div>
                            <div>
                                <InputWrapper valid={errList.senderAddress.postCode}>
                                    <label htmlFor="post-code">Post Code</label>
                                    <span>can't be empty</span>
                                    <input type="text" name="postCode" value={senderAddress.postCode} onBlur={e => validateSAField(e)} onChange={e => handleSAChange(e)} />
                                </InputWrapper>
                            </div>
                        </div>
                        <div>
                            <InputWrapper valid={errList.senderAddress.country}>
                                <label htmlFor="country">Country</label>
                                <span>can't be empty</span>
                                <input type="text" name="country" value={senderAddress.country} onBlur={e => validateSAField(e)} onChange={e => handleSAChange(e)}  />
                            </InputWrapper>
                        </div>
                    </div>
                    <h4>Bill To</h4>
                    <div>
                        <InputWrapper valid={errList.clientName}>
                            <label htmlFor="clietns-name">Client’s Name</label>
                            <span>can't be empty</span>
                            <input type="text" name="clientName" value={formData.clientName} onBlur={e => validateFormField(e)} onChange={e => handleFormDataChange(e)} />
                        </InputWrapper>
                        <InputWrapper valid={errList.clientEmail}>
                            <label htmlFor="client-email">Client’s Email</label>
                            <span>can't be empty</span>
                            <input type="text" name="clientEmail" value={formData.clientEmail} onBlur={e => validateFormField(e)} onChange={e => handleFormDataChange(e)} />
                        </InputWrapper>
                        <InputWrapper valid={errList.clientAddress.street}>
                            <label htmlFor="street-address">Street Address</label>
                            <span>can't be empty</span>
                            <input type="text" name="street" value={clientAddress.street} onBlur={e => validateCAField(e)} onChange={e => handleCAChange(e)} />
                        </InputWrapper>
                    </div>
                    <div className="formBillPlace">
                        <div className="formBillPlaceCityPost">
                            <div>
                                <InputWrapper valid={errList.clientAddress.city}>
                                    <label htmlFor="client-city">City</label>
                                    <span>can't be empty</span>
                                    <input type="text" name="city" value={clientAddress.city} onBlur={e => validateCAField(e)} onChange={e => handleCAChange(e)} />
                                </InputWrapper>
                            </div>
                            <div>
                                <InputWrapper valid={errList.clientAddress.postCode}>
                                    <label htmlFor="client-post-code">Post Code</label>
                                    <span>can't be empty</span>
                                    <input type="text" name="postCode" value={clientAddress.postCode} onBlur={e => validateCAField(e)} onChange={e => handleCAChange(e)} />
                                </InputWrapper>
                            </div>
                        </div>
                        <div>
                            <InputWrapper valid={errList.clientAddress.country}>
                                <label htmlFor="country">Country</label>
                                <span>can't be empty</span>
                                <input type="text" name="country" value={clientAddress.country} onBlur={e => validateCAField(e)} onChange={e => handleCAChange(e)} />
                            </InputWrapper>
                        </div>
                    </div>
                    <div>
                        <InputWrapper>
                            <label htmlFor="client-city">Invoice Date</label>
                            <input type="date" name="createdAt" value={formData.createdAt} {...dateProps} />
                        </InputWrapper>
                        <InputWrapper>
                            <Select label="Payment Terms" name="paymentTerms" options={dropdownOptions} value={formData.paymentTerms} onChange={e => handlePaymentDueChange(e)} />
                        </InputWrapper>
                    </div>
                    <div>
                        <InputWrapper valid={errList.description}>
                            <label htmlFor="client-city">Project Description</label>
                            <span>can't be empty</span>
                            <input type="text" name="description" value={formData.description} onBlur={e => validateFormField(e)} onChange={e => handleFormDataChange(e)} />
                        </InputWrapper>
                    </div>
                </form>
            </div>
            <div>
                <h3>Item List</h3>
                {items && items.map(item => (
                    <div key={item.id}>
                        <FormItem key={item.id} {...item} deleteItem={deleteItem} setItemValue={setItemValue} />
                    </div>
                ))}
            </div>
            <Button className="FormAddNewItem"onClick={addItem} type="new-item">Add Item</Button>
            
            {showNoEmptyFieldsErr && <div className="mainErrorMessage">- All fields must be added</div>}
            {showItemErr && <div className="mainErrorMessage">- An item must be added</div>}
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
    transition: all 0.3s ease;
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
    /* overflow: auto; */
    
    @media screen and (min-width: 768px) {
            max-width: 616px;
            right: auto;
    }
    @media screen and (min-width: 1024px) {
            max-width: 719px;
            top: 0;
    }

`
const FormButtonWrapper = styled.div ` 
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 21px 24px;
    gap: 8px;
    background-color: ${props => props.theme.color.invoiceItem.bg};

    @media screen and (min-width: 768px) {
            max-width: 616px;
            right: auto;
    }
    @media screen and (min-width: 1024px) {
            max-width: 719px;
            /* top: 0; */
    }
`

const FormMainWrapper = styled.div ` 
    padding: 32px 24px 180px;
    overflow: auto;
    height: 100%;
    @media screen and (min-width: 1024px) {
        padding: 32px 24px 90px 136px;
    }

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
    .FormAddNewItem {
        width: 100%;
        margin-bottom: 32px;
    }
    /* .formBillPlaceCityPost > * {
        flex: 1;
    } */
    .formTrashBtn {
        background: transparent;
    }
    .formAddNewItem {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .mainErrorMessage{
        font-weight: 600;
        font-size: 10px;
        line-height: 15px;
        letter-spacing: -0.208333px;
        color: #EC5757;
    }
`

const InputWrapper = styled.span`
    label {
        font-weight: 500;
        font-size: 12px;
        line-height: 15px;
        color: ${props => !props.valid ? props.theme.color.text.formLabel : '#EC5757'}; 
        letter-spacing: -0.25px;
        display: inline-block;
        margin-bottom: 10px;
    }
    input {
        width: 100%;
        border: 1px solid ${props => !props.valid ? props.theme.color.form.fieldBorder : '#EC5757'};
        /* border: 1px solid ${props => props.theme.color.form.fieldBorder}; */
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
    span {
        display: inline-block;
        visibility: ${props => !props.valid ? 'hidden' : 'visible'};
        color: #EC5757;
        font-weight: 500;
        position: relative;
        top: 4px;
        font-size: 10px;
        line-height: 15px;
        float: right;
    }
`

const dropdownOptions = [
    {name: 'Net 1 Day', value: 1},
    {name: 'Net 7 Days', value: 7},
    {name: 'Net 14 Days', value: 14},
    {name: 'Net 30 Days', value: 30}
]

export default Form
