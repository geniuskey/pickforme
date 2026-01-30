export {
  searchNaverProducts,
  getNaverProductDetails,
  generateNaverAffiliateLink,
  type NaverProductInfo,
} from './naver'

export {
  searchElevenstProducts,
  generateElevenstAffiliateLink,
  type ElevenstProductInfo,
} from './elevenst'

export {
  searchMultiPlatform,
  comparePrices,
  type MultiPlatformProduct,
} from './multiplatform'

export {
  searchCoupangProducts,
  getCoupangGoldBoxProducts,
  createCoupangDeepLink,
  createCoupangDeepLinks,
  getCoupangProductsForCategory,
  type CoupangProduct,
  type CoupangProductInfo,
  type CoupangDeepLink,
} from './coupang'

export {
  searchAliProducts,
  generateAliAffiliateLink,
  getAliHotProducts,
  getAliProductsForCategory,
  ALI_CATEGORIES,
  type AliProduct,
  type AliSearchResult,
} from './aliexpress'
