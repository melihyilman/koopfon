package models

import "github.com/google/uuid"

// RealEstateHolding represents a real estate asset held by a cooperative during a fiscal period.
// It corresponds to the "real_estate_holdings" table in db.txt.
type RealEstateHolding struct {
	ID              uuid.UUID `gorm:"type:uuid;primary_key;default:uuid_generate_v4()" json:"id"`
	FiscalPeriodID  uuid.UUID `gorm:"type:uuid;not null" json:"fiscal_period_id"`
	PropertyType    string    `gorm:"type:varchar(100)" json:"property_type"`
	Address         string    `gorm:"type:text" json:"address"`
	City            string    `gorm:"type:varchar(100)" json:"city"`
	District        string    `gorm:"type:varchar(100)" json:"district"`
	SheetNo         string    `gorm:"type:varchar(50)" json:"sheet_no"`
	ParcelNo        string    `gorm:"type:varchar(50)" json:"parcel_no"`
	AreaSqm         float64   `gorm:"type:decimal(10,2)" json:"area_sqm"`
	EstimatedValue  float64   `gorm:"type:decimal(15,2)" json:"estimated_value"`
}

func (RealEstateHolding) TableName() string {
	return "real_estate_holdings"
}
