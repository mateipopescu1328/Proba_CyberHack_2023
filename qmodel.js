import mongoose from "mongoose";

const questionSchema = mongoose.Schema(
    {
        title:{
            type: String,
            required: true,
        },
        question:{
            type: String,
            required: true,
        },
        rightanswer:{
            type: String,
            required: true,
        },
        
    },
    {
        timestamps: true,
    }
);

export const Question = mongoose.model('QS', questionSchema);