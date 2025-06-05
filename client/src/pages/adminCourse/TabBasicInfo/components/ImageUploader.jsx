import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import {
    Box,
    Button,
    Checkbox,
    CircularProgress,
    FormControlLabel,
    Paper,
    Typography
} from '@mui/material';

const ImageUploader = ({
    image,
    setImage,
    defImage,
    setDefImage,
    base64Course,
    loading,
    handleFileChange,
    formErrors
}) => {
    return (
        <>
            <Typography 
                variant="h5" 
                component="h2" 
                color="primary.main"
                fontWeight={500}
                gutterBottom
            >
                Обложка курса
            </Typography>
            
            <Box 
                sx={{ 
                    mt: 2, 
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 1
                }}
            >
                <Paper
                    elevation={0}
                    sx={{
                        width: 300,
                        height: 300,
                        borderRadius: 2,
                        border: '1px dashed rgba(55, 71, 97, 0.44)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 2,
                        overflow: 'hidden',
                        position: 'relative',
                        cursor: 'pointer'
                    }}
                    component="label"
                    htmlFor="upload-image"
                >
                    {loading ? (
                        <CircularProgress />
                    ) : image ? (
                        <Box 
                            component="img"
                            src={image.startsWith('data:') ? image : `https://amlacademy.kz/aml/${image}`}
                            alt="Course cover"
                            sx={{ 
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover'
                            }}
                        />
                    ) : (
                        <Box 
                            sx={{ 
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                color: 'secondary.main'
                            }}
                        >
                            <CloudUploadIcon sx={{ fontSize: 60, mb: 1 }} />
                            <Typography variant="body2">
                                Нажмите чтобы загрузить изображение
                            </Typography>
                        </Box>
                    )}
                </Paper>
                
                <input
                    type="file"
                    id="upload-image"
                    accept="image/png, image/jpeg, image/jpg"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                />
                
                <Button
                    variant="outlined"
                    component="label"
                    htmlFor="upload-image"
                    startIcon={<PhotoCamera />}
                    sx={{ mt: 1, mb: 2 }}
                >
                    Загрузить изображение
                </Button>
                
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={defImage}
                            onChange={(e) => {
                                if (defImage) {
                                    setImage("");
                                    setDefImage(false);
                                } else {
                                    setImage(base64Course);
                                    setDefImage(true);
                                }
                            }}
                        />
                    }
                    label="Использовать обложку по умолчанию"
                />
                
                {formErrors.image && (
                    <Typography color="error" variant="caption">
                        {formErrors.image}
                    </Typography>
                )}
            </Box>
        </>
    );
};

export default ImageUploader;
