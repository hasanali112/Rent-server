import z from 'zod';

const createHouseRentValidation = z.object({
  title: z.string({ message: 'Title is required' }),
  description: z.string({ message: 'Description is required' }),
  price: z.number({ message: 'Price is required' }),
  propertyType: z.enum(['Apartment', 'House', 'Studio', 'Duplex', 'Penthouse']),
  bedrooms: z.number({ message: 'Bedrooms is required' }),
  bathrooms: z.number({ message: 'Bathrooms is required' }),
  size: z.number({ message: 'Size is required' }),
  floor: z.string({ message: 'Floor is required' }),
  totalFloors: z.number({ message: 'Total floors is required' }),
  furnishing: z.enum(['Furnished', 'Semi_Furnished', 'Unfurnished']),
  availableFrom: z.string({ message: 'Available from date is required' }),
  address: z.string({ message: 'Address is required' }),
  area: z.string({ message: 'Area is required' }),
  city: z.string({ message: 'City is required' }),
  division: z.string({ message: 'Division is required' }),
  lat: z.number({ message: 'Latitude is required' }),
  lng: z.number({ message: 'Longitude is required' }),
  categoryId: z.string({ message: 'Category ID is required' }),
  ownerId: z.string({ message: 'Owner ID is required' }),
});

const updateHouseRentValidation = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  price: z.number().optional(),
  propertyType: z
    .enum(['Apartment', 'House', 'Studio', 'Duplex', 'Penthouse'])
    .optional(),
  bedrooms: z.number().optional(),
  bathrooms: z.number().optional(),
  size: z.number().optional(),
  floor: z.string().optional(),
  totalFloors: z.number().optional(),
  furnishing: z.enum(['Furnished', 'Semi_Furnished', 'Unfurnished']).optional(),
  availableFrom: z.string().optional(),
  address: z.string().optional(),
  area: z.string().optional(),
  city: z.string().optional(),
  division: z.string().optional(),
  lat: z.number().optional(),
  lng: z.number().optional(),
  categoryId: z.string().optional(),
  ownerId: z.string().optional(),
  isAvailable: z.boolean().optional(),
});

export const HouseRentValidation = {
  createHouseRentValidation,
  updateHouseRentValidation,
};
