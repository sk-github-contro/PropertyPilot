const mongoose = require('mongoose');
const Property = require('./models/Property');
require('dotenv').config();

const sampleProperties = [
  {
    name: "Modern Downtown Apartment",
    type: "Apartment",
    price: 450000,
    location: "Downtown Seattle, WA",
    description: "Beautiful modern apartment in the heart of downtown Seattle. Features floor-to-ceiling windows with stunning city views, open-concept living space, and premium finishes throughout. Walking distance to restaurants, shopping, and public transportation.",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop",
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    coordinates: { lat: 47.6062, lng: -122.3321 }
  },
  {
    name: "Charming Victorian House",
    type: "House",
    price: 750000,
    location: "Queen Anne, Seattle, WA",
    description: "Stunning Victorian house with original character and modern updates. Features hardwood floors, high ceilings, updated kitchen with granite counters, and a beautiful garden. Perfect for families looking for space and charm.",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop",
    bedrooms: 4,
    bathrooms: 3,
    area: 2800,
    coordinates: { lat: 47.6231, lng: -122.3563 }
  },
  {
    name: "Luxury Waterfront Condo",
    type: "Condo",
    price: 1200000,
    location: "Belltown, Seattle, WA",
    description: "Exclusive waterfront condo with panoramic views of Puget Sound and the Olympic Mountains. Features premium appliances, marble countertops, private balcony, and access to building amenities including gym and concierge.",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&h=400&fit=crop",
    bedrooms: 3,
    bathrooms: 2,
    area: 1800,
    coordinates: { lat: 47.6140, lng: -122.3390 }
  },
  {
    name: "Cozy Studio Apartment",
    type: "Studio",
    price: 280000,
    location: "Capitol Hill, Seattle, WA",
    description: "Perfect starter home or investment property. This studio features an open layout, large windows, updated kitchen, and in-unit laundry. Located in a vibrant neighborhood with great nightlife and dining options.",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=400&fit=crop",
    bedrooms: 0,
    bathrooms: 1,
    area: 550,
    coordinates: { lat: 47.6205, lng: -122.3212 }
  },
  {
    name: "Family Townhouse",
    type: "Townhouse",
    price: 650000,
    location: "Ballard, Seattle, WA",
    description: "Spacious townhouse perfect for families. Features three levels, private garage, small backyard, and modern finishes. Located in a quiet neighborhood with excellent schools and parks nearby.",
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&h=400&fit=crop",
    bedrooms: 3,
    bathrooms: 2.5,
    area: 1900,
    coordinates: { lat: 47.6689, lng: -122.3760 }
  },
  {
    name: "Elegant Villa",
    type: "Villa",
    price: 1500000,
    location: "Mercer Island, WA",
    description: "Stunning villa with Mediterranean architecture and modern amenities. Features a gourmet kitchen, wine cellar, home theater, and beautifully landscaped grounds with pool and outdoor kitchen.",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&h=400&fit=crop",
    bedrooms: 5,
    bathrooms: 4,
    area: 4200,
    coordinates: { lat: 47.5707, lng: -122.2221 }
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/propertypilot');
    console.log('Connected to MongoDB');

    // Clear existing properties
    await Property.deleteMany({});
    console.log('Cleared existing properties');

    // Insert sample properties
    const insertedProperties = await Property.insertMany(sampleProperties);
    console.log(`Inserted ${insertedProperties.length} properties`);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seed function
seedDatabase();
