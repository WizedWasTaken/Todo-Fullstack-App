export interface UserData {
  _id: string;
  name: string;
  email: string;
  image: string;
  provider: string;
  group: string[];
  providerId: string;
}

export interface ReviewData {
  _id: string;
  author: UserData;
  rating: number;
  content: string;
  title: string;
  createdAt: Date;
}

export interface ProjectData {
  _id: string;
  name: string;
  description: string;
  status: string;
  startDate: string;
  endDate: string;
  progress: number;
  members: UserData[];
}

// TESTING
export interface TestProjectData {
  _id: string;
  name: string;
  description: string;
  status: string;
  startDate: string;
  endDate: string;
  progress: number;
  members: TestUserData[];
}

interface TestUserData {
  _id: string;
  name: string;
}
