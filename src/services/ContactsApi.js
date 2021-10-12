import ApiService from './ApiService';

class ContactsApi extends ApiService {
  async destroy(contactId) {
    const { data } = await this.service.delete(`/contacts/${contactId}`);
    return data;
  }

  async update(contactId, payloadToupdate) {
    const { data } = await this.service.patch(`/contacts/${contactId}`, payloadToupdate);
    return data;
  }

  async destroyAll(sender) {
    const { data } = await this.service.delete('/contacts/delete_all', { params: { sender } });
    return data;
  }
}

export default new ContactsApi();
