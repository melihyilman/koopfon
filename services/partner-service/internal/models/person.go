package models

import (
	"time"

	"github.com/google/uuid"
)

// Person stores details for natural person parties.
// It corresponds to the "persons" table in db.txt.
type Person struct {
	ID          uuid.UUID  `gorm:"type:uuid;primary_key" json:"id"` // This is also a foreign key to parties.id
	FirstName   string     `gorm:"type:varchar(255);not null" json:"first_name"`
	LastName    string     `gorm:"type:varchar(255);not null" json:"last_name"`
	TCKN        string     `gorm:"type:varchar(11);unique" json:"tckn"`
	DateOfBirth *time.Time `gorm:"type:date" json:"date_of_birth"`
	PhoneNumber string     `gorm:"type:varchar(20)" json:"phone_number"`
	Email       string     `gorm:"type:varchar(255);unique" json:"email"`

	Party Party `gorm:"foreignKey:ID"` // Establishes the one-to-one relationship
}

func (Person) TableName() string {
	return "persons"
}
