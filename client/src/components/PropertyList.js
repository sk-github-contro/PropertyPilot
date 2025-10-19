import React from 'react';
import PropertyCard from './PropertyCard';
import PropertyFilters from './PropertyFilters';
import './PropertyList.css';

const PropertyList = ({ 
  properties, 
  loading, 
  onViewProperty, 
  filters, 
  onFilterChange 
}) => {
  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading properties...</p>
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="no-properties">
        <h3>No properties found</h3>
        <p>Try adjusting your search criteria or add a new property.</p>
      </div>
    );
  }

  return (
    <div className="property-list">
      <PropertyFilters 
        filters={filters}
        onFilterChange={onFilterChange}
      />
      
      <div className="property-grid">
        {properties.map((property) => (
          <PropertyCard
            key={property._id}
            property={property}
            onView={() => onViewProperty(property)}
          />
        ))}
      </div>
    </div>
  );
};

export default PropertyList;
