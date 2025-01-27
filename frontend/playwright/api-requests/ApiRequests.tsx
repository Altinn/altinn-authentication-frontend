import { Token } from './Token';

interface PostSystemUserRequestPayload {
  systemId: string;
  partyOrgNo: string;
  externalRef: string;
  rights: {
    resource: {
      id: string;
      value: string;
    }[];
  }[];
  redirectUrl: string;
}

interface PostSystemUserChangeRequestPayload {
  systemId: string;
  partyOrgNo: string;
  externalRef: string;
  requiredRights: {
    resource: {
      id: string;
      value: string;
    }[];
  }[];
  redirectUrl: string;
}
 interface PostSystemRegisterRequestPayload {
   Id: string;
   Vendor: {
     ID: string;
   };
   Name: {
     en: string;
     nb: string;
     nn: string;
   };
   Description: {
     en: string;
     nb: string;
     nn: string;
   };
   rights: {
     resource: {
       value: string;
       id: string;
     }[];
   }[];
   allowedRedirectUrls: string[];
   isVisible: boolean;
   ClientId: string[];
 }

 export class ApiRequests {
   private tokenClass: Token;

   constructor() {
     this.tokenClass = new Token();
   }

   public async cleanUpSystemUsers(systemUsers: { id: string }[]): Promise<void> {
     const token = await this.tokenClass.getPersonalAltinnToken();
     for (const systemuser of systemUsers) {
       await this.deleteSystemUser(token, systemuser.id);
     }
   }

   public async getSystemUsers(): Promise<string> {
     const endpoint = `v1/systemuser/${process.env.ALTINN_PARTY_ID}`;
     const url = `${process.env.API_BASE_URL}${endpoint}`;
     const token = await this.tokenClass.getPersonalAltinnToken();

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
         throw new Error(`Failed to fetch system users: ${response.statusText}`);
       }

       const data = await response.json(); // Assuming the API returns JSON data
       return JSON.stringify(data, null, 2); // Format the JSON for better readability (optional)
     } catch (error) {
       console.error('Error fetching system users:', error);
       throw new Error('Error fetching system users. Check logs for details.');
     }
   }

   public async deleteSystemInSystemRegister(systemName: string) {
     var endpoint = `v1/systemregister/vendor/${process.env.ORG}_${systemName}`;
     console.log('debug endpoint:' + endpoint);
     var token = await this.tokenClass.getEnterpriseAltinnToken(
       'altinn:authentication/systemuser.request.write altinn:authentication/systemregister.write altinn:authentication/systemuser.request.read',
     );
     const url = `${process.env.API_BASE_URL}${endpoint}`;
     console.log('fullt endepunkt: ' + url);

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
         console.error('Failed to delete system:', response.status, errorBody);
         throw new Error(`Failed to delete system ${response.statusText}`);
       }
     } catch (error) {
       console.error('Error during system deletion:', error);
       throw new Error('System deletion failed in SystemRegister. Check logs for details.');
     }
   }

   public async deleteSystemUser(token: string, systemUserId: string): Promise<void> {
     const endpoint = `v1/systemuser/${process.env.ALTINN_PARTY_ID}/${systemUserId}`;
     const url = `${process.env.API_BASE_URL}${endpoint}`;

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

   public async postSystemuserRequest(externalRef: string) {
     const payload = this.generatePayloadSystemUserRequest(externalRef);
     const endpoint = 'v1/systemuser/request/vendor';
     const apiResponse = await this.sendPostRequest<{ confirmUrl: string; id: string }>(
       payload,
       endpoint,
     );
     return apiResponse; // Return the Confirmation URL to use in the test
   }

   public async approveSystemuserRequest(requestId: string) {
     const endpoint = `v1/systemuser/request/${process.env.ALTINN_PARTY_ID}/${requestId}/approve`;
     const url = `${process.env.API_BASE_URL}${endpoint}`;
     const userToken = await this.tokenClass.getPersonalAltinnToken();

     try {
       const response = await fetch(url, {
         method: 'POST',
         headers: {
           Authorization: `Bearer ${userToken}`,
           'Content-Type': 'application/json',
         },
       });

       if (!response.ok) {
         const errorBody = await response.text(); // Read the error body if needed
         console.error('Failed to approve system user request:', response.status, errorBody);
         throw new Error(`Failed to approve system user request: ${response.statusText}`);
       }
     } catch (error) {
       console.error('Error during system user request approval:', error);
       throw new Error('System user user request approval. Check logs for details.');
     }
   }

   public async postSystemuserChangeRequest(externalRef: string) {
     const payload = this.generatePayloadSystemUserChangeRequest(externalRef);
     const endpoint = 'v1/systemuser/changerequest/vendor';
     const apiResponse = await this.sendPostRequest<{ confirmUrl: string }>(payload, endpoint);
     return apiResponse.confirmUrl; // Return the Confirmation URL to use in the test
   }

   public async getStatusForSystemUserRequest<T>(systemRequestId: string): Promise<T> {
     const endpoint = `v1/systemuser/request/vendor/${systemRequestId}`;
     return this.sendGetStatusRequest(endpoint);
   }

   public async getStatusForSystemUserChangeRequest<T>(systemRequestId: string): Promise<T> {
     const endpoint = `v1/systemuser/changerequest/vendor/${systemRequestId}`;
     return this.sendGetStatusRequest(endpoint);
   }

   private async sendGetStatusRequest(endpoint: string) {
     const scopes =
       'altinn:authentication/systemuser.request.read altinn:authentication/systemuser.request.write';
     const token = await this.tokenClass.getEnterpriseAltinnToken(scopes);
     const url = `${process.env.API_BASE_URL}${endpoint}`;

     const response = await fetch(url, {
       method: 'GET',
       headers: {
         Authorization: `Bearer ${token}`,
       },
     });

     if (!response.ok) {
       throw new Error(
         `Failed to fetch status for system user request. Status: ${response.status}`,
       );
     }

     const data = await response.json();
     return data;
   }

   private async sendPostRequest<T>(
     payload: PostSystemUserRequestPayload | PostSystemUserChangeRequestPayload | null,
     endpoint: string,
   ): Promise<T> {
     const url = `${process.env.API_BASE_URL}${endpoint}`;
     const scopes =
       'altinn:authentication/systemuser.request.read altinn:authentication/systemuser.request.write';
     const token = await this.tokenClass.getEnterpriseAltinnToken(scopes);
     try {
       const response = await fetch(url, {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
           Authorization: `Bearer ${token}`, // Add the Authorization header
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

   private generatePayloadSystemUserRequest(externalRef: string): PostSystemUserRequestPayload {
     return {
       systemId: `${process.env.SYSTEM_ID}`,
       partyOrgNo: `${process.env.ORG}`,
       externalRef: externalRef,
       rights: [
         {
           resource: [
             {
               value: 'authentication-e2e-test',
               id: 'urn:altinn:resource',
             },
           ],
         },
       ],
       redirectUrl: 'https://altinn.no',
     };
   }

   private generatePayloadSystemUserChangeRequest(
     externalRef: string,
   ): PostSystemUserChangeRequestPayload {
     return {
       systemId: `${process.env.SYSTEM_ID}`,
       partyOrgNo: `${process.env.ORG}`,
       externalRef: externalRef,
       requiredRights: [
         {
           resource: [
             {
               value: 'vegardtestressurs',
               id: 'urn:altinn:resource',
             },
           ],
         },
       ],
       redirectUrl: 'https://altinn.no',
     };
   }

   public async CreateSystemSystemRegister(): Promise<any> {
     var vendorId = process.env.ORG;
     const clientId = `Client_${Date.now()}`;
     const name = `AE2E-${Date.now()}`;

     const payload = {
       Id: `${vendorId}_${name}`,
       Vendor: {
         ID: `0192:${vendorId}`,
       },
       Name: {
         en: `${name}`,
         nb: `${name}`,
         nn: `${name}`,
       },
       Description: {
         en: 'Authentication-e2e-Playwright-English-description',
         nb: 'Authentication-e2e-Playwright-bokmaal-beskrivelse',
         nn: 'Authentication-e2e-Playwright-nynorsk-beskriving',
       },
       rights: [
         {
           resource: [
             {
               value: 'authentication-e2e-test',
               id: 'urn:altinn:resource',
             },
           ],
         },
         {
           resource: [
             {
               value: 'vegardtestressurs',
               id: 'urn:altinn:resource',
             },
           ],
         },
       ],
       allowedRedirectUrls: ['https://altinn.no'],
       isVisible: true,
       ClientId: [clientId],
     };
     const response = await this.sendPostRequestNew<
       typeof payload,
       PostSystemRegisterRequestPayload
     >(payload, 'v1/systemregister/vendor');

     return name;
     return response; // typed as SomeResponseType
   }

   private async sendPostRequestNew<TPayload, TResponse>(
     payload: TPayload,
     endpoint: string,
   ): Promise<TResponse> {
     const url = `${process.env.API_BASE_URL}${endpoint}`;

     const scopes = 'altinn:authentication/systemregister.write';
     const token = await this.tokenClass.getEnterpriseAltinnToken(scopes);

     console.log(url);

     const response = await fetch(url, {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${token}`,
       },
       body: JSON.stringify(payload),
     });

     if (!response.ok) {
       const errorBody = await response.text();
       console.error(`HTTP Error! Status: ${response.status}, Body: ${errorBody}`);
       throw new Error(`HTTP error! Status: ${response.status}, Body: ${errorBody}`);
     }
     // Cast or assert the response to TResponse
     return (await response.json()) as TResponse;
   }
 }

