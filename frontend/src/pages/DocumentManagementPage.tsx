import React, { useState } from 'react';
import {
  Typography, Box, Paper, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Stack, List, ListItem, ListItemText, ListItemIcon, Divider, TextField, InputAdornment, Chip
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DescriptionIcon from '@mui/icons-material/Description';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import FolderIcon from '@mui/icons-material/Folder';
import AddIcon from '@mui/icons-material/Add';

// Mock Data
type Document = {
  id: string;
  name: string;
  type: string;
  uploadDate: string;
  size: string;
  fileUrl: string; // Placeholder for actual file URL
};

const initialDocuments: Document[] = [
  { id: 'doc1', name: 'Kooperatif Tüzüğü', type: 'Tüzük', uploadDate: '01.01.2023', size: '1.2 MB', fileUrl: '#' },
  { id: 'doc2', name: 'Yönetim Kurulu Kararı - 2024/01', type: 'Karar', uploadDate: '15.02.2024', size: '500 KB', fileUrl: '#' },
  { id: 'doc3', name: 'Ortaklık Sözleşmesi - Ali Veli', type: 'Sözleşme', uploadDate: '10.03.2024', size: '800 KB', fileUrl: '#' },
  { id: 'doc4', name: 'Denetim Raporu 2023', type: 'Rapor', uploadDate: '20.04.2024', size: '2.5 MB', fileUrl: '#' },
];

const DocumentManagementPage: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>(initialDocuments);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      const newDoc: Document = {
        id: `doc${documents.length + 1}`,
        name: selectedFile.name,
        type: 'Diğer', // Default type for uploaded files
        uploadDate: new Date().toLocaleDateString('tr-TR'),
        size: `${(selectedFile.size / 1024 / 1024).toFixed(2)} MB`,
        fileUrl: '#', // Placeholder
      };
      setDocuments(prevDocs => [...prevDocs, newDoc]);
      setSelectedFile(null);
      alert(`Dosya yüklendi: ${newDoc.name}`);
    } else {
      alert('Lütfen yüklenecek bir dosya seçin.');
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleDeleteDocument = (id: string) => {
    if (window.confirm('Bu belgeyi silmek istediğinizden emin misiniz?')) {
      setDocuments(prevDocs => prevDocs.filter(doc => doc.id !== id));
      alert('Belge silindi.');
    }
  };

  const filteredDocuments = documents.filter(doc =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        📂 Belge Yönetimi
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>Yeni Belge Yükle</Typography>
        <Stack direction="row" spacing={2} alignItems="center">
          <Button
            variant="contained"
            component="label"
            startIcon={<UploadFileIcon />}>
            Dosya Seç
            <input type="file" hidden onChange={handleFileChange} />
          </Button>
          {selectedFile && (
            <Typography variant="body2">{selectedFile.name}</Typography>
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpload}
            disabled={!selectedFile}
            startIcon={<AddIcon />}>
            Yükle
          </Button>
        </Stack>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>Mevcut Belgeler</Typography>
        <TextField
          fullWidth
          label="Belge Ara"
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
        />
        <TableContainer sx={{ overflowX: 'auto' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Belge Adı</TableCell>
                <TableCell>Tip</TableCell>
                <TableCell>Yükleme Tarihi</TableCell>
                <TableCell>Boyut</TableCell>
                <TableCell>İşlemler</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredDocuments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} sx={{ textAlign: 'center', py: 3 }}>
                    <Typography variant="h6" color="text.secondary">
                      😔 Hiç belge bulunamadı.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                filteredDocuments.map((doc) => (
                  <TableRow key={doc.id}>
                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <DescriptionIcon fontSize="small" />
                        <Typography>{doc.name}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Chip label={doc.type} size="small" color="info" />
                    </TableCell>
                    <TableCell>{doc.uploadDate}</TableCell>
                    <TableCell>{doc.size}</TableCell>
                    <TableCell>
                      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
                        <Button variant="outlined" size="small" startIcon={<VisibilityIcon />} href={doc.fileUrl} target="_blank">
                          Görüntüle
                        </Button>
                        <Button variant="outlined" size="small" startIcon={<DownloadIcon />} href={doc.fileUrl} download>
                          İndir
                        </Button>
                        <Button variant="outlined" size="small" color="error" startIcon={<DeleteIcon />} onClick={() => handleDeleteDocument(doc.id)}>
                          Sil
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default DocumentManagementPage;
