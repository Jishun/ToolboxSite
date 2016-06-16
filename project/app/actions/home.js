import http from '../utils/http'
import {error, info, success} from './common'

export const RECEIVED_README = 'RECEIVED_README'

export function getReadMeData(){
  let url = 'https://raw.githubusercontent.com/djsxp/ToolboxSite/master/README.md'
  return http.get(url, RECEIVED_README, false)
}
