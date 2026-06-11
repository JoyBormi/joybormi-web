import { Locale } from "@/i18n/config"

type LocalizedValue = Record<Locale, string>

type City = {
  slug: string
  name: LocalizedValue
}

type Category = {
  slug: string
  name: LocalizedValue
  metaTitle: LocalizedValue
  metaDescription: LocalizedValue
  searchKeywords: Record<Locale, string[]>
}

const cities: City[] = [
  {
    slug: "tashkent",
    name: { en: "Tashkent", ru: "Ташкент", uz: "Toshkent" },
  },
  {
    slug: "samarkand",
    name: { en: "Samarkand", ru: "Самарканд", uz: "Samarqand" },
  },
  {
    slug: "bukhara",
    name: { en: "Bukhara", ru: "Бухара", uz: "Buxoro" },
  },
]

const categories: Category[] = [
  {
    slug: "restaurants",
    name: { en: "Restaurants", ru: "Рестораны", uz: "Restoranlar" },
    metaTitle: {
      en: "Restaurant booking",
      ru: "Бронирование ресторанов",
      uz: "Restoran bron qilish",
    },
    metaDescription: {
      en: "Find restaurants and reserve tables faster.",
      ru: "Находите рестораны и быстрее бронируйте столики.",
      uz: "Restoranlarni toping va stolni tezroq bron qiling.",
    },
    searchKeywords: {
      en: ["restaurant booking", "table reservation", "restaurants"],
      ru: ["рестораны", "бронь ресторана", "резерв столика"],
      uz: ["restoran bron", "stol bron qilish", "restoranlar"],
    },
  },
  {
    slug: "barbers",
    name: { en: "Barbers", ru: "Барбершопы", uz: "Barbershoplar" },
    metaTitle: {
      en: "Barber booking",
      ru: "Запись в барбершоп",
      uz: "Barbershopga yozilish",
    },
    metaDescription: {
      en: "Compare barbers and book appointments online.",
      ru: "Сравнивайте барбершопы и записывайтесь онлайн.",
      uz: "Barbershoplarni solishtiring va onlayn yoziling.",
    },
    searchKeywords: {
      en: ["barber booking", "barbershop", "barber near me"],
      ru: ["барбершоп", "запись к барберу", "барбер ташкент"],
      uz: ["barbershop", "sartarosh", "barberga yozilish"],
    },
  },
  {
    slug: "salons",
    name: { en: "Beauty salons", ru: "Салоны красоты", uz: "Go'zallik salonlari" },
    metaTitle: {
      en: "Salon booking",
      ru: "Запись в салон красоты",
      uz: "Salonga yozilish",
    },
    metaDescription: {
      en: "Discover salons and book beauty services online.",
      ru: "Находите салоны красоты и записывайтесь онлайн.",
      uz: "Salonlarni toping va go'zallik xizmatlariga onlayn yoziling.",
    },
    searchKeywords: {
      en: ["salon booking", "beauty salon", "beauty services"],
      ru: ["салон красоты", "запись в салон", "бьюти услуги"],
      uz: ["salon", "go'zallik saloni", "salonga yozilish"],
    },
  },
  {
    slug: "services",
    name: { en: "Services", ru: "Услуги", uz: "Xizmatlar" },
    metaTitle: {
      en: "Service booking",
      ru: "Бронирование услуг",
      uz: "Xizmatlarni bron qilish",
    },
    metaDescription: {
      en: "Browse trusted local services and book faster.",
      ru: "Находите проверенные локальные услуги и бронируйте быстрее.",
      uz: "Ishonchli mahalliy xizmatlarni toping va tezroq bron qiling.",
    },
    searchKeywords: {
      en: ["service booking", "local services", "booking app"],
      ru: ["услуги", "онлайн бронь услуг", "запись на услуги"],
      uz: ["xizmatlar", "xizmatlarni bron qilish", "onlayn bron"],
    },
  },
]

export type MarketPage = {
  city: City
  category: Category
}

export function getAllMarketPages(): MarketPage[] {
  return cities.flatMap((city) => categories.map((category) => ({ city, category })))
}

export function getFeaturedMarketPages(): MarketPage[] {
  const wanted = [
    ["tashkent", "restaurants"],
    ["tashkent", "barbers"],
    ["tashkent", "salons"],
    ["samarkand", "restaurants"],
    ["bukhara", "services"],
    ["samarkand", "salons"],
  ] as const

  return wanted
    .map(([citySlug, categorySlug]) => {
      const city = cities.find((item) => item.slug === citySlug)
      const category = categories.find((item) => item.slug === categorySlug)

      if (!city || !category) return null

      return { city, category }
    })
    .filter((item): item is MarketPage => item !== null)
}

export function getMarketPage(citySlug: string, categorySlug: string) {
  const city = cities.find((item) => item.slug === citySlug)
  const category = categories.find((item) => item.slug === categorySlug)

  if (!city || !category) {
    return null
  }

  return { city, category }
}
