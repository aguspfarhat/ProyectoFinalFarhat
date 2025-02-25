import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import Review from "@/models/review";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { userId, content, rating } = req.body;

        if (!userId || !content || !rating) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        try {
            const { db } = await connectToDatabase();
            const newReview = new Review({
                userId,
                content,
                rating,
            });

            const savedReview = await db.collection('reviews').insertOne(newReview);
            res.status(201).json(savedReview);
        } catch (error) {
            res.status(500).json({ error: 'Failed to create review' });
        }
    }

    if (req.method === 'GET') {
        try {
            const { db } = await connectToDatabase();
            const reviews = await db.collection('reviews').find().toArray();


            const reviewsWithUsernames = await Promise.all(reviews.map(async (review) => {

                const userId = new ObjectId(review.userId);
                const user = await db.collection('Users').findOne({ _id: userId });

                return {
                    ...review,
                    userId: {
                        userName: user?.userName,
                        name: user?.name,
                        email: user?.email
                    },
                };
            }));

            res.status(200).json(reviewsWithUsernames);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch reviews' });
        }
    }
}
