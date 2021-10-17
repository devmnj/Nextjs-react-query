import { useQuery } from 'react-query'

export const fetchUsers = async (limit = 10) => {
    const res = await fetch('http://localhost:3000/api/users?limit='+limit)
    const data = await res.json();
    return data.users
  }
  
  export const addUsers = async (body: { name: string; email: string; }) => {
    const res = await fetch('http://localhost:3000/api/users',{
      body: JSON.stringify({
        name: body.name,
        email: body.email,

      }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    })
    
    return res
  }
  
 
  export const useUsers = (limit: any) => {
    return useQuery('users', () => fetchUsers(limit),{
      refetchInterval:1000
    })
  }