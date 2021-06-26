import ApiService from './ApiService';

class BotsApi extends ApiService {
  async verifyStatusBot() {
    const { data } = await this.service.get('/bots/verifyStatusBot', {});
    return data;
  }

  async disconnectBot() {
    const { data } = await this.service.get('/bots/disconnectBot', {});
    return data;
  }

  async getQrCodeImage() {
    const { data } = await this.service.get('/bots/getQrCodeImage', {});
    return data;
  }
}

export default new BotsApi();
