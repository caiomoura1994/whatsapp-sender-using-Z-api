import ApiService from './ApiService';

class ChatApi extends ApiService {
  async getChatDetail(sender, chatId) {
    const { data } = await this.service.post('/bots/chatDetail', {
      sender, chatId
    });
    return data;
  }

  async sendTextMessage({ phone, message, sender }) {
    const { data } = await this.service.post('interactions/send-message', { number: phone, message, sender });
    return data;
  }
}

export default new ChatApi();
