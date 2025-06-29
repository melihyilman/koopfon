package models

import (
	"time"

	"github.com/google/uuid"
)

// DeathDetail stores data specific to a 'DECEASED' membership event.
// It corresponds to the "death_details" table in db.txt.
type DeathDetail struct {
	EventID             uuid.UUID `gorm:"type:uuid;primary_key" json:"event_id"`
	DateOfDeath         time.Time `gorm:"type:date;not null" json:"date_of_death"`
	BoardDecisionDate   time.Time `gorm:"type:date;not null" json:"board_decision_date"`
	BoardDecisionNumber string    `gorm:"type:varchar(50);not null" json:"board_decision_number"`

	MembershipEvent MembershipEvent `gorm:"foreignKey:EventID"`
}

func (DeathDetail) TableName() string {
	return "death_details"
}
