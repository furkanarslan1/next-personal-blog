export interface HorizontalSliderItem {
  id: string;
  title: string;
  imageUrl: string | null;
  slug: string;
  category: {
    id: string;
    name: string;
    slug: string;
  } | null;
}
export interface HorizontalSliderProps {
  sliderItem: HorizontalSliderItem[];
}
