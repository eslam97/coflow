import Api from '@/axios'

export default {
  // eslint-disable-next-line camelcase
  shobraBranch (startDate, endDate) {
    return Api().post('dashboards/revenues', { project: 'shobra', date_from: startDate, date_to: endDate })
  },
  // eslint-disable-next-line camelcase
  manialBranch (startDate, endDate) {
    return Api().post('dashboards/revenues', { project: 'manial', date_from: startDate, date_to: endDate })
  },
  // eslint-disable-next-line camelcase
  nasrcityBranch (startDate, endDate) {
    return Api().post('dashboards/revenues', { project: 'nasrcity', date_from: startDate, date_to: endDate })
  }
}
