export function getCookie(name: string): string | undefined {
    const matches: RegExpMatchArray | null = document.cookie.match(
        new RegExp('(?:^|; )' + name.replace(/([$?*|{}()[\]\\/+^])/g, '$1') + '=([^;]*)')
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }
  
  export function setCookie(name: string, value: string | null,time: number, props?:any ) {
    props = props || {};
    let exp = props.expires || new Date(Date.now() + 1000 * 60 * time);
    if (typeof exp == 'number' && exp) {
      const d = new Date();
      d.setTime(d.getTime() + exp * 1000);
      exp = props.expires = d;
    }
    if (exp && exp.toUTCString) {
      props.expires = exp.toUTCString();
    }
    value = value !== null ? encodeURIComponent(value) : null;
    
    let updatedCookie: string = name + '=' + value;
    for (const propName in props) {
      updatedCookie += '; ' + propName;
      const propValue = props[propName];
      if (propValue !== true) {
        updatedCookie += '=' + propValue;
      }
    }
    document.cookie = updatedCookie;
  }
  
  export function deleteCookie(name:string) {
    setCookie(name, null,0,{ expires: -1 });
  }