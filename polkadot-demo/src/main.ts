/**
 * examples from
 * https://polkadot.js.org/docs/api/examples/promise/listen-to-balance-change
 * https://polkadot.js.org/docs/api/examples/promise/transfer-events
 * https://polkadot.js.org/docs/api/examples/promise/make-transfer
 */

// @ts-ignore
let prevTime = window.now || Date.now();

const logTime = (label = 'no label') => {
    const now = Date.now();
    console.log(`${now - prevTime}: ${label}`);
    prevTime = now;
};

// Import the API
import { cryptoWaitReady } from '@polkadot/util-crypto';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { Keyring } from '@polkadot/keyring';

// Some constants we are using in this sample
const ALICE = '//Alice';
const BOB_ADDRESS = '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty'
const AMOUNT = 10000;
const WS_URL = 'wss://ws-rc.unique.network';

async function main () {
    logTime('main() start');

    await cryptoWaitReady();

    logTime('crypto ready');

    // Construct the keyring after the API (crypto has an async init)
    const keyring = new Keyring({ type: 'sr25519' });

    // Add Alice to our keyring with a hard-derivation path (empty phrase, so uses dev)
    const alice = keyring.addFromUri(ALICE);

    logTime('Alice added to keyring');

    // Create an await for the API
    const provider = new WsProvider(WS_URL);
    const api = await ApiPromise.create({ provider });

    logTime('api created');

    // Retrieve the initial balance. Since the call has no callback, it is simply a promise
    // that resolves to the current on-chain value
    // @ts-ignore
    let { data: { free: previousFree }, nonce: previousNonce } = await api.query.system.account(alice.address);

    console.log(`Alice has a balance of ${previousFree}, nonce ${previousNonce}`);

    logTime('Alice data retrieved');

    // Create a extrinsic, transferring 12345 units to Bob
    const transfer = api.tx.balances.transfer(BOB_ADDRESS, AMOUNT);

    // Sign and send the transaction using our account
    const hash = await transfer.signAndSend(alice, { nonce: previousNonce + 1 });

    console.log('Transfer sent with hash', hash.toHex());

    logTime('transfer sent');
}

main().catch(console.error);
