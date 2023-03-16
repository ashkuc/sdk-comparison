import { Sdk } from '@unique-nft/sdk';
import { Account } from '@unique-nft/sr25519'

// @ts-ignore
let prevTime = window.now || Date.now();

const logTime = (label = 'no label') => {
    const now = Date.now();
    console.log(`${now - prevTime}: ${label}`);
    prevTime = now;
};

const ALICE = '//Alice';
const BOB_ADDRESS = '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty'
const AMOUNT = 10000;
const ENDPOINT = 'https://rest.dev.uniquenetwork.dev/v1';

const main = async () => {
    logTime('main() start');

    const alice = Account.fromUri(ALICE)

    logTime('Alice account ready');

    const sdk = new Sdk({ baseUrl: ENDPOINT });

    logTime('sdk initialized');

    const [{ freeBalance: { formatted } }, { nonce }] = await Promise.all([
        sdk.balance.get({ address: alice.address }),
        sdk.common.getNonce({ address: alice.address }),
    ]);

    console.log(`Alice has a balance of ${formatted}, nonce ${nonce}`);

    logTime('Alice data retrieved');

    const tx = await sdk.balance.transfer.submit(
        { address: alice.address, amount: AMOUNT, destination: BOB_ADDRESS },
        { signer: alice.signer },
    );

    logTime('transfer sent');

    console.log(`Transfer sent with hash ${tx.hash}`);
}

main().catch(console.error);
