import React, { useState } from 'react';
import './AddPropertyForm.css';

const AddPropertyForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'Apartment',
    price: '',
    location: '',
    description: '',
    image: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    coordinates: {
      lat: '',
      lng: ''
    }
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const propertyTypes = [
    'Apartment', 'House', 'Condo', 'Townhouse', 'Studio', 'Villa'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'lat' || name === 'lng') {
      setFormData(prev => ({
        ...prev,
        coordinates: {
          ...prev.coordinates,
          [name]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Property name is required';
    }

    if (!formData.price || formData.price <= 0) {
      newErrors.price = 'Valid price is required';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (formData.bedrooms && (formData.bedrooms < 0 || !Number.isInteger(Number(formData.bedrooms)))) {
      newErrors.bedrooms = 'Bedrooms must be a positive integer';
    }

    if (formData.bathrooms && (formData.bathrooms < 0 || !Number.isInteger(Number(formData.bathrooms)))) {
      newErrors.bathrooms = 'Bathrooms must be a positive integer';
    }

    if (formData.area && formData.area <= 0) {
      newErrors.area = 'Area must be positive';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare data for submission
      const submitData = {
        ...formData,
        price: Number(formData.price),
        bedrooms: formData.bedrooms ? Number(formData.bedrooms) : 0,
        bathrooms: formData.bathrooms ? Number(formData.bathrooms) : 0,
        area: formData.area ? Number(formData.area) : 0,
        coordinates: {
          lat: formData.coordinates.lat ? Number(formData.coordinates.lat) : 0,
          lng: formData.coordinates.lng ? Number(formData.coordinates.lng) : 0
        }
      };

      await onSubmit(submitData);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="add-property-form-container">
      <div className="add-property-form">
        <div className="form-header">
          <h2>Add New Property</h2>
          <button className="close-btn" onClick={onCancel}>×</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Property Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? 'error' : ''}
                placeholder="Enter property name"
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="type">Property Type *</label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
              >
                {propertyTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="price">Price *</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className={errors.price ? 'error' : ''}
                placeholder="Enter price in USD"
                min="0"
                step="1000"
              />
              {errors.price && <span className="error-message">{errors.price}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="location">Location *</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className={errors.location ? 'error' : ''}
                placeholder="Enter location"
              />
              {errors.location && <span className="error-message">{errors.location}</span>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={errors.description ? 'error' : ''}
              placeholder="Enter property description"
              rows="4"
            />
            {errors.description && <span className="error-message">{errors.description}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="bedrooms">Bedrooms</label>
              <input
                type="number"
                id="bedrooms"
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleChange}
                className={errors.bedrooms ? 'error' : ''}
                placeholder="Number of bedrooms"
                min="0"
              />
              {errors.bedrooms && <span className="error-message">{errors.bedrooms}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="bathrooms">Bathrooms</label>
              <input
                type="number"
                id="bathrooms"
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleChange}
                className={errors.bathrooms ? 'error' : ''}
                placeholder="Number of bathrooms"
                min="0"
                step="0.5"
              />
              {errors.bathrooms && <span className="error-message">{errors.bathrooms}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="area">Area (sq ft)</label>
              <input
                type="number"
                id="area"
                name="area"
                value={formData.area}
                onChange={handleChange}
                className={errors.area ? 'error' : ''}
                placeholder="Area in square feet"
                min="0"
              />
              {errors.area && <span className="error-message">{errors.area}</span>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="image">Image URL</label>
            <input
              type="url"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="Enter image URL (optional)"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="lat">Latitude</label>
              <input
                type="number"
                id="lat"
                name="lat"
                value={formData.coordinates.lat}
                onChange={handleChange}
                placeholder="Latitude (optional)"
                step="any"
              />
            </div>

            <div className="form-group">
              <label htmlFor="lng">Longitude</label>
              <input
                type="number"
                id="lng"
                name="lng"
                value={formData.coordinates.lng}
                onChange={handleChange}
                placeholder="Longitude (optional)"
                step="any"
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="button" onClick={onCancel} className="cancel-btn">
              Cancel
            </button>
            <button 
              type="submit" 
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Adding...' : 'Add Property'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPropertyForm;
