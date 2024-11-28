interface PostSystemUserRequestPayload {
  systemId: string;
  partyOrgNo: string;
  externalRef: string;
  rights: Array<{
    resource: Array<{
      id: string;
      value: string;
    }>;
  }>;
  redirectUrl: string;
}


export class ApiRequests {


  public async cleanUpSystemUsers(systemUsers: Array<{ id: string }>, token: string): Promise<void> {
  for (const systemuser of systemUsers) {
    await this.deleteSystemUser(token, systemuser.id)
  }
}

  //Todo - consider moving to class TestdataApi
  public async getSystemUsers(token: string): Promise<string> {
    var endpoint = `v1/systemuser/${process.env.ALTINN_PARTY_ID}`;
    var url = `${process.env.API_BASE_URL}${endpoint}`;

    try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`, // Use the token for authentication
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
        if (response.status === 404) {
          console.warn('System users not found (404).');
          return '[]'; //Return empty list if no users to be deleted
        }
      const errorText = await response.text();
      console.error('Failed to fetch system users:', response.status, errorText);
      console.log(response.status)
      throw new Error(`Failed to fetch system users: ${response.statusText}`);
    }

    const data = await response.json(); // Assuming the API returns JSON data
    return JSON.stringify(data, null, 2); // Format the JSON for better readability (optional)
  } catch (error) {
    console.error('Error fetching system users:', error);
    throw new Error('Error fetching system users. Check logs for details.');
  }

  }

  public async deleteSystemUser(token: string, systemUserId: string): Promise<void>{
    var endpoint = `v1/systemuser/${process.env.ALTINN_PARTY_ID}/${systemUserId}`
    var url = `${process.env.API_BASE_URL}${endpoint}`

     try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorBody = await response.text(); // Read the error body if needed
        console.error('Failed to delete system user:', response.status, errorBody);
        throw new Error(`Failed to delete system user: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error during system user deletion:', error);
      throw new Error('System user deletion failed. Check logs for details.');
    }
  }


 public async sendPostRequest(payload: PostSystemUserRequestPayload, endpoint: string, token: string): Promise<any> {
  var url = `${process.env.API_BASE_URL}${endpoint}`

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Add the Authorization header
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
    const errorBody = await response.text(); // Read the response body
    console.error(`HTTP Error! Status: ${response.status}, Response Body: ${errorBody}`);
    throw new Error(`HTTP error! Status: ${response.status}, Response Body: ${errorBody}`);
  }
      const data = await response.json();
      return data; // Return the response data
    } catch (error) {
      console.error('Error:', error);
      throw error; // Rethrow the error to handle it in the test
    }
  }

  /**
 * Sends a GET request to fetch the last system request.
 * @param endpoint The API endpoint (relative path).
 * @param token The authorization token.
 * @returns The response data as JSON.
 */
public async fetchLastSystemRequest(endpoint: string, token: string): Promise<any> {
  const url = `${process.env.API_BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`, // Add the Authorization header
      },
    });

    if (!response.ok) {
      const errorBody = await response.text(); // Read the response body
      console.error(`HTTP Error! Status: ${response.status}, Response Body: ${errorBody}`);
      throw new Error(`HTTP error! Status: ${response.status}, Response Body: ${errorBody}`);
    }

    const data = await response.json();
    return data; // Return the response data
  } catch (error) {
    console.error('Error:', error);
    throw error; // Rethrow the error to handle it in the test
  }
}

  generatePayloadSystemUserRequest(): PostSystemUserRequestPayload {
    var randomString =  Date.now(); // Current timestamp in milliseconds
    const randomNum = Math.random().toString(36);
    return {
      systemId: `${process.env.SYSTEM_ID}`,
      partyOrgNo: `${process.env.ORG}`,
      externalRef: `${randomNum}${randomString}`,
      rights: [
      {
        resource: [
          {
            value: "authentication-e2e-test",
            id: "urn:altinn:resource"
          }
        ]
      },
      {
        resource: [
          {
            value: "vegardtestressurs",
            id: "urn:altinn:resource"
          }
        ]
      }
    ],
      redirectUrl: "https://altinn.no"
    };
  }

}