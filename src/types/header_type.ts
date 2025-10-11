export interface CategoryLink {
  slug: string;
  href: string;
  name: string;
  //for subcategory
  children?: CategoryLink[];
}
