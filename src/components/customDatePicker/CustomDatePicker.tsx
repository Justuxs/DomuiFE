import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

interface TournamentDatePickerProps {
  handleDateChange: (date: Dayjs | null) => void;
  date: string;
}

const CustomDatePicker: React.FunctionComponent<TournamentDatePickerProps> = ({ handleDateChange, date }) => {
  const [value, setValue] = useState<Dayjs | null>(date !== "" ? dayjs(date) : null);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Date"
        value={value}
        inputFormat="YYYY-MM-DD"
        onChange={(newValue) => {
          setValue(newValue);
          handleDateChange(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
};

export default CustomDatePicker;
