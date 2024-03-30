import { updateRealEstate } from '@/libs/api/real-estate'
import { ErrorTypeResponse } from '@/libs/types/axios'
import { useMutation } from '@tanstack/react-query'
import { UseFormSetError } from 'react-hook-form'
import { RealEstateUpdateInputType } from '../type'

export const useUpdateRealEstate = (setError: UseFormSetError<RealEstateUpdateInputType>) => {
  const handleMutationError = (error: ErrorTypeResponse) => {
    const { data: responseData } = error.response || {}
    const errorValidation = responseData?.errors

    if (errorValidation) {
      Object.entries(errorValidation).forEach(([key, message]) => {
        if (message) {
          setError(key as keyof RealEstateUpdateInputType, { message })
        }
      })
    }
  }

  const mutation = useMutation({
    mutationFn: updateRealEstate,
    onError: handleMutationError,
  })

  return mutation
}
