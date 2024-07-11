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
// import { Comment, comments } from "../data/commentsTest";
import "animate.css";
import { ToastiSuccess } from "../toasti/ToastiSuccess";
import { ToastiError } from "../toasti/ToastiError";
import { Link, useNavigate } from "react-router-dom";
import ButtonSecondary from "../buttons/ButtonSecondary";
import { useAuth } from "../../context/AuthContext";
import { Comment, usePublications } from "../../context/PublicationsContext";

interface Props {
  comments: Comment[];
  publicationId: number;
}

const CommentsModal: React.FC<Props> = ({ comments, publicationId }) => {
  const [comment, setComment] = useState("");
  const [commentsList, setCommentsList] = useState<Comment[]>(comments);
  const commentsEndRef = useRef<HTMLDivElement>(null);
  const [enableComments, setEnableComments] = useState(false);
  const navigate = useNavigate();
  const { token, user_id } = useAuth();
  const { sendComment, fetchComments } = usePublications();

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

  const handleSendComment = async () => {
    const now = new Date(); // Fecha y hora actuales
    const isoString = now.toISOString(); // "2024-07-09T12:34:56.789Z"
    const dateOnly = isoString.split("T")[0]; // "2024-07-09"

    const data = {
      user_id: user_id,
      comment: comment,
      date: dateOnly,
    };

    try {
      await sendComment(publicationId, data);
      await fetchComments(publicationId);
      setComment("");
    } catch (error) {
      console.log("error al enviar el mensaje al context: " + error);
    }
  };

  // Efecto para hacer scroll hacia abajo cuando se actualiza commentsList
  useEffect(() => {
    if (commentsEndRef.current) {
      commentsEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [commentsList]);

  const theme = useTheme();
  const styleDivider = {
    height: "1px",
  };

  //Efecto para saber si hay un usuario activo, habilita los comentarios
  useEffect(() => {
    if (token) {
      setEnableComments(true);
    }
  }, [token]);

  useEffect(() => {
    setCommentsList(comments);
  }, [comments]);

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

  //onClic de los botones registrar e iniciar sesion
  const handleClickRecord = () => {
    navigate("/record");
  };

  const handleClickSignin = () => {
    navigate("/signin");
  };

  return (
    <Grid
      container
      alignContent="start"
      // direction="column"
      // justifyContent="space-between"
      sx={{
        color: theme.palette.primary.main,
        height: "100%",
        // display: "flex",
        // flexDirection: "column",
        // position: "relative",
      }}
    >
      {commentsList.length === 0 ? (
        <div></div>
      ) : (
        <Grid className="animate__animated animate__backInRight" xs={12}>
          <Typography variant="h5">Comentarios</Typography>
        </Grid>
      )}
      <Grid xs={12} marginBottom={2}>
        <Divider style={styleDivider} />
      </Grid>
      {commentsList.length === 0 ? (
        <Grid xs={12} display="flex" justifyContent="center">
          <Typography variant="h6">Sin comentarios ...</Typography>
        </Grid>
      ) : (
        <Grid>
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
                  <Avatar src={comment.imgUrl} alt={comment.imgUrl} />
                </Grid>
                <Grid>
                  <Grid
                    container
                    display="flex"
                    alignContent="center"
                    height="100%"
                  >
                    <Grid marginRight={1}>
                      <Typography variant="h6"> {comment.name} </Typography>
                    </Grid>
                    <Grid>
                      <Typography
                        color="#0000006b"
                        sx={{ fontSize: "14px", marginTop: "5px" }}
                      >
                        {" "}
                        -{" "}
                        {comment.date.length > 10
                          ? `${comment.date.slice(0, 10)}...`
                          : comment.date}
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
        </Grid>
      )}

      {enableComments ? (
        <Grid
          container
          paddingTop={2}
          alignContent="flex-end"
          sx={{ width: "98%"}}
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

          <Grid  xs />

          {/* Referencia para hacer scroll hacia abajo */}
          <div ref={commentsEndRef} />
          <Grid container justifyContent="flex-end" width="100%" padding={2}>
            <Grid marginTop={1} paddingRight={2}>
              {comment.length}/300
            </Grid>
            <Grid>
              <Button
                disabled={comment.length <= 3}
                variant="outlined"
                color="primary"
                onClick={handleSendComment}
              >
                <SendIcon />
              </Button>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <Grid container justifyContent="center" marginTop={3} paddingBottom={3}>
          <Grid textAlign="center" md={8} marginBottom={3}>
            <Typography variant="h5">
              ¡Para dejar un comentario, primero debes registrarte e iniciar
              sesión en el sitio.!
            </Typography>
          </Grid>
          <Grid
            xs={12}
            md={6}
            justifyContent="end"
            display="flex"
            paddingRight={2}
            maxHeight={50}
          >
            <ButtonSecondary onClick={handleClickRecord}>
              Registrar
            </ButtonSecondary>
          </Grid>
          <Grid
            xs={12}
            md={6}
            justifyContent="start"
            display="flex"
            paddingLeft={2}
            maxHeight={50}
          >
            <ButtonSecondary onClick={handleClickSignin}>
              Iniciar sesión
            </ButtonSecondary>
          </Grid>
        </Grid>
      )}
      <div ref={commentsEndRef} />
    </Grid>
  );
};

export default CommentsModal;
