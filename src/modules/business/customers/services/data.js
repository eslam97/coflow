export const managementItems = [
  { id: 1, name: 'Ahmed Mohamed', age: 10, gender: 'Male', nationality: 'Egypt', image: 'sdadsa', tickets: 10, promotions: 1, purchases: '1000 (EGP)' },
  { id: 2, name: 'Mohamed Ahmed', age: 25, gender: 'Male', nationality: 'Canada', image: 'sdadsa', tickets: 20, promotions: 2, purchases: '1000 (EGP)' },
  { id: 3, name: 'Amir Mohamed', age: 33, gender: 'Male', nationality: 'France', image: 'sdadsa', tickets: 30, promotions: 3, purchases: '1000 (EGP)' },
  { id: 4, name: 'Sara Ahmed', age: 15, gender: 'Female', nationality: 'England', image: 'sdadsa', tickets: 30, promotions: 3, purchases: '1000 (EGP)' },
  { id: 5, name: 'Alaa Mohamed', age: 19, gender: 'Female', nationality: 'UAE', image: 'sdadsa', tickets: 40, promotions: 4, purchases: '1000 (EGP)' },
  { id: 6, name: 'Omar Mohamed', age: 25, gender: 'Male', nationality: 'Saudi Arabia', image: 'sdadsa', tickets: 40, promotions: 4, purchases: '1000 (EGP)' },
  { id: 7, name: 'Sara Ahmed', age: 30, gender: 'Female', nationality: 'Greece', image: 'sdadsa', tickets: 50, promotions: 5, purchases: '1000 (EGP)' }
]
export const managementPurchasesItems = [
  { id: 1, date: '2023-10-21', purchase: 'Package', name: 'Ticket Name', quantity: 4, amount: '1000 (EGP)', status: 'FOD', validity: '30 Days' },
  { id: 2, date: '--', purchase: 'Package', name: 'Ticket Name', quantity: 2, amount: '--', status: '--', validity: '30 Days' },
  { id: 3, date: '2023-8-11', purchase: 'BuyGet', name: 'Ticket Name', quantity: 3, amount: '1000 (EGP)', status: 'DUE', validity: '14 Days ' },
  { id: 4, date: '--', purchase: 'Ticket', name: 'Ticket Name', quantity: 4, amount: '--', status: '--', validity: '14 Days ' },
  { id: 5, date: '--', purchase: 'Ticket', name: 'Coupon 1', quantity: 1, amount: '--', status: '--', validity: '14 Days ' },
  { id: 6, date: '2023-4-21', purchase: 'Ticket', name: 'Ticket Name', quantity: 8, amount: '1000 (EGP)', status: 'PAID', validity: '9 Days ' },
  { id: 7, date: '2023-1-21', purchase: 'Package', name: 'Ticket Name', quantity: 4, amount: '1000 (EGP)', status: 'DOP', validity: '7 Days ' }
]
export const managementGiftsItems = [
  { id: 1, date: '2023-10-21', gift: 'Ticket', name: 'Ticket Name', quantity: 4, validity: '30 Days' },
  { id: 2, date: '2023-9-21', gift: 'Ticket', name: 'Coupon 1 - 10%', quantity: 2, validity: '2 Days' },
  { id: 3, date: '2023-8-11', gift: 'Coupon', name: 'Ticket Name', quantity: 3, validity: '14 Days' }
]
export const managementHistoryItems = [
  { id: 1, admin: 'Ali Ahmed', date: '2023-10-21', action: 'Purchase', item: 'Ticket', name: 'Ticket Name' },
  { id: 2, admin: 'Ahmed Amr', date: '2023-9-21', action: 'Gift', item: 'Coupon', name: 'Coupon 1 - 10%' },
  { id: 3, admin: 'Amr Ali', date: '2023-8-11', action: 'Collection', item: 'Ticket', name: 'Ticket Name' },
  { id: 4, admin: 'Customer', date: '2023-7-10', action: 'Refund', item: 'Package', name: 'Offer Name' },
  { id: 5, admin: 'Customer', date: '2023-5-10', action: 'Expiration', item: 'Buy&Get', name: 'Offer Name' },
  { id: 6, admin: 'Amgd Ali', date: '2023-4-21', action: 'Reservation', item: 'Activity', name: 'Activity Slot Name' },
  { id: 7, admin: 'Omar Ahmed', date: '2023-1-21', action: 'Reservation', item: 'Flow', name: 'FIT FLOW' }
]

