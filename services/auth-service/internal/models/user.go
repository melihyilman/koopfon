package models

import (
    "time"
    "github.com/google/uuid"
)

// User represents a user account in the system.
// It corresponds to the "users" table in db.txt.
type User struct {
    ID           uuid.UUID `gorm:"type:uuid;primary_key;default:uuid_generate_v4()" json:"id"`
    Email        string    `gorm:"type:varchar(255);unique;not null" json:"email"`
    PasswordHash string    `gorm:"type:varchar(255);not null" json:"-"` // Omit from JSON responses
    FullName     string    `gorm:"type:varchar(255)" json:"full_name"`
    IsActive     bool      `gorm:"not null;default:true" json:"is_active"`
    CreatedAt    time.Time `gorm:"not null;default:now()" json:"created_at"`
    UpdatedAt    time.Time `gorm:"not null;default:now()" json:"updated_at"`
}

func (User) TableName() string {
	return "users"
}