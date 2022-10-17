import { Alert, Button, Chip, Grid, IconButton, Snackbar, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import detailStyle from './detail.module.css'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ProductCard from './productCard'
import ClassIcon from '@mui/icons-material/Class';
import { useParams } from 'react-router-dom';
import { getProductById, getRelatedProducts } from '../../../services/product'
import { getUserDetails } from '../../../services/auth'
import { addToCart } from '../../../services/shoppingCart'
import ProductForm from '../../client/components/productForm'

function Detail() {
  const [amountToAdd, setAmount] = useState(1)
  const { id, category } = useParams()
  const [product, setProduct] = useState(null)
  let [editProduct, setEditProduct] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [roles, setUserRole] = useState([])
  const [showProductFeedback, setProductFeedback] = React.useState({ show: false, status: false, infoText: '' })
  const [refresh, setRefresh] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  useEffect(() => {
    let shouldUpdate = true
    getUserDetails({ setUserRole })
    if (shouldUpdate) {
      Promise.all([
        getProductById(id.toString()),
        getRelatedProducts({ category, id })
      ]).then(results => {
        const [first, second] = results
        setProduct(first)
        setEditProduct(first)
        setRelatedProducts(second)
      })
    }
  }, [id, category, refresh])

  const add = () => {
    setAmount(amountToAdd + 1)
  }
  const subtract = () => {
    setAmount(amountToAdd - 1)
  }
  const addProduct = (productToAdd) => {
    setProductFeedback({ show: true, status: true, infoText: 'Añandiendo producto...' })
    addToCart({ amountToAdd, productToAdd })
  }
  const handleOpenModal = () => setOpenModal(true)
  const closeProductFeedback = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setProductFeedback({ show: false });
  };
  return (
    <div className={detailStyle.container}>
      <Grid container spacing={3} pt={1}>
        <Grid item xs={12} md={6}>
          <Stack direction="column" alignItems="flex-start" className={detailStyle.stack} spacing={1}>
            {roles.length > 1 ? <Button variant="text" color='primary'
              id="button" onClick={handleOpenModal} >
              Editar
            </Button> : null}
            <Typography variant="span" fontSize={40} component="h2" fontWeight={600}>
              {product && product.name}
            </Typography>
            <Typography variant="span" fontSize={20} component="h2" fontWeight={400}>
              {product && product.description}
            </Typography>
            <div className={detailStyle.img_container}>
              <img src={product && product.image} alt='product' className={detailStyle.img} />
            </div>
            <div className={detailStyle.info}>
              <Typography variant="span" fontSize={30} component="h2" fontWeight={600}>
                ${product && product.price.toFixed(2)}
              </Typography>
              <div className={detailStyle.action}>
                <IconButton color="primary" aria-label="add to shopping cart" onClick={subtract}
                  disabled={amountToAdd === 1}>
                  <RemoveIcon />
                </IconButton>
                <span className={detailStyle.amount_input}>{amountToAdd}</span>
                <IconButton color="primary" aria-label="add to shopping cart" onClick={add}>
                  <AddIcon />
                </IconButton>
              </div>
              <Button variant="contained" className='btn2' onClick={() => {
                addProduct(product)
              }}>
                Añadir al carrito
              </Button>
            </div>
          </Stack>
        </Grid>
        <Grid item xs={12} md={6} className={detailStyle.related_grid} >
          <Chip icon={<ClassIcon />} label="Relacionados" className={detailStyle.chip} />
          <div className={detailStyle.related_container} >
            {relatedProducts.map(related =>
              <ProductCard product={related} key={related.id} />
            )
            }
          </div>
        </Grid>
      </Grid>
      {showProductFeedback.show &&<Snackbar open={showProductFeedback.show} autoHideDuration={2000} onClose={closeProductFeedback}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} >
         <Alert onClose={closeProductFeedback} severity={showProductFeedback.status ? "success" : "error"} sx={{ width: '100%' }}>
          {showProductFeedback.infoText}
        </Alert>
      </Snackbar>}
      {product && <ProductForm setRefresh={setRefresh} openModal={openModal} setOpenModal={setOpenModal}
        setProductFeedback={setProductFeedback} edit={true}
        setProduct={setEditProduct} product={editProduct} />}
    </div>

  )
}

export default Detail