import { Announcement, Sublease } from '../type'

type ReadMarksProps = {
  sublease: Sublease
  note: string
  announcement: Announcement
}

export const mapperRemarksText = ({ sublease, announcement, note }: ReadMarksProps) => {
  const subleaseText = sublease === 0 ? 'サブリース契約解除。' : 'サブリース契約継承。'
  const noticeText = sublease === 0 ? '告知事項なし。' : '告知事項あり。'

  return `${subleaseText}\n${noticeText}\n${announcement}\n${note}`
}

export const mapperTrafficsText = (traffics: string[] | undefined) => {
  if (!traffics) return ''
  return traffics.join('\n')
}
