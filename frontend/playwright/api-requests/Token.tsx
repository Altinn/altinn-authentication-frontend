import * as dotenv from 'dotenv';

export class Token {


  /**
 * Fetches an enterprise Altinn token for a specific organization and environment.
 * @param scopes Scopes required for the token.
 * @returns The enterprise Altinn token as a string.
 */
public async getEnterpriseAltinnToken(scopes: string): Promise<string> {
  const username = process.env.token_api_username;
  const password = process.env.token_api_password;

  if (!username || !password) {
    throw new Error('API username or password is not defined in the environment variables.');
  }

  // Construct the URL for fetching the enterprise Altinn test token
  const url = `https://altinn-testtools-token-generator.azurewebsites.net/api/GetEnterpriseToken` +
              `?orgNo=${process.env.ORG}&env=${process.env.environment}&scopes=${scopes}`;

  // Basic authentication header
  const auth = Buffer.from(`${username}:${password}`).toString('base64');
  const headers = {
    'Authorization': `Basic ${auth}`,
  };

  // Retrieve the token
  const token = await this.getAltinnToken(url, headers);
  if (!token) {
    throw new Error("Token retrieval failed for Enterprise Altinn token");
  }

  return token;
}



     /**
   * Used for fetching an Altinn test token for a specific role
   * @param user User read from test config (testusers.at.json)
   * @returns The Altinn test token as a string
   */
  public async getPersonalAltinnToken(scopes: string): Promise<string> {
    const username = process.env.token_api_username;
    const password = process.env.token_api_password;
    if (!username || !password) {
      throw new Error('API username or password is not defined in the environment variables.');
    }
    // Construct the URL for fetching the Altinn test token
    const url = `https://altinn-testtools-token-generator.azurewebsites.net/api/GetPersonalToken?env=${process.env.environment}` +
                `&scopes=${scopes}` +
                `&pid=${process.env.PID}` +
                `&userid=${process.env.ALTINN_USER_ID}` +
                `&partyid=${process.env.ALTINN_PARTY_ID}` +
                `&authLvl=3&ttl=3000`;

    console.log(url)

    // Retrieve the token
    const auth = Buffer.from(`${username}:${password}`).toString('base64');
        const headers = {
        'Authorization': `Basic ${auth}`,
        };

    const token = await this.getAltinnToken(url, headers);
    if (!token) {
      throw new Error("Token retrieval failed for Altinn token");
    }
    return token;
  }

private async getAltinnToken(url: string, headers: Record<string, string>): Promise<string> {  
    const response = await fetch(url, { headers });
    if (!response.ok) {
      const errorMessage = await response.text(); // Fetch the full error message from the response
      throw new Error(`Failed to fetch token: ${response.statusText} - ${errorMessage}`);
    }
    return response.text();
  }
}