import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisService {
  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

  public setCache(key: string, value) {
    return this.cache.set(key, value);
  }

  public getCache(key: string) {
    return this.cache.get(key);
  }
}
