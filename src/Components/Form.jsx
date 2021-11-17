import React from 'react'
import { Link } from 'react-router-dom'

// TODO finish
const Form = ({invoice}) => {
    return (
        <div>
            <Link>
                <div>{"<"} Go back</div>
            </Link>
            <h2>{ invoice.id ? `Edit ${invoice.id}` : "New Invoice" }</h2>
            <form action="">
                <div>Bill From</div>
                <div>
                    <label htmlFor="street-address-from">Street Address</label>
                    <input type="text" name="street-address-from" />
                </div>
                <div>
                    <label htmlFor="city">City</label>
                    <input type="text" name="city" />
                    <label htmlFor="post-code">Post Code</label>
                    <input type="text" name="post-code" />
                    <label htmlFor="country">Country</label>
                    <input type="text" name="country" />
                </div>

                
                <div>Bill To</div>
                <div>
                    <label htmlFor="clietns-name">Client’s Name</label>
                    <input type="text" name="clietns-name" />
                    <label htmlFor="post-code">Client’s Email</label>
                    <input type="text" name="post-code" />
                    <label htmlFor="country">Street Address</label>
                    <input type="text" name="country" />
                </div>



            </form>
        </div>
    )
}

export default Form
