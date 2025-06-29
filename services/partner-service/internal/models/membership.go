package models

import (
	"time"

	"github.com/google/uuid"
)

// Membership represents the link between a Party and a Cooperative.
// It corresponds to the "memberships" table in db.txt.
type Membership struct {
	ID            uuid.UUID  `gorm:"type:uuid;primary_key;default:uuid_generate_v4()" json:"id"`
	PartyID       uuid.UUID  `gorm:"type:uuid;not null;uniqueIndex:idx_party_coop" json:"party_id"`
	CooperativeID uuid.UUID  `gorm:"type:uuid;not null;uniqueIndex:idx_party_coop" json:"cooperative_id"`
	ShareCount    int        `gorm:"not null;default:1" json:"share_count"`
	StartDate     time.Time  `gorm:"type:date;not null" json:"start_date"`
	EndDate       *time.Time `gorm:"type:date" json:"end_date"`
	IsActive      bool       `gorm:"not null;default:true" json:"is_active"`
	CreatedAt     time.Time  `gorm:"not null;default:now()" json:"created_at"`
}

func (Membership) TableName() string {
	return "memberships"
}
