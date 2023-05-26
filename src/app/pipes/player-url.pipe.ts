import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
  name: 'playerUrl',
  standalone: true
})

export class PlayerUrlPipe implements PipeTransform {
  constructor(private readonly sanitizer: DomSanitizer) {
  }
  transform(url: string): SafeResourceUrl {
    const domain = (new URL(url));
    const domainName = domain.hostname.replace('www.','');

    let playerUrl;

    switch (domainName) {
      case 'cda.pl': {
        const regex = /(?:https?:\/\/)?(?:www\.)?cda\.pl\/video\/(.+?)($|\/)/;
        const match = url.match(regex);
        if (match) {
          const videoId = match[1];
          playerUrl = `https://ebd.cda.pl/1080x720/${videoId}`;
        }
        break
      }
      default: {
        playerUrl = url
      }
    }

    return this.sanitizer.bypassSecurityTrustResourceUrl(playerUrl);
  }
}