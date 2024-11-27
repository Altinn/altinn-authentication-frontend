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