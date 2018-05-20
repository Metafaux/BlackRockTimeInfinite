"use strict";

const BURN_YEAR_ZERO = 1985;
const SEPTEMBER_INDEX = 8;
// const MONDAY_INDEX = 1;

function GetNextLaborDay(dateObj) {
	let nextLaborDay = dateObj || new Date();
	let initDate = nextLaborDay.getDate();
	let initMonth = nextLaborDay.getMonth();
	nextLaborDay.setMonth(SEPTEMBER_INDEX);

	if (initMonth > SEPTEMBER_INDEX) {
		nextLaborDay.setFullYear(nextLaborDay.getFullYear() + 1);
	}

	SetToFirstMonday(nextLaborDay);

	if (initMonth === SEPTEMBER_INDEX && initDate > nextLaborDay.getDate()) {
		// If it's September, find out if Labor Day has passed
		nextLaborDay.setFullYear(nextLaborDay.getFullYear() + 1);
		SetToFirstMonday(nextLaborDay);
	}

	return nextLaborDay;
}

function SetToFirstMonday(dateObj) {
	const MONDAY_OFFSET = 9;
	const DAYS_IN_WEEK = 7;
	dateObj.setDate(1);
	let dayOfWeek = dateObj.getDay();
	let firstMonday = (MONDAY_OFFSET - dayOfWeek) % DAYS_IN_WEEK;
	dateObj.setDate(firstMonday);
	let days = ["sunday", "monday", "tues", "wed", "thu", "fri", "sat"];
	console.log("Date 1 is a " + days[dayOfWeek] + ", first Monday is on the " + firstMonday);
}

function GetBurnYear(fullYear) {
	return fullYear - BURN_YEAR_ZERO;
}
