package week2;

import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.util.Scanner;

public class Lab2Part1 {

	public static void main(String[] args) {
		
		int userWeight = 0;
		int userHeight = 0;
		int userAge = 0;
		char userGender = ' ';
		char userActivityLevel = ' ';		
		int candyCalories = 230;
		double bmgValue;
		String outputGender = "";
		Scanner keyboard = new Scanner(System.in);
		String test = "";
		
		System.out.println("This program will calculate the number of 230 caloriecandy bars to eat to maintain your weight.");
		
		System.out.println("What is your age in years?");
		userAge = keyboard.nextInt();
		System.out.println("What is your total height in inches?");
		userHeight = keyboard.nextInt();
		System.out.println("What is your wight in pounds?");
		userWeight = keyboard.nextInt();
		do {
		System.out.println("Enter 'M' for male calculation or 'F' for female calculation");
		userGender = keyboard.next().charAt(0);
		}while((userGender != 'M' && userGender != 'F'));

		System.out.println("Are you:");
		System.out.println("A. Sedentary\nB. Somewhat active (exercise occasionally)");
		System.out.println("C. Active (exercise 3-4 days per week)\nD. Highly active (exercise every day)");
		System.out.println("Enter A,B,C, or D.");
		userActivityLevel = keyboard.next().charAt(0);	
		
		if(userGender == 'F') {
			bmgValue =  655 + (4.3 * userWeight) + (4.7 * userHeight) - (4.7 * userAge);
			outputGender = "Female";
		}
		else {
			bmgValue = (66 + (6.3 * userWeight) + (12.9 * userHeight) - (6.8 * userAge));
			outputGender = "Male";
		}
		
		
		switch(userActivityLevel) {
		case 'A':
			bmgValue = bmgValue * 1.2;
			break;
		case 'B':
			bmgValue = bmgValue * 1.3;
			break;
		case 'C':
			bmgValue = bmgValue * 1.4;
			break;
		case 'D':
			bmgValue = bmgValue * 1.5;
			break;
		default:
			System.out.println("Invalid Activity Entry");
		}	
		
		bmgValue = bmgValue / candyCalories;
		NumberFormat formatter = new DecimalFormat("#0.00");
		
		System.out.print("A " + outputGender + " with those measurements should eat " + 
		formatter.format(bmgValue) + " candy bars per day to maintain the same weight.");
		
	
	}

}
