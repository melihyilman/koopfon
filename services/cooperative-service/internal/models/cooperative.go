package models

import (
	"time"

	"github.com/google/uuid"
)

// Cooperative represents a single cooperative entity.
// It corresponds to the "cooperatives" table in db.txt.
type Cooperative struct {
	ID                      uuid.UUID  `gorm:"type:uuid;primary_key;default:uuid_generate_v4()" json:"id"`
	Name                    string     `gorm:"type:varchar(255);not null" json:"name"`
	MersisNo                string     `gorm:"type:varchar(50);unique;not null" json:"mersis_no"`
	FileNo                  string     `gorm:"type:varchar(50)" json:"file_no"`
	RegistrationDate        *time.Time `gorm:"type:date" json:"registration_date"`
	EstablishmentPermitDate *time.Time `gorm:"type:date" json:"establishment_permit_date"`
	LegalStatus             string     `gorm:"type:varchar(100)" json:"legal_status"`
	CooperativeTypeID       uuid.UUID  `gorm:"type:uuid" json:"cooperative_type_id"`
	ParentCooperativeID     *uuid.UUID `gorm:"type:uuid" json:"parent_cooperative_id"`
	AddressLine1            string     `gorm:"type:varchar(255)" json:"address_line1"`
	City                    string     `gorm:"type:varchar(100)" json:"city"`
	PostalCode              string     `gorm:"type:varchar(10)" json:"postal_code"`
	CreatedAt               time.Time  `gorm:"not null;default:now()" json:"created_at"`
	UpdatedAt               time.Time  `gorm:"not null;default:now()" json:"updated_at"`
}

func (Cooperative) TableName() string {
	return "cooperatives"
}
