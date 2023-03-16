import { cryptoWaitReady } from '@polkadot/util-crypto';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { Keyring } from '@polkadot/keyring';

import type { KeyringPair } from '@polkadot/keyring/types';

import type { Sample } from "./types";

export class PolkadotSample implements Sample {
    private api: ApiPromise;
    private aliceKeyringPair: KeyringPair;

    constructor(
        readonly alice = '//Alice',
        readonly bobAddress = '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty',
        readonly amount = 10_000,
        readonly url = 'wss://ws-rc.unique.network',
    ) {}

    async initialized(): Promise<void> {
        await cryptoWaitReady();
        this.api = await ApiPromise.create({ provider: new WsProvider(this.url) });

        console.log('API created');
    }

    aliceAddressReady() {
        const keyring = new Keyring({ type: 'sr25519' });

        this.aliceKeyringPair = keyring.addFromUri(this.alice);

        console.log(`Alice address is ${this.aliceKeyringPair.address}`);
    }

    async alicaBalanceRetrieved(): Promise<void> {
        const accountData = await this.api.query.system.account(this.aliceKeyringPair.address);
        const { data: { free } } = accountData as any;

        console.log(`Alice has a balance of ${free}`);
    }

    async transferSent(): Promise<void> {
        const transfer = this.api.tx.balances.transfer(this.bobAddress, this.amount);

        const tx = await transfer.signAndSend(this.aliceKeyringPair, { nonce: -1 });

        console.log('Transfer sent with hash', tx.toHex());
    }
}