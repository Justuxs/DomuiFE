import React from "react";
import { Grid, CardActionArea } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";

interface ResultCardProps {
  id: number;
  name: string;
  handleDelete: (rowId: number) => void;
}

const ResultCard: React.FunctionComponent<ResultCardProps> = ({ id, name, handleDelete }) => {
  return (
    <Grid item xs={2} style={{ display: "flex" }}>
      <Card
        sx={{ minHeight: 175 }}
        variant="outlined"
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
          width: "87%",
          marginLeft: "6.5%",
          marginRight: "6.5%",
          border: "2px solid",
        }}
      >
        <CardActionArea component={Link} to={`/results/${id}`}>
          <IconButton
            aria-label="delete"
            style={{
              display: "block",
              position: "absolute",
              top: "12%",
              left: "92%",
              transform: "translate(-50%, -50%)",
            }}
            onClick={(event) => {
              event.stopPropagation();
              event.preventDefault();
              handleDelete(id);
            }}
          >
            <ClearIcon />
          </IconButton>
          <CardContent sx={{ minHeight: 175 }} component={Stack} direction="column" justifyContent="center">
            <Typography color="textSecondary" align="center">
              {name}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default ResultCard;
