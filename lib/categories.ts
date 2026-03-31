import { cache } from 'react'

export const getCategories = cache(async () => {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/categories");
    return res.json()
})