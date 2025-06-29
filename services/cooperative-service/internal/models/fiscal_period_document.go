package models

import "github.com/google/uuid"

// FiscalPeriodDocument links a Document to a FiscalPeriod.
// It corresponds to the "fiscal_period_documents" join table in db.txt.
type FiscalPeriodDocument struct {
	FiscalPeriodID uuid.UUID `gorm:"type:uuid;primary_key" json:"fiscal_period_id"`
	DocumentID     uuid.UUID `gorm:"type:uuid;primary_key" json:"document_id"`
	DocumentTypeID uuid.UUID `gorm:"type:uuid;not null" json:"document_type_id"`
}

func (FiscalPeriodDocument) TableName() string {
	return "fiscal_period_documents"
}
