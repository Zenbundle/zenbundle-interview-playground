import { ApiClient } from './ApiClient';

export class DeliveryApi extends ApiClient {
  async fetchAd(placementId) {
    const response = await this.axiosInstance.get(`/v1/delivery/${placementId}`);

    return response.data;
  }

  async logout() {
    await this.axiosInstance.get('/v1/account/logout');
  }

  async register(firstName, lastName, email, password) {
    const response = await this.axiosInstance.post('/v1/account/register', {
      firstName,
      lastName,
      email,
      password,
    });

    return response.data;
  }
}
