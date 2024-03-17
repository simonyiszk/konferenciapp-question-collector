export enum PageRoot {
  admin = 'PAGE_ROOT_ADMIN',
  readonly = 'PAGE_ROOT_READONLY',
}

export namespace PageRoot {
  export function asHref(pageRoot: PageRoot) {
    switch (pageRoot) {
      case PageRoot.admin:
        return '/dashboard';
      case PageRoot.readonly:
        return '/question';
    }
  }
}
