import { Sdk } from '@unique-nft/sdk';
import type { Client } from '@unique-nft/sdk';
import { Account } from '@unique-nft/sr25519'

import type { Sample } from "./types";

export class SdkSample implements Sample {
    private sdk: Client;
    private aliceAccount: any;

    constructor(
        readonly alice = '//Alice',
        readonly bobAddress = '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty',
        readonly amount = 10_000,
        readonly url = 'https://rest.dev.uniquenetwork.dev/v1',
    ) {}

    async initialized(): Promise<void> {
        this.sdk = new Sdk({ baseUrl: this.url });

        console.log('API created');
    }

    aliceAddressReady() {
        this.aliceAccount = Account.fromUri(this.alice);

        console.log(`Alice address is ${this.aliceAccount.address}`);
    }

    async alicaBalanceRetrieved(): Promise<void> {
        const { freeBalance } = await this.sdk.balance.get({ address: this.aliceAccount.address });

        console.log(`Alice has a balance of ${freeBalance.formatted}`);
    }

    async transferSent(): Promise<void> {
        await this.sdk.balance.transfer.submit({
            address: this.aliceAccount.address,
            amount: this.amount,
            destination: this.bobAddress,
        }, { signer: this.aliceAccount.signer });
    }
}