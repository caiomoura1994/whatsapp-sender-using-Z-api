import ApiService from './ApiService';

class BotsApi extends ApiService {
  async verifyStatusBot() {
    const { data } = await this.service.get('/bots/verifyStatusBot', {});
    return data;
  }

  async disconnectBot(sender) {
    const { data } = await this.service.post('/bots/disconnectBot', { sender });
    return data;
  }

  async getQrCodeImage() {
    const { data } = await this.service.get('/bots/getQrCodeImage', {});
    return data;
  }
}

export default new BotsApi();
