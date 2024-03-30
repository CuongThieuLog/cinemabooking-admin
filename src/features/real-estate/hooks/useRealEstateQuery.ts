import { getRealEstateDetail } from '@/libs/api/real-estate'
import { useQuery } from '@tanstack/react-query'

export function useRealStateQuery(id: string) {
  const { data, isLoading } = useQuery({
    queryKey: ['real-estate', id],
    queryFn: () => getRealEstateDetail(id),
    enabled: !!id,
  })

  return { realEstateDetail: data, isLoading }
}
