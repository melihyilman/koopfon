package repository

import (
	"koopfon/services/partner-service/internal/models"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type PartnerRepository interface {
	Create(partner *models.Partner) error
	GetByID(id uuid.UUID) (*models.Partner, error)
	ListByCooperative(coopID uuid.UUID) ([]models.Partner, error)
	Update(partner *models.Partner) error
	Delete(id uuid.UUID) error
}

type partnerRepository struct {
	db *gorm.DB
}

func NewPartnerRepository(db *gorm.DB) PartnerRepository {
	return &partnerRepository{db: db}
}

func (r *partnerRepository) Create(partner *models.Partner) error {
	return r.db.Create(partner).Error
}

func (r *partnerRepository) GetByID(id uuid.UUID) (*models.Partner, error) {
	var partner models.Partner
	if err := r.db.First(&partner, "id = ?", id).Error; err != nil {
		return nil, err
	}
	return &partner, nil
}

func (r *partnerRepository) ListByCooperative(coopID uuid.UUID) ([]models.Partner, error) {
	var partners []models.Partner
	if err := r.db.Where("cooperative_id = ?", coopID).Find(&partners).Error; err != nil {
		return nil, err
	}
	return partners, nil
}

func (r *partnerRepository) Update(partner *models.Partner) error {
	return r.db.Save(partner).Error
}

func (r *partnerRepository) Delete(id uuid.UUID) error {
	return r.db.Delete(&models.Partner{}, "id = ?", id).Error
}