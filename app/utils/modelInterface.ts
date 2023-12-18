export interface UserModelAttributes {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  dob: Date;
  role: "Admin" | "User";
  status: boolean;
}

export interface BlogModelAttributes {
  id: number;
  title: string;
  description: string;
  publised_date: string;
  modify_date: string;
  status: "Publish" | "Unpublish";
  category: number;
  author: string;
}
