import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ReactDOM } from 'react'
import { Button } from './Styles/Components.style'

const FormItem = ({name, quantity, price, total, setItemValue}) => (
    <>
        <input type="text" name="name" value={name} onChange={setItemValue} />
        <input type="text" name="quantity" value={quantity} onChange={setItemValue} />
        <input type="text" name="price" value={price} onChange={setItemValue} />
        <input type="text" name="total" value={total} onChange={setItemValue} />
    </>
)

const getId = (function () {
    let count = 0
    return function () {
        return count++;
    }
})()

// TODO finish
const Form = ({invoice}) => {
    const getInvoiceItemsMapped = () => {
        const invoiceCopy = {...invoice}
        invoiceCopy.items = invoiceCopy.items.map(item => {return {...item, id: getId()}})
        return invoiceCopy.items
    }
    const [ items, setItems ] = useState(getInvoiceItemsMapped())

    const setItemValue = (e, id) => {
        const { name, value } = e.target
        console.log(name, value)
        setItems(prevItems => {
            const newItems = prevItems.map(item => {
                console.log("-------------")
                console.log(item, item.id)
                console.log(id)
                console.log(item.id === id)
                console.log("-------------")
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

    // return ReactDOM.createPortal(
    console.log(items)
    return <>
            {/* Invoice Form */}
            <div>
                
            </div>
            {/* Items Form */}
            <div>
                {items && items.map(item => (
                    <div key={item.id}>
                        <FormItem key={item.id} {...item} setItemValue={e => setItemValue(e, item.id)} />
                        <Button type="delete" onClick={() => deleteItem(item.id)}>delete item</Button>
                    </div>
                )
                )}
            </div>
            <Button onClick={addItem} type="new-item">Add Item</Button>
        </>
        // , document.getElementById("portal"))
}
    // if(false) return (
    //     <div>
    //         <Link>
    //             <div>{"<"} Go back</div>
    //         </Link>
    //         <h2>{ invoice.id ? `Edit ${invoice.id}` : "New Invoice" }</h2>
    //         <form action="">
    //             <div>Bill From</div>
    //             <div>
    //                 <label htmlFor="street-address-from">Street Address</label>
    //                 <input type="text" name="street-address-from" />
    //             </div>
    //             <div>
    //                 <label htmlFor="city">City</label>
    //                 <input type="text" name="city" />
    //                 <label htmlFor="post-code">Post Code</label>
    //                 <input type="text" name="post-code" />
    //                 <label htmlFor="country">Country</label>
    //                 <input type="text" name="country" />
    //             </div>

                
    //             <div>Bill To</div>
    //             <div>
    //                 <label htmlFor="clietns-name">Client’s Name</label>
    //                 <input type="text" name="clietns-name" />
    //                 <label htmlFor="post-code">Client’s Email</label>
    //                 <input type="text" name="post-code" />
    //                 <label htmlFor="country">Street Address</label>
    //                 <input type="text" name="country" />
    //             </div>



    //         </form>
    //     </div>
    // )
// }

export default Form
