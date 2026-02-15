import { Injectable } from '@angular/core';
import { Gender } from '../../domain/gender.enum';

@Injectable()
export class HeaderTitleFactory {

  private [Gender.MALE] = ['guy','man','mister','potential husband', 'potential boyfriend'];
  private [Gender.FEMALE] = ['lady','woman','potential wife', 'potential girlfriend'];
  private both = ['crush', 'match'];
  private advice = ['kind','nice','fine','pretty','cool','tender','lovely','good','friendly','awesome','great','gentle','gracious'];

  getTitle(genderFound: Gender): {
      who: string,
      adjective: string
    } {
    const whos = new Array<string>().concat(this[genderFound]).concat(this.both);
    const who = whos[Math.floor(Math.random() * whos.length)];
    const adjective = this.advice[Math.floor(Math.random() * this.advice.length)];

    return {
      who,
      adjective
    };
  }
}
