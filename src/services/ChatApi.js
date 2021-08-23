import ApiService from './ApiService';

class ChatApi extends ApiService {
  async getChatDetail(sender, chatId) {
    const { data } = await this.service.post('/bots/chatDetail', {
      sender, chatId
    });
    return data;
  }
}

export default new ChatApi();
