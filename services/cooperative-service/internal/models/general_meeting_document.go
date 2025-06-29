package models

import "github.com/google/uuid"

// GeneralMeetingDocument links a Document to a GeneralMeeting.
// It corresponds to the "general_meeting_documents" join table in db.txt.
type GeneralMeetingDocument struct {
	GeneralMeetingID uuid.UUID `gorm:"type:uuid;primary_key" json:"general_meeting_id"`
	DocumentID       uuid.UUID `gorm:"type:uuid;primary_key" json:"document_id"`
	DocumentTypeID   uuid.UUID `gorm:"type:uuid;not null" json:"document_type_id"`
}

func (GeneralMeetingDocument) TableName() string {
	return "general_meeting_documents"
}
