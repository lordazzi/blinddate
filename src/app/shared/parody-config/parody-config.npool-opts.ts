import { Injectable } from '@angular/core';
import { NostrFilter, NPoolOpts, NRelay1 } from '@nostrify/nostrify';

@Injectable()
export class ParodyConfigNPoolOpts implements NPoolOpts<NRelay1> {
  
  open(url: string): NRelay1 {
    return new NRelay1(url);
  }

  async reqRouter(filters: NostrFilter[]): Promise<Map<string, NostrFilter[]>> {
    // return new Map([[ 'ws://localhost:7777/', filters ]]);
    return new Map([[ 'wss://relay.nostr.net/', filters ]]);
  }

  async eventRouter(): Promise<string[]> {
    // return [ 'ws://localhost:7777/' ];
    return [ 'wss://relay.nostr.net/' ];
  }
}
