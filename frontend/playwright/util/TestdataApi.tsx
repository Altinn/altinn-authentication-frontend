import { ApiRequests } from '../api-requests/ApiRequests'; // Adjust the path based on your project structure
import { Token } from '../api-requests/Token'; // Adjust the path based on your project structure

export class TestdataApi {
    
  static async cleanUpTestUsers() {
    const api = new ApiRequests();
    const tokenclass = new Token();

    try {
      const token = await tokenclass.getPersonalAltinnToken();
      const resp = await api.getSystemUsers(token);
      const users = JSON.parse(resp); // Convert the JSON string into an array of objects

      if (users.length > 0) {
        const respCleanUp = await api.cleanUpSystemUsers(users, token);
        console.log('Cleanup response:', respCleanUp);
      } else {
        console.log('No system users to clean up.');
      }
    } catch (error) {
      console.error('Error during cleanup:', error);
    }
  }
}