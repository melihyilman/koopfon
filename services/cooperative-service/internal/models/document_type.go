package models

import "github.com/google/uuid"

// DocumentType is a lookup table for categorizing documents.
// It corresponds to the "document_types" table in db.txt.
type DocumentType struct {
	ID                     uuid.UUID `gorm:"type:uuid;primary_key;default:uuid_generate_v4()" json:"id"`
	Name                   string    `gorm:"type:varchar(255);unique;not null" json:"name"`
	IsMandatoryForFiscal   bool      `gorm:"not null;default:false" json:"is_mandatory_for_fiscal"`
	IsMandatoryForMeeting  bool      `gorm:"not null;default:false" json:"is_mandatory_for_meeting"`
}

func (DocumentType) TableName() string {
	return "document_types"
}
