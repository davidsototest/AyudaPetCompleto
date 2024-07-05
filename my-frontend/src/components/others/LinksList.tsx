import { Link, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import React from "react";

interface LinkItem {
  name: string;
  link: string;
}

interface Props {
  title: string;
  links: LinkItem[];
}

const LinksList: React.FC<Props> = ({ title, links }) => {
  return (
    <Grid container>
      <Grid xs={12} marginBottom={2}>
        <Typography variant="h6" color="secondary.main">{title}</Typography>
      </Grid>
      {links.map((link) => (
        <Grid key={link.name} xs={12}>
          <Typography>
            <Link href={link.link} underline="none" target="_blank">
              {link.name}
            </Link>
          </Typography>
        </Grid>
      ))}
    </Grid>
  );
};

export default LinksList;
