package models

import "github.com/google/uuid"

// RolePermission maps a Permission to a Role.
// It corresponds to the "role_permissions" join table in db.txt.
type RolePermission struct {
	RoleID       uuid.UUID `gorm:"type:uuid;primary_key" json:"role_id"`
	PermissionID uuid.UUID `gorm:"type:uuid;primary_key" json:"permission_id"`
}

func (RolePermission) TableName() string {
	return "role_permissions"
}
