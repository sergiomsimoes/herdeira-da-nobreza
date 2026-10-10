export type Testimonial = {
  id: string;
  image: string;
  alt: string;
  publicName: string;
  order: number;
  approved: boolean;
};

// Inclua somente imagens anonimizadas e com autorização de publicação.
export const testimonials: Testimonial[] = [];
