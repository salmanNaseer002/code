const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const reviewSchema = new mongoose.Schema(
    {
      name: { type: String, required: true },
      rating: { type: Number, default: 0 },
      comment: { type: String, },
    },
    {
      timestamps: true,
    }
  );

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 100
        },
        
        description: {
            type: String,
            required: true,
            maxlength: 2000
        },
        price: {
            type: Number,
            trim: true,
            required: true,
            maxlength: 32
        },
        
        preprice: {
            type: Number,
            trim: true,
            
            default: 0,
            maxlength: 32
        },
        percentage: {
            type: Number,
            trim: true,
            required: true,
            default:0,
            maxlength: 32
        },
        bidEnd: {
            type: Date,
            trim:true,
            default:0,
            maxlength: 32,
          },
        category: {
            type: ObjectId,
            ref: "Category",
            required: true
        },
        quantity: {
            type: Number
        },
        sold: {
            type: Number,
            default: 0
        },
        photo: {
            data: Buffer,
            contentType: String
        },
        
        shipping: {
            required: false,
            type: Boolean
        },

        isSale: {
           
            type: Boolean,
            default: false,
        },
        userId: { type: ObjectId, ref: "User" },
        rating: { type: Number, default: 0, required: true },
        numReviews: { type: Number, default: 0, required: true },
        reviews: [reviewSchema],
    },
    { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
