import { getApiUrl } from './apiConfig'
import axios from 'axios'

export const getAllProducts = ({ setProductList }) => {
    const productUrl = getApiUrl("product/all")
    axios.get(productUrl, { withCredentials: true }).then((response) => {
        setProductList(response.data)
    })
}
export const getBestProducts = ({ setBestProductList }) => {
    const productUrl = getApiUrl("product/best")
    axios.get(productUrl, { withCredentials: true }).then((response) => {
        setBestProductList(response.data)
    })
}
export const saveProduct = ({ product, edit }) => {
    const productUpdateUrl = getApiUrl("product/update")
    const productCreateUrl = getApiUrl("product/create")
    return edit === true ? axios.put(productUpdateUrl, product, { withCredentials: true })
        : axios.post(productCreateUrl, product, { withCredentials: true })
}
export const getProductById = async (id) => {
    const productUrl = getApiUrl(`product/${id}`)
    const response = await axios.get(productUrl, { withCredentials: true })
    return response.data
}
export const getRelatedProducts = async ({ category, id }) => {
    const productUrl = getApiUrl(`product/related/${category}/${id}`)
    const response = await axios.get(productUrl, { withCredentials: true })
    return response.data
}