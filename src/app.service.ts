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
    return 'Hello JavaScript! 123456789';
  }

  getHello4(): string {
    return 'Hello 4';
  }
}
