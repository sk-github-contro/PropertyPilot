import React from 'react';
import './PropertyFilters.css';

const PropertyFilters = ({ filters, onFilterChange }) => {
  const propertyTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'Apartment', label: 'Apartment' },
    { value: 'House', label: 'House' },
    { value: 'Condo', label: 'Condo' },
    { value: 'Townhouse', label: 'Townhouse' },
    { value: 'Studio', label: 'Studio' },
    { value: 'Villa', label: 'Villa' }
  ];

  const handleTypeChange = (e) => {
    onFilterChange({ type: e.target.value });
  };

  const handleSearchChange = (e) => {
    onFilterChange({ search: e.target.value });
  };

  return (
    <div className="property-filters">
      <div className="filter-group">
        <label htmlFor="search">Search Properties</label>
        <input
          type="text"
          id="search"
          placeholder="Search by name or location..."
          value={filters.search}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>

      <div className="filter-group">
        <label htmlFor="type">Property Type</label>
        <select
          id="type"
          value={filters.type}
          onChange={handleTypeChange}
          className="type-select"
        >
          {propertyTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default PropertyFilters;
