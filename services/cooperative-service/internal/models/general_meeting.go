package models

import (
	"time"

	"github.com/google/uuid"
)

// GeneralMeeting represents a general assembly meeting of a cooperative.
// It corresponds to the "general_meetings" table in db.txt.
type GeneralMeeting struct {
	ID            uuid.UUID `gorm:"type:uuid;primary_key;default:uuid_generate_v4()" json:"id"`
	CooperativeID uuid.UUID `gorm:"type:uuid;not null" json:"cooperative_id"`
	MeetingDate   time.Time `gorm:"type:timestamptz;not null" json:"meeting_date"`
	MeetingType   string    `gorm:"type:varchar(50);not null" json:"meeting_type"`
	Location      string    `gorm:"type:text" json:"location"`
	Agenda        string    `gorm:"type:text" json:"agenda"`
}

func (GeneralMeeting) TableName() string {
	return "general_meetings"
}
