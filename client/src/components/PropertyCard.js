import React from 'react';
import './PropertyCard.css';

const PropertyCard = ({ property, onView }) => {
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

  return (
    <div className="property-card">
      <div className="property-image">
        <img 
          src={property.image} 
          alt={property.name}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x300?text=Property+Image';
          }}
        />
        <div className="property-type-badge">
          {getPropertyTypeIcon(property.type)} {property.type}
        </div>
      </div>

      <div className="property-content">
        <div className="property-header">
          <h3 className="property-name">{property.name}</h3>
          <div className="property-price">{formatPrice(property.price)}</div>
        </div>

        <div className="property-location">
          📍 {property.location}
        </div>

        <p className="property-description">
          {property.description.length > 100 
            ? `${property.description.substring(0, 100)}...` 
            : property.description
          }
        </p>

        {property.bedrooms > 0 && (
          <div className="property-details">
            <span className="detail-item">
              🛏️ {property.bedrooms} bed{property.bedrooms !== 1 ? 's' : ''}
            </span>
            {property.bathrooms > 0 && (
              <span className="detail-item">
                🚿 {property.bathrooms} bath{property.bathrooms !== 1 ? 's' : ''}
              </span>
            )}
            {property.area > 0 && (
              <span className="detail-item">
                📐 {property.area} sq ft
              </span>
            )}
          </div>
        )}

        <button 
          className="view-property-btn"
          onClick={onView}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default PropertyCard;
