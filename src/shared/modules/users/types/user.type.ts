interface UserEntity {
  createdAt: Date;
  email: string;
  id: string;
  image: string | null;
  name: string;
}

export type { UserEntity };
