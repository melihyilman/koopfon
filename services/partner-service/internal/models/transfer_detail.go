package models

import (
	"time"

	"github.com/google/uuid"
)

// TransferDetail stores data specific to a 'TRANSFERRED_OUT' or 'TRANSFERRED_IN' event.
// It corresponds to the "transfer_details" table in db.txt.
type TransferDetail struct {
	EventID                      uuid.UUID  `gorm:"type:uuid;primary_key" json:"event_id"`
	TransferDirection            string     `gorm:"type:varchar(10);not null" json:"transfer_direction"` // 'IN' or 'OUT'
	CounterpartyMembershipEventID *uuid.UUID `gorm:"type:uuid" json:"counterparty_membership_event_id"`
	BoardDecisionDate            time.Time  `gorm:"type:date;not null" json:"board_decision_date"`
	BoardDecisionNumber          string     `gorm:"type:varchar(50);not null" json:"board_decision_number"`

	MembershipEvent MembershipEvent `gorm:"foreignKey:EventID"`
}

func (TransferDetail) TableName() string {
	return "transfer_details"
}
