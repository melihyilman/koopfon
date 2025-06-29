package models

import "github.com/google/uuid"

// LegalEntity stores details for corporate/organizational parties.
// It corresponds to the "legal_entities" table in db.txt.
type LegalEntity struct {
	ID            uuid.UUID `gorm:"type:uuid;primary_key" json:"id"` // This is also a foreign key to parties.id
	Name          string    `gorm:"type:varchar(255);not null" json:"name"`
	TaxID         string    `gorm:"type:varchar(20);unique" json:"tax_id"`
	MersisNo      string    `gorm:"type:varchar(50);unique" json:"mersis_no"`
	IsCooperative bool      `gorm:"not null;default:false" json:"is_cooperative"`

	Party Party `gorm:"foreignKey:ID"` // Establishes the one-to-one relationship
}

func (LegalEntity) TableName() string {
	return "legal_entities"
}
