# Property Pilot 🏠

A full-stack React application for property listings with Express backend and MongoDB database.

## Features

- **Property Listings**: View all properties in a beautiful card layout
- **Search & Filter**: Filter by property type and search by name or location
- **Add Properties**: Create new property listings with detailed information
- **Property Details**: View detailed property information in a modal
- **Google Maps Integration**: View property locations on embedded maps
- **Responsive Design**: Works perfectly on desktop and mobile devices

## Tech Stack

### Frontend
- React 18
- CSS3 with modern styling
- Axios for API calls

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- CORS enabled

## Prerequisites

Before running this application, make sure you have:

- Node.js (v14 or higher)
- MongoDB (running locally or MongoDB Atlas)
- npm or yarn

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd PropertyPilot
   ```

2. **Install all dependencies**
   ```bash
   npm run install-all
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the `server` directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/propertypilot
   NODE_ENV=development
   ```

4. **Start MongoDB**
   
   Make sure MongoDB is running on your system:
   ```bash
   # If using local MongoDB
   mongod
   
   # Or if using MongoDB as a service
   brew services start mongodb-community
   ```

5. **Seed the database (optional)**
   ```bash
   cd server
   node seed.js
   ```

## Running the Application

### Development Mode

Run both frontend and backend concurrently:
```bash
npm run dev
```

This will start:
- Backend server on http://localhost:5000
- React app on http://localhost:3000

### Individual Services

**Backend only:**
```bash
npm run server
```

**Frontend only:**
```bash
npm run client
```

## API Endpoints

### Properties
- `GET /api/properties` - Get all properties (supports query parameters: `type`, `search`)
- `GET /api/properties/:id` - Get single property
- `POST /api/properties` - Create new property
- `PUT /api/properties/:id` - Update property
- `DELETE /api/properties/:id` - Delete property

### Health Check
- `GET /api/health` - API health status

## Project Structure

```
PropertyPilot/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── services/       # API service layer
│   │   └── App.js         # Main App component
│   └── package.json
├── server/                 # Express backend
│   ├── config/            # Database configuration
│   ├── models/            # Mongoose models
│   ├── routes/            # API routes
│   ├── index.js           # Server entry point
│   ├── seed.js            # Database seeding script
│   └── package.json
├── package.json           # Root package.json
└── README.md
```

## Usage

1. **View Properties**: The app loads with all available properties displayed as cards
2. **Search**: Use the search bar to find properties by name or location
3. **Filter**: Use the dropdown to filter by property type
4. **Add Property**: Click "Add Property" to create a new listing
5. **View Details**: Click "View Details" on any property card to see full information
6. **Map View**: Properties with coordinates will show an embedded Google Map

## Sample Data

The application comes with sample properties including:
- Modern Downtown Apartment
- Charming Victorian House
- Luxury Waterfront Condo
- Cozy Studio Apartment
- Family Townhouse
- Elegant Villa

## Customization

### Adding New Property Types
Edit the `propertyTypes` array in:
- `client/src/components/PropertyFilters.js`
- `client/src/components/AddPropertyForm.js`
- `server/models/Property.js` (enum values)

### Styling
All CSS files are modular and can be customized:
- `client/src/App.css` - Global styles
- `client/src/components/*.css` - Component-specific styles

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check the connection string in `.env`
   - Verify MongoDB is accessible on the specified port

2. **CORS Issues**
   - The backend has CORS enabled for all origins in development
   - For production, configure specific origins

3. **Port Conflicts**
   - Backend runs on port 5000 by default
   - Frontend runs on port 3000 by default
   - Change ports in respective package.json files if needed

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For support or questions, please open an issue in the repository.
