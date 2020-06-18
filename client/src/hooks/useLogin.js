import { useState } from 'react'

const config = {
  contentType: 'applicatiion/json'
}

export const useLogin = () => {
  const [errors, setErrors] = useState(null)
  const [tokens, setResponseTokens] = useState(null)

  const use = async (data, persistSession) => {}

  return { use, tokens, errors }
}
