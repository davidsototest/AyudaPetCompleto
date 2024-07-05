
import { Card, CardContent, Typography, useTheme } from '@mui/material';
import React from 'react';
import ButtonPrimary from '../buttons/ButtonPrimary';
import { useNavigate } from 'react-router-dom';

interface help {
    title: string;
    describe: string;
    buttonName: string,
    path: string
  }

const CardHelp: React.FC<help> = ({title, describe, buttonName, path}) => {

    const navigate = useNavigate();
    const theme = useTheme();

    return (
        <Card
        sx={{
            minWidth: 300,
            maxWidth: 800,
            padding: "20px",
            background: theme.palette.primary.light,
            textAlign: "center",
            color: theme.palette.primary.main,
          }}
        >
            <CardContent>
                <Typography variant='h3' marginBottom={2}>
                    {title}
                </Typography>
                <Typography marginBottom={6}
                    style={{
                        fontStyle: "italic",
                    }}
                >
                    {describe}
                </Typography>
                <ButtonPrimary
                    onClick={() => navigate(path)}
                >
                    {buttonName}
                </ButtonPrimary>
            </CardContent>
        </Card>
    );
};

export default CardHelp;