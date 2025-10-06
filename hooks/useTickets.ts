import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

export function useTickets(){
  return useQuery(['tickets'], async ()=>{ const r = await axios.get('/api/tickets'); return r.data })
}

export function useCreateTicket(){
  const qc = useQueryClient()
  return useMutation(async (payload:any)=>{ const r = await axios.post('/api/tickets/create', payload); return r.data }, { onSuccess: ()=> qc.invalidateQueries(['tickets']) })
}
