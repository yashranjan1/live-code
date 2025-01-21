export type User = {
    id: string;
    name: string;
    avatar?: string;
    color?: string;
};

export type UserInfo = Pick<User, "name" | "avatar" | "color">;
  