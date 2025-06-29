package models

type Partner struct {
	ID            uint   `gorm:"primaryKey"`
	Name          string `gorm:"not null"`
	CooperativeID uint   `gorm:"not null"`
	Status        string `gorm:"not null"`
}
