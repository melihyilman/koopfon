package models

import "github.com/google/uuid"

// UserCooperativeRole links a User to a Cooperative with a specific Role.
// This is the core of the context-aware authorization model.
// It corresponds to the "user_cooperative_roles" table in db.txt.
type UserCooperativeRole struct {
	UserID        uuid.UUID `gorm:"type:uuid;primary_key" json:"user_id"`
	CooperativeID uuid.UUID `gorm:"type:uuid;primary_key" json:"cooperative_id"`
	RoleID        uuid.UUID `gorm:"type:uuid;not null" json:"role_id"`
}

func (UserCooperativeRole) TableName() string {
	return "user_cooperative_roles"
}
