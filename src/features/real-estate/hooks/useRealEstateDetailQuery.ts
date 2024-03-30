import { getRealEstateDetail } from '@/libs/api/real-estate'
import { useQuery } from '@tanstack/react-query'

export function useRealEstateDetailQuery(id: string) {
  const { data, isFetching, isLoading } = useQuery({
    queryKey: ['real-estate', id],
    queryFn: async () => await getRealEstateDetail(id),
    enabled: !!id,
  })

  return { data, isFetching, isLoading }
}
