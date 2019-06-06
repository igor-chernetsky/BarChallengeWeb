import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export function stringToDate(date: string): Date {
  let formattedDate: Date;

  try {
    let values = date.split(/[^0-9]/);
    let year = parseInt(values[0], 10);
    let month = parseInt(values[1], 10) - 1;
    let day = parseInt(values[2], 10);
    let hours = parseInt(values[3], 10);
    let minutes = parseInt(values[4], 10);
    let seconds = parseInt(values[5], 10);

    formattedDate = new Date(year, month, day, hours, minutes, seconds);
  } catch (e) {
    formattedDate = new Date(date);
  }

  return formattedDate;
}

export function dateToString(date: Date): string {
  let day: any = date.getDate();
  let month: any = date.getMonth() + 1;
  if (month < 10) month = '0' + month;
  if (day < 10) day = '0' + day;
  const timeString = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  const stringDate = `${date.getFullYear()}-${month}-${day} ${timeString}`;
  return stringDate;
}
