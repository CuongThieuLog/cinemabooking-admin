import { createRealEstate } from '@/libs/api/real-estate'
import { ErrorTypeResponse } from '@/libs/types/axios'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { UseFormSetError } from 'react-hook-form'
import { RealEstateCreateInputType } from '../type'

export const useCreateRealEstate = (setError: UseFormSetError<RealEstateCreateInputType>) => {
  const router = useRouter()
  const handleMutationError = (error: ErrorTypeResponse) => {
    const { data: responseData } = error.response || {}
    const errorValidation = responseData?.errors

    if (errorValidation) {
      Object.entries(errorValidation).forEach(([key, message]) => {
        if (message) {
          setError(key as keyof RealEstateCreateInputType, { message })
        }
      })
    }
  }

  const mutation = useMutation({
    mutationFn: createRealEstate,
    onError: handleMutationError,
    onSuccess: () => router.push('/'),
  })

  return mutation
}
