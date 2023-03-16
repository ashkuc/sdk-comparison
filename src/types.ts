export interface Sample {
    initialized(): Promise<void>;
    aliceAddressReady(): void;
    alicaBalanceRetrieved(): Promise<void>;
    transferSent(): Promise<void>;
}
