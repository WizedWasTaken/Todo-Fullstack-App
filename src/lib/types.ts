export interface UserData {
  _id: number;
  name: string;
  email: string;
  image: string;
  provider: string;
  group: string[];
  providerId: string;
}

export interface ReviewData {
  _id: number;
  userId: number;
  rating: number;
  review: string;
  createdAt: Date;
}
