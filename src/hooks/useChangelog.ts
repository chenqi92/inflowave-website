import { useState, useEffect, useCallback } from 'react'
import { fetchAllReleases, type GitHubRelease } from '../services/githubApi'

interface UseChangelogResult {
  releases: GitHubRelease[]
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
}

export function useChangelog(limit: number = 50): UseChangelogResult {
  const [releases, setReleases] = useState<GitHubRelease[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      const releaseData = await fetchAllReleases(limit)
      setReleases(releaseData)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch changelog'
      setError(errorMessage)
      console.error('Error fetching changelog:', err)
    } finally {
      setLoading(false)
    }
  }, [limit])

  const refetch = useCallback(async () => {
    await fetchData()
  }, [fetchData])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return {
    releases,
    loading,
    error,
    refetch
  }
}

/**
 * Filter releases based on search term and options
 */
export function useFilteredReleases(
  releases: GitHubRelease[],
  searchTerm: string = '',
  showPreReleases: boolean = false
): GitHubRelease[] {
  return releases.filter(release => {
    // Filter out drafts
    if (release.draft) return false
    
    // Filter pre-releases if not enabled
    if (!showPreReleases && release.prerelease) return false
    
    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      return (
        release.name.toLowerCase().includes(term) ||
        release.tag_name.toLowerCase().includes(term) ||
        release.body.toLowerCase().includes(term)
      )
    }
    
    return true
  })
}