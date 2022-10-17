import { getApiUrl } from './apiConfig'
import axios from 'axios'

export const addToCart = ({ amountToAdd, productToAdd }) => {
    const addUrl = getApiUrl('shoppingList')
    const userDetailUrl = getApiUrl('auth/details')
    axios.get(userDetailUrl, { withCredentials: true }).then(userDetails => {
        let cartObject = {
            client: userDetails.data,
            product: productToAdd,
            amount: amountToAdd
        }
        axios.post(addUrl, cartObject, { withCredentials: true }).then(() => {
            let number = parseInt(localStorage.getItem("number")) + 1
            localStorage.setItem("number", number.toString())
            window.dispatchEvent(new Event('storage'))
        })
    })
}
export const deleteShoppingItem = ({ itemId }) => {
    const deleteUrl = getApiUrl(`shoppingList/clean/${itemId}`)
    return axios.delete(deleteUrl, { withCredentials: true })
}
export const getShoppingList = ({ setProductList }) => {
    const listUrl = getApiUrl("shoppingList")
    axios.get(listUrl, { withCredentials: true }).then(response => {
        setProductList(response.data)
    })
}
export const generateSale = () => {
    const saleUrl = getApiUrl(`sale/create`)
    return axios.post(saleUrl, null, { withCredentials: true })
}
export const getSaleList = ({ setSalesList }) => {
    const listUrl = getApiUrl("sale/client")
    axios.get(listUrl, { withCredentials: true }).then(response => {
        setSalesList(response.data)
    })
}