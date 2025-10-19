import React from 'react';
import './PropertyModal.css';

const PropertyModal = ({ property, onClose }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getPropertyTypeIcon = (type) => {
    const icons = {
      'Apartment': '🏢',
      'House': '🏠',
      'Condo': '🏘️',
      'Townhouse': '🏘️',
      'Studio': '🏠',
      'Villa': '🏰'
    };
    return icons[type] || '🏠';
  };

  const hasCoordinates = property.coordinates && 
    (property.coordinates.lat !== 0 || property.coordinates.lng !== 0);

  const getGoogleMapsUrl = () => {
    if (!hasCoordinates) return null;
    return `https://www.google.com/maps?q=${property.coordinates.lat},${property.coordinates.lng}`;
  };

  return (
    <div className="property-modal-overlay" onClick={onClose}>
      <div className="property-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{property.name}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="modal-content">
          <div className="property-image-section">
            <img 
              src={property.image} 
              alt={property.name}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/600x400?text=Property+Image';
              }}
            />
            <div className="property-type-badge">
              {getPropertyTypeIcon(property.type)} {property.type}
            </div>
          </div>

          <div className="property-details-section">
            <div className="price-section">
              <div className="property-price">{formatPrice(property.price)}</div>
              <div className="property-location">
                📍 {property.location}
              </div>
            </div>

            <div className="description-section">
              <h3>Description</h3>
              <p>{property.description}</p>
            </div>

            {(property.bedrooms > 0 || property.bathrooms > 0 || property.area > 0) && (
              <div className="specifications-section">
                <h3>Specifications</h3>
                <div className="specs-grid">
                  {property.bedrooms > 0 && (
                    <div className="spec-item">
                      <span className="spec-icon">🛏️</span>
                      <div className="spec-details">
                        <div className="spec-value">{property.bedrooms}</div>
                        <div className="spec-label">Bedroom{property.bedrooms !== 1 ? 's' : ''}</div>
                      </div>
                    </div>
                  )}
                  
                  {property.bathrooms > 0 && (
                    <div className="spec-item">
                      <span className="spec-icon">🚿</span>
                      <div className="spec-details">
                        <div className="spec-value">{property.bathrooms}</div>
                        <div className="spec-label">Bathroom{property.bathrooms !== 1 ? 's' : ''}</div>
                      </div>
                    </div>
                  )}
                  
                  {property.area > 0 && (
                    <div className="spec-item">
                      <span className="spec-icon">📐</span>
                      <div className="spec-details">
                        <div className="spec-value">{property.area.toLocaleString()}</div>
                        <div className="spec-label">Sq Ft</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {hasCoordinates && (
              <div className="map-section">
                <h3>Location</h3>
                <div className="map-container">
                  <iframe
                    src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dOWWgTfEah0xlI&q=${property.coordinates.lat},${property.coordinates.lng}`}
                    width="100%"
                    height="200"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Map of ${property.name}`}
                  />
                  <a 
                    href={getGoogleMapsUrl()} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="view-on-maps-btn"
                  >
                    View on Google Maps
                  </a>
                </div>
              </div>
            )}

            <div className="property-meta">
              <div className="meta-item">
                <span className="meta-label">Added:</span>
                <span className="meta-value">
                  {new Date(property.createdAt).toLocaleDateString()}
                </span>
              </div>
              {property.updatedAt !== property.createdAt && (
                <div className="meta-item">
                  <span className="meta-label">Updated:</span>
                  <span className="meta-value">
                    {new Date(property.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyModal;
