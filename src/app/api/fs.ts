import fs from 'fs'
import { join } from 'path'

export const getArtDir = (path: string) => join(process.cwd(), 'public', path)

export const getFolderPaths = (path: string) => {
  try {
    const folders = fs.readdirSync(getArtDir(path), { withFileTypes: true })
    return folders.filter((folder) => folder.isDirectory()).map((folder) => folder.name)
  } catch (error) {
    console.error(`Error reading folder paths: ${error}`)
    return []
  }
}

export const getFilePaths = (path: string) => {
  try {
    const files = fs.readdirSync(getArtDir(path), { withFileTypes: true })
    return files.filter((file) => file.isFile()).map((file) => file.name)
  } catch (error) {
    console.error(`Error reading file paths: ${error}`)
    return []
  }
}

export const getDetail = (path: string) => {
  try {
    const detail = fs.readFileSync(`${getArtDir(path)}/detail.json`, 'utf-8')
    return JSON.parse(detail)
  } catch (error) {
    console.error(`Error reading detail file: ${error}`)
    return null
  }
}

export const getArticle = (path: string) => {
  try {
    const article = fs.readFileSync(`${getArtDir(path)}`, 'utf-8')
    return article
  } catch (error) {
    console.error(`Error reading article file: ${error}`)
    return ''
  }
}
