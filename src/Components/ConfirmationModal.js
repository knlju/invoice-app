import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

const ModalWrapper = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0,0,0,.7);
    display: flex;
    justify-content: center;
    align-items: center;
`

// TODO
const ModalContent = styled.div`
    background: #FFFFFF;
    box-shadow: 0px 10px 10px -10px rgba(72, 84, 159, 0.100397);
    border-radius: 8px;
    ${props => props.padding ? 'padding: 100px;' : 'padding: 48px;'}
    border: 1px solid red;
    ${props => props.padding && 'border-color: blue;'}
`

export default function ConfirmationModal({ deleteInvoice, setModalOpen }) {

    const handleDeleteClick = () => {
        deleteInvoice()
        setModalOpen(false)
    }

    const handleCancleClick = () => setModalOpen(false)

    return ReactDOM.createPortal(
        <ModalWrapper>
            <ModalContent>
                <h3>Confirm Deletion</h3>
                <div>Are you sure you want to delete invoice #XM9141? This action cannot be undone.</div>
                <div>
                    <button onClick={handleCancleClick}>Cancel</button>
                    <button onClick={handleDeleteClick}>Delete</button>
                </div>
            </ModalContent>
            <ModalContent padding />
        </ModalWrapper>
    , document.getElementById("portal"))
}
