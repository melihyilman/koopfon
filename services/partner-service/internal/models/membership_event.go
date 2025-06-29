package models

import (
	"time"

	"github.com/google/uuid"
)

// MembershipEvent records a state change in a membership's lifecycle.
// It corresponds to the "membership_events" table in db.txt.
type MembershipEvent struct {
	ID              uuid.UUID `gorm:"type:uuid;primary_key;default:uuid_generate_v4()" json:"id"`
	MembershipID    uuid.UUID `gorm:"type:uuid;not null" json:"membership_id"`
	EventType       string    `gorm:"type:varchar(50);not null" json:"event_type"`
	EventDate       time.Time `gorm:"type:date;not null" json:"event_date"`
	Notes           string    `gorm:"type:text" json:"notes"`
	CreatedByUserID uuid.UUID `gorm:"type:uuid;not null" json:"created_by_user_id"`
	CreatedAt       time.Time `gorm:"not null;default:now()" json:"created_at"`
}

func (MembershipEvent) TableName() string {
	return "membership_events"
}
