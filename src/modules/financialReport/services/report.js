import Api from '@/axios'

export default {
  getFinancialReportDetails ({ type, page, dateFrom, dateTo, projectId, categoryId, safeType }) {
    return Api().get(`accounts/reports/details/${type}?page=${page}&date_from=${dateFrom}&date_to=${dateTo}&project_id=${projectId}&category_id=${categoryId}&safe_type=${safeType}`)
  }
}
