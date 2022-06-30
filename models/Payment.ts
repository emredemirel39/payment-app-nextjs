import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
    CardNumber: {
        type: String,
        required: true
    },
    ExptDate: {
        type: String,
        required: true
    },
    Cvv: {
        type: String,
        required: true
    },
    Amount: {
        type: String,
        required:true
    }
});

export default mongoose.models.Payment || mongoose.model('Payment', PaymentSchema);