package week2;

import java.util.Scanner;

public class Lab2Part2 {

	public static void main(String[] args) {
		
		int currentNumber = 0;
		int highestNumber = 0;
		int count = 0;
		Scanner keyboard = new Scanner(System.in);
		System.out.print("Enter an integer (0 ends the input): ");
		do {
			
			currentNumber = keyboard.nextInt();			
			if(currentNumber >= highestNumber) {
				if(currentNumber == highestNumber) {
					count++;
				}else {
				highestNumber = currentNumber;
				count = 1;
				}
				
			}
			
			
		}while(currentNumber != 0);
		
		System.out.println("The largest number is " + highestNumber);
		System.out.println("The number " + highestNumber + " appears " + count + " times");

	}

}
