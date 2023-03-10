import { regionExportUrl } from '@components/PageDashbard/PageDashboardTable'
import { Octokit } from '@octokit/rest'
import { type BBox, bbox, centerOfMass } from '@turf/turf'
import axios from 'axios'

type GithubFile = { filename: string; downloadUrl: string; url: string; content: null }
type GithubFileWithContent = GithubFile & {
  slug: string
  name: string
  bounds: BBox
  content: any
}

export const fetchRegions = async () => {
  const octokit = new Octokit()
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
      return {
        filename: file.name,
        downloadUrl: file.download_url,
        url: file.html_url,
        content: null,
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
      const slug = file.filename.replace('.geojson', '')
      const name = slug.charAt(0).toUpperCase() + slug.slice(1)
      const bounds = bbox(content)
      const center = centerOfMass(content)

      return { ...file, slug, name, content, bounds, center }
    })
  )) as GithubFileWithContent[]

  return githubFilesWithContent
}
