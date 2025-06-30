import React, { useEffect, useState } from "react";
import "../AdminStyles/CreateProduct.css";
import Navbar from "../components/Navbar";
import PageTitle from "../components/PageTitle";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createProduct, removeErrors, removeSuccess } from "../features/admin/adminSlice";
const CreateProduct = () => {
    const{loading,error,success}=useSelector(state=>state.admin)
    const dispatch = useDispatch()
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState([]);

  const [preview, setPreview] = useState([]);

  const categories = [
    "glass",
    "shirt",
    "mobile",
    "electronics",
    "home",
    "furniture",
    "toys",
    "books",
    "laptop",
  ];


  const createProductImage = (e) => {
    

  
    const files = Array.from(e.target.files);

    setImage([])
    setPreview([]);

    files.forEach((file)=>{
        const reader = new FileReader()
        reader.onload = () => {
            if (reader.readyState === 2) {
                setImage((old) => [...old, reader.result]);
                setPreview((old) => [...old, reader.result]);
            }
        };
        reader.readAsDataURL(file);
    })


  }

//   useEffect(() => {
//     if (image.length > 0) {
//       const previewImage = Array.from(image).map((file) =>
//         URL.createObjectURL(file)
//       );
//       setPreview(previewImage);
//     }
//   }, [image]);
  console.log(image);

  const createProductSubmit=(e)=>{
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("stock", stock);
    image.forEach((image) => {
      myForm.append("image", image);
    });

    dispatch(createProduct(myForm));

    console.log(myForm)
  }
  
  useEffect(()=>{
      if(error){
          toast.error(error,{position:'top-center',autoClose:3000})
          dispatch(removeErrors())
      }
    if(success){
        toast.success("Product Created Successfully", {
            position: "top-center",autoClose: 3000,theme: "colored"
        });
        dispatch(removeSuccess())
        
        setName("");
        setPrice("");
        setDescription("");
        setCategory("");
        setStock("");
        setImage([]);
        setPreview([]);
    }
    
},[dispatch,success,error])


  return (
    <>
      <Navbar />
      <PageTitle title="Create Product" />
      <div className="create-product-container">
        <h1 className="form-title">Create Product</h1>
        <form className="product-form" encType="multipart/form-data" onSubmit={createProductSubmit} >
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="form-input"
            placeholder="Enter Product Name"
            required
            name="name"
          />
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="number"
            className="form-input"
            placeholder="Enter Product Price"
            required
            name="price"
          />
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            className="form-input"
            placeholder="Enter Product Description"
            required
            name="description"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="form-select"
            required
            name="category"
          >
            <option value=""> Choose a Category</option>
            {categories.map((category) => (
              <option value={category} key={category}>
                {category}
              </option>
            ))}
          </select>
          <input
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            type="number"
            className="form-input"
            placeholder="Enter Product Stock"
            required
            name="stock"
          />
          <div className="file-input-container">
            <input
              onChange={createProductImage}
              type="file"
              id=""
              accept="image/"
              className="form-input-file"
              multiple
              name="image"
            />
          </div>
          <div className="image-preview-container">
            {preview.length > 0 &&
              preview.map((image, index) => (
                <img
                  src={image}
                  alt="product review"
                  className="image-preview"
                  key={index}
                />
              ))}
          </div>
          <button className="submit-btn">{loading?'Creating Product...':'Create'}</button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default CreateProduct;
