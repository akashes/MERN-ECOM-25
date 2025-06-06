import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true,'Please enter product name'],
        trim: true,
    },
    description:{
        type: String,
        required: [true,'Please enter product description'],
    },
    price:{
        type: Number,
        required: [true,'Please enter product price'],
        max:[999999,'Price cannot exceed 6 characters'],
    },
    ratings:{
        type: Number,
        default: 0,
    },
    image:[
        {
            public_id:{
                type: String,
                required: true,
            },
            url:{
                type: String,
                required: true,
            },
        }
    ],
    category:{
        type: String,
        required: [true,'Please enter product category'],
        trim:true
    },
    stock:{
        type: Number,
        required: [true,'Please enter product stock'],
        max:[9999,'Stock cannot exceed 4 characters'],
        default: 1,
    },
    numOfReviews:{
        type: Number,
        default: 0,
    },
    reviews:[
        {
            user:{
                type: mongoose.Schema.ObjectId,
                ref: 'User',
                required: true,
            },
            name:{
                type: String,
                required: true,
            },
            rating:{
                type: Number,
                required: true,
            },
            comment:{
                type: String,
                required: true,
            },
        }
    ],
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    },

    createdAt:{
        type: Date,
        default: Date.now,
    }
})

const Product = mongoose.model('Product',productSchema)
export default Product