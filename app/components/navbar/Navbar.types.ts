export interface NavLink {
  name: string;
  id: string;
}

export const NAV_LINKS: NavLink[] = [
  { name: "About", id: "about" },
  { name: "The Book", id: "the-book" },
  { name: "Readers", id: "readers" },
  { name: "Author", id: "author" },
];