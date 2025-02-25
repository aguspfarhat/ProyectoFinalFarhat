// models/Review.ts
import mongoose, { Schema, Document } from 'mongoose';

interface IReview extends Document {
    userId: mongoose.Schema.Types.ObjectId;
    content: string;
    rating: number;
    createdAt: Date;
}

const reviewSchema = new Schema<IReview>({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    createdAt: { type: Date, default: Date.now },
});

const Review = mongoose.models.Review || mongoose.model<IReview>('Review', reviewSchema);

export default Review;
