import { useCallback, useState } from 'react'

export function useCopyToClipboard(timeout = 2000) {
  const [copied, setCopied] = useState(false)

  const copy = useCallback(
    async (text) => {
      try {
        await navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), timeout)
      } catch (error) {
        console.error('Error al copiar texto', error)
        setCopied(false)
      }
    },
    [timeout],
  )

  return { copied, copy }
}
