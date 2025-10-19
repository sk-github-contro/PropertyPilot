import React, { useState, useEffect } from 'react';
import './App.css';
import PropertyList from './components/PropertyList';
import AddPropertyForm from './components/AddPropertyForm';
import PropertyModal from './components/PropertyModal';
import { getProperties, createProperty } from './services/api';

function App() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [filters, setFilters] = useState({
    type: 'all',
    search: ''
  });

  // Fetch properties on component mount
  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const data = await getProperties(filters);
      setProperties(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch properties');
      console.error('Error fetching properties:', err);
    } finally {
      setLoading(false);
    }
  };

  // Refetch properties when filters change
  useEffect(() => {
    fetchProperties();
  }, [filters]);

  const handleAddProperty = async (propertyData) => {
    try {
      const newProperty = await createProperty(propertyData);
      setProperties([newProperty, ...properties]);
      setShowAddForm(false);
      setError(null);
    } catch (err) {
      setError('Failed to add property');
      console.error('Error adding property:', err);
    }
  };

  const handleViewProperty = (property) => {
    setSelectedProperty(property);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProperty(null);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🏠 Property Pilot</h1>
        <p>Find your perfect property</p>
      </header>

      <main className="App-main">
        {error && (
          <div className="error-message">
            {error}
            <button onClick={() => setError(null)}>×</button>
          </div>
        )}

        <div className="controls">
          <button 
            className="add-property-btn"
            onClick={() => setShowAddForm(!showAddForm)}
          >
            {showAddForm ? 'Cancel' : '+ Add Property'}
          </button>
        </div>

        {showAddForm && (
          <AddPropertyForm 
            onSubmit={handleAddProperty}
            onCancel={() => setShowAddForm(false)}
          />
        )}

        <PropertyList
          properties={properties}
          loading={loading}
          onViewProperty={handleViewProperty}
          filters={filters}
          onFilterChange={handleFilterChange}
        />

        {showModal && selectedProperty && (
          <PropertyModal
            property={selectedProperty}
            onClose={handleCloseModal}
          />
        )}
      </main>
    </div>
  );
}

export default App;