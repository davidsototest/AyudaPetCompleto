import React from "react";
import { footerLinks } from "../components/data/footerLinks";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import LinksList from "../components/others/LinksList";
import NewSletter from "../components/others/NewSletter";
import { maxWidth } from "./width";

interface Props {
  // Define props here
}

const Footer: React.FC<Props> = (Props) => {
  return (
    <Grid container padding={7} bgcolor="primary.light" justifyContent="center">
      <Grid container maxWidth={maxWidth}>
        {footerLinks.map((footer) => (
          <Grid key={footer.title} xs={12} md={3}>
            <LinksList title={footer.title} links={footer.links} />
          </Grid>
        ))}
        <Grid xs={12} md={3}>
          <NewSletter />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Footer;
