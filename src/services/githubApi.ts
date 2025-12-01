// GitHub API service for fetching release information

export interface GitHubRelease {
  id: number
  tag_name: string
  name: string
  body: string
  published_at: string
  prerelease: boolean
  draft: boolean
  assets: GitHubAsset[]
  html_url: string
  author: {
    login: string
    avatar_url: string
  }
}

export interface GitHubAsset {
  id: number
  name: string
  content_type: string
  size: number
  download_count: number
  browser_download_url: string
  label?: string
}

export interface ParsedDownload {
  type: 'installer' | 'portable' | 'appimage' | 'deb' | 'rpm' | 'dmg'
  platform: 'windows' | 'macos' | 'linux'
  arch: 'x64' | 'x86' | 'arm64' | 'aarch64' | 'universal'
  name: string
  size: string
  url: string
  r2Url?: string // Cloudflare R2 CDN mirror URL
  recommended?: boolean
}

export interface ReleaseData {
  version: string
  releaseDate: string
  releaseNotes: string
  downloads: ParsedDownload[]
  htmlUrl: string
}

const GITHUB_REPO = 'chenqi92/inflowave'
const GITHUB_API_BASE = 'https://api.github.com'
const R2_CDN_BASE = 'https://inflowave.download.kkape.com/releases' // Cloudflare R2 CDN base URL

// Cache for storing release data
let releaseCache: ReleaseData | null = null
let cacheTimestamp: number = 0
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

/**
 * Format file size from bytes to human readable format
 */
function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B'
  
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
}

/**
 * Parse asset filename to extract platform and type information
 */
function parseAssetInfo(asset: GitHubAsset, version: string): ParsedDownload | null {
  const { name, size, browser_download_url } = asset
  const lowerName = name.toLowerCase()
  
  let platform: ParsedDownload['platform']
  let type: ParsedDownload['type']
  let arch: ParsedDownload['arch'] = 'x64' // default
  
  // Determine platform and type
  if (lowerName.includes('.msi') || lowerName.includes('windows') || lowerName.includes('win')) {
    platform = 'windows'
    type = lowerName.includes('portable') ? 'portable' : 'installer'
  } else if (lowerName.includes('.dmg') || lowerName.includes('macos') || lowerName.includes('darwin')) {
    platform = 'macos'
    type = 'dmg'
  } else if (lowerName.includes('.appimage')) {
    platform = 'linux'
    type = 'appimage'
  } else if (lowerName.includes('.deb')) {
    platform = 'linux'
    type = 'deb'
  } else if (lowerName.includes('.rpm')) {
    platform = 'linux'
    type = 'rpm'
  } else {
    // Skip unknown file types
    return null
  }
  
  // Determine architecture
  if (lowerName.includes('aarch64') || lowerName.includes('arm64')) {
    arch = 'aarch64'
  } else if (lowerName.includes('x86_64') || lowerName.includes('_x64')) {
    arch = 'x64'
  } else if (lowerName.includes('i686') || lowerName.includes('_x86')) {
    arch = 'x86'
  }
  
  // Determine if this is the recommended download
  const recommended = (
    (platform === 'windows' && type === 'installer' && arch === 'x64') ||
    (platform === 'macos' && type === 'dmg') ||
    (platform === 'linux' && type === 'appimage')
  )

  // Add R2 CDN mirror for specific files
  let r2Url: string | undefined
  if (lowerName.includes('aarch64.dmg') || lowerName.includes('x64_zh-cn.msi')) {
    r2Url = `${R2_CDN_BASE}/v${version}/${name}`
  }

  return {
    type,
    platform,
    arch,
    name: asset.name,
    size: formatFileSize(size),
    url: browser_download_url,
    r2Url,
    recommended
  }
}

/**
 * Fetch the latest release information from GitHub API
 */
export async function fetchLatestRelease(): Promise<ReleaseData> {
  // Check cache first
  const now = Date.now()
  if (releaseCache && (now - cacheTimestamp) < CACHE_DURATION) {
    return releaseCache
  }
  
  try {
    const response = await fetch(`${GITHUB_API_BASE}/repos/${GITHUB_REPO}/releases/latest`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'InfloWave-Website'
      }
    })
    
    if (!response.ok) {
      throw new Error(`GitHub API responded with status: ${response.status}`)
    }
    
    const release: GitHubRelease = await response.json()

    // Extract version first (remove 'v' prefix if present)
    const version = release.tag_name.replace(/^v/, '')

    // Parse downloads from assets
    const downloads: ParsedDownload[] = release.assets
      .map(asset => parseAssetInfo(asset, version))
      .filter((download): download is ParsedDownload => download !== null)
      .sort((a, b) => {
        // Sort by platform, then by recommended status
        const platformOrder = { windows: 0, macos: 1, linux: 2 }
        const platformDiff = platformOrder[a.platform] - platformOrder[b.platform]
        if (platformDiff !== 0) return platformDiff

        return (b.recommended ? 1 : 0) - (a.recommended ? 1 : 0)
      })

    const releaseData: ReleaseData = {
      version,
      releaseDate: new Date(release.published_at).toISOString().split('T')[0], // YYYY-MM-DD format
      releaseNotes: release.body || '',
      downloads,
      htmlUrl: release.html_url
    }
    
    // Update cache
    releaseCache = releaseData
    cacheTimestamp = now
    
    return releaseData
    
  } catch (error) {
    console.error('Failed to fetch latest release:', error)
    
    // Return fallback data if API fails
    return {
      version: '0.1.5',
      releaseDate: '2024-12-20',
      releaseNotes: 'Release information temporarily unavailable. Please visit GitHub for the latest updates.',
      downloads: [],
      htmlUrl: `https://github.com/${GITHUB_REPO}/releases/latest`
    }
  }
}

/**
 * Fetch all releases (useful for changelog or version history)
 */
export async function fetchAllReleases(limit: number = 10): Promise<GitHubRelease[]> {
  try {
    const response = await fetch(`${GITHUB_API_BASE}/repos/${GITHUB_REPO}/releases?per_page=${limit}`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'InfloWave-Website'
      }
    })
    
    if (!response.ok) {
      throw new Error(`GitHub API responded with status: ${response.status}`)
    }
    
    return await response.json()
    
  } catch (error) {
    console.error('Failed to fetch releases:', error)
    return []
  }
}

/**
 * Get download statistics
 */
export async function getDownloadStats(): Promise<{ totalDownloads: number; latestReleaseDownloads: number }> {
  try {
    const releases = await fetchAllReleases(50) // Get more releases to calculate total
    
    let totalDownloads = 0
    let latestReleaseDownloads = 0
    
    releases.forEach((release, index) => {
      const releaseDownloads = release.assets.reduce((sum, asset) => sum + asset.download_count, 0)
      totalDownloads += releaseDownloads
      
      if (index === 0) {
        latestReleaseDownloads = releaseDownloads
      }
    })
    
    return {
      totalDownloads,
      latestReleaseDownloads
    }
    
  } catch (error) {
    console.error('Failed to fetch download stats:', error)
    return {
      totalDownloads: 0,
      latestReleaseDownloads: 0
    }
  }
}

/**
 * Clear the release cache (useful for manual refresh)
 */
export function clearReleaseCache(): void {
  releaseCache = null
  cacheTimestamp = 0
}