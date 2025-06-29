import React, { useState } from 'react';
import {
  Typography, TextField, Button, Box, Paper, MenuItem, Select, FormControl, InputLabel, Grid
} from '@mui/material';
import { useParams } from 'react-router-dom';

const PartnerDetailPage: React.FC = () => {
  const { id } = useParams();
  // Mock data for a partner
  const [partner, setPartner] = useState({
    id: id || 'new',
    ortaklikNo: '1000',
    firstName: 'Ali',
    lastName: 'Veli',
    tckn: '11111111111',
    dateOfBirth: '1980-01-01',
    phoneNumber: '5551234567',
    email: 'ali.veli@example.com',
    address: 'Örnek Mah. Örnek Cad. No:1',
    status: 'Halen Ortak',
    shareCount: 100,
    startDate: '2020-01-01',
    // Expulsion details
    reason: '',
    firstWarningDate: '',
    firstWarningNumber: '',
    boardDecisionDate: '',
    boardDecisionNumber: '',
    // Transfer details
    transferDirection: '',
    counterpartyMembershipEventId: '',
    // Death details
    dateOfDeath: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setPartner(prev => ({
      ...prev,
      [name as string]: value,
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: API ile kaydet
    alert('Kaydedildi!');
  };

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Ortak Detay: {partner.firstName} {partner.lastName}
      </Typography>
      <Paper sx={{ p: 3 }}>
        <form onSubmit={handleSave}>
          <Typography variant="h6" gutterBottom>Ortak Bilgileri</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Ortaklık No"
                name="ortaklikNo"
                value={partner.ortaklikNo}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Adı"
                name="firstName"
                value={partner.firstName}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Soyadı"
                name="lastName"
                value={partner.lastName}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="TC Kimlik No"
                name="tckn"
                value={partner.tckn}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Doğum Tarihi"
                name="dateOfBirth"
                type="date"
                value={partner.dateOfBirth}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Telefon"
                name="phoneNumber"
                value={partner.phoneNumber}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="E-posta"
                name="email"
                type="email"
                value={partner.email}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Adres"
                name="address"
                value={partner.address}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                multiline
                rows={3}
              />
            </Grid>
          </Grid>

          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>Ortaklık Durumu</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Durum</InputLabel>
                <Select
                  name="status"
                  value={partner.status}
                  label="Durum"
                  onChange={handleInputChange}
                >
                  <MenuItem value="Halen Ortak">Halen Ortak</MenuItem>
                  <MenuItem value="Ortaklıktan Çıktı">Ortaklıktan Çıktı</MenuItem>
                  <MenuItem value="Ortaklığı Devretti">Ortaklığı Devretti</MenuItem>
                  <MenuItem value="Hatalı Giriş">Hatalı Giriş</MenuItem>
                  <MenuItem value="Ortaklıktan İhraç Edildi">Ortaklıktan İhraç Edildi</MenuItem>
                  <MenuItem value="Ortaklığı Devraldı">Ortaklığı Devraldı</MenuItem>
                  <MenuItem value="Vefat Etti">Vefat Etti</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Pay Adedi"
                name="shareCount"
                type="number"
                value={partner.shareCount}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Ortaklık Başlangıç Tarihi"
                name="startDate"
                type="date"
                value={partner.startDate}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            {/* Dynamic fields based on status */}
            {partner.status === 'Ortaklıktan İhraç Edildi' && (
              <>
                <Grid item xs={12} sm={6}>
                  <TextField label="İhraç Sebebi" name="reason" value={partner.reason} onChange={handleInputChange} fullWidth margin="normal" multiline rows={2} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="1. İhtarnamenin Tarihi" name="firstWarningDate" type="date" value={partner.firstWarningDate} onChange={handleInputChange} fullWidth margin="normal" InputLabelProps={{ shrink: true }} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="1. İhtarname No" name="firstWarningNumber" value={partner.firstWarningNumber} onChange={handleInputChange} fullWidth margin="normal" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Board Decision Date" name="boardDecisionDate" type="date" value={partner.boardDecisionDate} onChange={handleInputChange} fullWidth margin="normal" InputLabelProps={{ shrink: true }} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Board Decision Number" name="boardDecisionNumber" value={partner.boardDecisionNumber} onChange={handleInputChange} fullWidth margin="normal" />
                </Grid>
              </>
            )}

            {partner.status === 'Ortaklığı Devretti' && (
              <>
                <Grid item xs={12} sm={6}>
                  <TextField label="Transfer Yönü" name="transferDirection" value={partner.transferDirection} onChange={handleInputChange} fullWidth margin="normal" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Karşı Taraf Üyelik Olayı ID" name="counterpartyMembershipEventId" value={partner.counterpartyMembershipEventId} onChange={handleInputChange} fullWidth margin="normal" />
                </Grid>
              </>
            )}

            {partner.status === 'Vefat Etti' && (
              <>
                <Grid item xs={12} sm={6}>
                  <TextField label="Vefat Tarihi" name="dateOfDeath" type="date" value={partner.dateOfDeath} onChange={handleInputChange} fullWidth margin="normal" InputLabelProps={{ shrink: true }} />
                </Grid>
              </>
            )}
          </Grid>

          <Box mt={3}>
            <Button type="submit" variant="contained" color="primary">
              Kaydet
            </Button>
          </Box>
        </form>
      </Paper>
    </>
  );
};

export default PartnerDetailPage;