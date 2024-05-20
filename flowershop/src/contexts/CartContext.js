import React from "react";
import * as _ from "lodash";

export const CartContext = React.createContext();

export const CartContextProvider = ({ children }) => {

    const [items, setItems] = React.useState([]);
    const [totalAmount, setTotalAmount] = React.useState(0);

    function addItem(newItem) {


        let itemPresentIndex = items.findIndex((item) => {
            return item.title === newItem.title && item.selectedSize === newItem.selectedSize
        })

        if (itemPresentIndex < 0) { // item is not present
            return setItems(prev => [...prev, newItem])
        }

        // if item already present, increase the quantity only

        let updatedQuantity = ++items[itemPresentIndex].quantity

        updateItem(itemPresentIndex, updatedQuantity)


    }

    function removeItem(id) {
        const temp = items.filter(item => item.id !== id)
        setItems([...temp])
    }

    function emptyCart() {
        setItems([])
    }

    function updateItem(indexToUpdate, quantity) {
        setItems(prev => {
            let temp = _.cloneDeep(prev)
            temp[indexToUpdate].quantity = quantity;
            return [...temp];
        })
    }


    function calculateTotalAmount() {
        const total = items.reduce((sum, item) => sum = sum + item.price * item.quantity, 0)
        setTotalAmount(total);

    }

    React.useEffect(() => {
        calculateTotalAmount()
    }, [items])

    return (
        <CartContext.Provider value={{ addedItems: items, totalAmount, addItem, removeItem, updateItem, emptyCart }}>
            {children}
        </CartContext.Provider>
    )

}