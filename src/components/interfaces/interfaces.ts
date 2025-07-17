export interface ReviewInterface {
  userId: string;
  rating: number;
  comment: string;
  createdAt: Date;
  approved: boolean;
}

export interface ProductInterface {
  _id: string;
  name: string;
  brand: string;
  gender: string;
  categoryId: string;
  description: string;
  notes: string[];
  longevity: string;
  price: number;
  imageUrls: string[];
  reviews: ReviewInterface[];
}