import type Emoji from "./Emoji";

export default interface Entry {
  id: number;
  body: string;
  userId: number;
  emoji: Emoji | null;
  createdAt: Date;
}
