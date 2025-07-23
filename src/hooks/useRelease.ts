import { useState, useEffect, useCallback } from 'react'
import { fetchLatestRelease, getDownloadStats, clearReleaseCache, type ReleaseData } from '../services/githubApi'

interface UseReleaseResult {
  release: ReleaseData | null
  loading: boolean
  error: string | null
  downloadStats: {
    totalDownloads: number
    latestReleaseDownloads: number
  } | null
  refetch: () => Promise<void>
}

export function useRelease(): UseReleaseResult {
  const [release, setRelease] = useState<ReleaseData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [downloadStats, setDownloadStats] = useState<{
    totalDownloads: number
    latestReleaseDownloads: number
  } | null>(null)

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      // Fetch release data and download stats in parallel
      const [releaseData, statsData] = await Promise.all([
        fetchLatestRelease(),
        getDownloadStats()
      ])

      setRelease(releaseData)
      setDownloadStats(statsData)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch release data'
      setError(errorMessage)
      console.error('Error fetching release data:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  const refetch = useCallback(async () => {
    clearReleaseCache()
    await fetchData()
  }, [fetchData])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return {
    release,
    loading,
    error,
    downloadStats,
    refetch
  }
}

export function useLatestVersion(): { version: string | null; loading: boolean } {
  const { release, loading } = useRelease()
  
  return {
    version: release?.version || null,
    loading
  }
}