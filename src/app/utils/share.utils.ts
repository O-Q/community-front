export function copyToClipboard(str: string) {
  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.setAttribute('style', `position: 'absolute'; left: '-9999px';`);
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
}

export const FEATURES_OPEN_WINDOW_MINI =
  'directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,width=400,height=350';

export enum ShareURL {
  FACEBOOK = 'https://www.facebook.com/sharer/sharer.php?u=',
  TWITTER = 'https://twitter.com/intent/tweet?text=',
  LINKEDIN = 'https://www.linkedin.com/shareArticle?mini=true&url='
}
