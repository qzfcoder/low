import { createHash } from 'node:crypto';

import { Injectable } from '@nestjs/common';

@Injectable()
export class SecretTool {
  getSecret(data: string) {
    return createHash('md5').update(data).digest('hex');
  }
}
