package models

import (
	"time"

	"github.com/google/uuid"
)

// FiscalPeriod represents a financial reporting period for a cooperative.
// It corresponds to the "fiscal_periods" table in db.txt.
type FiscalPeriod struct {
	ID               uuid.UUID  `gorm:"type:uuid;primary_key;default:uuid_generate_v4()" json:"id"`
	CooperativeID    uuid.UUID  `gorm:"type:uuid;not null" json:"cooperative_id"`
	StartDate        time.Time  `gorm:"type:date;not null" json:"start_date"`
	EndDate          time.Time  `gorm:"type:date;not null" json:"end_date"`
	Status           string     `gorm:"type:varchar(50);not null;default:'DRAFT'" json:"status"`
	SubmittedAt      *time.Time `gorm:"type:timestamptz" json:"submitted_at"`
	SubmittedByUserID *uuid.UUID `gorm:"type:uuid" json:"submitted_by_user_id"`
	CreatedAt        time.Time  `gorm:"not null;default:now()" json:"created_at"`
}

func (FiscalPeriod) TableName() string {
	return "fiscal_periods"
}
