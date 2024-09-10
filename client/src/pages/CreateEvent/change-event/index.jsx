import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { Box, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useNavigate, useParams } from 'react-router';
import base_url from '../../../settings/base_url';
import { BuilderNavbar } from '../../adminCourse/builderNavbar/BuilderNavbar';

function ChangeEvent() {
    const [name, setName] = useState('');
    const [nameKz, setNameKz] = useState('');
    const [description, setDescription] = useState('');
    const [descriptionKz, setDescriptionKz] = useState('');
    const [location, setLocation] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [typeOfStudy, setTypeOfStudy] = useState('');
    const [formatOfStudy, setFormatOfStudy] = useState('');
    const [coverImage, setCoverImage] = useState(null);
    const [logoImage, setLogoImage] = useState(null);
    const [program, setProgram] = useState([{ time: '', ru_name: '', kz_name: '' }]);
    const [speakers, setSpeakers] = useState([{ name: '', ru_position: '', kz_position: '', image: null }]);

    const jwtToken = localStorage.getItem('jwtToken');
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    // Fetch the event data when component mounts
    useEffect(() => {
        const fetchEventData = async () => {
            try {
                const response = await axios.get(`${base_url}/api/aml/event/getEventById`, {
                    params: { id: id }
                });

                const eventData = response.data;

                // Parse 'program' and 'speakers' fields if they are stringified JSON
                const parsedProgram = eventData.program ? JSON.parse(eventData.program) : [];
                const parsedSpeakers = eventData.speakers ? JSON.parse(eventData.speakers) : [];

                setName(eventData.ru_name);
                setNameKz(eventData.kz_name);
                setDescription(eventData.ru_description);
                setDescriptionKz(eventData.kz_description);
                setLocation(eventData.location);
                setStartDate(eventData.startDate);
                setEndDate(eventData.endDate);
                setTypeOfStudy(eventData.typeOfStudy);
                setFormatOfStudy(eventData.formatOfStudy);
                setCoverImage(eventData.coverImage);
                setLogoImage(eventData.logoImage);
                setProgram(Array.isArray(parsedProgram) ? parsedProgram : []); // Ensure it's an array
                setSpeakers(Array.isArray(parsedSpeakers) ? parsedSpeakers : []); // Ensure it's an array
            } catch (error) {
                console.error(error);
            }
        };

        fetchEventData();
    }, [id]);


    // Add and remove functions for program and speakers
    const handleAddProgram = () => {
        setProgram([...program, { time: '', ru_name: '', kz_name: '' }]);
    };

    const handleRemoveLastProgram = () => {
        if (program.length > 1) {
            setProgram(program.slice(0, -1));
        }
    };

    const handleAddSpeaker = () => {
        setSpeakers([...speakers, { name: '', ru_position: '', kz_position: '', image: null }]);
    };

    const handleRemoveLastSpeaker = () => {
        if (speakers.length > 1) {
            setSpeakers(speakers.slice(0, -1));
        }
    };

    const handleProgramChange = (index, field, value) => {
        const updatedProgram = [...program];
        updatedProgram[index][field] = value;
        setProgram(updatedProgram);
    };

    const handleSpeakerChange = (index, field, value) => {
        const updatedSpeakers = [...speakers];
        updatedSpeakers[index][field] = value;
        setSpeakers(updatedSpeakers);
    };

    const handleSpeakerImageChange = (index, file) => {
        const updatedSpeakers = [...speakers];
        updatedSpeakers[index].image = file;
        setSpeakers(updatedSpeakers);
    };

    const convertFileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    const handleSaveEvent = async () => {
        setLoading(true);

        try {
            const programData = program?.map(item => ({
                time: item.time,
                ru_name: item.ru_name,
                kz_name: item.kz_name,
            }));

            const speakersData = await Promise.all(speakers.map(async (speaker) => {
                const imageBase64 = speaker.image ? await convertFileToBase64(speaker.image) : '';
                return {
                    name: speaker.name,
                    ru_position: speaker.ru_position,
                    kz_position: speaker.kz_position,
                    image: imageBase64,
                };
            }));

            const formData = new FormData();
            formData.append('ru_name', name);
            formData.append('kz_name', nameKz);
            formData.append('ru_description', description);
            formData.append('kz_description', descriptionKz);
            formData.append('location', location);
            formData.append('startDate', startDate);
            formData.append('endDate', endDate);
            formData.append('coverImage', coverImage);
            formData.append('logoImage', logoImage);
            formData.append('typeOfStudy', typeOfStudy);
            formData.append('formatOfStudy', formatOfStudy);
            formData.append('program', JSON.stringify(programData));
            formData.append('speakers', JSON.stringify(speakersData));

            await axios.put(`${base_url}/api/aml/event/editEvent`, formData, {
                headers: {
                    'Authorization': `Bearer ${jwtToken}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('Event updated successfully');
            navigate(`/event-page/${id}`);
        } catch (error) {
            console.error(error);
            alert('Error updating event');
        } finally {
            setLoading(false);
        }
    };

    // Dropzone for file uploads
    const MainImageDropzone = ({ onDrop, file }) => {
        const { getRootProps, getInputProps, isDragActive } = useDropzone({
            onDrop,
            accept: 'image/*'
        });

        return (
            <Box
                {...getRootProps()}
                sx={{
                    border: '2px dashed grey',
                    borderRadius: 2,
                    p: 2,
                    textAlign: 'center',
                    cursor: 'pointer'
                }}
            >
                <input {...getInputProps()} />
                {isDragActive ? (
                    <Typography>Drop the file here...</Typography>
                ) : (
                    <Typography>{file ? file.name : 'Drag & drop or click to select an image'}</Typography>
                )}
            </Box>
        );
    };

    return (
        <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
            <BuilderNavbar />
            <Box sx={{ maxWidth: 800, mx: 'auto', py: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Edit Event
                </Typography>
                <Paper sx={{ p: 3 }}>
                    <Grid container spacing={2}>
                        {/* Event details */}
                        <Grid item xs={12}>
                            <TextField
                                label="Event Name (RU)"
                                fullWidth
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Event Name (KZ)"
                                fullWidth
                                value={nameKz}
                                onChange={(e) => setNameKz(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Description (RU)"
                                fullWidth
                                multiline
                                rows={4}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Description (KZ)"
                                fullWidth
                                multiline
                                rows={4}
                                value={descriptionKz}
                                onChange={(e) => setDescriptionKz(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Location"
                                fullWidth
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            />
                        </Grid>

                        {/* Dates */}
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <Grid item xs={6}>
                                <DatePicker
                                    label="Start Date"
                                    value={startDate ? new Date(startDate) : null}
                                    onChange={(newValue) => setStartDate(newValue ? newValue.toISOString().slice(0, 10) : null)}
                                    renderInput={(params) => <TextField fullWidth {...params} />}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <DatePicker
                                    label="End Date"
                                    value={endDate ? new Date(endDate) : null}
                                    onChange={(newValue) => setEndDate(newValue ? newValue.toISOString().slice(0, 10) : null)}
                                    renderInput={(params) => <TextField fullWidth {...params} />}
                                />
                            </Grid>
                        </LocalizationProvider>

                        <Grid item xs={6}>
                            <Typography>Cover Image</Typography>
                            <img src={coverImage} alt="coverImage" style={{ width: '60px', height:'60px', marginLeft:'10px' }} />
                            <MainImageDropzone
                                onDrop={(acceptedFiles) => setCoverImage(acceptedFiles[0])}
                                file={coverImage}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>Logo Image</Typography>
                            <img src={logoImage} alt="coverImage" style={{ width: '60px', height:'60px', marginLeft:'10px'  }} />
                            <MainImageDropzone
                                onDrop={(acceptedFiles) => setLogoImage(acceptedFiles[0])}
                                file={logoImage}
                            />
                        </Grid>

                        {/* Program Section */}
                        <Grid item xs={12}>
                            <Typography variant="h6">Program</Typography>
                            {program?.map((item, index) => (
                                <Paper key={index} sx={{ p: 2, mb: 2 }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <Typography variant="subtitle1">Program Item #{index + 1}</Typography>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <TextField
                                                label="Time"
                                                fullWidth
                                                value={item.time}
                                                onChange={(e) => handleProgramChange(index, 'time', e.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <TextField
                                                label="Name (RU)"
                                                fullWidth
                                                value={item.ru_name}
                                                onChange={(e) => handleProgramChange(index, 'ru_name', e.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <TextField
                                                label="Name (KZ)"
                                                fullWidth
                                                value={item.kz_name}
                                                onChange={(e) => handleProgramChange(index, 'kz_name', e.target.value)}
                                            />
                                        </Grid>
                                    </Grid>
                                </Paper>
                            ))}
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Button startIcon={<AddCircleIcon />} onClick={handleAddProgram}>
                                    Add Program
                                </Button>
                                <Button startIcon={<RemoveCircleIcon />} onClick={handleRemoveLastProgram} disabled={program.length === 1}>
                                    Remove Last Program
                                </Button>
                            </Box>
                        </Grid>

                        {/* Speakers Section */}
                        <Grid item xs={12}>
                            <Typography variant="h6">Speakers</Typography>
                            {speakers.map((speaker, index) => (
                                <Paper key={index} sx={{ p: 2, mb: 2 }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <Typography variant="subtitle1">Speaker #{index + 1}</Typography>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <TextField
                                                label="Name"
                                                fullWidth
                                                value={speaker.name}
                                                onChange={(e) => handleSpeakerChange(index, 'name', e.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <TextField
                                                label="Position (RU)"
                                                fullWidth
                                                value={speaker.ru_position}
                                                onChange={(e) => handleSpeakerChange(index, 'ru_position', e.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <TextField
                                                label="Position (KZ)"
                                                fullWidth
                                                value={speaker.kz_position}
                                                onChange={(e) => handleSpeakerChange(index, 'kz_position', e.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography>Photo</Typography>
                                            <MainImageDropzone
                                                onDrop={(acceptedFiles) => handleSpeakerImageChange(index, acceptedFiles[0])}
                                                file={speaker.image}
                                            />
                                        </Grid>
                                    </Grid>
                                </Paper>
                            ))}
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Button startIcon={<AddCircleIcon />} onClick={handleAddSpeaker}>
                                    Add Speaker
                                </Button>
                                <Button startIcon={<RemoveCircleIcon />} onClick={handleRemoveLastSpeaker} disabled={speakers.length === 1}>
                                    Remove Last Speaker
                                </Button>
                            </Box>
                        </Grid>

                        {/* Save button */}
                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" onClick={handleSaveEvent} disabled={isLoading}>
                                {isLoading ? 'Saving...' : 'Save Event'}
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Box>
        </Box>
    );
}

export default ChangeEvent;
