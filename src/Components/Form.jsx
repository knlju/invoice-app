import React, { useContext, useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import { Button } from './Styles/Components.style'
import { InvoiceContext } from '../Context/InvoiceContext'

const FormItem = ({name, quantity, price, total, setItemValue, onTotalVariablesChange}) => {

    const [ priceState, setPriceState ] = useState(price)
    const [ totalState, setTotalState ] = useState(total)
    const [ quantityState, setQuantityState ] = useState(quantity)

    const handlePriceChange = e => {
        setPriceState(parseFloat(e.target.value))
        setItemValue(e)
        const totalEventMock = { target: { name: "total", value: (parseFloat(e.target.value) * quantityState) }}
        setItemValue(totalEventMock)
        setTotalState(parseFloat(e.target.value) * quantityState)
    }

    const handleQuantityChange = e => {
        setQuantityState(parseInt(e.target.value))
        setItemValue(e)
        setTotalState(priceState * parseInt(e.target.value))
        const totalEventMock = { target: {name: "total", value: (priceState * parseInt(e.target.value)) } }
        setItemValue(totalEventMock)
        console.log(priceState)
        console.log(quantityState)
    }

    useEffect(() => {
        onTotalVariablesChange()
    }, [totalState])

    // const calculateTotal = () => {

    // }

    return (
        <>
            <input type="text" name="name" value={name} onChange={setItemValue} />
            <input type="number" name="quantity" value={quantityState} onChange={handleQuantityChange} />
            <input type="number" name="price" value={priceState} onChange={handlePriceChange} />
            <input type="number" name="total" value={totalState} readOnly />
        </>
    )
}

const getId = (function () {
    let count = 0
    return function () {
        return count++;
    }
})()

// TODO finish
const Form = ({invoice, setFormOpen}) => {
    const getInvoiceItemsMapped = () => {
        const invoiceCopy = {...invoice}
        invoiceCopy.items = invoiceCopy.items.map(item => {return {...item, id: getId()}})
        return invoiceCopy.items
    }

    // quick maths
    const getDifferenceInDays = (date1, date2) => Math.abs(parseInt((date1 - date2) / (1000 * 60 * 60 * 24), 10))

    const getDateFromDifference = (date, difference) => {
        // TODO
        console.log(date)
        console.log(difference)
        const newDate = new Date(date)
        newDate.setDate(date.getDate() + parseInt(difference))
        console.log(newDate)
        return new Date(newDate)
    }

    const [ formData, setFormData ] = useState({
        id: invoice.id,
        createdAt: invoice.createdAt,
        paymentDue: invoice.paymentDue,
        description: invoice.description,
        paymentTerms: invoice.paymentTerms,
        clientName: invoice.clientName,
        clientEmail: invoice.clientEmail,
        status: invoice.status,
        total: invoice.total
    })
    const [ clientAddress, setClientAddress ] = useState({...invoice.clientAddress})
    const [ senderAddress, setSenderAddress ] = useState({...invoice.senderAddress})
    const [ items, setItems ] = useState(getInvoiceItemsMapped())
    const [ paymentDue, setPaymentDue ] = useState(getDifferenceInDays(new Date(invoice.createdAt), new Date(invoice.paymentDue)))
    const [ invoices, setInvoices ] = useContext(InvoiceContext)
    const [ totalState, setTotalState ] = useState(invoice.total)

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
            paymentDue: newDate
        }})
        setPaymentDue(diff)
    }

    const setItemValue = (e, id) => {
        const { name, value } = e.target
        console.log(name, value)
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

    const saveInvoice = () => {
        console.log("Save Invocie")
        const newInvoice = {
            ...formData,
            clientAddress,
            senderAddress,
            items
        }
        const newInvoices = invoices.map(inv => inv.id === formData.id ? newInvoice : inv)
        setInvoices(newInvoices)
        setFormOpen(false)
    }

    const onTotalVariablesChange = () => {
        console.log(items.reduce((total, item) => total + (parseInt(item.quantity) * parseFloat(item.price)), 0))
        items.forEach((item) => {
            console.log("parseInt(item.quantity)", parseInt(item.quantity))
            console.log("parseFloat(item.total)", parseFloat(item.total))
        })
        setTotalState(items.reduce((total, item) => total +  parseFloat(item.total), 0))
    }

    console.log(items)

    return ReactDOM.createPortal(
    // return (
        <>
            {/* Invoice Form */}
            <div>
                <Link to="/">
                    <div>{"<"} Go back</div>
                </Link>
                <h2>{ invoice.id ? `Edit ${invoice.id}` : "New Invoice" }</h2>
                <form action="">
                    <div>Bill From</div>
                    <div>
                        <label htmlFor="street-address-from">Street Address</label>
                        <input type="text" value={senderAddress.street} onChange={e => handleSAChange(e)} name="street" id="street-address-from" />
                    </div>
                    <div>
                        <label htmlFor="city">City</label>
                        <input type="text" name="city" value={senderAddress.city} onChange={e => handleSAChange(e)} />
                        <label htmlFor="post-code">Post Code</label>
                        <input type="text" name="postCode" value={senderAddress.postCode} onChange={e => handleSAChange(e)} />
                        <label htmlFor="country">Country</label>
                        <input type="text" name="country" value={senderAddress.country} onChange={e => handleSAChange(e)}  />
                    </div>
                    <div>Bill To</div>
                    <div>
                        <label htmlFor="clietns-name">Client’s Name</label>
                        <input type="text" name="clientName" value={formData.clientName} onChange={e => handleFormDataChange(e)} />
                        <label htmlFor="client-email">Client’s Email</label>
                        <input type="text" name="clientEmail" value={formData.clientEmail} onChange={e => handleFormDataChange(e)} />
                        <label htmlFor="street-address">Street Address</label>
                        <input type="text" name="street" value={clientAddress.street} onChange={e => handleCAChange(e)} />
                    </div>
                    <div>
                        <label htmlFor="client-city">City</label>
                        <input type="text" name="city" value={clientAddress.city} onChange={e => handleCAChange(e)} />
                        <label htmlFor="client-post-code">Post Code</label>
                        <input type="text" name="postCode" value={clientAddress.postCode} onChange={e => handleCAChange(e)} />
                        <label htmlFor="country">Street Address</label>
                        <input type="text" name="country" value={clientAddress.country} onChange={e => handleCAChange(e)} />
                    </div>
                    <div>
                        <label htmlFor="client-city">Invoice Date</label>
                        <input type="text" name="createdAt" value={formData.createdAt}
                         onChange={e => handleCAChange(e)} 
                         />
                        {/* <label htmlFor="client-post-code">Post Code</label>
                        <input type="text" name="postCode" value={clientAddress.postCode} onChange={e => handleCAChange(e)} /> */}
                        {/* <label htmlFor="client-post-code">Post Code</label>
                        <input type="text" name="postCode" value={clientAddress.postCode} onChange={e => handleCAChange(e)} /> */}
                        <label>
                            Payment Terms
                            <select name="paymentDue" value={paymentDue} onChange={e => handlePaymentDueChange(e)}>
                                <option value="1">Net 1 day</option>
                                <option value="7">Net 7 day</option>
                                <option value="14">Net 14 day</option>
                                <option value="30">Net 30 day</option>
                            </select>
                        </label>
                    </div>
                    <div>
                        <label htmlFor="client-city">Project Description</label>
                        <input type="text" name="description" value={formData.description} onChange={e => handleFormDataChange(e)} />
                    </div>
                </form>
            </div>
            {/* Items Form */}
            <div>
                {items && items.map(item => (
                    <div key={item.id}>
                        <FormItem key={item.id} {...item} setItemValue={e => setItemValue(e, item.id)} onTotalVariablesChange={onTotalVariablesChange} />
                        <Button type="delete" onClick={() => deleteItem(item.id)}>delete item</Button>
                    </div>
                ))}
            </div>
            <Button onClick={addItem} type="new-item">Add Item</Button>
            <div>
                <label htmlFor="">
                    <input type="total" value={totalState} readOnly />
                </label>
            </div>
            <div>
                <Button onClick={e => setFormOpen(false)}>
                    Cancel
                </Button>
                <Button onClick={saveInvoice}>
                    Save Changes
                </Button>
            </div>
        </>
        , document.getElementById("portal"))
}
    // if(false) return (
        // <div>
            
        // </div>
    // )
// }

export default Form
