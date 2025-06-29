package models

import (
	"time"

	"github.com/google/uuid"
)

// BoardMembership links a Party to a Board with a specific role.
// It corresponds to the "board_memberships" table in db.txt.
type BoardMembership struct {
	ID          uuid.UUID  `gorm:"type:uuid;primary_key;default:uuid_generate_v4()" json:"id"`
	BoardID     uuid.UUID  `gorm:"type:uuid;not null" json:"board_id"`
	PartyID     uuid.UUID  `gorm:"type:uuid;not null" json:"party_id"` // Refers to a party in partner-service
	RoleInBoard string     `gorm:"type:varchar(100);not null" json:"role_in_board"`
	StartDate   time.Time  `gorm:"type:date;not null" json:"start_date"`
	EndDate     *time.Time `gorm:"type:date" json:"end_date"`
}

func (BoardMembership) TableName() string {
	return "board_memberships"
}
