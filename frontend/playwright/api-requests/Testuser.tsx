import path from "path";

export class Testuser {
  scopes: string;
  pid: string;
  userId: string;
  altinnPartyId: string;

  constructor(scopes: string, pid: string, userId: string, altinnPartyId: string) {
    this.scopes = scopes;
    this.pid = pid;
    this.userId = userId;
    this.altinnPartyId = altinnPartyId;
  }

   loadTestUsers(environment: string): Testuser[] {
    const filePath = path.resolve(__dirname, `testusers.${environment}.json`);
    const data = require('fs').readFileSync(filePath, 'utf-8');
    const users = JSON.parse(data) as Testuser[]; // Assuming the JSON structure matches Testuser
    return users;
  }

  
}