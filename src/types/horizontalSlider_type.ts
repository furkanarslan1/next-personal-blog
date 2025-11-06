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
  _count?: {
    likes: number;
    comments: number;
  };
}
export interface HorizontalSliderProps {
  sliderItem: HorizontalSliderItem[];
}
