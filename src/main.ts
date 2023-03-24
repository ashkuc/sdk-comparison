import { Sample } from "./types";

const textarea = document.querySelector<HTMLTextAreaElement>('#log');

function log(...args) {
    if(args.length) textarea.value += Date.now().toString() + ': ';

    textarea.value += args.map((a) => a.toString()).join('\n');
    textarea.value += '\n';
}

async function runSample(sample: Sample, time = Date.now()): Promise<void> {
    await sample.initialized();

    log(`Sample initialized in ${Date.now() - time}ms`);
    time = Date.now();

    await sample.aliceAddressReady();

    log(`Alice address ready in ${Date.now() - time}ms`);
    time = Date.now();

    await sample.alicaBalanceRetrieved();

    log(`Alice balance retrieved in ${Date.now() - time}ms`);
    time = Date.now();

    await sample.transferSent();

    log(`Transfer sent in ${Date.now() - time}ms`);
    time = Date.now();
}

document.querySelector('#polkadot').addEventListener('click', async function () {
    log();
    log('Polkadot');
    const now = Date.now();
    const { PolkadotSample } = (await import('./polkadot.sample'));

    await runSample(new PolkadotSample(), now);

    log(`Total time: ${Date.now() - now}ms`);
}, false);

document.querySelector('#sdk').addEventListener('click', async function () {
    log();
    log('SDK');
    const now = Date.now();
    const { SdkSample } = (await import('./sdk.sample'));

    await runSample(new SdkSample(), now);
    log(`Total time: ${Date.now() - now}ms`);
}, false);