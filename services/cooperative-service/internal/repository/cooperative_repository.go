package repository

import (
	"koopfon/services/cooperative-service/internal/models"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type CooperativeRepository interface {
	Create(coop *models.Cooperative) error
	GetByID(id uuid.UUID) (*models.Cooperative, error)
	List() ([]models.Cooperative, error)
	Update(coop *models.Cooperative) error
	Delete(id uuid.UUID) error
}

type cooperativeRepository struct {
	db *gorm.DB
}

func NewCooperativeRepository(db *gorm.DB) CooperativeRepository {
	return &cooperativeRepository{db: db}
}

func (r *cooperativeRepository) Create(coop *models.Cooperative) error {
	return r.db.Create(coop).Error
}

func (r *cooperativeRepository) GetByID(id uuid.UUID) (*models.Cooperative, error) {
	var coop models.Cooperative
	if err := r.db.First(&coop, "id = ?", id).Error; err != nil {
		return nil, err
	}
	return &coop, nil
}

func (r *cooperativeRepository) List() ([]models.Cooperative, error) {
	var cooperatives []models.Cooperative
	if err := r.db.Find(&cooperatives).Error; err != nil {
		return nil, err
	}
	return cooperatives, nil
}

func (r *cooperativeRepository) Update(coop *models.Cooperative) error {
	return r.db.Save(coop).Error
}

func (r *cooperativeRepository) Delete(id uuid.UUID) error {
	return r.db.Delete(&models.Cooperative{}, "id = ?", id).Error
}