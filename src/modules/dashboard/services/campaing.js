import Api from '@/axios'

export default {
  sendBulkWhatsapp (payload) {
    return Api().post('projects/whatsapp/logs/send/pluck', payload)
  },
  allWhatsappCampaigns ({ pageNumber = 1 }) {
    return Api().get(`projects/whatsapp/campaigns?page=${pageNumber}`)
  },
  actionsCampaign (campaignId) {
    return Api().patch(`projects/whatsapp/campaigns/${campaignId}`)
  }
}
