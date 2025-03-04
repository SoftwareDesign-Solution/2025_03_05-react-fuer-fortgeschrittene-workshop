type CookieUtilsProps = {
    path?: string;
    expires?: Date;
    maxAge?: number;
    domain?: string;
    secure?: boolean;
    httpOnly?: boolean;
    sameSite?: boolean | 'none' | 'lax' | 'strict';
    partitioned?: boolean;
};

const CookieUtils = {
    get: (name: string) => {
      const cookies = document.cookie.split("; ");
      for (const cookie of cookies) {
        const [key, value] = cookie.split("=");
        if (key === name) return decodeURIComponent(value);
      }
      return undefined;
    },
  
    set: (name: string, value: unknown, options: CookieUtilsProps = {}) => {
      let cookieString = `${name}=${encodeURIComponent(JSON.stringify(value))}; path=/`;
  
      if (options.expires) {
        cookieString += `; expires=${options.expires.toUTCString()}`;
      }
      
      if (options.secure) {
        cookieString += "; Secure";
      }
  
      if (options.sameSite) {
        cookieString += `; SameSite=${options.sameSite}`;
      }
      
      console.log(cookieString);

      document.cookie = cookieString;
    },
  
    remove: (name: string) => {
      document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    }
  };
  
  export { CookieUtils };
  