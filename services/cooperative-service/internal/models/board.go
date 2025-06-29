package models

import (
	"time"

	"github.com/google/uuid"
)

// Board represents a specific board for a cooperative for a given term.
// It corresponds to the "boards" table in db.txt.
type Board struct {
	ID              uuid.UUID `gorm:"type:uuid;primary_key;default:uuid_generate_v4()" json:"id"`
	CooperativeID   uuid.UUID `gorm:"type:uuid;not null" json:"cooperative_id"`
	BoardTypeID     uuid.UUID `gorm:"type:uuid;not null" json:"board_type_id"`
	TermStartDate   time.Time `gorm:"type:date;not null" json:"term_start_date"`
	TermEndDate     *time.Time `gorm:"type:date" json:"term_end_date"`
}

func (Board) TableName() string {
	return "boards"
}
