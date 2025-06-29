package models

import "github.com/google/uuid"

// AffiliateParticipation represents an investment in an affiliate company.
// It corresponds to the "affiliate_participations" table in db.txt.
type AffiliateParticipation struct {
	ID             uuid.UUID `gorm:"type:uuid;primary_key;default:uuid_generate_v4()" json:"id"`
	FiscalPeriodID uuid.UUID `gorm:"type:uuid;not null" json:"fiscal_period_id"`
	AffiliateName  string    `gorm:"type:varchar(255);not null" json:"affiliate_name"`
	MersisNo       string    `gorm:"type:varchar(50)" json:"mersis_no"`
	ShareRatio     float64   `gorm:"type:decimal(5,2)" json:"share_ratio"`
	CapitalAmount  float64   `gorm:"type:decimal(15,2)" json:"capital_amount"`
}

func (AffiliateParticipation) TableName() string {
	return "affiliate_participations"
}
