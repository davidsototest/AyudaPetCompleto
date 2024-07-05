import {
  Avatar,
  Button,
  Divider,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import { Comment, comments } from '../data/commentsTest';
import 'animate.css';
// import toastify from 'toastify-js'
import { ToastiSuccess } from "../toasti/ToastiSuccess";
import { ToastiError } from "../toasti/ToastiError";

interface Props {
  comments: Comment[];
}

const CommentsModal: React.FC<Props> = ({ comments }) => {
  const [comment, setComment] = useState("");
  const [commentsList, setCommentsList] = useState<Comment[]>(comments);
  const commentsEndRef = useRef<HTMLDivElement>(null);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = event.target;
    if (value.length <= 300) {
      setComment(value);
    } else {
      ToastiError("¡Máximo permitido! 🔔");
    }
  };

  const handleSendComment = () => {
    // Crear un nuevo comentario
    const newComment: Comment = {
      imgSrc: "https://firebasestorage.googleapis.com/v0/b/grupo12-f7def.appspot.com/o/publicaciones%2Fmascota%20(12).jpg?alt=media&token=75d2a020-d5e0-41c9-a978-24163ea0fcff",
      imgAlt: "test img",
      nameUser: "Usuario Uno",
      date: "15 enero 2024",
      ubication: "Rosario",
      comment: comment,
    };

    // Agregar el nuevo comentario al array
    const updatedComments = [...commentsList, newComment];
    setCommentsList(updatedComments);
    console.log("Comentario enviado:", newComment);
    setComment('');
    ToastiSuccess("¡Mensaje agregado exitosamente! 📌");
  };

    // Efecto para hacer scroll hacia abajo cuando se actualiza commentsList
    useEffect(() => {
      if (commentsEndRef.current) {
        commentsEndRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, [commentsList]); 

  const theme = useTheme();
  const styleDivider = {
    height: "1px",
  };

  const styleTextField = {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: theme.palette.primary.main, // Color del borde
      },
      "&:hover fieldset": {
        borderColor: theme.palette.primary.dark, // Color del borde al pasar el mouse
      },
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.primary.dark, // Color del borde al enfocar
      },
    },
    "& .MuiInputBase-input": {
      color: theme.palette.primary.main, // Color del texto al escribir
    },
    "& .MuiInputLabel-root": {
      color: theme.palette.primary.main, // Color del label antes de escribir
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: theme.palette.primary.dark, // Color del label al enfocar
    },
    "& .MuiOutlinedInput-root .MuiInputBase-input::placeholder": {
      color: theme.palette.primary.main, // Color del placeholder
      opacity: 1, // Necesario para asegurar que el color del placeholder se aplique correctamente
    },
  };

  return (
    <Grid
      container
      sx={{
        color: theme.palette.primary.main,
        height: "80%",
        // display: "flex",
        // flexDirection: "column",
        // position: "relative",
      }}
    >
      <Grid className="animate__animated animate__backInRight">
        <Typography variant="h5">Comentarios</Typography>
      </Grid>
      <Grid marginBottom={3}>
        <Divider style={styleDivider} />
      </Grid>
      {commentsList.map((comment, index) => (
        <Grid
          key={index}
          container
          id="Tiene Scroll Fijo"
          padding={2}
          bgcolor={theme.palette.secondary.light}
          marginBottom={2}
          width="98%"
          sx={{
            borderRadius: "15px",
          }}
          className={`animate__animated animate__backInRight`}
        >
          <Grid container width="100%">
            <Grid
              marginRight={1}
              display="flex"
              justifyContent="center" 
              alignItems="center"
            >
              <Avatar src={comment.imgSrc} alt={comment.imgAlt} />
            </Grid>
            <Grid>
              <Grid
                container
                display="flex"
                alignContent="center"
                height="100%"
              >
                <Grid marginRight={1}>
                  <Typography variant="h6"> {comment.nameUser} </Typography>
                </Grid>
                <Grid>
                  <Typography
                    color="#0000006b"
                    sx={{ fontSize: "14px", marginTop: "5px" }}
                  >
                    {" "}
                    - {comment.date}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid paddingTop={1} paddingBottom={1}>
            <Typography sx={{ fontStyle: "italic" }}>
              {comment.comment}
            </Typography>
          </Grid>
        </Grid>
      ))}

      

      <Grid
        container
        paddingTop={2}
        sx={{ width: "98%" }}
        // sx={{ padding: 2, borderTop: `1px solid ${theme.palette.divider}` }}
      >
        <Grid xs={12}>
          <TextField
            value={comment}
            onChange={handleChange}
            id="fullWidth"
            label="Deja tu comentario"
            multiline
            fullWidth
            rows={4}
            sx={styleTextField}
          />
        </Grid>
        {/* Referencia para hacer scroll hacia abajo */}
      <div ref={commentsEndRef} />
        <Grid container justifyContent="flex-end" width="100%" padding={2}>
          <Grid marginTop={1} paddingRight={2}>{comment.length}/300</Grid>
          <Grid >
            <Button
              disabled={comment.length <= 3}
              variant="outlined"
              color="primary"
              onClick={handleSendComment }
            >
              <SendIcon/>
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CommentsModal;
