import { TestdataApi } from "playwright/util/TestdataApi";

async function globalTeardown() {
  console.log('Kjører global opprydding...');
  await TestdataApi.cleanUpTestUsers();
}

export default globalTeardown;