package models

import "github.com/google/uuid"

// BoardType is a lookup table for board types (e.g., 'Yönetim Kurulu').
// It corresponds to the "board_types" table in db.txt.
type BoardType struct {
	ID   uuid.UUID `gorm:"type:uuid;primary_key;default:uuid_generate_v4()" json:"id"`
	Name string    `gorm:"type:varchar(100);unique;not null" json:"name"`
}

func (BoardType) TableName() string {
	return "board_types"
}
