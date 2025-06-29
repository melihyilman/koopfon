package models

import "github.com/google/uuid"

// Role represents a global role definition in the system.
// It corresponds to the "roles" table in db.txt.
type Role struct {
	ID       uuid.UUID `gorm:"type:uuid;primary_key;default:uuid_generate_v4()" json:"id"`
	RoleName string    `gorm:"type:varchar(100);unique;not null" json:"role_name"`
}

func (Role) TableName() string {
	return "roles"
}
