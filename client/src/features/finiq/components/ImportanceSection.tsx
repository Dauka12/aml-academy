import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography
} from '@mui/material';

const ImportanceSection: React.FC = () => {
  const skills = [
    'планировать бюджет и копить сбережения',
    'безопасно пользоваться банковскими и цифровыми услугами',
    'понимать условия кредитов и инвестиций',
    'распознавать финансовые мошеннические схемы',
    'принимать обоснованные финансовые решения в повседневной жизни'
  ];

  return (
    <Box sx={{ mb: 6 }}>
      <Typography
        variant="h4"
        component="h2"
        fontWeight="bold"
        sx={{
          textAlign: { xs: 'left', sm: 'center' },
          mb: 4,
          color: '#1A2751',
          fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2.2rem' },
          px: { xs: 1, sm: 0 }
        }}
      >
        Почему важна финансовая грамотность и безопасность?
      </Typography>

      <Card elevation={2} sx={{ borderRadius: 2, mb: 4 }}>
        <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
          <Typography
            variant="body1"
            paragraph
            sx={{
              textAlign: 'left',
              lineHeight: 1.7,
              mb: 3,
              fontSize: { xs: '0.9rem', sm: '1rem' }
            }}
          >
            В современном мире финансовая грамотность является одной из ключевых компетенций. Умение правильно управлять своими доходами и расходами, принимать обоснованные финансовые решения, защищать себя от мошенничества и финансовых рисков — важный навык, который влияет на благосостояние как отдельных граждан, так и всей страны.
          </Typography>

          <Typography
            variant="body1"
            paragraph
            sx={{
              textAlign: 'left',
              lineHeight: 1.7,
              mb: 3,
              fontSize: { xs: '0.9rem', sm: '1rem' }
            }}
          >
            Недостаток финансовых знаний может привести к серьёзным последствиям: от неэффективного управления собственным бюджетом до попадания в долговые ловушки или становления жертвой финансового мошенничества.
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{
              mt: 3,
              textAlign: 'left',
              fontSize: { xs: '1.1rem', sm: '1.25rem' }
            }}
          >
            Финансово грамотный гражданин умеет:
          </Typography>

          <Box sx={{ pl: { xs: 1, sm: 2 } }}>
            {skills.map((skill, index) => (
              <Typography
                key={index}
                variant="body1"
                paragraph
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  mb: 1,
                  textAlign: 'left',
                  fontSize: { xs: '0.9rem', sm: '1rem' }
                }}
              >
                <Box component="span" sx={{ mr: 1, color: 'primary.main', fontWeight: 'bold' }}>•</Box>
                {skill}
              </Typography>
            ))}
          </Box>

          <Typography
            variant="body1"
            sx={{
              textAlign: 'left',
              lineHeight: 1.7,
              mt: 3,
              fontWeight: 'medium',
              color: 'primary.dark',
              fontSize: { xs: '0.9rem', sm: '1rem' }
            }}
          >
            И самое главное, повышая свою финансовую грамотность, вы не только защищаете свои средства, но и вносите вклад в устойчивое экономическое развитие страны.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ImportanceSection;