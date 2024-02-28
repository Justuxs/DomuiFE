import React, { SyntheticEvent } from "react";
import { Grid } from "@mui/material";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

interface CreateResultCardProps {
  handleSubmit: (e: SyntheticEvent) => Promise<void>;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  searchState: boolean;
  title: string;
}

const CreateResultCard: React.FunctionComponent<CreateResultCardProps> = ({
  title,
  setTitle,
  handleSubmit,
  searchState,
}) => {
  if (!searchState)
    return (
      <Grid item xs={4}>
        <Card
          sx={{ minHeight: 175 }}
          variant="outlined"
          style={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            border: "2px solid",
            width: "94.1%",
            marginLeft: "3%",
            marginRight: "6.5%",
          }}
        >
          <TextField
            id="outlined-basic"
            variant="outlined"
            sx={{ marginLeft: 3, marginRight: 7 }}
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            label="Enter League Name"
          />
          <Button variant="outlined" type="submit" sx={{ marginRight: 3 }} onClick={handleSubmit}>
            Create League
          </Button>
        </Card>
      </Grid>
    );
  return null;
};

export default CreateResultCard;
