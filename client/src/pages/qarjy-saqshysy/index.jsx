import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import DescriptionIcon from "@mui/icons-material/Description";
import InfoIcon from "@mui/icons-material/Info";
import {
    Box,
    Container,
    Typography,
    Card,
    Grid,
    Button,
    useTheme,
    useMediaQuery,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
} from "@mui/material";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import Header from "../../components/header/v2";
import Footer from "../../components/footer";

const QarjySaqshysy = () => {
    const { t } = useTranslation();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" },
        },
    };

    const schoolWinners = [
        { no: 1, name: 'ЕРКІНҚЫЗЫ АРУЖАН', org: 'КГУ «Общеобразовательная школа села Талапкер», Целиноградский район, Акмолинская области', place: '1-место' },
        { no: 2, name: 'ТУРСУНОВА ДИНАРА АЛИМЖАНОВНА', org: 'КГУ «Малыбайская средняя школа», с.Малыбай, Енбекшиказахский район, Алматинская область', place: '2-место' },
        { no: 3, name: 'СОФИЕВА ИЛЬНУРА РАШИТОВНА', org: 'КГУ «Малыбайская средняя школа», с.Малыбай, Енбекшиказахский район, Алматинская область', place: '3-место' },
    ];

    const collegeWinners = [
        { no: 1, name: 'ЖАКЫПБЕК НУРЖАС АСЕТҰЛЫ', org: 'ГККП Алматинский областной колледж инновационных технологий в сфере сервиса и питания, г. Қонаев, Алматинская область', place: '1-место' },
        { no: 2, name: 'РАХЫМЖАНОВ НҰРБАХ', org: 'ГКП на ПХВ «Туркестанский высший медицинский колледж», г. Туркестан', place: '2-место' },
        { no: 3, name: 'МАХМАДЖАНОВА АЗАДА ЗИАДУЛЛАЕВНА', org: 'ГККП «Мактааральский аграрный колледж», п. Атакент, Мактааральский район, Туркестанская область', place: '3-место' },
    ];

    return (
        <>
            <Header />
            <Box
                sx={{
                    minHeight: "100vh",
                    background: "linear-gradient(135deg, #f9f7f4 0%, #f5f3f0 50%, #f0eee9 100%)",
                    pt: { xs: 12, md: 15 },
                    pb: 10,
                }}
            >
                <Helmet>
                    <title>{t("qarjy_saqshysy_page.title")} - AML Academy</title>
                </Helmet>

                <Container maxWidth="lg">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                    >
                        {/* Hero Section */}
                        <motion.div variants={itemVariants} style={{ textAlign: "center", marginBottom: "64px" }}>
                            <Typography
                                variant="h1"
                                sx={{
                                    fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4.5rem" },
                                    fontWeight: 800,
                                    color: "#1e293b",
                                    mb: 2,
                                }}
                            >
                                {t("qarjy_saqshysy_page.title")}
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: { xs: "1.1rem", md: "1.4rem" },
                                    color: "#64748b",
                                    maxWidth: "800px",
                                    mx: "auto",
                                }}
                            >
                                {t("qarjy_saqshysy_page.subtitle")}
                            </Typography>
                        </motion.div>

                        <Grid container spacing={4} direction="column-reverse">


                            {/* Detailed Description Section */}
                            <Grid item xs={12}>
                                <motion.div variants={itemVariants}>
                                    <Card
                                        sx={{
                                            p: { xs: 3, md: 5 },
                                            borderRadius: "20px",
                                            boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                                            border: "1px solid rgba(0,0,0,0.03)",
                                            background: "white",
                                        }}
                                    >
                                        <Box sx={{ display: "flex", alignItems: "center", mb: 3, gap: 2 }}>
                                            <InfoIcon color="primary" sx={{ fontSize: 32 }} />
                                            <Typography variant="h5" fontWeight={700}>
                                                {t("qarjy_saqshysy_page.about_title")}
                                            </Typography>
                                        </Box>

                                        <Typography
                                            sx={{
                                                color: "#1e293b",
                                                lineHeight: 1.8,
                                                mb: 4,
                                                fontSize: { xs: "1rem", md: "1.1rem" }
                                            }}
                                        >
                                            {t("qarjy_saqshysy_page.description_p1")}
                                        </Typography>

                                        {/* Participation Figures Highlight */}
                                        <Box
                                            sx={{
                                                p: 3,
                                                bgcolor: "rgba(29, 78, 216, 0.05)",
                                                borderRadius: "15px",
                                                borderLeft: "5px solid #1d4ed8",
                                                mb: 4
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontSize: { xs: "1.2rem", md: "1.5rem" },
                                                    fontWeight: 800,
                                                    color: "#1d4ed8",
                                                    lineHeight: 1.4
                                                }}
                                            >
                                                {t("qarjy_saqshysy_page.description_p2")}
                                            </Typography>
                                        </Box>

                                        <Typography
                                            sx={{
                                                color: "#475569",
                                                lineHeight: 1.8,
                                                mb: 4,
                                                fontSize: { xs: "1rem", md: "1.1rem" }
                                            }}
                                        >
                                            {t("qarjy_saqshysy_page.description_p3")}
                                        </Typography>

                                        <Box sx={{ mt: 6, pt: 4, borderTop: "1px solid #f1f5f9" }}>
                                            <Typography
                                                sx={{
                                                    color: "#1e293b",
                                                    fontWeight: 600,
                                                    mb: 1,
                                                    fontSize: "1.1rem"
                                                }}
                                            >
                                                {t("qarjy_saqshysy_page.description_p4")}
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    color: "#64748b",
                                                    mb: 4
                                                }}
                                            >
                                                {t("qarjy_saqshysy_page.description_p5")}
                                            </Typography>

                                            {/* Winners Section */}
                                            <motion.div variants={itemVariants}>
                                                <Card
                                                    sx={{
                                                        p: { xs: 4, md: 6 },
                                                        borderRadius: "20px",
                                                        boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                                                        border: "1px solid rgba(0,0,0,0.03)",
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        alignItems: "center",
                                                        textAlign: "center",
                                                        background: "white",
                                                        mt: 3
                                                    }}
                                                >
                                                    <EmojiEventsIcon sx={{ fontSize: 64, color: "#f59e0b", mb: 3 }} />
                                                    <Typography variant="h4" fontWeight={800} mb={2}>
                                                        {t("qarjy_saqshysy_page.winners_title")}
                                                    </Typography>
                                                    <Typography color="text.secondary" sx={{ mb: 4, lineHeight: 1.7, maxWidth: "700px" }}>
                                                        {t("qarjy_saqshysy_page.winners_description")}
                                                    </Typography>

                                                    <Box sx={{ width: '100%', mt: 2 }}>
                                                        <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
                                                            {t("qarjy_saqshysy_page.schools_title")}
                                                        </Typography>
                                                        <Paper elevation={1} sx={{ overflowX: 'auto', mb: 3 }}>
                                                            <Table>
                                                                <TableHead>
                                                                    <TableRow>
                                                                        <TableCell>{t("qarjy_saqshysy_page.table.no")}</TableCell>
                                                                        <TableCell>{t("qarjy_saqshysy_page.table.name")}</TableCell>
                                                                        <TableCell>{t("qarjy_saqshysy_page.table.org")}</TableCell>
                                                                        <TableCell>{t("qarjy_saqshysy_page.table.place")}</TableCell>
                                                                    </TableRow>
                                                                </TableHead>
                                                                <TableBody>
                                                                    {schoolWinners.map((row) => (
                                                                        <TableRow key={row.no}>
                                                                            <TableCell>{row.no}</TableCell>
                                                                            <TableCell>{row.name}</TableCell>
                                                                            <TableCell sx={{ maxWidth: 420, wordBreak: 'break-word' }}>{row.org}</TableCell>
                                                                            <TableCell>{row.place}</TableCell>
                                                                        </TableRow>
                                                                    ))}
                                                                </TableBody>
                                                            </Table>
                                                        </Paper>

                                                        <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
                                                            {t("qarjy_saqshysy_page.colleges_title")}
                                                        </Typography>
                                                        <Paper elevation={1} sx={{ overflowX: 'auto' }}>
                                                            <Table>
                                                                <TableHead>
                                                                    <TableRow>
                                                                        <TableCell>{t("qarjy_saqshysy_page.table.no")}</TableCell>
                                                                        <TableCell>{t("qarjy_saqshysy_page.table.name")}</TableCell>
                                                                        <TableCell>{t("qarjy_saqshysy_page.table.org")}</TableCell>
                                                                        <TableCell>{t("qarjy_saqshysy_page.table.place")}</TableCell>
                                                                    </TableRow>
                                                                </TableHead>
                                                                <TableBody>
                                                                    {collegeWinners.map((row) => (
                                                                        <TableRow key={row.no}>
                                                                            <TableCell>{row.no}</TableCell>
                                                                            <TableCell>{row.name}</TableCell>
                                                                            <TableCell sx={{ maxWidth: 420, wordBreak: 'break-word' }}>{row.org}</TableCell>
                                                                            <TableCell>{row.place}</TableCell>
                                                                        </TableRow>
                                                                    ))}
                                                                </TableBody>
                                                            </Table>
                                                        </Paper>
                                                    </Box>
                                                </Card>
                                            </motion.div>

                                            {/* Regional Files Section */}
                                            <Typography variant="h6" fontWeight={700} sx={{ mb: 2.5, color: "#1e293b" }}>
                                                {t("qarjy_saqshysy_page.regions_heading")}
                                            </Typography>
                                            <Box sx={{ maxWidth: 980, mx: 'auto', mt: 2 }}>
                                                <Grid container spacing={1} alignItems="stretch">
                                                    {
                                                        (() => {
                                                            const regionFiles = [
                                                                { file: "Акмолинская.docx", key: "aqmola" },
                                                                { file: "Актюбинская.docx", key: "aktobe" },
                                                                { file: "Алматинская.docx", key: "almaty_region" },
                                                                { file: "Атырауская.docx", key: "atyrau" },
                                                                { file: "ВКО.docx", key: "east_kz" },
                                                                { file: "Жамбылская с ФИО.docx", key: "zhambyl" },
                                                                { file: "ЗКО с ФИО.docx", key: "west_kz" },
                                                                { file: "Карагандинская с ФИО.docx", key: "karagandy" },
                                                                { file: "Костанайская с ФИО.docx", key: "kostanay" },
                                                                { file: "Кызылординская с ФИО.docx", key: "kyzylorda" },
                                                                { file: "Мангистауская с ФИО.docx", key: "mangystau" },
                                                                { file: "Павлодарская с ФИО.docx", key: "pavlodar" },
                                                                { file: "СКО с ФИО.docx", key: "north_kz" },
                                                                { file: "Туркестанская с ФИО.docx", key: "turkistan" },
                                                                { file: "г. Алматы с ФИО.docx", key: "almaty_city" },
                                                                { file: "г. Астана с ФИО.docx", key: "astana_city" },
                                                                { file: "г. Шымкент с ФИО.docx", key: "shymkent_city" },
                                                                { file: "область Абай с ФИО.docx", key: "abai" },
                                                                { file: "область Жетісу с ФИО.docx", key: "zhetysu" },
                                                                { file: "область Ұлытау с ФИО.docx", key: "ulytau" }
                                                            ];



                                                            return regionFiles.map(({ file, key }) => (
                                                                <Grid item xs={12} sm={6} md={4} key={key}>
                                                                    <Button
                                                                        variant="outlined"
                                                                        startIcon={<DescriptionIcon sx={{ color: '#94a3b8', fontSize: 16 }} />}
                                                                        href={`/assets/docs/qarjy_saqshysy/${file}`}
                                                                        download
                                                                        fullWidth
                                                                        size="small"
                                                                        sx={{
                                                                            justifyContent: "flex-start",
                                                                            textTransform: "none",
                                                                            borderRadius: 2,
                                                                            py: 0.5,
                                                                            minHeight: 40,
                                                                            pl: 1,
                                                                            color: "text.primary",
                                                                            borderColor: "divider",
                                                                            "&:hover": {
                                                                                boxShadow: 2,
                                                                                backgroundColor: "#fbfdff"
                                                                            }
                                                                        }}
                                                                    >
                                                                        <Typography noWrap variant="body2" sx={{ color: 'text.primary', lineHeight: 1.15 }}>
                                                                            {t(`qarjy_saqshysy_page.regions.${key}`) || file.replace(".docx", "")}
                                                                        </Typography>
                                                                    </Button>
                                                                </Grid>
                                                            ));
                                                        })()
                                                    }
                                                </Grid>
                                            </Box>

                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    textAlign: "right",
                                                    fontWeight: 700,
                                                    color: "#1e293b",
                                                    opacity: 0.8,
                                                    fontFamily: "monospace",
                                                    mt: 6
                                                }}
                                            >
                                                {t("qarjy_saqshysy_page.footer_org")}
                                            </Typography>
                                        </Box>
                                    </Card>
                                </motion.div>
                            </Grid>


                        </Grid>
                    </motion.div>
                </Container>
            </Box>
            <Footer />
        </>
    );
};

export default QarjySaqshysy;
