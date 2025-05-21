import { ApiClient } from './ApiClient';

export class AccountApi extends ApiClient {
  async login(email, password) {
    const response = await this.axiosInstance.post('/v1/account/login', {
      email,
      password,
    });

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
