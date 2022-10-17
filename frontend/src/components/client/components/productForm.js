import { Box, Button, Modal, Stack, TextField, Typography } from '@mui/material';
import React from 'react'
import { saveProduct } from '../../../services/product'
function ProductForm(props) {
    const { openModal, setOpenModal, edit, setProductFeedback, setProduct, product, setRefresh } = props;
    const handleProductForm = e => {
        const tempData = { ...product }
        tempData[e.target.id] = e.target.value
        setProduct(tempData)
    }
    const handleCloseModal = () => {
        setOpenModal(false)
        setProduct(edit ? product : { name: "", price: 0, description: "", category: "", image: "" })
    };
    const saveModalProduct = () => {
        setRefresh(false)
        saveProduct({ product, edit }).then(response => {
            setProduct(edit ? product : { name: "", price: 0, description: "", category: "", image: "" })
            setProductFeedback({ show: true, status: true, infoText: response.data.infoMessage })
            setRefresh(true)
        }).catch(error => {
            setProductFeedback({ show: true, status: false, infoText: error.response.data.infoMessage })
        })
    }
    return (
        <Modal
            open={openModal}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 300,
                bgcolor: 'background.paper',
                border: '0px solid #000',
                borderRadius: '5px',
                boxShadow: 24,
                p: 2,
            }}>
                <Stack spacing={1}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {edit ? "Editar producto" : "Nuevo producto"}
                    </Typography>
                    <TextField autoComplete="off"
                        required
                        id="name"
                        label="Nombre"
                        onChange={e => handleProductForm(e)}
                        value={product.name}
                    />
                    <TextField autoComplete="off"
                        required
                        id="price"
                        label="Precio"
                        type="number"
                        onChange={e => handleProductForm(e)}
                        value={product.price}
                    />
                    <TextField autoComplete="off"
                        required
                        id="category"
                        label="Categoria"
                        onChange={e => handleProductForm(e)}
                        value={product.category}
                    />
                    <TextField autoComplete="off"
                        required
                        id="description"
                        label="Descripción"
                        onChange={e => handleProductForm(e)}
                        value={product.description}
                    />
                    <TextField autoComplete="off"
                        required
                        id="image"
                        label="Imágen"
                        onChange={e => handleProductForm(e)}
                        value={product.image}
                    />

                    <Button className='btn' onClick={saveModalProduct}
                        variant="contained"
                        id="button" >
                        Guardar
                    </Button>
                    <Button
                        variant="outlined"
                        id="button"
                        color="error"
                        onClick={handleCloseModal}>
                        Cancelar
                    </Button>
                </Stack>
            </Box>
        </Modal>
    )
}

export default ProductForm