import { regionExportUrl } from '@components/PageDashbard/PageDashboardTable'
import { Octokit } from '@octokit/rest'
import { type BBox, bbox, centerOfMass, Position } from '@turf/turf'
import axios from 'axios'
import { keyToName } from './keyToName'

type GithubFile = {
  slug: string
  name: string
  filename: string
  downloadUrl: string
  url: string
}
type GithubFileWithContent = GithubFile & {
  bounds: BBox
  center: Position
  content: any
}

export const fetchRegions = async () => {
  // We don't need the auth on githup actions, since those work fine without.
  // However, locally, when we hit the API a lot, we need to auth because of rate limits.
  const auth = import.meta.env.OCTOKIT_AUTH ? { auth: import.meta.env.OCTOKIT_AUTH } : {}
  const octokit = new Octokit(auth)
  const githubContent = await octokit.repos.getContent({
    owner: 'osmberlin',
    repo: 'osm-parking-processing',
    ref: 'docker', // For now, until the branch is merged into `main`
    path: '/extracts/boundaries',
  })

  const githubFiles = githubContent.data
    // @ts-ignore no idea how to guard this from TS
    ?.filter((file: any) => file.type === 'file')
    ?.map((file: any) => {
      const slug = file.name.replace('.geojson', '')
      return {
        slug,
        name: keyToName(slug),
        filename: file.name,
        downloadUrl: file.download_url,
        url: file.html_url,
      }
    }) as GithubFile[]

  // Cleanup all those files from github that don't produce an api response
  // Those are not actually present in the data, just prepared in github (but unused)
  await Promise.all(
    githubFiles.map(async (file, index) => {
      const apiUrl = regionExportUrl(file.slug)
      await axios.get(apiUrl).catch((_error) => {
        delete githubFiles[index]
      })
    })
  )

  return githubFiles.filter(Boolean)
}

export const fetchRegionWithContent = async () => {
  const githubFiles = await fetchRegions()
  const githubFilesWithContent = (await Promise.all(
    githubFiles.map(async (file: any) => {
      const resp = await axios.get(file.downloadUrl)
      const content = await resp.data
      const bounds = bbox(content)
      const center = centerOfMass(content).geometry.coordinates

      return { ...file, content, bounds, center }
    })
  )) as GithubFileWithContent[]

  return githubFilesWithContent
}
