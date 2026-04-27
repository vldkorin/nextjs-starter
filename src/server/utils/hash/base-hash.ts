import bcrypt from "bcryptjs";

import type { EncyptedDataResponse, Hash } from "./types/types";

type Constructor = {
  saltRounds: number;
};

class BaseHash implements Hash {
  private readonly saltRounds: number;

  public constructor({ saltRounds }: Constructor) {
    this.saltRounds = saltRounds;
  }

  public async encrypt(data: string): Promise<EncyptedDataResponse> {
    const salt = await bcrypt.genSalt(this.saltRounds);
    const encryptedData = await bcrypt.hash(data, salt);

    return { encryptedData, salt };
  }
}

export { BaseHash };
