import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello Mongose!';
  }

  getHello2(): string {
    return 'Hello NodeJS!';
  }

  getHello3(): string {
    return 'Hello JavaScript! 55555';
  }
}
