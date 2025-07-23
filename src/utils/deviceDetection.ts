// Device detection utilities for recommending appropriate downloads

export interface DeviceInfo {
  os: 'windows' | 'macos' | 'linux' | 'unknown'
  arch: 'x64' | 'arm64' | 'x86' | 'unknown'
  userAgent: string
}

/**
 * Detect the user's operating system and architecture
 */
export function detectDevice(): DeviceInfo {
  const userAgent = navigator.userAgent.toLowerCase()
  
  let os: DeviceInfo['os'] = 'unknown'
  let arch: DeviceInfo['arch'] = 'unknown'

  // Detect OS
  if (userAgent.includes('windows nt')) {
    os = 'windows'
  } else if (userAgent.includes('mac os x') || userAgent.includes('macintosh')) {
    os = 'macos'
  } else if (userAgent.includes('linux') && !userAgent.includes('android')) {
    os = 'linux'
  }

  // Detect architecture
  if (userAgent.includes('wow64') || userAgent.includes('win64') || userAgent.includes('x86_64') || userAgent.includes('amd64')) {
    arch = 'x64'
  } else if (userAgent.includes('arm64') || userAgent.includes('aarch64')) {
    arch = 'arm64'
  } else if (userAgent.includes('x86') || userAgent.includes('i386') || userAgent.includes('i686')) {
    arch = 'x86'
  } else if (os === 'windows' && !userAgent.includes('wow64') && !userAgent.includes('win64')) {
    // Assume 64-bit for modern Windows if not explicitly 32-bit
    arch = 'x64'
  } else if (os === 'macos') {
    // For macOS, detect Apple Silicon vs Intel
    try {
      // Method 1: Check navigator.platform
      if (navigator.platform) {
        const platform = navigator.platform.toLowerCase()
        if (platform.includes('arm') || platform.includes('aarch64')) {
          arch = 'arm64'
        } else if (platform.includes('intel') || platform.includes('x86')) {
          arch = 'x64'
        }
      }
      
      // Method 2: Use WebGL renderer info as fallback
      if (arch === 'unknown') {
        try {
          const canvas = document.createElement('canvas')
          const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
          if (gl) {
            const debugInfo = gl.getExtension('WEBGL_debug_renderer_info')
            if (debugInfo) {
              const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_GL).toLowerCase()
              if (renderer.includes('apple') && (renderer.includes('m1') || renderer.includes('m2') || renderer.includes('m3'))) {
                arch = 'arm64'
              } else if (renderer.includes('intel') || renderer.includes('amd')) {
                arch = 'x64'
              }
            }
          }
        } catch (e) {
          // WebGL detection failed, continue
        }
      }
      
      // Method 3: Use screen resolution heuristic (Apple Silicon Macs often have high DPI)
      if (arch === 'unknown') {
        const pixelRatio = window.devicePixelRatio || 1
        const screenWidth = screen.width * pixelRatio
        const screenHeight = screen.height * pixelRatio
        
        // Common Apple Silicon Mac resolutions
        const appleResolutions = [
          [2560, 1600], // 13" MacBook Air/Pro M1/M2
          [3024, 1964], // 14" MacBook Pro M1/M2/M3 Pro/Max
          [3456, 2234], // 16" MacBook Pro M1/M2/M3 Pro/Max
          [4480, 2520], // 24" iMac M1
          [5120, 2880], // 27" iMac (potential future M-series)
          [6016, 3384], // 32" Pro Display XDR (often used with Mac Studio)
        ]
        
        const matchesAppleResolution = appleResolutions.some(([w, h]) => 
          (screenWidth === w && screenHeight === h) || (screenWidth === h && screenHeight === w)
        )
        
        if (matchesAppleResolution && pixelRatio >= 2) {
          arch = 'arm64'
        } else {
          arch = 'x64' // Conservative default for Intel
        }
      }
      
      // Final fallback: default to arm64 for modern detection
      if (arch === 'unknown') {
        // Since most new Macs are Apple Silicon, default to arm64
        arch = 'arm64'
      }
      
    } catch (e) {
      // If all detection fails, default to arm64 for modern Macs
      arch = 'arm64'
    }
  } else if (os === 'linux') {
    // Default to x64 for Linux
    arch = 'x64'
  }

  return {
    os,
    arch,
    userAgent: navigator.userAgent
  }
}

/**
 * Get a human-readable description of the detected device
 */
export function getDeviceDescription(device: DeviceInfo): string {
  const osNames = {
    windows: 'Windows',
    macos: 'macOS',
    linux: 'Linux',
    unknown: 'Unknown OS'
  }

  const archNames = {
    x64: '64-bit',
    arm64: 'ARM64',
    x86: '32-bit',
    unknown: 'Unknown Architecture'
  }

  return `${osNames[device.os]} ${archNames[device.arch]}`
}

/**
 * Check if a download is compatible with the user's device
 */
export function isCompatibleDownload(device: DeviceInfo, downloadPlatform: string, downloadArch: string): boolean {
  // OS compatibility
  if (device.os !== downloadPlatform) {
    return false
  }

  // Architecture compatibility
  if (device.arch === downloadArch) {
    return true
  }

  // Special compatibility cases
  if (device.arch === 'x64' && downloadArch === 'x86') {
    // 64-bit systems can run 32-bit software
    return true
  }

  if (device.os === 'macos' && downloadArch === 'universal') {
    // Universal binaries work on both Intel and Apple Silicon
    return true
  }

  return false
}

/**
 * Get the best download recommendation for the user's device
 */
export function getBestDownloadRecommendation(device: DeviceInfo, downloads: any[]): any | null {
  if (!downloads || downloads.length === 0) {
    return null
  }

  // First, filter compatible downloads
  const compatibleDownloads = downloads.filter(download => 
    isCompatibleDownload(device, download.platform, download.arch)
  )

  if (compatibleDownloads.length === 0) {
    return null
  }

  // Sort by preference
  const sortedDownloads = compatibleDownloads.sort((a, b) => {
    // Prefer exact architecture match
    if (a.arch === device.arch && b.arch !== device.arch) return -1
    if (b.arch === device.arch && a.arch !== device.arch) return 1

    // Prefer recommended downloads
    if (a.recommended && !b.recommended) return -1
    if (b.recommended && !a.recommended) return 1

    // Prefer installer over portable (for Windows)
    if (device.os === 'windows') {
      if (a.type === 'installer' && b.type === 'portable') return -1
      if (b.type === 'installer' && a.type === 'portable') return 1
    }

    // Prefer AppImage for Linux
    if (device.os === 'linux') {
      if (a.type === 'appimage' && b.type !== 'appimage') return -1
      if (b.type === 'appimage' && a.type !== 'appimage') return 1
    }

    return 0
  })

  return sortedDownloads[0]
}