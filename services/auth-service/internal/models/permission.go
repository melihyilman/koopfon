package models

import "github.com/google/uuid"

// Permission represents a granular action that can be performed in the system.
// It corresponds to the "permissions" table in db.txt.
type Permission struct {
	ID             uuid.UUID `gorm:"type:uuid;primary_key;default:uuid_generate_v4()" json:"id"`
	PermissionName string    `gorm:"type:varchar(100);unique;not null" json:"permission_name"`
}

func (Permission) TableName() string {
	return "permissions"
}
