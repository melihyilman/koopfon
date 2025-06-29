package models

import (
	"time"

	"github.com/google/uuid"
)

// Document is a central, general-purpose model for file uploads.
// It corresponds to the "documents" table in db.txt.
type Document struct {
	ID              uuid.UUID `gorm:"type:uuid;primary_key;default:uuid_generate_v4()" json:"id"`
	FileName        string    `gorm:"type:varchar(255);not null" json:"file_name"`
	FilePath        string    `gorm:"type:varchar(512);unique;not null" json:"file_path"`
	MimeType        string    `gorm:"type:varchar(100);not null" json:"mime_type"`
	FileSizeBytes   int64     `gorm:"type:bigint;not null" json:"file_size_bytes"`
	UploadedByUserID uuid.UUID `gorm:"type:uuid;not null" json:"uploaded_by_user_id"`
	CreatedAt       time.Time `gorm:"not null;default:now()" json:"created_at"`
}

func (Document) TableName() string {
	return "documents"
}
