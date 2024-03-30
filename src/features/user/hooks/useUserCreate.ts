import { createUser } from '@/libs/api/user'
import { ErrorTypeResponse } from '@/libs/types/axios'
import { useMutation } from '@tanstack/react-query'
import { UseFormSetError } from 'react-hook-form'
import { UserCreateInputType } from '..'

export const useUserCreate = (setError: UseFormSetError<UserCreateInputType>) => {
  const handleMutationError = (error: ErrorTypeResponse) => {
    const { data: responseData } = error.response || {}
    const errorValidation = responseData?.errors

    if (errorValidation) {
      Object.entries(errorValidation).forEach(([key, message]) => {
        if (message) {
          setError(key as keyof UserCreateInputType, { message })
        }
      })
    }
  }

  const mutation = useMutation({
    mutationFn: createUser,
    onError: handleMutationError,
  })

  return mutation
}
