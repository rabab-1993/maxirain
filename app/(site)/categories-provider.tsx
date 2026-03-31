'use client'
 
import { createContext } from 'react'
 
type Category = {
  id: number;
  name: string;
  imageUrl?: string;
  description: string;

}
 
export const CategoryContext = createContext<Promise<Category[]> | null>(null)
 
export default function CategoryProvider({
  children,
  categoryPromise,
}: {
  children: React.ReactNode
    categoryPromise: Promise<Category[]>
}) {
  return <CategoryContext value={categoryPromise}>{children}</CategoryContext>
}