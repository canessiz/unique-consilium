export type NavLink = { text: string; href: string };
export type NavGroup = { title: string; items: NavLink[] };

const GROUPS: { title: string; keys: string[] }[] = [
  { title: 'Explore', keys: ['Overview', 'Consulting', 'Agents'] },
  { title: 'Products & Models', keys: ['watsonx', 'Granite models'] },
  { title: 'Research, Ethics & Security', keys: ['Research', 'Ethics and governance', 'Security'] },
];

export function groupIbmAiLinks(items: NavLink[]): NavGroup[] {
  const used = new Set<number>();
  const groups: NavGroup[] = GROUPS.map((g) => ({ title: g.title, items: [] }));

  // Preserve original order
  items.forEach((item, idx) => {
    for (let i = 0; i < GROUPS.length; i++) {
      if (GROUPS[i].keys.includes(item.text)) {
        groups[i].items.push(item);
        used.add(idx);
        return;
      }
    }
  });

  // Unmatched -> More
  const more: NavGroup = { title: 'More', items: [] };
  items.forEach((item, idx) => { if (!used.has(idx)) more.items.push(item); });
  if (more.items.length) groups.push(more);
  return groups.filter((g) => g.items.length);
}
