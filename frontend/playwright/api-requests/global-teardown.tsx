import { FullConfig } from "@playwright/test";
import { TestdataApi } from "playwright/util/TestdataApi";

async function globalTeardown(config: FullConfig) {
  console.log('Kjører global opprydding...');
  await TestdataApi.cleanUpTestUsers();
}

export default globalTeardown;