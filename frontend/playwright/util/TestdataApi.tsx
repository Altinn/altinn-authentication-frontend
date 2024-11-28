import { ApiRequests } from '../api-requests/ApiRequests'; // Adjust the path based on your project structure
import { Token } from '../api-requests/Token'; // Adjust the path based on your project structure

export class TestdataApi {
    
  static async cleanUpTestUsers() {
    const api = new ApiRequests();
    const tokenclass = new Token();

    try {
      //cleanup method, dont fail test if this fails but log it
      const token = await tokenclass.getPersonalAltinnToken();
      const resp = await api.getSystemUsers(token);
      const users = JSON.parse(resp);

      if (users.length > 0) {
        const respCleanUp = await api.cleanUpSystemUsers(users, token);
      } else {
      }
    } catch (error) {
      console.error('Error during cleanup:', error);
    }
  }
}