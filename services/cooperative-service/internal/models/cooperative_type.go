package models

import "github.com/google/uuid"

// CooperativeType is a lookup table for cooperative types.
// It corresponds to the "cooperative_types" table in db.txt.
type CooperativeType struct {
	ID   uuid.UUID `gorm:"type:uuid;primary_key;default:uuid_generate_v4()" json:"id"`
	Name string    `gorm:"type:varchar(255);unique;not null" json:"name"`
}

func (CooperativeType) TableName() string {
	return "cooperative_types"
}
