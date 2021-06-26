import ApiService from './ApiService';

class InteractionsApi extends ApiService {
  async getAllChats({ page, pageSize }) {
    const { data } = await this.service.post('interactions/chats', { page, pageSize });
    return data;
  }

  async getChatMessages() {
    const { data } = await this.service.post('interactions/chat-messages', {});
    return data;
  }

  async sendTextMessage({ phone, message }) {
    const { data } = await this.service.post('interactions/send-text', { phone, message });
    return data;
  }
}

export default new InteractionsApi();
