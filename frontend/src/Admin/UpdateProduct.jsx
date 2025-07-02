import React from "react";
import "../AdminStyles/UpdateProduct.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";
import { useState } from "react";
import { ImageAspectRatio } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { removeErrors, removeSuccess, updateProduct } from "../features/admin/adminSlice";
import { useNavigate, useParams } from "react-router-dom";
import { getProduct, resetProduct } from "../features/products/productSlice";
import { toast } from "react-toastify";
const UpdateProduct = () => {
    const {updateId} = useParams()

const {product}=useSelector(state=>state.product)
const{success,error,loading}=useSelector(state=>state.admin)


    const dispatch= useDispatch()
    const navigate = useNavigate()

    const[name,setName]=useState('')
    const[price,setPrice]=useState('')
    const[description,setDescription]=useState('')
    const[category,setCategory]=useState('')
    const[stock,setStock]=useState('')
    const[image,setImage]=useState([])
    const[oldImage,setOldImage]=useState([])
    const[imagePreview,setImagePreview]=useState([])

    const categories=[
        'mobile','electronics','fruits','laptop','shirt','shoes','pants','glass','watch','cookies','pomegranate','socks','bag','mouse','headphone','bucket','bangle'
    ]

    const handleImageChange=(e)=>{
        
    const files = Array.from(e.target.files);

    setImage(files)
    setImagePreview([]);


    files.forEach((file)=>{
        const imageUrl = URL.createObjectURL(file);
        setImagePreview((old) => [...old, imageUrl]);
    })

    }
    const handleSubmitUpdate=(e)=>{
        e.preventDefault();

        const formData = new FormData()
        formData.append('name',name)
        formData.append('price',price)
        formData.append('description',description)
        formData.append('category',category)
        formData.append('stock',stock)
        image.forEach((img)=>{
            console.log(img)
            formData.append('image',img)
        })
        dispatch(updateProduct({id:updateId,formData}))
        


    }
    useEffect(()=>{
        if(error){
            toast.error('Error while updating product',{
                position:'top-center',autoClose:3000
            })
            dispatch(removeErrors())
        }
        if(success){
            toast.success('Product updated successfully',{
                position:'top-center',autoClose:3000
            })
            dispatch(removeSuccess())
            navigate('/admin/products')
        }
    },[error,success,dispatch])
    useEffect(()=>{
        dispatch(resetProduct())
        dispatch(getProduct(updateId))

    },[updateId,dispatch])
    useEffect(()=>{

        if(product){
            setName(product.name)
            setPrice(product.price)
            setDescription(product.description)
            setCategory(product.category)
            setStock(product.stock)
            setOldImage(product.image)
        }
    },[product])

    console.log(oldImage)
  return (
    <>
      <Navbar />
      <PageTitle title="Update Product" />
      <div className="update-product-wrapper">
        <h1 className="update-product-title">Update Product</h1>
        <form className="update-product-form" encType="multipart/form-data" onSubmit={handleSubmitUpdate} >
          <label htmlFor="name">Product Name</label>
          <input
            type="text"
            className="update-product-input"
            required
            id="name"
            name="name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
          />
          <label htmlFor="price">Product Price</label>
          <input
            type="number"
            className="update-product-input"
            required
            id="price"
            name="price"
            value={price}
            onChange={(e)=>setPrice(e.target.value)}
          />
          <label htmlFor="description">Product Description</label>
          <textarea
            type="text"
            className="update-product-textarea"
            required
            id="description"
            name="description"
            value={description}
            onChange={e=>setDescription(e.target.value)}
          />
          <label htmlFor="category">Product Category</label>
          <select value={category} onChange={e=>setCategory(e.target.value)} name="category" id="category" className="update-product-select">
            <option value="">Choose a Category</option>
            {
                categories.map((category,index)=>(
                    <option value={category} key={index}>{category}</option>
                ))
            }
          </select>

          <label  htmlFor="stock">Product Stock</label>
          <input value={stock} onChange={e=>setStock(e.target.value)} type="number" name="stock" id="stock" className="update-product-input" required/>

          <label htmlFor="image">Product Images</label>
          <div className="update-product-file-wrapper">
            <input   type="file" name="image" id="" accept="image/"  multiple className="update-product-file-input"
            onChange={handleImageChange}
            />
          </div>


          <div className="update-product-preview-wrapper">
            {
                imagePreview.map((img,index)=>(

                    <img src={img} key={index} alt="Product Preview" className="update-product-preview-image" />
                ))
            }
          </div>
          <div className="update-product-old-images-wrapper">
            {
                oldImage.map((img,index)=>
                    (

                        
                        <img src={`${img.url}?v=${Date.now()}`} key={index} alt="Old Product preview" className="update-product-old-image" />
                    )
                )
            }
          </div>
          <button className="update-product-submit-btn">{loading?'Updating...':'Update'}</button>
        </form>
      </div>

      <Footer />
    </>
  );
};

export default UpdateProduct;
