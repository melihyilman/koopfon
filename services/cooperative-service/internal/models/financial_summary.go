package models

import "github.com/google/uuid"

// FinancialSummary contains summary financial data for a fiscal period.
// It corresponds to the "financial_summaries" table in db.txt.
type FinancialSummary struct {
	FiscalPeriodID       uuid.UUID `gorm:"type:uuid;primary_key" json:"fiscal_period_id"`
	TotalIncome          float64   `gorm:"type:decimal(15,2)" json:"total_income"`
	TotalExpenses        float64   `gorm:"type:decimal(15,2)" json:"total_expenses"`
	PersonnelCount       int       `gorm:"type:integer" json:"personnel_count"`
	InsurancePremiumPaid float64   `gorm:"type:decimal(15,2)" json:"insurance_premium_paid"`
}

func (FinancialSummary) TableName() string {
	return "financial_summaries"
}
