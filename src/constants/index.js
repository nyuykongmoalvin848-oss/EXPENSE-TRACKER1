export const CATEGORY_FALLBACK_COLOR = '#9ca3af'

export const getCategoryColor = (categories = [], id) => {
  return categories.find((c) => c.id === id)?.color || CATEGORY_FALLBACK_COLOR
}

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount)
}
