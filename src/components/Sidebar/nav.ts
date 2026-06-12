export interface NavPage {
  href: string;
  title: string;
  icon?: string;
  tag?: string;
  api?: string;
  deprecated?: boolean;
}

export interface NavGroup {
  group: string;
  pages: NavEntry[];
  icon?: string;
  tag?: string;
}

export type NavEntry = NavPage | NavGroup;
export type NavNode = Record<string, unknown>;

export interface TabInfo {
  name: string;
  href: string;
  isActive: boolean;
}

const divisionKeys = ['versions', 'languages', 'tabs', 'dropdowns'] as const;

export function isNavPage(entry: NavEntry): entry is NavPage {
  return 'href' in entry && 'title' in entry;
}

export function isNavGroup(entry: NavEntry): entry is NavGroup {
  return 'group' in entry && 'pages' in entry;
}

function normalizePath(path: string) {
  let normalized = path.replaceAll('\\', '/');
  if (normalized.length > 1 && normalized.endsWith('/')) {
    normalized = normalized.slice(0, -1);
  }
  return normalized;
}

export function containsPath(entries: NavEntry[], path: string): boolean {
  const normalized = normalizePath(path);

  return entries.some((entry) =>
    isNavPage(entry)
      ? normalizePath(entry.href) === normalized
      : isNavGroup(entry) && containsPath(entry.pages, normalized),
  );
}

export function unwrapNav(nav: NavNode, currentPath: string): NavEntry[] {
  const groups = nav.groups;
  if (Array.isArray(groups)) return groups as NavEntry[];

  const pages = nav.pages;
  if (Array.isArray(pages) && !nav.group) return pages as NavEntry[];

  for (const key of divisionKeys) {
    const divisionArr = nav[key];
    if (!Array.isArray(divisionArr)) continue;

    for (const division of divisionArr) {
      const entries = unwrapNav(division as NavNode, currentPath);
      if (entries.length > 0 && containsPath(entries, currentPath)) {
        return entries;
      }
    }

    if (divisionArr.length > 0) {
      return unwrapNav(divisionArr[0] as NavNode, currentPath);
    }
  }

  return [];
}
