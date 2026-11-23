import { useEffect } from 'react'
import { site } from '../data/site.js'

// Sets the browser tab title for each page.
export default function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | ${site.name}` : site.name
  }, [title])
}
