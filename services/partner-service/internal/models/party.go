package models

import (
	"time"

	"github.com/google/uuid"
)

// Party is the abstract base for any entity that can be a member (person or legal entity).
// It corresponds to the "parties" table in db.txt.
type Party struct {
	ID        uuid.UUID `gorm:"type:uuid;primary_key;default:uuid_generate_v4()" json:"id"`
	PartyType string    `gorm:"type:varchar(50);not null" json:"party_type"` // 'PERSON' or 'LEGAL_ENTITY'
	CreatedAt time.Time `gorm:"not null;default:now()" json:"created_at"`
}

func (Party) TableName() string {
	return "parties"
}
