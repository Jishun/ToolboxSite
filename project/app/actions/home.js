import http from '../utils/http'
import {error, info, success} from './common'

export const RECEIVED_README = 'RECEIVED_README'

export function getReadMeData(){
  let url = 'https://raw.githubusercontent.com/Jishun/ToolboxSite/master/readme.md'
  return http.get(url, RECEIVED_README, false)
}