export const purchasessItems = [
  { id: 1, admin: 'Ali Ahmed', date: '2023-10-21', customer: 'Mohamed Ahmed', action: 'Purchase', purchase: 'Package', name: 'Offer Name', amount: '1000 (EGP)', status: 'DOP' },
  { id: 2, admin: 'Ahmed Amr', date: '2023-9-21', customer: 'Ahmed Mohamed', action: 'Refund', purchase: 'Package', name: 'Offer Name', amount: '1000 (EGP)', status: 'DOP' },
  { id: 3, admin: 'Amr Ali', date: '2023-8-11', customer: 'Amir Mohamed', action: 'Expiration', purchase: 'BuyGet', name: 'Offer Name', amount: '1000 (EGP)', status: 'PAID' },
  { id: 4, admin: 'Customer', date: '2023-7-10', customer: 'Sara Ahmed', action: 'Purchase', purchase: 'Ticket', name: 'Ticket Name', amount: '1000 (EGP)', status: 'DUE' },
  { id: 5, admin: 'Customer', date: '2023-5-10', customer: 'Alaa Mohamed', action: 'Expiration', purchase: 'Ticket', name: 'Ticket Name', amount: '1000 (EGP)', status: 'FOP' },
  { id: 6, admin: 'Amgd Ali', date: '2023-4-21', customer: 'Omar Mohamed', action: 'Refund', purchase: 'Ticket', name: 'Ticket Name', amount: '1000 (EGP)', status: 'FOP' },
  { id: 7, admin: 'Omar Ahmed', date: '2023-1-21', customer: 'Sara Ahmed', action: 'Expiration', purchase: 'Package', name: 'Offer Name', amount: '1000 (EGP)', status: 'FOP' }
]
export const giftsItems = [
  { id: 1, admin: 'Ali Ahmed', date: '2023-10-21', customer: 'Mohamed Ahmed', gift: 'Ticket', name: 'Offer Name', quantity: '2' },
  { id: 2, admin: 'Ahmed Amr', date: '2023-9-21', customer: 'Ahmed Mohamed', gift: 'Ticket', name: 'Offer Name', quantity: '3' },
  { id: 3, admin: 'Amr Ali', date: '2023-8-11', customer: 'Amir Mohamed', gift: 'Ticket', name: 'Offer Name', quantity: '4' },
  { id: 4, admin: 'Customer', date: '2023-7-10', customer: 'Sara Ahmed', gift: 'Coupon', name: 'Ticket Name', quantity: '1' },
  { id: 5, admin: 'Customer', date: '2023-5-10', customer: 'Alaa Mohamed', gift: 'Coupon', name: 'Ticket Name', quantity: '1' },
  { id: 6, admin: 'Amgd Ali', date: '2023-4-21', customer: 'Omar Mohamed', gift: 'Ticket', name: 'Ticket Name', quantity: '2' },
  { id: 7, admin: 'Omar Ahmed', date: '2023-1-21', customer: 'Sara Ahmed', gift: 'Coupon', name: 'Offer Name', quantity: '1' }
]
export const collectionsItems = [
  { id: 1, admin: 'Ali Ahmed', date: '2023-10-21', customer: 'Mohamed Ahmed', action: 'Reservation', service: 'Flow', name: 'Offer Name' },
  { id: 2, admin: 'Ahmed Amr', date: '2023-9-21', customer: 'Ahmed Mohamed', action: 'Reservation', service: 'Activity', name: 'Offer Name' },
  { id: 3, admin: 'Amr Ali', date: '2023-8-11', customer: 'Amir Mohamed', action: 'Reservation', service: 'Course', name: 'Offer Name' },
  { id: 4, admin: 'Customer', date: '2023-7-10', customer: 'Sara Ahmed', action: 'Collection', service: 'Flow', name: 'Ticket Name' },
  { id: 5, admin: 'Customer', date: '2023-5-10', customer: 'Alaa Mohamed', action: 'Collection', service: 'Activity', name: 'Ticket Name' },
  { id: 6, admin: 'Amgd Ali', date: '2023-4-21', customer: 'Omar Mohamed', action: 'Collection', service: 'Course', name: 'Ticket Name' },
  { id: 7, admin: 'Omar Ahmed', date: '2023-1-21', customer: 'Sara Ahmed', action: 'Collection', service: 'Flow', name: 'Offer Name' }
]
