import ApiService from './ApiService';

class InteractionsApi extends ApiService {
  async importAllLeads({ sender }) {
    const { data } = await this.service.post('interactions/chats/import-leads', { sender });
    return data;
  }

  async getChatMessages() {
    const { data } = await this.service.post('interactions/chat-messages', {});
    return data;
  }

  async sendTextMessage({ phone, message, sender }) {
    const { data } = await this.service.post('interactions/send-message', { number: phone, message, sender });
    return data;
  }
}

export default new InteractionsApi();
