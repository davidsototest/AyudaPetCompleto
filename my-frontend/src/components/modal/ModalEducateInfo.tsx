import React, { useState } from "react";
import { EducateInfoTwo } from "../data/educateInfo";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import CardSimple from "../cards/CardSimple";
import { Divider, Typography } from "@mui/material";
import CardSimpleTwo from "../cards/CardSimpleTwo";
import "animate.css";

interface Props {
  educationInfoTwo: EducateInfoTwo[];
  title: string;
}

const ModalEducateInfo: React.FC<Props> = ({ educationInfoTwo, title }) => {
  const [cardGrande, setCardGrande] = useState({
    title: educationInfoTwo[0].title,
    description: educationInfoTwo[0].description,
    imgCard: educationInfoTwo[0].imgCard,
    video: educationInfoTwo[0].video,
  });

  const [cardsSmall, setCardsSmall] = useState(educationInfoTwo.slice(1));

  const handleCardClick = (index: number) => {
    const newCardGrande = {
      title: cardsSmall[index].title,
      description: cardsSmall[index].description,
      imgCard: cardsSmall[index].imgCard,
      video: cardsSmall[index].video,
    };

    const newCardsSmall = [...cardsSmall];
    newCardsSmall[index] = {
      title: cardGrande.title,
      description: cardGrande.description,
      imgCard: cardGrande.imgCard,
      video: cardGrande.video,
    };

    setCardGrande(newCardGrande);
    setCardsSmall(newCardsSmall);
  };

  return (
    <Grid container>
      <Grid xs={12} textAlign="center">
        <Typography variant="h4">{title}</Typography>
      </Grid>
      <Grid xs={12} marginBottom={7}>
        <Divider />
      </Grid>
      <Grid xs={12} md={8} className="animate__animated animate__bounceIn">
        <CardSimple
          title={cardGrande.title}
          description={cardGrande.description}
          video={cardGrande.video}
        />
      </Grid>
      <Grid xs={12} md={4}>
        <Grid container spacing={3} display="flex" justifyContent="center">
          {cardsSmall.map((card, index) => (
            <Grid
              xs={12}
              key={index}
              onClick={() => handleCardClick(index)}
              className="animate__animated animate__bounceIn"
            >
              <CardSimpleTwo img={card.imgCard} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ModalEducateInfo;
