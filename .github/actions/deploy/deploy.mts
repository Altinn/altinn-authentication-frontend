import { $, chalk } from 'npm:zx';

const containerAppName = Deno.env.get('NAME');
const containerName = Deno.env.get('CONTAINER_NAME');
const resourceGroup = Deno.env.get('RESOURCE_GROUP');
const image = Deno.env.get('IMAGE');

const latestRevision = await updateContainerImage();
console.log(`new revision: ${chalk.cyan(latestRevision)}`);

let healthy = false;
for (let i = 0; i < 15; i++) {
    if (i > 0) {
        console.log(`Not healty yet (${i}), waiting 30 seconds...`);
        await new Promise((resolve) => setTimeout(resolve, 30_000));
    }

    const healthState = await getRevisionHealthState(latestRevision);
    console.log(`revision health state: ${healthStateDisplay(healthState)}`);
    if (healthState === 'Healthy') {
        console.log('Health state is healthy');
        healthy = true;
        break;
    }
}

if (!healthy) {
    console.log('Health state is not healthy');
    Deno.exit(1);
}

async function updateContainerImage() {
    console.log(`Updating container image to ${chalk.cyan(image)}...`);
    const output = await $`az containerapp update \
    --name ${containerAppName} \
    --resource-group ${resourceGroup} \
    --container-name ${containerName} \
    --image ${image}`.quiet();
    console.log('Done.');

    const parsed = JSON.parse(output.stdout);
    // console.log(parsed);
    return parsed.properties.latestRevisionName;
}

async function getRevisionHealthState(revisionName: string) {
    const output = await $`az containerapp revision show \
    --name ${containerAppName} \
    --resource-group ${resourceGroup} \
    --revision ${revisionName}`.quiet();
    const parsed = JSON.parse(output.stdout);
    return parsed.properties.healthState;
}

function healthStateDisplay(state: string) {
    switch (state) {
        case 'Healthy':
            return chalk.green(state);
        case 'Unhealthy':
            return chalk.red(state);
        default:
            return chalk.cyan(state);
    }
}