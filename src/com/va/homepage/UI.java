package com.va.homepage;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.List;
import java.util.logging.Logger;


public class UI {
	private static Logger logger = Logger.getLogger("com.va.homepage");

	private DataModel model;

	public UI(DataModel model) {
		this.model = model;
	}

	public static void main(String[] args) {
		
	}

	public void start() throws HpException {
		List<String> classes = model.getClasses();
		logger.info("Classes : " + classes);
		String option = getChoice(classes, null);
		List<IProperty> properties = model.getProperties("aClass");
		
		
	}

	private String getChoice(List<String> items, String message) throws HpException {
		if (message == null) {
			message = "Select one of the following:";
		}
		int choice = 0;
		System.out.println(message);
		for (String item : items) {
			System.out.println("  " + (++choice) + ". " + item);
		}
		System.out.print("Enter choice : ");
		
		int input = getInput(choice, 5, "Invalid input. Enter again : ");
		logger.info("Input choice : " + input);
		
		return null;
	}

	private int getInput(int choices, int maxTries, String messageIfWrong) throws HpException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		boolean read = true;
		int input = -1;
		int tries = 0;
		while (read) {
			tries++;
			try {
				if (tries > 1 && messageIfWrong != null)
					System.out.print(messageIfWrong);
				String sel = br.readLine();
				input = Integer.parseInt(sel);
				if (input >= 1 && input <= choices)
					break;
			} catch (IOException e) {
//				e.printStackTrace();
			} catch (NumberFormatException e) {
//				e.printStackTrace();
			}
			if (messageIfWrong == null)
				throw new HpException("Wrong input entered.");
			if (maxTries > 0 && tries > maxTries)
				throw new HpException("Too many tries.");
		}
		return input;
	}

}
