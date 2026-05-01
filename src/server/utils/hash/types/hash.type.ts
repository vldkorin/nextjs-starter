import type { EncyptedDataResponse } from "./encryption-data-response.type";

type Hash = {
  encrypt(data: string): Promise<EncyptedDataResponse>;
};

export { type Hash };
