import { HAS_ASSETS_OPTIONS, INCOME_OPTIONS, WILLINGNESS_OPTIONS } from '../options'

export const convertTextHasAssets = (hasAssets: 0 | 1) => {
  return hasAssets === 0 ? 0 : '有り'
}

export const convertIsPaidText = (isPaid: 0 | 1) => {
  return isPaid === 0 ? '-' : '有料'
}

export const convertWillingText = (willing: number | undefined) => {
  return willing ? WILLINGNESS_OPTIONS[willing - 1].label : ''
}

export const convertIncomeText = (income: number | undefined) => {
  return income ? INCOME_OPTIONS[income - 1].label : ''
}

export const convertHasAssetsText = (hasAssets: number | undefined) => {
  return hasAssets ? HAS_ASSETS_OPTIONS[hasAssets].label : ''
}
