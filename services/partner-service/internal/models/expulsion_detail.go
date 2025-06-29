package models

import (
	"time"

	"github.com/google/uuid"
)

// ExpulsionDetail stores data specific to an 'EXPELLED' membership event.
// It corresponds to the "expulsion_details" table in db.txt.
type ExpulsionDetail struct {
	EventID             uuid.UUID  `gorm:"type:uuid;primary_key" json:"event_id"`
	Reason              string     `gorm:"type:text;not null" json:"reason"`
	FirstWarningDate    *time.Time `gorm:"type:date" json:"first_warning_date"`
	FirstWarningNumber  string     `gorm:"type:varchar(50)" json:"first_warning_number"`
	BoardDecisionDate   time.Time  `gorm:"type:date;not null" json:"board_decision_date"`
	BoardDecisionNumber string     `gorm:"type:varchar(50);not null" json:"board_decision_number"`

	MembershipEvent MembershipEvent `gorm:"foreignKey:EventID"`
}

func (ExpulsionDetail) TableName() string {
	return "expulsion_details"
}
